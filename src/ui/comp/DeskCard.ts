
/**
 * brief:   头像
 * date:    2017-12-7
 * author:  徐为
 */
module game
{
    export class DeskCard extends Scene
    {


      //***********************************/
         public m_labName:eui.Label;

         public m_oCardBase:CardBase;
      //***********************************/

       
        public constructor(cardBase:CardBase)
        {
            super();
            this.m_oCardBase = cardBase
            

        }

       
        public fOnUICreate()
        {
             if(!Utils.fNotUsefunData(this.m_oCardBase))
            this.m_labName.text = this.m_oCardBase.m_sName;
        }
        
        public fOnClick(button)
        {
          
        }

    
    }


}