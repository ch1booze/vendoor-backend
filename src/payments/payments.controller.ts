import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('extract')
  @UseInterceptors(FileInterceptor('file'))
  async extractPaymentDetails(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType:
              /^(image\/(jpeg|png|gif|webp|svg\+xml)|application\/pdf)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.paymentsService.extractPaymentDetails(file);
  }
}
