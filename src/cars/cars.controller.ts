import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {


    private cars = [
        {   
            id: "1",
            brand: 'Toyota',
        }, 
        {   
            id: "2",
            brand: 'Honda',
        },  
        {   
            id: "3",
            brand: 'Suzuki',
        }, 
    ];

    @Get()
    getAllCars() {
        return this.cars
    }

    @Get(':id')
    getCarById( @Param("id") id: string) {
       
        return  this.cars.find(car => car.id === id )
    }

}
