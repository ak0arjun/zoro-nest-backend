import { Logger, Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { UserModule } from './features/users/user.module';
import { AuthModule } from './features/auth/auth.module';

/**
 * Main module of the application.
 */
@Module({
  imports: [UserModule, InfraModule, AuthModule],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
