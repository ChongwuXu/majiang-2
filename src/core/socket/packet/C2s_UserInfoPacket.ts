

module game {


/**
 * brief:   玩家信息
 * date:    2017-11-30
 * author:  徐为
 */

export class C2s_UserInfoPacket extends Packet{
   
     /********************************/
      public m_sUid:string;
      public m_sUserName:string;
      public m_nVipDegree:number;
      public m_sUserIcon:string; //玩家头像
      public m_nStatus:number; //玩家状态，0无准备，1已准备
      public m_pPosition:PlayePosition;  
      public m_nGroupNum:number;   //玩家牌组数量 
      public m_aPlayCardGroup:CardGroup[] = [];
     /********************************/

    public constructor(){
       super();
       this.m_oHead.m_nPktType = Protocol.s_C2S_ROOMINFO;
       this.m_sActionType = Packet.s_RoomInfo;
      
       this.m_pPosition = PlayePosition.e_Unknow;

    }


    public fGetHandCardGop():CardGroup{
        for(var i in this.m_aPlayCardGroup)
        {
            if(this.m_aPlayCardGroup[i].m_oCardStatus.m_nStatusType == CardStatus.s_Status_Hand)
              return this.m_aPlayCardGroup[i];
        }
    }

   /* public fWrite():GameByteArray{
          var by = super.fWrite();
          by.writeShort(this.m_gameName);
          by.writeShort(this.m_gameType);
          by.writeShort(this.m_nPayStyle);
          by.writeShort(this.m_nCircle);
          by.writeUTF(this.m_sRoomId);
          by.writeShort(this.m_pPosition);
          return by;
       }*/

       public fRead(by:GameByteArray, sup:boolean = true)
       {
           if(sup){

  super.fRead(by);
           }
           
             this.m_sUid = by.readUTF();
             this.m_sUserName = by.readUTF();
             this.m_nVipDegree = by.readShort();
             this.m_sUserIcon = by.readUTF();
             this.m_nStatus = by.readShort();
             this.m_pPosition = by.readShort();
             this.m_nGroupNum = by.readShort();
             for(var i = 0; i < this.m_nGroupNum; i++)
             {
                var gop:CardGroup  = new CardGroup();
                gop.fRead(by);

                this.m_aPlayCardGroup.push(gop);
             }
            // GameManager.fGetIns().m_oRoomInfo.m_sRoomId = this.m_sRoomId;
            // this.m_pPosition = by.readShort();
          //   GameManager.fGetIns().m_pCreatorPos = this.m_pPosition;
             this.fVerifyNumber();
       }


       public fWrite_0(by:GameByteArray):GameByteArray{
           return null;
       }

       //成员变量校验
       private fVerifyNumber(){
           
       }
   
}

}
