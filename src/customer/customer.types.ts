import { IsString, IsUUID } from 'class-validator';

export class CreateCustomerChatBody {
  @IsUUID()
  businessId: string;

  @IsString()
  query: string;
}
