

module game {
  
   /**
    * brief:   箭牌
    *          中，发，白
    * date:    2017-11-09
    * author:  徐为
   */
   export class JianCard extends CardBase{

       public constructor(type : number, value : number, index : number)
       {
           super(type, value, index);
           if(value == CardBase.s_Value_Jian_Zhong)
            this.m_sName = '中' 
           else if(value == CardBase.s_Value_Jian_Fa)
            this.m_sName = '发' 
           else if(value == CardBase.s_Value_Jian_Bai)
            this.m_sName = '白' 
           else
             game.TipShow.fShow('JianCard 创建失败:value =' + value);  
       }

      
   }

}