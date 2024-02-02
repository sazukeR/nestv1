import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';


// recordar que los controladores  no manejan la logica de la peticion, la unica funcion de los controladores es escuchar la solicitud del cliente y retornar una respuesta

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) {}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById( @Param( "id", ParseUUIDPipe ) id: string) { // ParseIntPipe nos permite convertir de string a number, en cuyo caso no sea el formato esperado el pipe se encaga de enviar un mensaje de error, de esta forma realizamos validaciones de forma muy sencilla
       return this.carsService.findOneById(id);
    }

    // el dto no es mas que una clase, junto con la importacion del class validator nos permite realizar validaciones de forma sencilla
    @Post()
    createCar(@Body() createCarDto: CreateCarDto) {
        return this.carsService.create(createCarDto);
    }


    // 2. en este punto podemos pensar en usar nuestro createCarDto, pero lo recomendable seria crear un dto personalizado para actualizar tareas, entre otras cosas porque en un patch, podriamos querer actualizar solo una propiedad del objeto.


    @Patch(":id")
    updateCar(
        @Param("id", ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDto
    ) {
        return this.carsService.update( id ,updateCarDto );
    }

    
    @Delete(":id")
    deleteCar(@Param("id", ParseUUIDPipe) id: string ) {
        return this.carsService.delete(id)
    }

}
