import { IsInt, IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class Telefonos_Type_Dto{
    @IsOptional()
    @IsInt()
    @MinLength(8)
    cell:number

    @IsOptional()
    @IsInt()
    @MinLength(8)
    fijo:number
    
    @IsOptional()
    @IsInt()
    @MinLength(8)
    trabajo:string
}