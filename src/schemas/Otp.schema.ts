import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";



@Schema({timestamps:true})
export class Otp{

      @Prop({required:true})
      email:string

      @Prop({required:true})
      otp:string



}



export  const OtpSchema=SchemaFactory.createForClass(Otp);

