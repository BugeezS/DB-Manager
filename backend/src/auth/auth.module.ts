import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy, JwtAuthGuard],
  imports: [
    // Import the PassportModule to use the Passport library.
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // Import the JwtModule to use the Jwt library.
    JwtModule.register({
      secret: 'process.env.JWT_SECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
