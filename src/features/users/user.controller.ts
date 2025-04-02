import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './models/login.dto';

/**
 * Controller handling all request regarding logins. Request handled
 * 1. login
 */
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Verifies and generate a login email for the user.
   * @param loginDto LoginDto object containing email
   */
  @Post('/login')
  @HttpCode(201)
  async login(@Body() loginDto: LoginDto): Promise<void> {
    return this.userService.login(loginDto.email);
  }
}
