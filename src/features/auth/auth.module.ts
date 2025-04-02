import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

/**
 * Module to handle all authentication related operations.
 * It is a global module. As JWT verification will be used in multiple modules.
 */
@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.AUTH_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
