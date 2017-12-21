
/**
 * brief:   主场景
 * date:    2017-12-7
 * author:  徐为
 */
module game
{
    export class HandCardLayer extends Scene
    {


      //***********************************/
          private m_gopDown:eui.Group;
          private m_gopUp:eui.Group;
          private m_gopLeft:eui.Group;
          private m_gopRight:eui.Group;

          public m_oMainScene:MainScene;

          private m_aCardsLeft:eui.Image[] = [];
          private m_aCardsRight:eui.Image[] = [];
          private m_aCarsUp:eui.Image[] = [];
          private m_aCardsDown:eui.Image[] = [];
      //***********************************/

       
        public constructor()
        {
            super();
             
            this.skinName = "resource/mjSkins/layer/HandCardLayer.exml";
        }

       
        
        public fOnUICreate()
        {
            this.m_bCompOnUICreate = true;
            
        }

        public  fOnClick(button){
             console.info('card click');

             if(GameManager.fGetIns().m_pFirstPlayerPos != GameManager.fGetIns().m_nPlayerActionPos)
               return;
             var handCards = GameManager.fGetIns().m_aHandCardsDown;
             for(var i = 0; i < handCards.length; i++)
             {
                 if(handCards[i] == button)
                 {
                     if(handCards[i].y == -20)
                     {
                         var pack = <C2s_PlayHandAction>Packet.fCreateAction(Packet.s_PlayHand);
                         pack.m_nCardsGroupCount = 1;
                         pack.m_pBelongPlayer = GameManager.fGetIns().m_pFirstPlayerPos;
                         pack.m_pCurrentPlayer = GameManager.fGetIns().m_pFirstPlayerPos;
                         var gop = new CardGroup();
                         gop.m_oCardStatus = new CardStatus();
                         gop.m_pBelong =  GameManager.fGetIns().m_pFirstPlayerPos;
                         gop.m_nCardsCount = 1;
                         gop.fPushCard(handCards[i].m_oCardBase);
                         pack.m_aGroupCards.push(gop);
                         Main.fGetIns().m_oGameSocket.fSendPkt(pack);
                     }
                     else{
                         handCards[i].y = -20;
                     }

                 }
                 else if(handCards[i].y == -20)
                 {
                     handCards[i].y = 0;
                 }
             }

             if(button == GameManager.fGetIns().m_oTouchHandCard)
             {
                 if(GameManager.fGetIns().m_oTouchHandCard.y == -20)
                 {
                        var pack = <C2s_PlayHandAction>Packet.fCreateAction(Packet.s_PlayHand);
                         pack.m_nCardsGroupCount = 1;
                         pack.m_pBelongPlayer = GameManager.fGetIns().m_pFirstPlayerPos;
                         pack.m_pCurrentPlayer = GameManager.fGetIns().m_pFirstPlayerPos;
                         var gop = new CardGroup();
                         gop.m_oCardStatus = new CardStatus();
                         gop.m_pBelong =  GameManager.fGetIns().m_pFirstPlayerPos;
                         gop.m_nCardsCount = 1;
                         gop.fPushCard(GameManager.fGetIns().m_oTouchHandCard.m_oCardBase);
                         pack.m_aGroupCards.push(gop);
                         Main.fGetIns().m_oGameSocket.fSendPkt(pack);
                 }
                 else
                 {
                     GameManager.fGetIns().m_oTouchHandCard.y = -20
                 }
             }
        }


        public fAddHandCardDown(){
            this.m_gopDown.addChild(GameManager.fGetIns().m_oTouchHandCard);
            GameManager.fGetIns().m_oTouchHandCard.x = 78 *13 + 15;
            this.fSetClickButton(GameManager.fGetIns().m_oTouchHandCard);
              console.info('有人摸牌1');
        }

        public fReducCardDown(handCardDown:HandCardDown){
            var arrCards = GameManager.fGetIns().m_aHandCardsDown;
            if(GameManager.fGetIns().m_oTouchHandCard != null && handCardDown.m_oCardBase.fEqual(GameManager.fGetIns().m_oTouchHandCard.m_oCardBase, true) )
            {
                this.fSetTask(0);
               GameManager.fGetIns().m_oTouchHandCard.parent.removeChild(GameManager.fGetIns().m_oTouchHandCard);
               this.m_oMainScene.m_oDeskCardLayer.fAddCard (GameManager.fGetIns().m_oTouchHandCard.m_oCardBase, PlayePosition.e_Down);
            } 
            else
            {
                this.fSetTask(1);
                for(var i = 0; i < arrCards.length; i++)
                {
                  if(arrCards[i].m_oCardBase.fEqual(handCardDown.m_oCardBase, true)){
                      this.m_oMainScene.m_oDeskCardLayer.fAddCard(arrCards[i].m_oCardBase, PlayePosition.e_Down);
                      arrCards[i].parent.removeChild(arrCards[i]);
                      arrCards.splice(i , 1);
                     
                       var pos = Utils.fInsetCard(GameManager.fGetIns().m_oTouchHandCard, arrCards);
                       console.info("插入的位置为 + ", pos)

                       var tw = egret.Tween.get(GameManager.fGetIns().m_oTouchHandCard);
                       var twTime = Utils.fTByGSpeed(100 + pos * 78/100);
                       var waitTime = Utils.fTByGSpeed(1000);
                       var slef = this;
                       tw.wait(waitTime).to({x:pos * 78}, twTime).call(slef.fAddCurrentTask)

                       var cardCount = GameManager.fGetIns().m_nInitPlayerCardNum;
                       var twHand = egret.Tween.get(this);
                       twHand.wait(twTime + waitTime).call(function(){
                           for(var j = arrCards.length -1; j >= 0; j--){
                               arrCards[j].x = (cardCount - 1) * 78;
                               cardCount --;
                           }
                            
                       })
                       /*wait(2000).call(function(){
                           for(var j = arrCards.length - 1; j >= 0; j--)
                           {
                               arrCards[j].x = j * 78;
                           }
                       });*/
                  }
                }
            } 
        }

        public fReducCardDownByCardBase(cardBase:CardBase, addDesk:boolean = true){
            var arrCards = GameManager.fGetIns().m_aHandCardsDown;
            if(GameManager.fGetIns().m_oTouchHandCard != null && cardBase.fEqual(GameManager.fGetIns().m_oTouchHandCard.m_oCardBase, true) )
            {
               GameManager.fGetIns().m_oTouchHandCard.parent.removeChild(GameManager.fGetIns().m_oTouchHandCard);
            } 
            else
            {
                for(var i = 0; i < arrCards.length; i++)
                {
                  if(arrCards[i].m_oCardBase.fEqual(cardBase, true)){
                      arrCards[i].parent.removeChild(arrCards[i]);
                      if(addDesk==true)
                         this.m_oMainScene.m_oDeskCardLayer.fAddCard(arrCards[i].m_oCardBase, PlayePosition.e_Down);
                      arrCards.splice(i , 1);
                     
                     //  var pos = Utils.fInsetCard(GameManager.fGetIns().m_oTouchHandCard, arrCards);
                     
                     //  var tw = egret.Tween.get(GameManager.fGetIns().m_oTouchHandCard);
                     //  tw.wait(5000).to({x:pos * 78}, 400).wait(2000).call(function(){
                           var count = GameManager.fGetIns().m_nInitPlayerCardNum;
                           for(var j = arrCards.length - 1; j >= 0; j--)
                           {
                               arrCards[j].x = (count - 1) * 78;
                               -- count;
                           }
                      // });
                  }
                }
            } 
        }

        public fReduceOtherPeopleCard(pos:PlayePosition, cardBase:CardBase){
            this.fSetTask(0);
             console.info('有人出牌2');
            var deskPos = Utils.fDeskPosToGamePosFirst(pos);
              console.info('有人出牌2， 方向' + deskPos);
            var cardCount:number;
            var card:eui.Image;
              this.m_oMainScene.m_oDeskCardLayer.fAddCard(cardBase, deskPos);
            if(deskPos == PlayePosition.e_Left)
            {
               cardCount = this.m_aCardsLeft.length;
               var index = Utils.fGetRandomNum(0, cardCount - 1);
               for(var i = index + 1; i < this.m_aCardsLeft.length; i++)
               {
                   this.m_aCardsLeft[i].y = (i - 1) * 15;
               }
               this.m_gopLeft.removeChild(this.m_aCardsLeft[index]);
               this.m_aCardsLeft.splice(index, 1);
               
              
            }
            else if(deskPos == PlayePosition.e_Right)
            {
               cardCount = this.m_aCardsRight.length;
               var index = Utils.fGetRandomNum(0, cardCount - 1);
                for(var i = index + 1; i < this.m_aCardsRight.length; i++)
               {
                   this.m_aCardsRight[i].y = (i - 1) * 15;
               }
               this.m_gopRight.removeChild(this.m_aCardsRight[index])
               this.m_aCardsRight.splice(index, 1);
            }
            else if(deskPos == PlayePosition.e_Up)
            {
               cardCount = this.m_aCarsUp.length;
               var index = Utils.fGetRandomNum(0, cardCount - 1);
               for(var i = index + 1; i < this.m_aCarsUp.length; i++)
               {
                   this.m_aCarsUp[i].x = (i - 1) * 40;
               }
               this.m_gopUp.removeChildAt(index);
                this.m_aCarsUp.splice(index, 1);
            }
        }

        public fAddOtherPeopleCard(pos:PlayePosition)
        {
           
           this.fSetTask(1);

            var deskPos = Utils.fDeskPosToGamePosFirst(pos);
             
            var cardCount:number;
            var card:eui.Image;
            var i = 0; var index  = 0
            if(deskPos == PlayePosition.e_Left)
            {
               cardCount = this.m_aCardsLeft.length;//this.m_gopLeft.numChildren;
          
               for( i = index ; i < this.m_aCardsLeft.length; i++)
               {
                  
                   this.m_aCardsLeft[i].y = 15 * (i + 1);
               }
               card = new eui.Image("majiangzi_cemian2_png");
               this.m_gopLeft.addChildAt(card,index);
               
               this.m_aCardsLeft.splice(index, 0, card);

               var tw = egret.Tween.get(card);
               console.info("index=" + index);
               var self = this;
               tw.to({y : index * 15, x:4}, 300).call(self.fAddCurrentTask, self)

             
              
            }
            else if(deskPos == PlayePosition.e_Right)
            {
               cardCount = this.m_aCardsRight.length;
               // index = Utils.fGetRandomNum(0, cardCount);
                console.info('index= ', index)
                for( i = index ; i < this.m_aCardsRight.length; i++)
               {
                    
                    this.m_aCardsRight[i].y = 15 * (i + 1);
               }
               card = new eui.Image("majiangzi_cemian1_png");
               this.m_gopRight.addChildAt(card,index);
               this.m_aCardsRight.splice(index, 0, card);
                 //setTimeout(function(){  card.y = index * 15;card.x = 4;console.info('right')}, 100)
              var tw = egret.Tween.get(card);
              var self = this;
              tw.to({y : index * 15}, 300).call(self.fAddCurrentTask, self)
               
            }
            else if(deskPos == PlayePosition.e_Up)
            {
               cardCount = this.m_aCarsUp.length;
             //   index = Utils.fGetRandomNum(0, cardCount);
                console.info('index= ', index)
                for( i = index ; i < this.m_aCarsUp.length; i++)
               {
                  
                    this.m_aCarsUp[i].x = 40 * (i + 1);
                   
               }
               card = new eui.Image("handcardUp_png");
               this.m_gopUp.addChildAt(card,index);
               this.m_aCarsUp.splice(index, 0, card);
               // setTimeout(function(){  card.x = index * 40; card.y = 5;console.info('up')}, 100)
                 var tw = egret.Tween.get(card);
                 var self = this
                tw.to({x : index * 15}, 300).call(self.fAddCurrentTask, self)
              //  card.x = index * 40;
               
            }
        }

        public fInitHandCard(){
            this.fInitHandCardDown();
            this.fInitHandCardLeft();
            this.fInitHandCardRight();
            this.fInitHandCardUp();

            this.fAddTaskByNum(GameManager.fGetIns().m_nInitPlayerCardNum * 3);
            this.fAddTaskByNum( GameManager.fGetIns().m_aHandCardsDown.length);
        }

        private fInitHandCardDown(){
            var cards = GameManager.fGetIns().m_aHandCardsDown;
           var self = this;
            for(var i = 0; i < cards.length; i++ )
            {
                this.m_gopDown.addChildAt(cards[i], 0);
                this.fSetClickButton(cards[i]);
                var tw = egret.Tween.get(cards[i]);
                tw.to({x:i * 78},  Utils.fTByGSpeed(200 + i * 30)).call(self.fAddCurrentTask, self);;
            }
        }

        private fInitHandCardUp(){
              var self = this;
            for(var i = 0; i < GameManager.fGetIns().m_nInitPlayerCardNum; i++)
            {
                var card = new eui.Image("handcardUp_png");
                this.m_gopUp.addChild(card);
                this.m_aCarsUp.push(card);
                var tw = egret.Tween.get(card);
                tw.to({x:i * 40}, Utils.fTByGSpeed(100 + i * 30)).call(self.fAddCurrentTask, self);;
            }
        }

        private fInitHandCardLeft(){
              var self = this;
            for(var i = 0; i < GameManager.fGetIns().m_nInitPlayerCardNum; i++)
            {
                var card = new eui.Image("majiangzi_cemian2_png");
                this.m_gopLeft.addChild(card);
                this.m_aCardsLeft.push(card)
                var tw = egret.Tween.get(card);
                tw.to({y:i * 15}, 80 + i * 30).call(self.fAddCurrentTask, self);
            }
        }

        private fInitHandCardRight(){
             var self = this;
            for(var i = 0; i < GameManager.fGetIns().m_nInitPlayerCardNum; i++)
            {
                var card = new eui.Image("majiangzi_cemian1_png");
                this.m_gopRight.addChild(card);
                this.m_aCardsRight.push(card);
                var tw = egret.Tween.get(card);
                tw.to({y:i * 15}, 80 + i * 30).call(self.fAddCurrentTask, self);;
            }
        }

      
    }
}