import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cocktail, CocktailDocument } from './schemas/cocktail.schema';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';

@Injectable()
export class CocktailService {
  constructor(
    @InjectModel(Cocktail.name) private cocktailModel: Model<CocktailDocument>,
  ) {}

  create(createCocktailDto: CreateCocktailDto) {
    return 'This action adds a new cocktail';
  }

  findOne(id: number) {
    return `This action returns a #${id} cocktail`;
  }

  async findAll(): Promise<Cocktail[]> {
    return this.cocktailModel.find().exec();
  }

  async findRandom(): Promise<Cocktail[]> {
    return this.cocktailModel.aggregate([{ $sample: { size: 3 } }]).exec();
  }

  update(id: number, updateCocktailDto: UpdateCocktailDto) {
    return `This action updates a #${id} cocktail`;
  }

  remove(id: number) {
    return `This action removes a #${id} cocktail`;
  }
}
