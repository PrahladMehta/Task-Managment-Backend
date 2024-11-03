import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";



@Schema({timestamps:true})
export class Task{
 
      @Prop({required:true})
      title:string

      @Prop({required:true})
      description:string

      @Prop({required:true,default:"todo"})
      status:string

      @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
      assignedUser:mongoose.Schema.Types.ObjectId

      @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
      assignedByUser:mongoose.Schema.Types.ObjectId

      @Prop({required:true})
      dueDate:Date

      @Prop({required:true})
      priority:string





      



}



export  const TaskSchema=SchemaFactory.createForClass(Task);

