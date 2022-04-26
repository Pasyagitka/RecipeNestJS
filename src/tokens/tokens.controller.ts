import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  findAll() {
    return this.tokensService.findAll();
  }
}
