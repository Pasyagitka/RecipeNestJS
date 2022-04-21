import { Injectable, Inject } from '@nestjs/common';
import { COOKBOOKS_REPOSITORY } from 'src/common/constants';
import { CookbookDto } from './dto/cookbook.dto';
import { CreateCookbookDto } from './dto/create-cookbook.dto';
import { UpdateCookbookDto } from './dto/update-cookbook.dto';
import { cookbooks } from './entities/cookbooks.entity';

@Injectable()
export class CookbooksService {
  constructor(@Inject(COOKBOOKS_REPOSITORY)
  private readonly cookbooksRepository: typeof cookbooks,
  ) {}


  create(createCookbookDto: CreateCookbookDto) {
    return 'This action adds a new cookbook';
  }

  async findAll() {
    const cookbooks = await this.cookbooksRepository.findAll<cookbooks>();
    return cookbooks.map(cookbook => new CookbookDto(cookbook));

  }

  findOne(id: number) {
    return `This action returns a #${id} cookbook`;
  }

  update(id: number, updateCookbookDto: UpdateCookbookDto) {
    return `This action updates a #${id} cookbook`;
  }

  remove(id: number) {
    return `This action removes a #${id} cookbook`;
  }
}
