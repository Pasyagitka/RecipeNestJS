export class CreateRecipeDto {
    id: number;
    categoryId: number;
    authorId: number;
    mealId: number;
    datePublished: string;
    timeToCook: number;
    instruction: string;
    title: string;
}
