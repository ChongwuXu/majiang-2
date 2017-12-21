

module game {
     /**
    * brief:   万牌
    * date:    2017-11-09
    * author:  徐为
   */

   export class WanCard extends CardBase{
        public constructor(type : number, value:number, index : number)
       {
          super(type, value, index);
            if(value == CardBase.s_Value_Wan_1)
            this.m_sName = '一万' 
           else if(value == CardBase.s_Value_Wan_2)
            this.m_sName = '二万' 
           else if(value == CardBase.s_Value_Wan_3)
            this.m_sName = '三万' 
           else if(value == CardBase.s_Value_Wan_4)
            this.m_sName = '四万' 
           else if(value == CardBase.s_Value_Wan_5)
            this.m_sName = '五万' 
           else if(value == CardBase.s_Value_Wan_6)
            this.m_sName = '六万' 
           else if(value == CardBase.s_Value_Wan_7)
            this.m_sName = '七万' 
           else if(value == CardBase.s_Value_Wan_8)
            this.m_sName = '八万' 
           else if(value == CardBase.s_Value_Wan_9)
            this.m_sName = '九万' 
           else
             game.TipShow.fShow('WanCard 创建失败:value =' + value);  
       }

      
   }
   
}