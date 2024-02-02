import { IsString } from "class-validator";



export class CreateCarDto {

    // estas validaciones de class validator nos ayudan a obtener el objeto de retorno que nosotros esperamos sin necesidad de preocuparnos mucho por crear validaciones con mucho codigo, este dto CrteateDto lo usamos como tipado de nuetro body en los controladores

    // en este caso creamos el dto con las propiedades que requerimos retornar, y cuando colocamos el validationPipe en el main de nuetra aplicacion creamos la configuracion necesaria

    @IsString()
    readonly brand: string;

    @IsString()
    readonly  model: string;

}