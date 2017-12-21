

module game {
   

     /**
     * brief:   风牌
     *          东, 西，南, 北风
     * date:    2017-11-09
     * author:  徐为
    */
   export class FengCard extends CardBase{
      public constructor(type:number, value:number, index : number)
      {
          super(type, value, index);
          if(CardBase.s_Value_Feng_Dong == value)
             this.m_sName = '东风'
          else if(CardBase.s_Value_Feng_Xi == value)
             this.m_sName = '西风'
          else if(CardBase.s_Value_Feng_Nan == value)
             this.m_sName = '南风'
          else if(CardBase.s_Value_Feng_Bei)
             this.m_sName = '北风'
          else
             game.TipShow.fShow('FengCard 创建失败:value =' + value);  
      }

     
   } 
   
}