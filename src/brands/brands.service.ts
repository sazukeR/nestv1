import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid'



@Injectable()
export class BrandsService {



  private brands: Brand[] = [
/*     {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime()
    } */
  ]




  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find( brand => brand.id === id);
    if ( !brand ) throw new NotFoundException(`The brand with id: ${id} was not found`);
    return brand;
  }

  create(createBrandDto: CreateBrandDto) {
    
    const brandToCreate: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLocaleLowerCase(),
      createdAt: new Date().getTime()
    };

    this.brands.push(brandToCreate);

    return brandToCreate;

  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    
    let brandDB = this.findOne(id);

    this.brands = this.brands.map( brand => {
      if (brand.id === id) {
        brandDB.updatedAt = new Date().getTime();
        brandDB = { ...brandDB, ...updateBrandDto };
        return brandDB;
      }
      return brand;
    })

    return brandDB;
  }

  remove(id: string) {
    
    const brandToDelete = this.findOne(id);

    if(!brandToDelete) throw new NotFoundException(`The brand with id: ${id} was not found`);

    this.brands = this.brands.filter(brand => brand.id !== id);

    return brandToDelete;
    
  }

  fillBrandsWithSeedData(brands: Brand[]) {
     this.brands = brands;
  }
}
