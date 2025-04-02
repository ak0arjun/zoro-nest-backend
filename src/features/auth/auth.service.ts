import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './models/jwt_payload.model';

/**
 * Service to handle all authentication related operations.Operations handled by this service are:
 * 1. Generate JWT token
 * 2. Validate JWT token
 */
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Create a JWT token for the given userId.
   * @param userId Id of the user to be passed in the token
   * @returns The jwt token generated
   */
  async generateToken(userId: string): Promise<string> {
    return await this.jwtService.signAsync({
      userId,
    });
  }

  /**
   * Validate given token and return payload if token is valid.
   * If token is invalid, it will throw an error.
   * If token is expired it will throw an error.
   * @param token Token to be validated
   * @returns Payload of the token
   */
  async validateToken(token: string): Promise<JwtPayload> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
    return payload;
  }
}
