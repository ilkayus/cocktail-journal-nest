import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CocktailDocument = HydratedDocument<Cocktail>;

@Schema()
export class Cocktail {
  @Prop({ type: String })
  drinkID: string;
  @Prop({ type: String })
  isAlcoholic: string;
  @Prop({ type: String })
  category: string;
  @Prop({ type: String })
  cocktailName: string;
  @Prop({ type: String })
  image: string;
  @Prop({ type: String })
  imagePreview: string;
  @Prop({ type: String })
  imageSource: string;
  @Prop({ type: String })
  glass: string;
  @Prop({ type: [String] })
  ingredients: [string];
  @Prop({ type: [String] })
  ingMeasure: [string];
  @Prop({ type: String })
  tags: string;
  @Prop({ type: String })
  instructions: string;
  @Prop({ type: String })
  drinkAlternate: string;
  @Prop({ type: String })
  strVideo: string;
  @Prop({ type: String })
  strIBA: string;
  @Prop({ type: String })
  strImageAttribution: string;
  @Prop({ type: String })
  strCreativeCommonsConfirmed: string;
  @Prop({ type: Number, default: 0 })
  timesfavorite: number;
  @Prop({ type: Number, default: 0 })
  timesCommented: number;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  favorites: string;
  //   favorites: [{ type: mongoose.Schema.Types.ObjectId; ref: 'User' }];
  @Prop({ type: [String] })
  comments: string;
  @Prop({ type: String })
  dateModified: string;
}

export const CocktailSchema = SchemaFactory.createForClass(Cocktail);
