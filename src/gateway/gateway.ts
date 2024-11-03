import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server} from 'socket.io'

@WebSocketGateway({
      cors:{
            origin:"*"
      }
})

export class MyGateway implements OnModuleInit{
   

   

      @WebSocketServer()
      server:Server;

      onModuleInit(){
            this.server.on('connection',(socket)=>{
                  // console.log(socket.id)
            })
      } 
      @SubscribeMessage('update')

      onNewUpdate(@MessageBody() body:any){ 
          

            this.server.emit('onUpdate',{
                  message:"NEW-UPDATE"
            })
      }
}