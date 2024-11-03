// import { Get, Module } from '@nestjs/common';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from 'src/schemas/User.schema';
// import { JwtModule } from '@nestjs/jwt';

// @Module({
//   imports:[MongooseModule.forFeature([{name:'User',schema:UserSchema}]), JwtModule.register({
//     global: true,
//     secret: jwtConstants.secret,

//   }),],

//   controllers: [UserController],
//   providers: [UserService]
// })
// export class UserModule {


// }


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from 'src/schemas/User.schema';
import { OtpSchema } from 'src/schemas/Otp.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema },{name:'Otp',schema:OtpSchema}]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET')
      })
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
