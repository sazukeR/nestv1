import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
/*         {   
            id: uuid(),
            brand: 'Toyota',
            model: "Corolla"
        }, 
        {   
            id: uuid(),
            brand: 'Honda',
            model: "Civic"
        },  
        {   
            id: uuid(),
            brand: 'Suzuki',
            model: "Grand Nomade"
        },  */
    ];

    findAll() {
        return this.cars;
    }


    findOneById(id: string) {

        const car =  this.cars.find(car => car.id === id )

        if(!car) throw new NotFoundException(`Car with id '${id}' not found!`); // not found exception, un exception filter q nos permite validar si el id existe, de forma facil podemos lanzar un 404

        return car;
        
    }


    create( createCarDto: CreateCarDto ) {


        const car: Car = {
            id: uuid(),
            ...createCarDto,
        };

        this.cars.push(car);

        return car;

    }

    // 2. actualizacion de la info de un car utilizando el id y el cuerpo con los cambios.
    update( id: string, updateCarDto: UpdateCarDto ) {


        let carDB = this.findOneById(id); // 2. declara

        if ( updateCarDto.id && updateCarDto.id !== id ) throw new BadRequestException(`Car id is not valid inside body`); // 2. no haria falta pero en caso de que el usuario tenga la oportunidad de cambiar el id en el cuerpo de forma erronea podemos decir que id ingresado no coincide con el id del car, que es el id que se muestra en la url.

        // 2. para hacer la actualizacion en este caso usando javascript; utilizamos un map para retornar el arreglo de carros con el carro ya actualizado
        this.cars = this.cars.map( car  => {

            if ( car.id === id ) { //2. si el id en la base de datos coincide con el id de la url quiere decir que ese el el car que deseamos actualizar, realizamos las actualizaciones respectivas, recordando que todas las opciones son opcionales, podria actualizar brand y model o solo una de ambas.

                carDB = {
                    ...carDB, // 2. primero el objeto car como estaba en la base de datos.
                    ...updateCarDto, // 2. luego sobre ese objeto sobreescribimos las propiedades cambiadas, las que no sufrieron cambio permanecen igual
                    id, // 2. mandamos el id de la url que es el id del car ( el cual no deberia sufrir cambios ) asi nos aseguramos de que no sufra cambios en caso el usuario tenga una forma de cambiar el id
                }

                return carDB; // 2. retornamos el car ya actualizado en la base de datos

            }

            return car; // 2. el map retorna el objeto ya actualizado en el arreglo

        })


        return carDB; // 2. la funcion retorna el nuevo objeto car ya actualizado
    }


    delete(id: string) {

        this.findOneById(id); // si el carro no existe lanza una exeption

        this.cars = this.cars.filter(car => car.id !== id)

        return {
            id : id,
            message: "car eliminado"
        }
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
     }

}
