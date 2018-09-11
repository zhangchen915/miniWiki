import { Injectable, NestMiddleware, MiddlewareFunction, HttpStatus } from '@nestjs/common';
import { TokenExpiredError } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PayloadMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService,
  ) {
  }

  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        req.payload = this.jwtService.decode(token, { json: true });
        try {
          this.jwtService.verify(token);
          next();
        } catch (e) {
          if (e instanceof TokenExpiredError) {
            const payload = Object.assign({}, req.payload);
            delete payload.exp;
            delete payload.iat;
            res.set('Authorization', this.jwtService.sign(payload));
            next();
          }
        }
      } else {
        res.status(HttpStatus.FORBIDDEN);
      }
    };
  }
}
