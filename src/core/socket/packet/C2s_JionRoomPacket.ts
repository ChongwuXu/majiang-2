

module game {


/**
 * brief:   加入房间数据
 * date:    2017-11-20
 * author:  徐为
 */

export class C2s_JoinRoomPacket extends Packet{
   
     /********************************/
        public m_gameName : GameName;

        public m_gameType : GameType;

        public m_sRoomId : string
     /********************************/

    public constructor(){
       super();
       this.m_oHead.m_nPktType = Protocol.s_C2S_JOINROOM;
       this.m_sActionType = Packet.s_JoinRoom;
       this.m_gameType = 1;
    }

    public fWrite():GameByteArray{
          var by = super.fWrite();
          by.writeShort(this.m_gameName);
          by.writeShort(this.m_gameType);
          by.writeUTF(this.m_sRoomId);
          return by;
       }

       public fRead(by:GameByteArray)
       {
             super.fRead(by);
             this.m_gameName = by.readShort();
             this.m_gameType = by.readShort();
             this.m_sRoomId = by.readUTF();
            
             this.fVerifyNumber();
       }

       //成员变量校验
       private fVerifyNumber(){
            
            if(this.m_gameType != GameType.e_joinRoom)
            {
                 console.info('C2s_JoinRoomPacket this.m_gameType != e_joinRoom, = ' + this.m_gameType);
                 alert('C2s_JoinRoomPacket this.m_gameType != e_joinRoom, = ' + this.m_gameType);
            }
       }
   
}

}
