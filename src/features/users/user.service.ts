import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../infra/prisma.service';
import { AuthService } from '../auth/auth.service';
import { BrevoService } from '../../infra/brevo.service';
import { logtailFlush } from '../../shared_resources/winston.logger';

/**
 * Module to handle all user related operations. Currently it handles:
 * 1. Login - verify if user exists, if not create a new user and organization and send an email with login url to dashboard
 */
@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly brevoService: BrevoService,
    private readonly logger: Logger,
  ) {}

  /**
   * Verifies and generate a login email for the user.
   * If user donot exists create a new user along with organization. User is made that organisation admin
   * @param email email of the user trying to login
   */
  async login(email: string): Promise<void> {
    let isExistingUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!isExistingUser) {
      isExistingUser = await this.createUserWithOrganization(email);
    }

    const jwtToken = await this.authService.generateToken(isExistingUser.id);
    this.logger.log(`Login accessed for the user: ${email}`);
    await logtailFlush();
    await this.brevoService.sendLoginEmail(
      email,
      `${process.env.ZORO_UI_URL ?? ''}/${jwtToken}`,
    );
    return;
  }

  /**
   * Create a new user and its corresponding organization, make the user admin of that organization
   * @param email email of the user for which new user/organization is to be created
   * @returns Details of the newly created user
   */
  private async createUserWithOrganization(email: string): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        email,
        organization: {
          create: {},
        },
      },
    });

    return user;
  }
}
