
/**
 * brief:   主场景
 * date:    2017-12-7
 * author:  徐为
 */
module game
{
    export class DeskCardLayer extends Scene
    {


      //***********************************/
       private m_gopLeft:eui.Group;
       private m_gopRight:eui.Group;
       private m_gopUp:eui.Group;
       private m_gopDown:eui.Group;

       private m_aDeskCardsUp:DeskCardUp[] = [];
       private m_aDeskCardsDown:DeskCardUp[] = [];
       private m_aDeskCardsLeft:DeskCardUp[] = [];
       private m_aDeskCardsRight:DeskCardUp[] = [];

      

       public m_oMainScene:MainScene;

       private m_oDirection:Direction;
      //***********************************/

       
        public constructor()
        {
            super();
             
            this.skinName = "resource/mjSkins/layer/DeskCardLayer.exml";

          
        }

       
        public fOnUICreate()
        {
            this.m_oDirection.visible = false;
             this.m_bCompOnUICreate = true;
        }

        public fShowDir(){
            this.m_oDirection.visible = true;
            this.m_oDirection.fInitDir();
            
            this.m_bFinishCurrentPacket = true;
        }

        public fResetDir(deskPos:PlayePosition){
            console.info("重设方向了，方向为" + deskPos);
            this.m_oDirection.fResetDir(deskPos);
        }

        public fAddCard(cardBase:CardBase, pos)
        {
            var deskCard = new DeskCardDown(cardBase);
            console.info("添加桌牌" + cardBase.m_sName);
            if(pos == PlayePosition.e_Down)
            {
              // deskCard = new DeskCardDown(cardBase);
               this.m_aDeskCardsDown.push(deskCard);
               this.m_gopDown.addChild(deskCard);
               deskCard.x = 290;
               deskCard.y = 60;
               deskCard.scaleX = deskCard.scaleY = 2;
               egret.Tween.get(deskCard).wait(400)
                    .to({x:this.m_aDeskCardsDown.length % 6 * 30,
                    y:Math.ceil(this.m_aDeskCardsDown.length/6) * 30,
                    scaleX:1,scaleY:1},100)
            }
            else if(pos == PlayePosition.e_Up)
            {
             //  deskCard = new DeskCardUp(cardBase);
               this.m_aDeskCardsUp.push(deskCard);
               this.m_gopUp.addChild(deskCard);
               deskCard.x = this.m_aDeskCardsUp.length % 6 * 30;
               deskCard.y = Math.ceil(this.m_aDeskCardsUp.length/6) * 30;
            }
            else if(pos == PlayePosition.e_Left)
            {
              // deskCard = new DeskCardLeft(cardBase);
               this.m_aDeskCardsLeft.push(deskCard);
               this.m_gopLeft.addChild(deskCard);
               deskCard.x = this.m_aDeskCardsLeft.length % 6 * 30;
               deskCard.y = Math.ceil(this.m_aDeskCardsLeft.length/6) * 30;
            }
            else if(pos == PlayePosition.e_Right)
            {
             //  deskCard = new DeskCardRight(cardBase);
               this.m_aDeskCardsRight.push(deskCard);
               this.m_gopRight.addChild(deskCard);
               deskCard.x = this.m_aDeskCardsRight.length % 6 * 30;
               deskCard.y = -Math.ceil(this.m_aDeskCardsRight.length/6) * 30;
            }
        }

      
    }
}