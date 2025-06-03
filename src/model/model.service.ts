import { Groq as LlamaIndexGroq } from '@llamaindex/groq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GenerateResponseDto } from './model.dto';

@Injectable()
export class ModelService {
  private readonly llamaindexGroq: LlamaIndexGroq;
  constructor(private readonly configService: ConfigService) {
    this.llamaindexGroq = new LlamaIndexGroq({
      apiKey: this.configService.get<string>('GROQ_API_KEY'),
      model: this.configService.get<string>('GROQ_LLAMAINDEX_MODEL')!,
    });
  }

  async generateResponse(dto: GenerateResponseDto) {
    const { prompt, query, isStructuredOutput } = dto;
    const response = await this.llamaindexGroq.chat({
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: query },
      ],
      responseFormat: { type: isStructuredOutput ? 'json_object' : 'text' },
    });

    const responseJson = JSON.parse(
      response.message.content as string,
    ) as object;

    return responseJson;
  }
}
