import { Controller, Post ,Body,Get,Put} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

      constructor(private taskServices:TaskService){}

       @Post('addtask')  
       async addTask(@Body() body,id:string):Promise<any>{
        return this.taskServices.createTask(body.task,body.id);
      }

      @Get('getusertask')
      async getUserTask(@Body() body):Promise<any>{

            // console.log(body);

            return this.taskServices.getUserTask(body.id);
      }  

      @Get('managertask')

      async getManagerTask(@Body() body):Promise<any>{

            return this.taskServices.getTaskGiven(body.id);
      }

      @Put('updatetask')

      async updateTask(@Body() body):Promise<any>{

            return this.taskServices.updateTask(body.task);
      }

      @Post('deletetask')

      async deleteTask(@Body() body):Promise<any>{

            // console.log(body);

            return this.taskServices.deleteTask(body.taskId);
      }

      @Get('getalltask')

      async getAllTask():Promise<any>{
            return this.taskServices.getAllTask();
      }

      @Put('updatetaskbyadmine')
      async updateTaskByAdmin(@Body() body):Promise<any>{

      // console.log(body);
            return this.taskServices.updateTaskByAdmin(body);
      }
 
      @Get('getprofile')

      async getProfile(@Body() body):Promise<any>{
            return this.taskServices.getProfile(body.id);
      }

      
      

      
}
