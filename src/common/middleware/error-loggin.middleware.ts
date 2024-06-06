// src/common/middleware/error-logging.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorLoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        console.error(`[Error] ${res.statusCode} - ${req.method} - ${req.url}`);
      }
    });
    next();
  }
}
