import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './schemas/tokens.schema';

@Injectable()
export class TokensService {
    constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}

    async findAll() {
        return await this.tokenModel.find();
    }
}
