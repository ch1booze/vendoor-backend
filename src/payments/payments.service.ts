import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { EXTRACT_PAYMENT_DETAILS_PROMPT } from 'src/model/model.prompts';
import { ModelService } from 'src/model/model.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { createWorker } from 'tesseract.js';

@Injectable()
export class PaymentsService implements OnModuleInit {
  private tesseractWorker: Tesseract.Worker;

  constructor(
    private readonly modelService: ModelService,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    this.tesseractWorker = await createWorker('eng');
  }

  async extractPaymentDetails(file: Express.Multer.File) {
    if (file.mimetype.startsWith('image')) {
      const {
        data: { text },
      } = await this.tesseractWorker.recognize(file.buffer);
      await this.tesseractWorker.terminate();

      const paymentDetails = await this.modelService.generateResponse({
        prompt: EXTRACT_PAYMENT_DETAILS_PROMPT,
        query: text,
      });
      return paymentDetails;
    } else {
      throw new BadRequestException(
        `File with ${file.mimetype} is not yet supported`,
      );
    }
  }
}
