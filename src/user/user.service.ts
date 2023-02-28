import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from './dto/signin-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signin(signInUser: SignInUserDto) {
    const user = await this.userModel
      .findOne({ email: signInUser.email })
      .select('+password');
    if (!user) {
      return new Error('Incorrect email or password');
    }
    const isPasswordCorrect = await bcrypt.compare(
      signInUser.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return new Error('Incorrect email or password');
    }

    const token = this.signToken(user._id);
    return {
      token,
      _id: user._id,
      email: user.email,
      username: user.username,
      photo: user.photo,
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const newUser = await this.userModel.create({ ...createUserDto });
    return this.createSendToken(newUser);
  }

  async createSendToken(user: UserDocument) {
    const token = await this.signToken(user._id);
    return {
      token,
      _id: user._id,
      email: user.email,
      username: user.username,
      photo: user.photo,
    };
  }

  signToken(id: mongoose.Types.ObjectId) {
    return this.jwtService.sign(
      { id },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
