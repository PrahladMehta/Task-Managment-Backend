import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export enum Role{
      MANAGER='Manager',
      EMPLOYEE='Employee',
      ADMINE='Admine'
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  role: Role;

  @Prop()
  image: string;

  @Prop()
  otp: string;


}


export const UserSchema = SchemaFactory.createForClass(User); 
