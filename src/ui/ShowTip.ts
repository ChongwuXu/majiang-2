
/**
 * brief:   通用提示框
 * date:    2017-11-22
 * author:  徐为
 */
module game
{
    export class TipShow extends Scene
    {
       


       //***********************************/

       private m_labTip:eui.Label;
       private m_sTipText:string;

      //***********************************/


        public constructor(tip:string)
        {
            super();
             this.m_sTipText = tip;
            this.skinName = "resource/gameSkins/layer/ShowTip.exml";
          
        }

        public static fShow(tip:string)
        {
            var tipshow = new TipShow(tip);
        //    Main.fGetIns().GetShowTipLayer().addChild(tipshow);
        }
       
        public fOnUICreate()
        {
           this.m_labTip.text = this.m_sTipText;
           this.fSetClickButton(this);
        }

       public fOnClick(button){
          this.parent.removeChild(this);
       }
      
    }
}