

module game {
  
   /**
    * brief:   花牌
    *          春，夏，秋，冬，梅，兰，竹，菊
    * date:    2017-11-09
    * author:  徐为
   */

   export class HuaCard extends CardBase{
        public constructor(type : number, value : number, index : number)
       {
          
          super(type, value, index);
          if(CardBase.s_Value_Hua_Chun == value)
             this.m_sName = '春'
          else if(CardBase.s_Value_Hua_Xia == value)
             this.m_sName = '夏'
          else if(CardBase.s_Value_Hua_Qiu == value)
             this.m_sName = '秋'
          else if(CardBase.s_Value_Hua_Dong == value)
             this.m_sName = '冬'
         else if(CardBase.s_Value_Hua_Mei == value)
             this.m_sName = '梅'
          else if(CardBase.s_Value_Hua_Lan == value)
             this.m_sName = '兰'
          else if(CardBase.s_Value_Hua_Zhu == value)
             this.m_sName = '竹'
            else if(CardBase.s_Value_Hua_Ju == value)
             this.m_sName = '菊'
          else
             game.TipShow.fShow('HuaCard 创建失败:value =' + value);  
       }

     
   }

   
}