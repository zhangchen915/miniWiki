import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PayloadMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
  ) {
  }

  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        req.payload = this.jwtService.verify(token);
      }
      next();
    };
  }
}
