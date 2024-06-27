// src/auth/jwt.service.ts
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secret = 'HAGGSHHA';

  generateToken(payload: {
    name: string;
    nuc: string;
    status: string;
  }): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' }); // Token expires in 1 hour
  }
}
