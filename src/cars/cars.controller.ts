import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) {}

    @Get()
    getAllCars() {
        return this.carsService.findAll;
    }

    @Get(':id')
    getCarById( @Param("id", ParseIntPipe) id: number) { // ParseIntPipe nos permite convertir de string a number, en cuyo caso no sea el formato esperado el pipe se encaga de enviar un mensaje de error, de esta forma realizamos validaciones de forma muy sencilla
       return this.carsService.findOneById(+id);
    }


    @Post()
    createCar(@Body() body) {
        return body;
    }


    @Patch(":id")
    updateCar(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: any
    ) {
        return body
    }

    
    @Delete(":id")
    deleteCar(@Param("id", ParseIntPipe) id: number ) {
        return {
            method: "delete",
            id
        }
    }

}
