import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BrevoService } from './brevo.service';

/**
 * InfraModule is a global module that provides shared services for the application.
 * It includes
 * 1. PrismaService for database access.
 * 2. the BrevoService for sending emails.
 */
@Global()
@Module({
  controllers: [],
  providers: [PrismaService, BrevoService],
  exports: [PrismaService, BrevoService],
})
export class InfraModule {}
