import {IsString, IsOptional, IsUUID} from "class-validator";

//2. en este update con patch las propiedades son opcionales (IsOptional para nest) ( ? para typescript ) porque puede que el usuario quiera actualizar una propiedad u otra, no necesariamente tienen q ser las dos

export class UpdateCarDto {

  
    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string;


    @IsString()
    @IsOptional()
    readonly brand?: string;

    @IsString()
    @IsOptional()
    readonly  model?: string;

}