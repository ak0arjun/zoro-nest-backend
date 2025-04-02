import { Injectable } from '@nestjs/common';
import * as brevo from '@getbrevo/brevo';

/**
 * BrevoService is responsible for sending transactional emails using the Brevo API.
 */
@Injectable()
export class BrevoService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.BREVO_API_KEY || '';
  }

  async sendLoginEmail(email: string, jwtToken: string): Promise<void> {
    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(0, this.apiKey);

    await apiInstance.sendTransacEmail({
      to: [
        {
          email,
        },
      ],
      templateId: 1,
      params: {
        jwtToken,
      },
    });
  }
}
