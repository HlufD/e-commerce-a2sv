import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { GlobalExceptionFilter } from "./shared/exceptions/global-exception.filter";
import express from "express";
import { join } from "node:path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000;

  const config = new DocumentBuilder()
    .setTitle("E-Commerce")
    .setDescription("This is authentication micro service for vibe call app")
    .setVersion("1.0")
    .addTag("E-Commerce")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.use("/uploads", express.static(join(__dirname, "..", "uploads")));
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(PORT, () => {
    console.log("server is running on port", PORT);
  });
}
bootstrap();
