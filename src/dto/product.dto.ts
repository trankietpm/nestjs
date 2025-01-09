import { IsNotEmpty, IsNumber, MinLength } from "class-validator";

export class ProductDTO{
    @IsNotEmpty({message: 'no blank'})
    categoryID? : number;
    @MinLength(5, {message: 'muse be than 5 character'})
    productName?: string;
    @IsNumber()
    price?: number;
}
