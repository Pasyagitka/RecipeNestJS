import { IsNotEmpty } from 'class-validator';

export class CreateMealDto {
    @IsNotEmpty()
    meal: string;
}
