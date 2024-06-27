// src/payment-reference/payment-reference-generator.service.ts
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentReferenceGeneratorService {
  private readonly logger = new Logger(PaymentReferenceGeneratorService.name);
  private readonly providerUrl =
    'https://proxypay.co.ao/api/v1/payments/generate-reference';

  async generateReference(): Promise<string> {
    try {
      const response = await axios.post(this.providerUrl);
      const reference = response.data.reference;
      this.logger.log(`Generated payment reference: ${reference}`);
      return reference;
    } catch (error) {
      this.logger.error('Error generating payment reference', error);
      throw new Error('Failed to generate payment reference');
    }
  }
}
