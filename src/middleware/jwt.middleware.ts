      import { Injectable, NestMiddleware } from '@nestjs/common';
      import { Request, Response, NextFunction } from 'express';
      import { JwtService } from '@nestjs/jwt';

      @Injectable()
      export class jwtMiddleware implements NestMiddleware {

            constructor(private jwtService:JwtService){}
     async  use(req: Request, res: Response, next: NextFunction) {
      try  {const token=req.headers['authorization']
        
            // console.log(token);

            if(!token){
                  return res.json({message:"token don't exist",success:false});
            }
            const decode=await this.jwtService.verifyAsync(JSON.parse(token)); 
            req.body['id']=decode['id'];
            next();

            }catch(e){

                  console.log("Something went wrong");
                  console.log(e);
                  return res.json({success:false,message:"Somthing went wrong"});
            }







      
      }
      }
