import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/tokens.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }], 'MONGO')],  
  controllers: [TokensController],
  providers: [TokensService]
})
export class TokensModule {}
