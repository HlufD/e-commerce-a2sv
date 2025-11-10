import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from 'generated/prisma';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorType = 'ServerError';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        message = (res as any).message || message;
      }

      errorType = exception.constructor.name;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      message = this.getPrismaErrorMessage(exception);
      errorType = 'DatabaseError';
    } else if (exception instanceof Error) {
      message = exception.message;
      errorType = exception.name;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      error: errorType,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  private getPrismaErrorMessage(
    exception: Prisma.PrismaClientKnownRequestError,
  ) {
    switch (exception.code) {
      case 'P2002':
        return 'Unique constraint failed on one or more fields';
      case 'P2025':
        return 'Record not found';
      default:
        return 'Database request error';
    }
  }
}
