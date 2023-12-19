import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {

    private cars = [
        {   
            id: 1,
            brand: 'Toyota',
            model: "Corolla"
        }, 
        {   
            id: 2,
            brand: 'Honda',
            model: "Civic"
        },  
        {   
            id: 3,
            brand: 'Suzuki',
            model: "Grand Nomade"
        }, 
    ];

    findAll() {
        return this.cars;
    }


    findOneById(id: number) {

        const car =  this.cars.find(car => car.id === id )

        if(!car) throw new NotFoundException(`Car with id '${id}' not found!`); // not found exception, un exception filter q nos permite validar si el id existe, de forma facil podemos lanzar un 404

        return car;
        
    }


}
