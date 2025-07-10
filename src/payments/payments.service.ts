import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { createWorker } from 'tesseract.js';
import { EXTRACT_PAYMENT_DETAILS_PROMPT } from './payments.types';
import Groq from 'groq-sdk';
import { env } from 'src/environment';

@Injectable()
export class PaymentsService implements OnModuleInit {
  private readonly groq: Groq;
  private tesseractWorker: Tesseract.Worker;

  constructor(private readonly prisma: PrismaService) {
    this.groq = new Groq({ apiKey: env.GROQ_API_KEY });
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

      const paymentDetails = await this.groq.chat.completions.create({
        messages: [
          { role: 'system', content: EXTRACT_PAYMENT_DETAILS_PROMPT },
          { role: 'user', content: text },
        ],
        model: 'groq-llama-3-70b',
      });
      return paymentDetails;
    } else {
      throw new BadRequestException(
        `File with ${file.mimetype} is not yet supported`,
      );
    }
  }
}
