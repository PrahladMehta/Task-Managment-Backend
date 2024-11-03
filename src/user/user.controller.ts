import { Controller } from '@nestjs/common';
import { Get, Module,Body,Post } from '@nestjs/common';
import { User } from 'src/schemas/User.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

      constructor(private userServices:UserService){}

      @Get()
    
      async getAllUser():Promise<User[]>{
    
         return this.userServices.findAll();
      }

      @Post('signup')

      async createUser(@Body() user):Promise<any>{ 

            return this.userServices.createUser(user);

      }

      @Post('login')

      async getUser(@Body() user):Promise<any>{

            return this.userServices.checkUser(user);
      }

      @Post('otp')

      async sendOtp(@Body() body):Promise<any>{

            // console.log(body.email);

            return this.userServices.sendOtp(body.email);
      }

      @Get('getemployees')

      async getEmployees():Promise<any>{
            return this.userServices.getAllEmployee();
      }

      // @Get('getprofile')

      // async getProfile(@Body body):Promise<any>{

      //       return this.userServices.getProfile(body.id);
      // }


      @Get('getmanager')

      async getManager():Promise<any>{

            return this.userServices.getAllManager();
      }

      


}
