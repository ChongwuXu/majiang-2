
/**
 * brief:   头像
 * date:    2017-12-7
 * author:  徐为
 */
module game
{
    export class Photo extends Scene
    {


      //***********************************/
          public m_labName:eui.Label;
          public m_imgPhoto:eui.Image;
          public m_imgOwner:eui.Image;
          public m_gopJoin:eui.Group;
      //***********************************/

       
        public constructor()
        {
            super();
             
            this.skinName = "resource/mjSkins/layer/Photo.exml";

        }

       
        public fOnUICreate()
        {
           this.m_imgOwner.visible = false;
        }
        
        public fOnClick(button)
        {
          
        }

        public fVisibleJoinGroup(visible:boolean){
           this.m_gopJoin.visible = visible;
        }

        public fVisibleOwner(visible :boolean)
        {
            this.m_imgOwner.visible = visible;
        }

      
    }
}