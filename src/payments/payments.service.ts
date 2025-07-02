import { Groq as LlamaIndexGroq } from '@llamaindex/groq';
import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { createWorker } from 'tesseract.js';
import { EXTRACT_PAYMENT_DETAILS_PROMPT } from './payments.types';

@Injectable()
export class PaymentsService implements OnModuleInit {
  private readonly llamaIndexGroq: LlamaIndexGroq;
  private tesseractWorker: Tesseract.Worker;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.llamaIndexGroq = new LlamaIndexGroq({
      apiKey: this.configService.get<string>('GROQ_API_KEY')!,
      model: this.configService.get<string>('GROQ_LLAMAINDEX_MODEL')!,
    });
  }

  async onModuleInit() {
    this.tesseractWorker = await createWorker('eng');
  }

  async extractPaymentDetails(file: Express.Multer.File) {
    if (file.mimetype.startsWith('image')) {
      const {
        data: { text },
      } = await this.tesseractWorker.recognize(file.buffer);
      await this.tesseractWorker.terminate();

      const paymentDetails = await this.llamaIndexGroq.chat({
        messages: [
          { role: 'system', content: EXTRACT_PAYMENT_DETAILS_PROMPT },
          { role: 'user', content: text },
        ],
        responseFormat: { type: 'json_object' },
      });
      return paymentDetails;
    } else {
      throw new BadRequestException(
        `File with ${file.mimetype} is not yet supported`,
      );
    }
  }
}
