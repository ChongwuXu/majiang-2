

module game {


/**
 * brief:   房间信息数据包
 * date:    2017-10-31
 * author:  徐为
 */

export class C2s_RoomInfoPacket extends Packet{

     /********************************/
      public m_gameName:GameName;     //游戏名
      public m_nPayStyle:number;      //付费方式, 0为AA，1为房主付费
      public m_nCircle:number;        //总局数
      public m_nNowCircle:number;     //当前局数
      public m_sRoomId:string;
      public m_aDice:number[] = [];        //筛子的点数
      public m_nPlayerNum:number;     //当前房间玩家个数
      public m_nBankerPos:PlayePosition;     //庄家位置
      public m_aPlayerInfo:C2s_UserInfoPacket[] = [];       //玩家信息
      public m_aPlayerCards:CardGroup[][];   //玩家的牌
      public m_aDeskCard:CardGroup[];        //手牌  

      public m_aPlay:Player[] = [];

      public m_aCardsCount:number;

      public m_nGameChoice:number = 7;

     /********************************/

    public constructor(){
      super();
      this.m_oHead.m_nPktType = Protocol.s_C2S_ROOMINFO;
      this.m_sActionType = Packet.s_RoomInfo;

      for(var  i = PlayePosition.e_Up; i <= PlayePosition.e_Right; i++)

      this.m_aPlay[i] = new Player(i);

    }

    public fGetUserInfoByPos(pos:PlayePosition):C2s_UserInfoPacket{
       for(var i in this.m_aPlayerInfo)
       {
           if(this.m_aPlayerInfo[i].m_pPosition == pos)
             return this.m_aPlayerInfo[i];
       }
    }

    public fCancelUserReadyStatus(){
       for(var i in this.m_aPlayerInfo)
       {
           this.m_aPlayerInfo[i].m_nStatus  = 0
       }
    }

    public fRead(by:GameByteArray):void{
      super.fRead(by);
       
      this.m_gameName = by.readShort();
      this.m_nPayStyle = by.readShort();
      this.m_nCircle = by.readShort();
      this.m_nNowCircle = by.readShort();
      this.m_sRoomId = by.readUTF();
      this.m_aDice[0] = by.readShort();
      this.m_aDice[1] = by.readShort();
      this.m_nPlayerNum = by.readShort();
      this.m_nBankerPos = by.readShort();


       GameManager.fGetIns().m_sRoomId =  this.m_sRoomId;
       GameManager.fGetIns().m_pBankerPos = this.m_nBankerPos;

       
      for(var i = 0; i < this.m_nPlayerNum; i++)
      {
        this.m_aPlayerInfo[i] = new C2s_UserInfoPacket(); //.push(by.readUTF());
        this.m_aPlayerInfo[i].fRead(by, false);
      }

      for(var k in this.m_aPlayerInfo)  
      {
            if(this.m_aPlayerInfo[k].m_sUid == GameManager.fGetIns().m_sFirstPlayerUid)  //第一玩家位置
                GameManager.fGetIns().m_pFirstPlayerPos = this.m_aPlayerInfo[k].m_pPosition;

            var info = new BaseUserInfo();
            info.m_sUid = this.m_aPlayerInfo[k].m_sUid;
            info.m_nStatus = this.m_aPlayerInfo[k].m_nStatus;
            info.m_pDeskPos = this.m_aPlayerInfo[k].m_pPosition;
            GameManager.fGetIns().fPushPlayerInfo(info)//m_aPlayerInfo.push(info);
      } 

      GameManager.fGetIns().m_pCreatorPos =PlayePosition.e_Right;

      GameManager.fGetIns().fSetFirstPos(this);

      this.m_nGameChoice = by.readShort();

    }

    public fAddCardByPos(card:CardBase, pos:number)
    {
      for(var i = 0; i < this.m_aPlayerInfo.length; i++)
      {
        if(this.m_aPlayerInfo[i].m_pPosition == pos){
            for(var j = 0; j < this.m_aPlayerInfo[i].m_aPlayCardGroup.length; j++){
               if(this.m_aPlayerInfo[i].m_aPlayCardGroup[j].m_oCardStatus.m_nStatusType == CardStatus.s_Status_Hand)
               {
                 CardBase.fInsetCard(card,  this.m_aPlayerInfo[i].m_aPlayCardGroup[j].fGetCard()) 
               //  this.m_aPlayerInfo[i].m_aPlayCardGroup[j].fPushCard(card)
               }
           }
        }
       
      }
    }

    public fWrite():GameByteArray{
          var by = super.fWrite();

          by.writeShort(this.m_gameName);
          by.writeShort(this.m_nPayStyle);
          by.writeShort(this.m_nCircle);
          by.writeShort(this.m_nNowCircle);
          by.writeUTF(this.m_sRoomId);
          by.writeShort(this.m_aDice[0]);
          by.writeShort(this.m_aDice[1]);
          by.writeShort(this.m_nPlayerNum);
          by.writeShort(this.m_nBankerPos);
          for(var i = 0; i < this.m_nPlayerNum; i++)
          {
            this.m_aPlayerInfo[i].fWrite_0(by);
          }
          by.writeShort(this.m_nGameChoice);
          return by;
       }
}


   
}
