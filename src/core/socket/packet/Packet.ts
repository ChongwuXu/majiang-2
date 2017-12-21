

module game {

/**
 * brief:   通信数据包头
 * date:    2017-10-31
 * author:  徐为
 */
class PacketHead
{

   /********************************/
   public  m_nPktLen:number;
   public m_nPktType:number;
   public m_nErrcode:number = 0;
  /********************************/

   public fWrite():GameByteArray{
      var by = new GameByteArray;
      by.writeShort(this.m_nPktType);
    
      by.writeInt(this.m_nErrcode);
      return by;
   }

   public fRead(by:GameByteArray):void
   {
      this.m_nPktLen = by.readShort();
      this.m_nPktType = by.readShort();
      this.m_nErrcode = by.readInt();
   }

}

/**
 * brief:   通信基础数据
 * date:    2017-10-31
 * author:  徐为
 */
export class Packet
{
   protected m_oHead:PacketHead = new PacketHead;

   protected m_sActionType:string;

   
   
   public fWrite():GameByteArray
   {
     return this.m_oHead.fWrite();
   }

   public fRead(by:GameByteArray):void
   {
     this.m_oHead.fRead(by);
   }

   public fGetHead():PacketHead
   {
     return this.m_oHead;
   }

   public fGetPacketName():string{
      return this.m_sActionType;
   }


   private static  s_aPacketMapStrValue = [];
   private static  s_aPacketMapNumValue = [];
   private static s_aPacketMapNumStr = [];

   public static fInitPacketMap()
   {
      if(Packet.s_aPacketMapStrValue.length)
         return;
    
      Packet.s_aPacketMapStrValue.push([game.Packet.s_PlayHand, function(){return new game.C2s_PlayHandAction}]);
      Packet.s_aPacketMapStrValue.push([game.Packet.s_Touch, function(){return new game.C2s_TouchPacket}]);
      Packet.s_aPacketMapStrValue.push([game.Packet.s_Eat, function(){return new game.C2s_EatAction}]);
      Packet.s_aPacketMapStrValue.push([game.Packet.s_Peng, function(){return new game.C2s_PengAction}]);
      Packet.s_aPacketMapStrValue.push([game.Packet.s_Gang, function(){return new game.C2s_GangAction}]);
      Packet.s_aPacketMapStrValue.push([game.Packet.s_BeginGame, function(){return new game.C2s_BeginGamePacket}]);
      Packet.s_aPacketMapStrValue.push([game.Packet.s_CreateRoom, function(){return new game.C2s_CreateRoomPacket}]);
      Packet.s_aPacketMapStrValue.push([game.Packet.s_JoinRoom, function(){return new game.C2s_JoinRoomPacket}]);
      Packet.s_aPacketMapStrValue.push([game.Packet.s_Login, function(){return new game.C2s_GameLogin}]);
      Packet.s_aPacketMapStrValue.push([game.Packet.s_RoomInfo, function(){return new game.C2s_RoomInfoPacket}]);
      Packet.s_aPacketMapStrValue.push([game.Packet.s_PlayerReady, function(){return new game.S2C_ReadyActive}]);
      Packet.s_aPacketMapStrValue.push([game.Packet.s_Speak, function(){return new game.C2s_SpeakPacket}]);
      Packet.s_aPacketMapStrValue.push([game.Packet.s_Hu, function(){return new game.C2s_HuActionPacket}]);
      Packet.s_aPacketMapStrValue.push([game.Packet.s_Ting, function(){return new game.C2s_TingActionPacket}]);


      Packet.s_aPacketMapNumValue.push([Protocol.s_C2S_PLAYHAND, function(){return new game.C2s_PlayHandAction}]);
      Packet.s_aPacketMapNumValue.push([Protocol.s_C2S_MOPAI, function(){return new game.C2s_TouchPacket}]);
      Packet.s_aPacketMapNumValue.push([Protocol.s_C2S_EAT_PAI, function(){return new game.C2s_EatAction}]);
      Packet.s_aPacketMapNumValue.push([Protocol.s_C2S_PENG_PAI, function(){return new game.C2s_PengAction}]);
      Packet.s_aPacketMapNumValue.push([Protocol.s_C2S_GANG_PAI, function(){return new game.C2s_GangAction}]);
      Packet.s_aPacketMapNumValue.push([Protocol.s_C2S_StartHand, function(){return new game.C2s_BeginGamePacket}]);
      Packet.s_aPacketMapNumValue.push([Protocol.s_C2S_CREATEROOM, function(){return new game.C2s_CreateRoomPacket}]);
      Packet.s_aPacketMapNumValue.push([Protocol.s_C2S_JOINROOM, function(){return new game.C2s_JoinRoomPacket}]);
      Packet.s_aPacketMapNumValue.push([Protocol.s_C2S_LOGIN, function(){return new game.C2s_GameLogin}]);
      Packet.s_aPacketMapNumValue.push([Protocol.s_C2S_ROOMINFO, function(){return new game.C2s_RoomInfoPacket}]);
      Packet.s_aPacketMapNumValue.push([Protocol.s_C2S_Ready, function(){return new game.S2C_ReadyActive}]);
      Packet.s_aPacketMapNumValue.push([Protocol.s_C2S_SPEAK, function(){return new game.C2s_SpeakPacket}]);
      Packet.s_aPacketMapNumValue.push([Protocol.s_C2S_HU_PAI, function(){return new game.C2s_HuActionPacket}]);
       Packet.s_aPacketMapNumValue.push([Protocol.s_C2S_TING_PAI, function(){return new game.C2s_TingActionPacket}]);

      Packet.s_aPacketMapNumStr.push([Protocol.s_C2S_PLAYHAND, game.Packet.s_PlayHand]);
      Packet.s_aPacketMapNumStr.push([Protocol.s_C2S_MOPAI, game.Packet.s_Touch]);
      Packet.s_aPacketMapNumStr.push([Protocol.s_C2S_EAT_PAI, game.Packet.s_Eat]);
      Packet.s_aPacketMapNumStr.push([Protocol.s_C2S_PENG_PAI, game.Packet.s_Peng]);
      Packet.s_aPacketMapNumStr.push([Protocol.s_C2S_GANG_PAI, game.Packet.s_Gang]);
      Packet.s_aPacketMapNumStr.push([Protocol.s_C2S_StartHand, game.Packet.s_BeginGame]);
      Packet.s_aPacketMapNumStr.push([Protocol.s_C2S_CREATEROOM, game.Packet.s_CreateRoom]);
      Packet.s_aPacketMapNumStr.push([Protocol.s_C2S_JOINROOM, game.Packet.s_JoinRoom]);
      Packet.s_aPacketMapNumStr.push([Protocol.s_C2S_LOGIN, game.Packet.s_Login]);
      Packet.s_aPacketMapNumStr.push([Protocol.s_C2S_ROOMINFO, game.Packet.s_RoomInfo]);
      Packet.s_aPacketMapNumStr.push([Protocol.s_C2S_Ready, game.Packet.s_PlayerReady]);
      Packet.s_aPacketMapNumStr.push([Protocol.s_C2S_SPEAK, game.Packet.s_Speak]);
      Packet.s_aPacketMapNumStr.push([Protocol.s_C2S_HU_PAI, game.Packet.s_Hu]);
      Packet.s_aPacketMapNumStr.push([Protocol.s_C2S_TING_PAI, game.Packet.s_Ting]);
      
   }

   public static fGetPacketNameById(type:number)
   {
     for(var i = 0; i < Packet.s_aPacketMapNumStr.length; i++)
     {
       if(Packet.s_aPacketMapNumStr[i][0] == type)
         return Packet.s_aPacketMapNumStr[i][1];
     }
   }
 

    public static fCreateAction(type:string):Packet{
            var action:Packet = null;
           if(!Packet.s_aPacketMapStrValue.length)
           {
              console.warn('Packet.s_aPacketMap 未初始化');
              return null;
           }

           for(var i in Packet.s_aPacketMapStrValue)
           {
             if(Packet.s_aPacketMapStrValue[i][0] ==type )
                action = Packet.s_aPacketMapStrValue[i][1]();
           }

           if(action == null)
           {
             console.warn('C2s_ActionBase.CreateAction fail ' + type);
  
           }

           return action;
          
       }

       public fGetActionType():string{

           return this.m_sActionType;
       }

   public static fCreatePkt(type): Packet
   {

          var action:Packet = null;
           if(!Packet.s_aPacketMapNumValue.length)
           {
              console.warn('Packet.s_aPacketMap 未初始化');
              return null;
           }

           for(var i in Packet.s_aPacketMapNumValue)
           {
             if(Packet.s_aPacketMapNumValue[i][0] ==type )
                action = Packet.s_aPacketMapNumValue[i][1]();
           }

           if(action == null)
           {
             console.warn("fCreatePkt fail" + type);
  
           }

           return action;

   
   }

 


     /********************************/

        public static s_Eat:string = "吃牌";
        public static s_Peng:string = "碰牌";
        public static s_Gang:string = "杠牌";
        public static s_Hu:string = "胡牌";
        public static s_Ting:string = "听牌";
        public static s_Touch:string = "摸牌";   
        public static s_PlayHand:string = "出牌";    
        public static s_BeginGame:string = "开始打牌";   

      
        public static s_CreateRoom:string = "创建房间";
        public static s_JoinRoom:string = '加入房间';
        public static s_BaseAct:string = "基本";
        public static s_Login:string = "登录";
        public static s_Heart:string = "心跳";
        public static s_RoomInfo:string = "房间信息"
        public static s_PlayerReady:string = "玩家准备";
       
        public static s_Speak:string = "语音聊天";

        public static s_SanKou:string = "三口关系";
      /********************************/
}

	
}
