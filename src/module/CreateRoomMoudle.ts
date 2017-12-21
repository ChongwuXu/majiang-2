
module game{

/**
 * brief:   创建房间网络逻辑处理
 * date:    2017-11-01
 * author:  徐为
 */

export class CreateRoomMoudle{

  private m_oHandle:Handle;

  public constructor(){
     GameSocket.s_aProtocols[Protocol.s_C2S_CREATEROOM] = [this, this.fCreateRoom]
      GameSocket.s_aProtocols[Protocol.s_C2S_SPEAK] = [this, this.fCreateRoom]
     this.m_oHandle = new Handle();
  }

    public fSpeak(pkt:C2s_SpeakPacket):void{
      this.m_oHandle.fSendMessage(pkt.fGetActionType(), pkt);
    }

  public fCreateRoom(pkt:C2s_CreateRoomPacket):void{
       GameManager.fGetIns().m_oGameBaseInfo.m_gameName = pkt.m_gameName;
       GameManager.fGetIns().m_oGameBaseInfo.m_gameType = pkt.m_gameType; ////fSetGameStyle(pkt.m_gameType);
       GameManager.fGetIns().m_oGameBaseInfo.m_nPayStyle = pkt.m_nPayStyle;
       GameManager.fGetIns().m_oGameBaseInfo.m_nCircle = pkt.m_nCircle;
       GameManager.fGetIns().m_sRoomId = pkt.m_sRoomId;
       var useinfo = new BaseUserInfo();
       useinfo.m_sUid = GameManager.fGetIns().m_sFirstPlayerUid;
       useinfo.m_nStatus = 0;
       useinfo.m_pDeskPos = GameManager.fGetIns().m_pCreatorPos;
       GameManager.fGetIns().fGetPlayerInfo()[  useinfo.m_pDeskPos] = useinfo;

       this.m_oHandle.fSendMessage(pkt.fGetActionType(), pkt)
       //this.m_oHandle.fSendMessage(Packet.s_RoomInfo,   GameManager.fGetIns().m_aPlayerInfo)
  }
}
}
