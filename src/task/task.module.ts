import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from 'src/schemas/Task.schema';
import { jwtMiddleware } from 'src/middleware/jwt.middleware';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { OtpSchema } from 'src/schemas/Otp.schema';
import { UserSchema } from 'src/schemas/User.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'Task',schema:TaskSchema},{name:'User',schema:UserSchema}]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET')
    }),
  })],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule implements NestModule {
    
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(jwtMiddleware).forRoutes('task');
  }
}
