import { Module } from '@nestjs/common';
import { CocktailService } from './cocktail.service';
import { CocktailController } from './cocktail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cocktail, CocktailSchema } from './schemas/cocktail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cocktail.name, schema: CocktailSchema },
    ]),
  ],
  controllers: [CocktailController],
  providers: [CocktailService],
})
export class CocktailModule {}
