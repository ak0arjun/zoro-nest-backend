import { Logger, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

/**
 * Module to handle all user related operations.
 */
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, Logger],
})
export class UserModule {}
