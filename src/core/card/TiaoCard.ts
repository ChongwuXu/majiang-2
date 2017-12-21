

module game {
   
     /**
    * brief:   条牌
    * date:    2017-11-09
    * author:  徐为
   */
   export class TiaoCard extends CardBase{
        public constructor(type : number, value : number, index :number)
       {
          super(type, value, index);
           if(value == CardBase.s_Value_Tiao_1)
            this.m_sName = '一条' 
           else if(value == CardBase.s_Value_Tiao_2)
            this.m_sName = '二条' 
           else if(value == CardBase.s_Value_Tiao_3)
            this.m_sName = '三条' 
           else if(value == CardBase.s_Value_Tiao_4)
            this.m_sName = '四条' 
           else if(value == CardBase.s_Value_Tiao_5)
            this.m_sName = '五条' 
           else if(value == CardBase.s_Value_Tiao_6)
            this.m_sName = '六条' 
           else if(value == CardBase.s_Value_Tiao_7)
            this.m_sName = '七条' 
           else if(value == CardBase.s_Value_Tiao_8)
            this.m_sName = '八条' 
           else if(value == CardBase.s_Value_Tiao_9)
            this.m_sName = '九条' 
           else
             game.TipShow.fShow('TiaoCard 创建失败:value =' + value);  
       }

      
   }
   
}