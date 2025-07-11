import {
  BadRequestException,
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
import { createWorker, Worker } from 'tesseract.js';
import { EXTRACT_PAYMENT_DETAILS_PROMPT } from './payments.types';
import Groq from 'groq-sdk';
import { env } from '../environment';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService implements OnModuleInit, OnApplicationShutdown {
  private readonly groq: Groq;
  private tesseractWorker: Worker;

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {
    this.groq = new Groq({ apiKey: env.GROQ_API_KEY });
  }

  async onModuleInit() {
    this.tesseractWorker = await createWorker('eng');
  }

  async onApplicationShutdown() {
    await this.tesseractWorker?.terminate();
  }

  async extractPaymentDetails(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided for processing.');
    }

    if (file.mimetype.startsWith('image')) {
      const {
        data: { text },
      } = await this.tesseractWorker.recognize(file.buffer);

      const paymentDetails = await this.groq.chat.completions.create({
        messages: [
          { role: 'system', content: EXTRACT_PAYMENT_DETAILS_PROMPT },
          { role: 'user', content: text },
        ],
        model: 'llama3-70b-8192',
      });
      return paymentDetails;
    } else {
      throw new BadRequestException(
        `File with mimetype "${file.mimetype}" is not supported. Please upload an image.`,
      );
    }
  }
}
