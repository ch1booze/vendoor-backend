import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Payments', 'Customer-Agent')
@ApiParam({ name: 'businessId', description: 'The ID of the business' })
@Controller('businesses/:businessId/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Extract payment details from a receipt file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'A receipt file (PDF, JPEG, PNG, etc.) up to 5MB',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('extract')
  async extractPaymentDetails(
    @Param('businessId') businessId: string,
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
