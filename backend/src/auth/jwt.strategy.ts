import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// The JWTStrategy class is a Passport strategy that validates a JWT token.
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  // The JWTStrategy class is a Passport strategy that validates a JWT token.
  constructor() {
    super({
      jwsFromRequest: ExtractJwt.FromExtractors([extractJwtFromCookie]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  // The validate method is called by Passport to validate the JWT token.
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
// The extractJwtFromCookie function extracts the JWT token from the request cookie.
const extractJwtFromCookie = (req) => {
  return req?.cookies?.['token'];
};
