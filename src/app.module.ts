import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { OtpSchema } from './schemas/Otp.schema';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true
    }),
    MailerModule.forRoot({
      transport:{
        host:'smtp.gmail.com',
        auth:{
          user: "pankajmehta56876@gmail.com",  
          pass: "rdafrslkavsvbmof", 
        }
      } 
    }),
    MongooseModule.forRoot(process.env.db_url),
    UserModule,
    TaskModule,
    GatewayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
