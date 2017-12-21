
/**
 * brief:   主场景
 * date:    2017-12-7
 * author:  徐为
 */
module game
{
    export class PhotoLayer extends Scene
    {


      //***********************************/
       private m_btnReady:game.Button;
       private m_oPhotoUp:Photo;
       private m_oPhotoDown:Photo;
       private m_oPhotoLeft:Photo;
       private m_oPhotoRight:Photo;

       private m_imgReadyUp:eui.Image;
       private m_imgReadyDown:eui.Image;
       private m_imgReadyLeft:eui.Image;
       private m_imgReadyRight:eui.Image;

       private m_gopUp:eui.Group;
       private m_gopDown:eui.Group;
       private m_gopLeft:eui.Group;
       private m_gopRight:eui.Group;
      //***********************************/

       
        public constructor()
        {
            super();
             
            this.skinName = "resource/mjSkins/layer/PhotoLayer.exml";
          
        }


       
       
        private fHideAllPhoto(){
              this.m_oPhotoDown.fVisibleJoinGroup(false);
              this.m_oPhotoUp.fVisibleJoinGroup(false);
              this.m_oPhotoLeft.fVisibleJoinGroup(false);
              this.m_oPhotoRight.fVisibleJoinGroup(false);
        }

        private fHideAllReady(){
            this.m_imgReadyDown.visible = false;
            this.m_imgReadyUp.visible = false;
            this.m_imgReadyRight.visible = false;
            this.m_imgReadyLeft.visible = false;
        }
       
        public fOnUICreate()
        {
            this.m_bCompOnUICreate = true;
           this.fSetClickButton(this.m_btnReady);
           this.fHideAllPhoto();
           this.fHideAllReady();
           if(GameManager.fGetIns().fIsCreateGame())
           {
               this.m_oPhotoDown.fVisibleJoinGroup(true);
               this.m_oPhotoDown.m_labName.text = GameManager.fGetIns().m_sFirstPlayerUid;
               this.m_imgReadyDown.visible = false;
               this.m_oPhotoDown.fVisibleOwner(true);
           }

           
         
        }

        public fResetPhoto(){
            var playesInfo = GameManager.fGetIns().fGetPlayerInfo();
            if(playesInfo.length > 4)
            {
                console.error("fResetPhoto playesInfo.length > 4");
                return ;
            }

           this.fHideAllPhoto();
           this.fHideAllReady();
           if(GameManager.fGetIns().fIsCreateGame())
           {
               this.m_oPhotoDown.fVisibleJoinGroup(true);
               this.m_oPhotoDown.m_labName.text = GameManager.fGetIns().m_sFirstPlayerUid;
           }

           for(var i = 0; i < playesInfo.length; i++)
           {
               if(playesInfo[i] == undefined)
                 continue;
              var gamePos = Utils.fDeskPosToGamePosFirst(playesInfo[i].m_pDeskPos);
              var gop = <eui.Group>this.getChildByName("m_gop" + gamePos);
              var photo = <Photo>gop.getChildByName("m_oPhoto" + gamePos);
              photo.visible = true;
              photo.fVisibleJoinGroup(true);
              photo.m_labName.text = playesInfo[i].m_sUid;
              var readyImg = <eui.Image>gop.getChildByName("m_imgReady" + gamePos);
              this.fSetReadyStatus(playesInfo[i].m_nStatus, readyImg);

              if(GameManager.fGetIns().m_pCreatorPos == playesInfo[i].m_pDeskPos)
              {
                  photo.fVisibleOwner(true);
              }
              else
              {
                    photo.fVisibleOwner(false);
              }
           }

        }

        private fSetReadyStatus(ready:number, image:eui.Image){
            if(ready == 1)
              image.visible = true;
            else
              image.visible = false;
        }
        
        public fOnClick(button)
        {
            if(button == this.m_btnReady)
            {
                var pack = <S2C_ReadyActive>Packet.fCreateAction(Packet.s_PlayerReady);
                pack.m_nReadyNum = 1;
                pack.m_aReadyPos.push(GameManager.fGetIns().m_pFirstPlayerPos);
                pack.fGetHead().m_nErrcode = 1;
                Main.fGetIns().m_oGameSocket.fSendPkt(pack);
                this.m_btnReady.parent.removeChild(this.m_btnReady);
                this.m_btnReady = null;
            }
        }

        public fBeginGame(){
             this.fSetTask(4);
             this.fHideAllReady();

             var twDown = egret.Tween.get(this.m_gopDown);
             twDown.to({x:4, y:376}, 300).call(this.fAddCurrentTask, this);

              var twLeft = egret.Tween.get(this.m_gopLeft);
             twLeft.to({x:4, y:100}, 300).call(this.fAddCurrentTask, this);

              var twUp = egret.Tween.get(this.m_gopUp);
             twUp.to({x:370, y:0}, 300).call(this.fAddCurrentTask, this);

              var twRight = egret.Tween.get(this.m_gopRight);
              twRight.to({x:1136, y:116}, 300).call(this.fAddCurrentTask, this);
        }

      
    }
}