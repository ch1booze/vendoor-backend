import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModelService } from 'src/model/model.service';
import { createWorker } from 'tesseract.js';

@Injectable()
export class PaymentsService implements OnModuleInit {
  private tesseractWorker: Tesseract.Worker;

  constructor(private modelService: ModelService) {}

  async onModuleInit() {
    this.tesseractWorker = await createWorker('eng');
  }

  async extractPaymentDetails(file: Express.Multer.File) {
    if (file.mimetype.startsWith('image')) {
      const {
        data: { text },
      } = await this.tesseractWorker.recognize(file.buffer);
      await this.tesseractWorker.terminate();
    }
  }
}
