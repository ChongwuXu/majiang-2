

module game {
    /**
     * brief:   玩家位置
     * date:    2017-11-09
     * author:  徐为
   */
    export enum PlayePosition{
       e_Unknow = -1,
       e_Up = 0,
       e_Down = 2,
       e_Left = 1,
       e_Right = 3,
       e_Desktop = 4,    //桌子
    }
   

   /**
     * brief:   玩家
     * date:    2017-11-09
     * author:  徐为
   */
   export class Player{

       /********************************/
    
        private m_pPosition:PlayePosition;           //玩家位置，上下左右

        public m_sUid:string;

        public m_sName:string;

        public m_nVipDegree:number;      //vip等级

        public m_nGroupCount:number;    //玩家手上牌组个数

        public m_nStatus:number;       //玩家准备状态,0已准备，1未准备
          
        private m_aHandCards:CardBase[] = [];        //手上的牌
      
        private m_aEatCards:CardBase[][] = [];       //吃的牌
   
        private m_aPengCards:CardBase[][] = [];      //碰的牌
      
        private m_aGangCards:CardBase[][] = [];      //杠的牌

        private m_bBasnker:boolean;                  //是否为庄家

       /********************************/
   
       public constructor(pos:PlayePosition)
       {
           this.m_pPosition = pos;
       }


       public fGetPosition():PlayePosition{
           return this.m_pPosition;
       }


       public fSetPosition(pos:PlayePosition):void
       {
           this.m_pPosition = pos;
       }

       
   }

 


   
}