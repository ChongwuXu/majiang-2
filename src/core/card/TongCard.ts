

module game {
   /**
    * brief:   筒牌
    * date:    2017-11-09
    * author:  徐为
   */

   export class TongCard extends CardBase{
        public constructor(type : number, value : number, index : number)
       {
          super(type, value, index);
          if(value == CardBase.s_Value_Tong_1)
            this.m_sName = '一筒' 
           else if(value == CardBase.s_Value_Tong_2)
            this.m_sName = '二筒' 
           else if(value == CardBase.s_Value_Tong_3)
            this.m_sName = '三筒' 
           else if(value == CardBase.s_Value_Tong_4)
            this.m_sName = '四筒' 
           else if(value == CardBase.s_Value_Tong_5)
            this.m_sName = '五筒' 
           else if(value == CardBase.s_Value_Tong_6)
            this.m_sName = '六筒' 
           else if(value == CardBase.s_Value_Tong_7)
            this.m_sName = '七筒' 
           else if(value == CardBase.s_Value_Tong_8)
            this.m_sName = '八筒' 
           else if(value == CardBase.s_Value_Tong_9)
            this.m_sName = '九筒' 
           else
             game.TipShow.fShow('TongCard 创建失败:value =' + value);  
       }

      
   }
}