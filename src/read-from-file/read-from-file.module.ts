import { Module } from '@nestjs/common';
import { ReadFromFileController } from './read-from-file.controller';

@Module({
  controllers: [ReadFromFileController],
})
export class ReadFromFileModule {}
