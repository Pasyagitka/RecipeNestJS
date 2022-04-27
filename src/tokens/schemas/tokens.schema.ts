import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Token {
    @Prop({ required: true })
    userId: number;

    @Prop({ required: true })
    refreshToken: string;
}

export type TokenDocument = Token & Document;

export const TokenSchema = SchemaFactory.createForClass(Token);