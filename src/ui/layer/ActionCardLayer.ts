
/**
 * brief:   主场景
 * date:    2017-12-7
 * author:  徐为
 */
module game
{
    export class ActionCardLayer extends Scene
    {


      //***********************************/
          private m_gopDown:eui.Group;
          private m_gopUp:eui.Group;
          private m_gopLeft:eui.Group;
          private m_gopRight:eui.Group;

          public m_oMainScene:MainScene;

          public m_aActionCardDown:DeskCardDown[] = [];
          public m_aActionCardLeft:DeskCardLeft[] = [];
          public m_aActionCardRight:DeskCardRight[] = [];
          public m_aActionCardUp:DeskCardUp[] = [];
      //***********************************/

       
        public constructor()
        {
            super();
             
            this.skinName = "resource/mjSkins/layer/ActionCardLayer.exml";

          
        }

       
        
        public fOnUICreate()
        {
           
             this.m_bCompOnUICreate = true;
        }

        public  fOnClick(button){

        }


        public fAddCard(arrCardBase:CardBase[], pos:PlayePosition)
        {
            var gamePos = Utils.fDeskPosToGamePosFirst(pos);
            var i = 0;
            var dis = 0;
            if(gamePos == PlayePosition.e_Left)
            {
                
                if(this.m_aActionCardLeft.length > 0)
                  dis = this.m_aActionCardLeft[this.m_aActionCardLeft.length - 1].y;
                for(i = 0; i < arrCardBase.length; i++){
                    var left = new DeskCardLeft(arrCardBase[i]);
                    this.m_aActionCardLeft.push(left);
                    left.y = dis + 10 + 20 * i;
                    left.scaleX = 0.5;
                      left.scaleY = 0.5;
                    this.m_gopLeft.addChild(left);
                } 
            }
            else if(gamePos == PlayePosition.e_Right)
            {
              
                if(this.m_aActionCardRight.length > 0)
                  dis = this.m_aActionCardRight[this.m_aActionCardRight.length - 1].y;
                for(i = 0; i < arrCardBase.length; i++){
                    var right = new DeskCardRight(arrCardBase[i]);
                    this.m_aActionCardRight.push(right);
                    right.y = dis - 10 - 20 * i;
                       right.scaleX = 0.5;
                      right.scaleY = 0.5;
                    this.m_gopRight.addChild(right);
                } 
            }
             else if(gamePos == PlayePosition.e_Down)
            {
              
                if(this.m_aActionCardDown.length > 0)
                  dis = this.m_aActionCardDown[this.m_aActionCardDown.length - 1].y;
                  for(i = 0; i < arrCardBase.length; i++){
                    var right = new DeskCardDown(arrCardBase[i]);
                    this.m_aActionCardDown.push(right);
                    right.x = dis + 10 + 20 * i;

                     right.scaleX = 0.5;
                      right.scaleY = 0.5;
                    this.m_gopDown.addChild(right);
                 } 
            }
             else if(gamePos == PlayePosition.e_Up)
            {
              
                if(this.m_aActionCardUp.length > 0)
                  dis = this.m_aActionCardUp[this.m_aActionCardUp.length - 1].y;
                  for(i = 0; i < arrCardBase.length; i++){
                    var right = new DeskCardUp(arrCardBase[i]);
                    this.m_aActionCardUp.push(right);
                    right.x = dis + 10 + 20 * i;
                      right.scaleX = 0.5;
                      right.scaleY = 0.5;
                    this.m_gopUp.addChild(right);
                 } 
            }
        }
      
    }
}