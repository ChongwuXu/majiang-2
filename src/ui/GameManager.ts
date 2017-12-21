

module game {
      /**
 * brief:   游戏名
 * date:    2017-11-09
 * author:  徐为
 */   
  export enum GameName{
    e_xinPuMj = 0,              //新浦麻将
    e_ganYuMj = 1,              //赣榆麻将
  }

/**
 * brief:   游戏方式
 * date:    2017-11-09
 * author:  徐为
 */ 
export enum GameType{
  e_createRooom = 0,         //创建房间
  e_joinRoom = 1,            //加入房间
}

   export class BaseUserInfo{
          /********************************/
            public m_nStatus:number;   //状态 0未准备, 1已准备
            public m_sUid:string;
            public m_pDeskPos:PlayePosition;
          /********************************/
   }

   export class GameBaseInfo{

       /********************************/
          public m_gameName : GameName;
          public m_gameType : GameType;
          public m_nPayStyle : number; //付费方式, 0为AA，1为房主付费
          public m_nLoginType : number;
          public m_nCircle:number;
          public m_aDiceNum:number[] = [];    //筛子数
        /********************************/
   }
  
   export class GameManager{
       
      /********************************/
        public m_oGameBaseInfo:GameBaseInfo = new GameBaseInfo;

        public m_aHandCardsDown:HandCardDown[] = [];

        public m_oTouchHandCard:HandCardDown = null;    //当前摸到的牌

        public m_oChuHandCard:HandCardDown;
        
        public m_sRoomId:string;

        public m_pCreatorPos:PlayePosition; // 游戏创建者坐标

        public m_sFirstPlayerUid:string ; //游戏第一玩家uid

        public m_pFirstPlayerPos:PlayePosition; //游戏第一玩家坐标

        public m_pBankerPos:PlayePosition; //庄家位置

        private m_aPlayerInfo:BaseUserInfo[] = [];

        public m_nAllCardsNum:number; //所有牌的数量

        public m_nInitPlayerCardNum:number; //初始化时每个玩家手里有的牌数

        public m_nPlayerActionPos:PlayePosition;   //游戏当前活动者位置

        private m_bCreateRoom:boolean = false;    //是否第一玩家创建的游戏

        public m_aPackets:Packet[] = [];

        public m_bFirstTouchCard = false;

        public m_nGameSpeed:number = 1;  //游戏速度
      /********************************/

       public constructor()
       {
       }

	    public static fGetIns()
		  {
		  	if (!GameManager.s_ins)
		  	{
			  	GameManager.s_ins = new GameManager();
			  }
		    return GameManager.s_ins;
	  	}
     
      public fIsCreateGame():boolean{
        return this.m_bCreateRoom;
      }

      public fSetCreateRoom(create:boolean)
      {
        this.m_bCreateRoom = create;
      }
      public fResetByRoomInfoPacket(pak:C2s_RoomInfoPacket){
          this.m_sRoomId = pak.m_sRoomId;
          var userInfo = pak.m_aPlayerInfo;

          for(var i in userInfo)  //第一玩家位置
          {
               if(userInfo[i].m_sUid == GameManager.fGetIns().m_sFirstPlayerUid)
                  this.m_pFirstPlayerPos = userInfo[i].m_pPosition;
          } 

          //玩家信息
          for(var i in userInfo)
          {
             var info = new BaseUserInfo();
             info.m_sUid = userInfo[i].m_sUid;
             info.m_nStatus = userInfo[i].m_nStatus;
             this.m_aPlayerInfo.push(info);
          }
      }

      public fSetFirstPos(pak:C2s_RoomInfoPacket){
        for(var i in pak.m_aPlayerInfo)
        {
          if(pak.m_aPlayerInfo[i] == undefined)
            continue;
          if(pak.m_aPlayerInfo[i].m_sUid == GameManager.fGetIns().m_sFirstPlayerUid)
             GameManager.fGetIns().m_pFirstPlayerPos = pak.m_aPlayerInfo[i].m_pPosition

        }

      }

      public fGetPlayerInfo(){
        return this.m_aPlayerInfo;
      }

      public fPushPlayerInfo(info:BaseUserInfo):void{
        for(var i in this.m_aPlayerInfo)
        {
          if(parseInt(i) == info.m_pDeskPos)
          {
            return;
          }
        }

        this.m_aPlayerInfo[info.m_pDeskPos] = info;
      }

       /********************************/
            
        private static s_ins: GameManager;
       
        public static s_ReadyCancel:number = 104;
        /********************************/
   }
}
