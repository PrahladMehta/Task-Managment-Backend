import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import * as mongoose from "mongoose"

import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { Otp } from 'src/schemas/Otp.schema';

@Injectable()
export class UserService {

      constructor(
            @InjectModel(User.name)

            private userModel:mongoose.Model<User>, 

            @InjectModel(Otp.name)
            private otpModel:mongoose.Model<Otp>,
            private jwtService: JwtService,
            private mailerService:MailerService
        
      ){}
  
      async findAll():Promise<User[]>{
            const user=await this.userModel.find({});
            return user;
      }

      async createUser(user:User):Promise<any>{  

            const check=await this.userModel.findOne({email:user.email,role:user.role});

            // console.log(check);

            if(check){
                  return {message:"User exist",success:false}
            }

            if(!user.otp){
                  return {message:"please enter otp",success:false}
            }

            const res=await this.otpModel.findOne({email:user.email})

            if(!res){

                  return {message:"Something went wrong on getting otp",success:false}

            }

            if(user.otp!==res.otp){

                  return {message:"Not valid otp",success:false}

            }
            const newUser=await this.userModel.create(user);

            const payload={firstname:newUser.firstname,lastname:newUser.lastname,email:newUser.email,id:newUser._id,role:newUser.role};

            const token=await this.jwtService.signAsync(payload);

            return {message:"User created",success:true,token,email:newUser.email};
      }
   
      async checkUser(userDetail:{email:string,password:string,role:string}):Promise<any>{

         

            const user=await this.userModel.findOne({email:userDetail.email,role:userDetail.role});

            if(!user){
                  return {success:false,message:"User Not exixt please signUp"};

            }


          if(userDetail.password!==user.password){
            return {success:false,message:"Password is incorrect"};
          }

          const payload={firstname:user.firstname,lastname:user.lastname,email:user.email,id:user._id};

          const token=await this.jwtService.signAsync(payload);

          return {success:true,message:"Login in successfully ",token};

      }

      async sendOtp(email:string):Promise<any>{

            try{

             const user=await this.userModel.findOne({email});

          

             if(user){
                  return {success:false,message:"User exist please login"};
             }  
             
             await this.otpModel.findOneAndDelete({email});
            

             const otp=Math.floor(Math.random()*1000000);

        
             this.mailerService.sendMail({

                  to:email,
                  from:'pankajmehta56876@gmail.com',
                  subject:'Task Managment OTP verification',
                  text: "Verification mail",
                  html: `<h2>OTP : ${otp}<h2>`,


             });

              const prevOtp=await this.otpModel.findOne({email});

              if(prevOtp){
                  prevOtp.otp=otp+"";
              }else{
                  const res= await this.otpModel.create({otp,email});
              }         

             return {message:"OTP Send",success:true};
            
      }catch(e){
            console.log("ERROR");
            console.log(e);

            return {message:"Something went wrong while sending the otp",success:false}
      }

      }


      async getAllEmployee():Promise<any>{

            const employees=await this.userModel.find({role:'Employee'}).select({firstname:1,lastname:1,email:1})

            return {message:"All employee fetched",employees,success:true};
      }

      async getAllManager():Promise<any>{
            const managers=await this.userModel.find({role:'Manager'}).select({firstname:1,lastname:1,email:1});

            return {message:"All Manager fetched",managers,success:true};
      }

      async getProfile(userId:string):Promise<any>{

            const user=await this.userModel.findById(userId).select({firstname:1,lastname:1,email:1,image:1});

            return {message:"Profile fetch",user,success:true};


      }

}
