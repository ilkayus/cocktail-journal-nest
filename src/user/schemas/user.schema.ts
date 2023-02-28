/* eslint-disable @typescript-eslint/ban-types */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

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
  passwordConfirm: string | undefined;

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

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

// UserSchema.methods.correctPassword = async function (
//   candidate: string,
//   userPassword: string,
// ): Promise<boolean> {
//   return bcrypt.compare(candidate, userPassword);
// };

// UserSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10,
//     );
//     return changedTimestamp > JWTTimestamp;
//   }
//   return false;
// };
