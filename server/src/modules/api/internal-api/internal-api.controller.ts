import { Controller } from '@nestjs/common';
import { InternalApiService } from './internal-api.service';

@Controller('api/overseerr')
export class InternalApiController {
  constructor(private readonly internalApi: InternalApiService) {}
}
