import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: String,
    required: [true, 'Please tell us your name!'],
  })
  username: string;
  @Prop({
    type: String,
    required: [true, 'Please provide an email address!'],
    unique: true,
    lowercase: true,
  })
  email: string;
  @Prop({
    type: String,
  })
  photo: string;
  @Prop({
    type: String,
    required: [true, 'Provide a password'],
    minlength: 8,
    select: false,
  })
  password: string;
  @Prop({
    type: String,
    required: [true, 'Confirm your password'],
    validate: {
      // this only works on CREATE and SAVE!!!
      validator: function (el: string) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  })
  passwordConfirm: string;
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cocktail',
    },
  ])
  favorites: string;
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ])
  comments: string;
  @Prop({
    type: Date,
  })
  passwordChangedAt: Date;
  @Prop({
    type: String,
  })
  passwordResetToken: string;
  @Prop({
    type: Date,
  })
  passwordResetExpires: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
