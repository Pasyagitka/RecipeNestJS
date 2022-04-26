import { Controller, Get, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join, resolve} from 'path';

@Controller('read-from-file')
export class ReadFromFileController {  
  @Get()
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'public', 'files', 'file.txt'));
    return new StreamableFile(file);
  }
}
