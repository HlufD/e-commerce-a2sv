import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { Prisma } from "generated/prisma";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === "string") {
        message = res;
      } else if (typeof res === "object" && res !== null) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        message = (res as any).message || message;
      }
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      message = this.getPrismaErrorMessage(exception);
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      status: status,
      message,
      data: null,
    });
  }

  private getPrismaErrorMessage(
    exception: Prisma.PrismaClientKnownRequestError
  ) {
    switch (exception.code) {
      case "P2002":
        return "Unique constraint failed on one or more fields";
      case "P2025":
        return "Record not found";
      default:
        return "Database request error";
    }
  }
}
