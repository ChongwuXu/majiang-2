
/**
 * brief:   头像
 * date:    2017-12-7
 * author:  徐为
 */
module game
{
    export class HandCardDown extends Scene
    {


      //***********************************/
         private m_labName:eui.Label;

         public m_oCardBase:CardBase;
      //***********************************/

       
        public constructor(cardBase:CardBase)
        {
            super();
            this.m_oCardBase = cardBase
            this.skinName = "resource/mjSkins/comp/HandCardDown.exml";

        }

       
        public fOnUICreate()
        {
            this.m_labName.text = this.m_oCardBase.m_sName;
        }
        
        public fOnClick(button)
        {
          
        }

      

      
    }
}