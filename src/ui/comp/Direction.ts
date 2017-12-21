
/**
 * brief:   头像
 * date:    2017-12-7
 * author:  徐为
 */
module game
{
    export class Direction extends Scene
    {


      //***********************************/
         private m_imgLightDown:eui.Image;
         private m_imgLightUp:eui.Image;
         private m_imgLightLeft:eui.Image;
         private m_imgLightRight:eui.Image;

         private m_imgDirDown:eui.Image;
         private m_imgDirLeft:eui.Image;
         private m_imgDirUp:eui.Image;
         private m_imgDirRight:eui.Image;
      //***********************************/

       
        public constructor()
        {
            super();
             
            this.skinName = "resource/mjSkins/comp/Direction.exml";

        }

       
        public fOnUICreate()
        {
            this.fHideLight();
            this.fInitDir();
        }
        
        public fOnClick(button)
        {
          
        }

        public fInitDir(){
           if(GameManager.fGetIns().m_pFirstPlayerPos == PlayePosition.e_Right)
           {
               this.m_imgDirDown.texture = RES.getRes("games_res_set_timer_location_1_png");
               this.m_imgDirRight.texture = RES.getRes("games_res_set_timer_location_4_png");
               this.m_imgDirUp.texture = RES.getRes("games_res_set_timer_location_3_png");
               this.m_imgDirLeft.texture = RES.getRes("games_res_set_timer_location_2_png");
           }
           else if(GameManager.fGetIns().m_pFirstPlayerPos == PlayePosition.e_Up)
           {
               this.m_imgDirDown.texture = RES.getRes("games_res_set_timer_location_4_png");
               this.m_imgDirRight.texture = RES.getRes("games_res_set_timer_location_3_png");
               this.m_imgDirUp.texture = RES.getRes("games_res_set_timer_location_2_png");
               this.m_imgDirLeft.texture = RES.getRes("games_res_set_timer_location_1_png");
           }
             else if(GameManager.fGetIns().m_pFirstPlayerPos == PlayePosition.e_Left)
           {
               this.m_imgDirDown.texture = RES.getRes("games_res_set_timer_location_3_png");
               this.m_imgDirRight.texture = RES.getRes("games_res_set_timer_location_2_png");
               this.m_imgDirUp.texture = RES.getRes("games_res_set_timer_location_1_png");
               this.m_imgDirLeft.texture = RES.getRes("games_res_set_timer_location_4_png");
           }
        }



       public fResetDir(deskPos:PlayePosition){
            this.fHideLight();
         
            var gamePos = Utils.fDeskPosToGamePosFirst(deskPos);
            if(gamePos == PlayePosition.e_Down)
            {
                this.m_imgLightDown.visible = true;
            }
            else if(gamePos == PlayePosition.e_Up)
            {
                this.m_imgLightUp.visible = true;
            }
            else if(gamePos == PlayePosition.e_Left)
            {
                this.m_imgLightLeft.visible = true;
            }
            else if(gamePos == PlayePosition.e_Right)
            {
                this.m_imgLightRight.visible = true;
            }
       }

        private fHideLight(){
            this.m_imgLightDown.visible = false;
            this.m_imgLightUp.visible = false;
            this.m_imgLightLeft.visible = false;
            this.m_imgLightRight.visible = false;
        }

      
    }
}