
/**
 * brief:   主场景
 * date:    2017-12-7
 * author:  徐为
 */
module game
{
   


     export class ActionLayer extends Scene
    {


      //***********************************/
        private m_btnChi:game.Button;
        private m_btnGang:game.Button;
        private m_btnPeng:game.Button;
        private m_btnHu:game.Button;
        private m_btnCancel:game.Button;
        private m_btnBack:eui.Button;
        private m_btnTing:game.Button;

        public m_oMainScene:MainScene;

        private m_nType:number;    //活动类型 按照位判断 吃，碰，杠，听，胡

        private m_aCardGroup:CardGroup[] = [];
        private m_aAddCardGroup:CardGroup[] = [];

        private m_gopCards:eui.Group;

        private m_nChoiceIndex:number;   //选择执行的index

        private m_aPacket:C2s_ActionBase[] = [];

        private m_nActCount:number = 0;

        private m_gopAct:eui.Group;
      //***********************************/

       
        public constructor(type:number,pak:C2s_ActionBase)
        {
            super();
            this.m_aPacket.push(pak)
            this.m_aCardGroup = pak.fGetCards();
            this.m_nType = type;

         //   if(Utils.fGetValueByBit(0, this.m_nType) )
           //   this.m_aPacket[0] = new C2s_EatAction;
          //  else if(Utils.fGetValueByBit(1, this.m_nType))
             // this.m_aPacket[0] = new C2s_PengAction;
           // else if(Utils.fGetValueByBit(2, this.m_nType))
             // this.m_aPacket[0] = new C2s_GangAction;
             
            this.skinName = "resource/mjSkins/layer/ActionLayer.exml";
         
        }

         public fAddAction(type:number, pak:C2s_ActionBase):boolean
         {
           
             if(this.m_nActCount >= 2)
               return false;
            if(Utils.fGetValueByBit( type, this.m_nType))
             return false;
             type = Math.pow(2, type);
           this.m_nType += type;
           this.m_aPacket.push(pak)
            //  if(Utils.fGetValueByBit(0, type) )
           //   this.m_aPacket[1] = new C2s_EatAction;
           // else if(Utils.fGetValueByBit(1, type))
            //  this.m_aPacket[1] = new C2s_PengAction;
            // if(Utils.fGetValueByBit(2, type))
           //   this.m_aPacket[1] = new C2s_GangAction;

            var value = Math.pow(2, type);

            this.fHide();
            this.m_nActCount ++ ;
            this.fShowAct(this.m_nType);

            this.m_aAddCardGroup =  pak.fGetCards();
            return true;
        }
        
        private fHide(){
            this.m_btnHu.visible = false;
            this.m_btnChi.visible = false;
            this.m_btnGang.visible = false;
            this.m_btnPeng.visible = false;
            this.m_btnTing.visible = false;
        }

       
       private fCancel(){
           for(var i = 0; i < this.m_aPacket.length; i++)
           {
                this.m_aPacket[i].m_pBelongPlayer = GameManager.fGetIns().m_pFirstPlayerPos;
                this.m_aPacket[i].m_pCurrentPlayer =   this.m_aPacket[i].m_pBelongPlayer ;
                this.m_aPacket[i].m_aGroupCards = this.m_aCardGroup;
                this.m_aPacket[i].m_nCardsGroupCount = this.m_aCardGroup.length;
                this.m_aPacket[i].fGetHead().m_nErrcode = 102;
                Main.fGetIns().m_oGameSocket.fSendPkt(this.m_aPacket[i]);

                  if(  GameManager.fGetIns().m_aPackets.length > 1)
                    GameManager.fGetIns().m_aPackets.splice(0, 1)
           }

          this.parent.removeChild(this);
          this.m_oMainScene.m_oActionLayer = null;
       }

       private fFindGroupByIndex(index):CardGroup[]{
           this.m_nChoiceIndex = 1;
           if(index == 0)
           {
              if(this.m_aCardGroup[0].m_oCardStatus.m_nStatusType == CardStatus.s_Status_Eat)
              {
                    this.m_nChoiceIndex = 0;
                    return this.m_aCardGroup;
              }
              else
                 return this.m_aAddCardGroup;
           } 
           else if(index == 1)
           {
              if(this.m_aCardGroup[0].m_oCardStatus.m_nStatusType == CardStatus.s_Status_Peng)
              {
                    this.m_nChoiceIndex = 0;
                    return this.m_aCardGroup;
              }
              else
                 return this.m_aAddCardGroup;
           } 
           else if(index == 2)
           {
              if(this.m_aCardGroup[0].m_oCardStatus.m_nStatusType == CardStatus.s_Status_Gang)
              {
                  this.m_nChoiceIndex = 0;
                  return this.m_aCardGroup;
              }
                 
              else
                 return this.m_aAddCardGroup;
           } 
             else if(index == 4)
           {
              if(this.m_aCardGroup[0].m_oCardStatus.m_nStatusType == CardStatus.s_Status_Gang)
              {
                  this.m_nChoiceIndex = 0;
                  return this.m_aCardGroup;
              }
                 
              else
                 return this.m_aAddCardGroup;
           }   
       }

       private fFindCardsByIndex(index):C2s_ActionBase{
           if(index == 0)
           {
              if(this.m_aCardGroup[0].m_oCardStatus.m_nStatusType == CardStatus.s_Status_Eat)
                 return this.m_aPacket[0];
              else
                 return this.m_aPacket[1];
           } 
           else if(index == 1)
           {
              if(this.m_aCardGroup[0].m_oCardStatus.m_nStatusType == CardStatus.s_Status_Peng)
                 return this.m_aPacket[0];
              else
                 return this.m_aPacket[1];
           } 
           else if(index == 2)
           {
              if(this.m_aCardGroup[0].m_oCardStatus.m_nStatusType == CardStatus.s_Status_Gang)
                 return this.m_aPacket[0];
              else
                 return this.m_aPacket[1];
           }  
           else if(index == 4)
           {
              if(this.m_aCardGroup[0].m_oCardStatus.m_nStatusType == CardStatus.s_Status_Hu)
                 return this.m_aPacket[0];
              else
                 return this.m_aPacket[1];
           }  
       }

       private fClickAct(button){
           if(this.m_aPacket.length == 1)
           {

                if(this.m_aPacket[0].m_aGroupCards.length > 2)
                {
                  this.fHide();
                  this.m_gopCards.visible = true;
                  this.fSetClickButton(this.m_btnBack);
                  for(var i = 0; i < this.m_aCardGroup.length - 1; i++)
                  {
                        var euigop = new eui.Group();
                        var cards = this.m_aCardGroup[i].fGetCard()
                        for(var j = 0; j < cards.length; j++)
                        {
                            console.info("card" + cards[j].m_sName)
                           var handCard = new HandCardDown(cards[j]);
                           euigop.addChild(handCard);
                           euigop.width += 80
                           handCard.x = -j * 80;
                        }

                        var otherCard = new HandCardDown(this.m_aCardGroup[this.m_aCardGroup.length - 1].fGetCard()[0]);
                        handCard.x = -j * 80;
                        euigop.addChild(otherCard);
                        euigop.width += 80

                        this.m_gopCards.addChild(euigop);
                        euigop.x = -i*euigop.width - (i *30) - 40;
                        euigop.name = '' + i;
                        this.fSetClickButton(euigop);
                      }
                 }
                 else{
                         this.m_aPacket[0].m_pBelongPlayer = GameManager.fGetIns().m_pFirstPlayerPos;
                         this.m_aPacket[0].m_pCurrentPlayer =   this.m_aPacket[0].m_pBelongPlayer ;
                         this.m_aPacket[0].m_aGroupCards = this.m_aCardGroup;
                         this.m_aPacket[0].m_nCardsGroupCount = this.m_aCardGroup.length;
                         this.m_aPacket[0].fGetHead().m_nErrcode = 101;
                          Main.fGetIns().m_oGameSocket.fSendPkt( this.m_aPacket[0]);
                 }
                
           }
           else{
               this.m_nChoiceIndex = 1;
               if(button == this.m_btnChi)
               {
                  if(this.m_aPacket[0].m_aGroupCards[0].m_oCardStatus.m_nStatusType == CardStatus.s_Status_Eat){
                      this.m_nChoiceIndex = 0
                  }
               }
               else if(button == this.m_btnGang)
               {
                   if(this.m_aPacket[0].m_aGroupCards[0].m_oCardStatus.m_nStatusType == CardStatus.s_Status_Gang){
                      this.m_nChoiceIndex = 0
                  }
               }
               else if(button == this.m_btnPeng)
               {
                    if(this.m_aPacket[0].m_aGroupCards[0].m_oCardStatus.m_nStatusType == CardStatus.s_Status_Peng){
                      this.m_nChoiceIndex = 0
                  }
               }
                else if(button == this.m_btnHu)
               {
                    if(this.m_aPacket[0].m_aGroupCards[0].m_oCardStatus.m_nStatusType == CardStatus.s_Status_Hu){
                      this.m_nChoiceIndex = 0
                  }
               }
                if(this.m_aPacket[this.m_nChoiceIndex].m_aGroupCards.length > 2){
                       this.fHide();
                  this.m_gopCards.visible = true;
                  this.fSetClickButton(this.m_btnBack);
                  for(var i = 0; i < this.m_aAddCardGroup.length - 1; i++)
                  {
                        var euigop = new eui.Group();
                        var cards = this.m_aAddCardGroup[i].fGetCard()
                        for(var j = 0; j < cards.length; j++)
                        {
                            console.info("card" + cards[j].m_sName)
                           var handCard = new HandCardDown(cards[j]);
                           euigop.addChild(handCard);
                           euigop.width += 80
                           handCard.x = -j * 80;
                        }

                        var otherCard = new HandCardDown(this.m_aAddCardGroup[this.m_aAddCardGroup.length - 1].fGetCard()[0]);
                        handCard.x = -j * 80;
                        euigop.addChild(otherCard);
                        euigop.width += 80

                        this.m_gopCards.addChild(euigop);
                        euigop.x = -i*euigop.width - (i *30) - 40;
                        euigop.name = '' + i;
                        this.fSetClickButton(euigop);
                      }
                }
                else{
                     this.m_aPacket[ this.m_nChoiceIndex].m_pBelongPlayer = GameManager.fGetIns().m_pFirstPlayerPos;
                 this.m_aPacket[ this.m_nChoiceIndex].m_pCurrentPlayer =   this.m_aPacket[ this.m_nChoiceIndex].m_pBelongPlayer ;
                 this.m_aPacket[ this.m_nChoiceIndex].m_aGroupCards = this.m_aCardGroup;
                 this.m_aPacket[ this.m_nChoiceIndex].m_nCardsGroupCount = this.m_aCardGroup.length;
                 this.m_aPacket[ this.m_nChoiceIndex].fGetHead().m_nErrcode = 101;
                 Main.fGetIns().m_oGameSocket.fSendPkt( this.m_aPacket[ this.m_nChoiceIndex]);

                 this.m_aPacket[ 1- this.m_nChoiceIndex].m_pBelongPlayer = GameManager.fGetIns().m_pFirstPlayerPos;
                 this.m_aPacket[1-  this.m_nChoiceIndex].m_pCurrentPlayer =   this.m_aPacket[ 1-this.m_nChoiceIndex].m_pBelongPlayer ;
                 this.m_aPacket[1- this.m_nChoiceIndex].m_aGroupCards = this.m_aCardGroup;
                 this.m_aPacket[1- this.m_nChoiceIndex].m_nCardsGroupCount = this.m_aCardGroup.length;
                 this.m_aPacket[ 1-this.m_nChoiceIndex].fGetHead().m_nErrcode = 102;
               //  Main.fGetIns().m_oGameSocket.fSendPkt( this.m_aPacket[ 1-this.m_nChoiceIndex]);

                }
               
           }
       }
      

        public fOnClick(button)
        {
            var gop:CardGroup[] = [];
            var act:C2s_ActionBase;
           if(button == this.m_btnCancel)  //取消
           {
               this.fCancel();
           }
            else if(button == this.m_btnBack)
            {
                this.m_gopCards.visible = false;
                this.fShowAct(this.m_nType);
            }
            else if(button == this.m_btnChi || button == this.m_btnPeng || button == this.m_btnGang){
               this.fClickAct(button);
            }
            else {
                var name = button.name;
                
                this.m_aPacket[this.m_nChoiceIndex].m_pBelongPlayer = GameManager.fGetIns().m_pFirstPlayerPos;
                this.m_aPacket[this.m_nChoiceIndex].m_pCurrentPlayer =    this.m_aPacket[this.m_nChoiceIndex].m_pBelongPlayer ;
                this.m_aPacket[this.m_nChoiceIndex].m_aGroupCards.push(this.m_aCardGroup[parseInt(name)]);
                this.m_aPacket[this.m_nChoiceIndex].m_aGroupCards.push(this.m_aCardGroup[this.m_aCardGroup.length - 1]);
                this.m_aPacket[this.m_nChoiceIndex].m_nCardsGroupCount = 2;
                this.m_aPacket[this.m_nChoiceIndex].fGetHead().m_nErrcode = 101;
                Main.fGetIns().m_oGameSocket.fSendPkt( this.m_aPacket[this.m_nChoiceIndex]);
                if(  GameManager.fGetIns().m_aPackets.length > 1)
                    GameManager.fGetIns().m_aPackets.splice(0, 1)

                this.m_nChoiceIndex = 1 - this.m_nChoiceIndex;
                  this.m_aPacket[this.m_nChoiceIndex].m_pBelongPlayer = GameManager.fGetIns().m_pFirstPlayerPos;
                this.m_aPacket[this.m_nChoiceIndex].m_pCurrentPlayer =    this.m_aPacket[this.m_nChoiceIndex].m_pBelongPlayer ;
                this.m_aPacket[this.m_nChoiceIndex].m_aGroupCards.push(this.m_aCardGroup[parseInt(name)]);
                this.m_aPacket[this.m_nChoiceIndex].m_aGroupCards.push(this.m_aCardGroup[this.m_aCardGroup.length - 1]);
                this.m_aPacket[this.m_nChoiceIndex].m_nCardsGroupCount = 2;
                this.m_aPacket[this.m_nChoiceIndex].fGetHead().m_nErrcode = 102;
                Main.fGetIns().m_oGameSocket.fSendPkt( this.m_aPacket[this.m_nChoiceIndex]);
                if(  GameManager.fGetIns().m_aPackets.length > 1)
                    GameManager.fGetIns().m_aPackets.splice(0, 1)
                
            }

        
           
          
         
        }


        private fShowAct(type:number){
            if(Utils.fGetValueByBit(0, this.m_nType))
            {
               this.m_btnChi.visible = true;
               this.fSetClickButton(this.m_btnChi);
             //  this.m_btnChi.x =  -138;
             //  this.m_btnCancel.x -= 80;
            }
           
            if(Utils.fGetValueByBit(1, this.m_nType) )
            {
                this.m_btnPeng.visible = true;
                this.fSetClickButton(this.m_btnPeng);
              //  this.m_btnPeng.x = (this.m_nActCount + 1) * -138;
              //  this.m_btnCancel.x -= 80;
            }

            if(Utils.fGetValueByBit(2, this.m_nType))
            {
                this.m_btnGang.visible = true;
                this.fSetClickButton(this.m_btnGang);
               // this.m_btnGang.x = (this.m_nActCount + 1) * -138;
            }
           
            if(Utils.fGetValueByBit(3, this.m_nType))
            {
                this.m_btnTing.visible = true;
                this.fSetClickButton(this.m_btnTing);
               // this.m_btnTing.x = (this.m_nActCount + 1) * -138;
            }

             if(Utils.fGetValueByBit(4, this.m_nType))
            {
                this.m_btnHu.visible = true;
                this.fSetClickButton(this.m_btnHu);
               // this.m_btnHu.x = (this.m_nActCount + 1) * -138;
            }

            var index =0;

            for(var i =0; i <= 4; i++)
            {
                var btn = this.m_gopAct.getChildByName('m_btn' + i);
                if(btn.visible == true)
                {
                  btn.x = -index * 138;
                }

                ++ index;
            }


        }
       
        public fOnUICreate()
        {
          
            this.m_gopCards.visible = false;
            this.fHide();
            this.fSetClickButton(this.m_btnCancel);
            this.fShowAct(this.m_nType);

            this.m_nActCount ++ ;
           
        }

    

      
    }
}