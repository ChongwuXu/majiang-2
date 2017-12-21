
/**
 * brief:   
 * date:    2017-12-7
 * author:  徐为
 */
module game
{
    export class YaoQingLayer extends Scene
    {


      //***********************************/
          private m_gopNotOwner:eui.Group;
          private m_gopOwner:eui.Group;

          private m_btnYaoQingNot:game.Button;
          private m_btnFuZhiNot:game.Button;
          private m_btnLevalNot:game.Button;

          private m_btnJieSan:game.Button;
          private m_btnYaoQing:game.Button;
          private m_btnLeval:game.Button;
          private m_btnFuZhi:game.Button;

       
      //***********************************/

       
        public constructor()
        {
            super();
             
            this.skinName = "resource/mjSkins/layer/YaoQingLayer.exml";
    
        }


        
      
        public fSceneResGroup():string
        {
           return "";
        }
        
       
        public fOnUICreate()
        {
            this.m_bCompOnUICreate = true;
            this.touchEnabled = false;
            this.m_gopNotOwner.touchEnabled = false;
            this.m_gopOwner.touchEnabled = false;
            if(!GameManager.fGetIns().fIsCreateGame())
               this.m_gopOwner.parent.removeChild( this.m_gopOwner);
            else
               this.m_gopNotOwner.parent.removeChild( this.m_gopNotOwner);
            
            this.fSetClickButton(this.m_btnJieSan);
            this.fSetClickButton(this.m_btnLeval);
            this.fSetClickButton(this.m_btnLevalNot);
  
        }
        
        public fOnClick(button)
        {
            if(this.m_btnJieSan==button || this.m_btnLeval==button || this.m_btnLevalNot==button){
                GameScenenManager.fGetIns().fEnterScene(GameSceneName.HALL);
                }
            }
            //
        }

      
    }
