import { Injectable, Post, Put } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/schemas/Task.schema';
import * as Mongoose from "mongoose"
import { Otp } from 'src/schemas/Otp.schema';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class TaskService {
   
      constructor(  @InjectModel(Task.name) private taskModel:Mongoose.Model<Task>,@InjectModel(User.name) private userModel:Mongoose.Model<User>){}
      async createTask(task:any,id:string):Promise<any>{
      const newTask=await this.taskModel.create({title:task.title,description:task.description,assignedByUser:id,assignedUser:task.assignedTo,dueDate:task.dueDate,priority:task.priority});
      return {newTask,success:true,message:"Task Created Successfully"};       
       }
       async deleteTask(id:string):Promise<any>{
              
            const deleteTask=await this.taskModel.findByIdAndDelete(id);
        

            if(!deleteTask){
                  return {success:false,message:"Task don't exist"};
            }
            return {success:true,message:"Task deleted"};
       }

      async updateTask(task:any):Promise<any>{

            // console.log(task);
          const update=await this.taskModel.findOneAndUpdate({_id:task.id},{status:task.status});
      //     console.log(update);
          return {success:true,message:"updated",task:update};
      }

      async updateTaskByAdmin(task:any):Promise<any>{

            // _id: null,
            // title: '',
            // description: '',
            // assignedTo: '',
            // assignedBy: '',
            // dueDate: '',
            // priority: '',
            // status: ''

            const storeTask=await this.taskModel.findById(task.taskId);

      

            storeTask.title=task.title;
            storeTask.description=task.description;
            storeTask.assignedByUser=task.assignedBy;
            storeTask.assignedUser=task.assignedTo;
            storeTask.dueDate=task.dueDate;
            storeTask.priority=task.priority;
            storeTask.status=task.status;

           await  storeTask.save();

           return {success:true,message:"Task Update succefully"};


      }

      async getAllTask():Promise<any>{
            const tasks=await this.taskModel.find({});

            const allTasks=[]

            for(let i=0;i<tasks.length;i++){

                  

                  const task=tasks[i];

                  const employee=await this.userModel.findById(task.assignedUser);

                  const manager=await this.userModel.findById(task.assignedByUser);

                  if(employee&&manager){
                  allTasks.push({id:task._id,title:task.title,description:task.description,assignedTo:employee.firstname+" "+employee.lastname,assignedBy:manager.firstname+" "+manager.lastname,dueDate:task.dueDate,priority:task.priority,status:task.status});
                  }


            }
            return {success:true,message:"Task fetch successfully",allTasks};
      }

      async getUserTask(userId:string):Promise<any>{

            // const userObjectId = new Mongoose.Types.ObjectId(userId)


            const userTasks=await this.taskModel.find({assignedUser:userId});

            const task=[];



            for(let i=0;i<userTasks.length;i++){

                   const userTask=userTasks[i];

                   const givenBy=await this.userModel.findOne({_id:userTask.assignedByUser}).select({firstname:1,lastname:1});
                     
                   if(givenBy){

                        task.push({id:i,taskId:userTask._id,title:userTask.title,description:userTask.description,status:userTask.status,dueDate:userTask.dueDate,assignedBy:givenBy.firstname+" "+givenBy.lastname,priority:userTask.priority,assignedById:givenBy._id});

                   }


      
                

            }

            const user=await this.userModel.findById(userId).select({email:1,firstname:1,lastname:1,image:1});

      

            return {message:"task fetched ",task,user,success:true};


      }

      async getTaskGiven(userId:string):Promise<any>{
            const userTasks=await this.taskModel.find({assignedByUser:userId});
            const task=[];
            for(let i=0;i<userTasks.length;i++){
                  const userTask=userTasks[i];
                  const givenTo=await this.userModel.findOne({_id:userTask.assignedUser}).select({firstname:1,lastname:1});

                  if(givenTo){
                        task.push({userTask,assignedTo:{firstname:givenTo.firstname,lastname:givenTo.lastname}});
                  }
                 
           }

            return {message:"task fetched",task,success:true};
}

   async getProfile(id:string):Promise<any>{

         const user=await this.userModel.findById(id).select({firstname:1,lastname:1,image:1,email:1});

         return {success:true,user,message:"User data is fetched"};
   }
}
