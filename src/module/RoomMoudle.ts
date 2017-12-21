
module game{

/**
 * brief:   房间网络逻辑处理
 * date:    2017-11-01
 * author:  徐为
 */

export class RoomMoudle{

  private m_oHandle:Handle;

  public constructor(){
     GameSocket.s_aProtocols[Protocol.s_C2S_ROOMINFO] = [this, this.fRoom]
     GameSocket.s_aProtocols[Protocol.s_C2S_Ready] = [this, this.fRoom]
     
         GameSocket.s_aProtocols[Protocol.s_C2S_StartHand] = [this, this.fRoom]
     this.m_oHandle = new Handle();
  }

  public fRoom(pkt:C2s_CreateRoomPacket):void{
    
       this.m_oHandle.fSendMessage(pkt.fGetActionType(), pkt);
  }

  public fReadyActive(pkt:S2C_ReadyActive):void{
         this.m_oHandle.fSendMessage(pkt.fGetActionType(), pkt);
  }
}
}
