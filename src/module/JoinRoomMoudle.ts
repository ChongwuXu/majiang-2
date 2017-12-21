
module game{

/**
 * brief:   加入房间网络逻辑处理
 * date:    2017-12-01
 * author:  徐为
 */

export class JoinRoomMoudle{

  private m_oHandle:Handle;

  public constructor(){
     GameSocket.s_aProtocols[Protocol.s_C2S_JOINROOM] = [this, this.fJoinRoom]
     this.m_oHandle = new Handle();
  }

  public fJoinRoom(pkt:C2s_CreateRoomPacket):void{
      
       this.m_oHandle.fSendMessage(pkt.fGetActionType(), pkt)
  }
}
}
