import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "node:path";
import { Request } from "express";
import * as fs from "node:fs";

export function UploadFile(options: {
  fieldName?: string;
  folder?: string;
  maxSizeMB?: number;
  allowedTypes?: string[];
}) {
  const {
    fieldName = "file",
    folder = "misc",
    maxSizeMB = 5,
    allowedTypes = ["jpg", "jpeg", "png", "webp"],
  } = options;

  const uploadPath = `./uploads/${folder}`;
  // Create folder if it doesn't exist
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const regex = new RegExp(`^image/(${allowedTypes.join("|")})$`);

  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination: uploadPath,
          filename: (req: Request, file, cb) => {
            const uniqueSuffix =
              Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
        limits: { fileSize: maxSizeMB * 1024 * 1024 },
        fileFilter: (req: Request, file, cb) => {
          if (!file.mimetype.match(regex)) {
            return cb(new Error("Invalid file type!"), false);
          }
          cb(null, true);
        },
      })
    )
  );
}
