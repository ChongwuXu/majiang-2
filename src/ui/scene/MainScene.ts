
/**
 * brief:   主场景
 * date:    2017-12-7
 * author:  徐为
 */
module game
{
    export class MainScene extends Scene
    {


      //***********************************/
         private m_oPhotoLayer:PhotoLayer;
         private m_oYaoQingLayer:YaoQingLayer;
         public m_oHandCardLayer:HandCardLayer;
         public m_oDeskCardLayer:DeskCardLayer = null;
         public m_oActionLayer:ActionLayer;
         public m_oActionCardLayer:ActionCardLayer;

         private m_labRoomId:eui.Label;

         private m_btnBegin:game.Button;

         private m_bAllCompOnUICreate:boolean = false;   //所有层fOnUICreate渲染成功

         private m_aAllLayer:Scene[] = []


         public m_bFinishCurrentPacket:boolean = true;   //当前数据包是否完成
      //***********************************/

       
        public constructor()
        {
            super();
           
            this.fListenRoomInfo();
            this.fListenBeginGame();
            this.fListenTouchCard();
            this.fLisatenChuPai();
            this.fListenPeng();
            this.fListenGang();
            this.fListenEat();
            this.fListenTing();
            this.fListenHu();
             this.m_oHandle.fReceiveMessage(this, function(act:MessageEvent){}, )

            this.skinName = "resource/mjSkins/scene/GameMainScene.exml";
         
          
        }

         public fListenGang(){
               
               this.m_oHandle.fReceiveMessage(this, function(act:MessageEvent){
                   
                    var pak:C2s_EatAction = act.m_oDisObj;
                    var self = this;
                    self.m_oDeskCardLayer.fResetDir(pak.fGetCurrPlayrPos());   //调整
                   if(pak.fGetBelongPlayerPos() == pak.fGetCurrPlayrPos())
                   {
                 
                   if(pak.fGetHead().m_nErrcode == 100)
                   {
                       if(self.m_oActionLayer != null)
                       {
                           GameManager.fGetIns().m_aPackets.push(pak)
                           setTimeout(function(){   self.m_oActionLayer.fAddAction(2, pak)}, 300);
                           return;
                       }
                       else
                       {
                            self.m_oActionLayer  = new ActionLayer(4, pak);
                            self.m_oActionLayer.m_oMainScene = self;
                            self.addChild( self.m_oActionLayer);
                       }
                    
                   }
                   else if(pak.fGetHead().m_nErrcode == 101)
                   {
                        if(self.m_oActionLayer == null)
                          return;
                      self.m_oActionLayer.parent.removeChild(self.m_oActionLayer);
                       self.m_oActionLayer = null;
                      var cards = pak.m_aGroupCards[0].fGetCard();
                      for(var i = 0; i < cards.length; i++)
                      {
                          //if(cards[i].m_pBelong == GameManager.fGetIns().m_pFirstPlayerPos)
                          {
                              self.m_oHandCardLayer.fReducCardDownByCardBase(cards[i], false)
                          }
                      }
                        self.m_oActionCardLayer.fAddCard(cards, GameManager.fGetIns().m_pFirstPlayerPos);
                   }
                   
                   
                    //self.fRestGo(pak.fGetCurrPlayrPos());
                  //  console.info("gang行动1")
                  
               }
                else
               {
                    if(pak.fGetHead().m_nErrcode == 101){
                         var cards = pak.m_aGroupCards[0].fGetCard();
                         cards.push(pak.m_aGroupCards[1].fGetCard()[0])
                     self.m_oActionCardLayer.fAddCard(cards, pak.fGetCurrPlayrPos());
                    }
                   
                 //    self.fRestGo(pak.fGetCurrPlayrPos());
                      // console.info("吃行动weizhi" + pak.fGetBelongPlayerPos());
                       // console.info("吃行动weizhi" + pak.fGetCurrPlayrPos());
               }
               
          }, C2s_ActionBase.s_Gang);
        }

           public fListenPeng(){
               
               this.m_oHandle.fReceiveMessage(this, function(act:MessageEvent){
               //    console.info("peng行动")
                          var self = this;
               var pak:C2s_EatAction = act.m_oDisObj;

                self.m_oDeskCardLayer.fResetDir(pak.fGetCurrPlayrPos());
         
               if(pak.fGetBelongPlayerPos() == pak.fGetCurrPlayrPos())
               {
                //    console.info("peng行动 m_nErrcode" + pak.fGetHead().m_nErrcode)
                   if(pak.fGetHead().m_nErrcode == 100)
                   {
                       if(self.m_oActionLayer != null)
                       {
                           GameManager.fGetIns().m_aPackets.push(pak)
                           setTimeout(function(){   self.m_oActionLayer.fAddAction(1, pak)}, 300);
                         
                            return;
                       }
                       else
                       {
                            self.m_oActionLayer  = new ActionLayer(2, pak);
                            self.m_oActionLayer.m_oMainScene = self;
                            self.addChild( self.m_oActionLayer);
                       }
                    
                   }
                   else if(pak.fGetHead().m_nErrcode == 101)
                   {
                       if(self.m_oActionLayer == null)
                          return;
                     self.m_oActionLayer.parent.removeChild(self.m_oActionLayer);
                       self.m_oActionLayer = null;
                      var cards = pak.m_aGroupCards[0].fGetCard();
                      for(var i = 0; i < cards.length; i++)
                      {
                          //if(cards[i].m_pBelong == GameManager.fGetIns().m_pFirstPlayerPos)
                          {
                              self.m_oHandCardLayer.fReducCardDownByCardBase(cards[i], false)
                          }
                      }
                      cards.push(pak.m_aGroupCards[pak.m_aGroupCards.length - 1].fGetCard()[0])
                      self.m_oActionCardLayer.fAddCard(cards, GameManager.fGetIns().m_pFirstPlayerPos);
                   }
                 
                   
                    //self.fRestGo(pak.fGetCurrPlayrPos());
                   // console.info("peng行动1")
                  
               }
                else
               {
                     if(pak.fGetHead().m_nErrcode == 101){
     var cards = pak.m_aGroupCards[0].fGetCard();
       cards.push(pak.m_aGroupCards[1].fGetCard()[0])
                     self.m_oActionCardLayer.fAddCard(cards, pak.fGetCurrPlayrPos());
                     }
                    
                   
                 //    self.fRestGo(pak.fGetCurrPlayrPos());
                      // console.info("吃行动weizhi" + pak.fGetBelongPlayerPos());
                       // console.info("吃行动weizhi" + pak.fGetCurrPlayrPos());
               }
               
          }, C2s_ActionBase.s_Peng);
        }

          public fListenTing(){
               
               this.m_oHandle.fReceiveMessage(this, function(act:MessageEvent){
              
            var self = this;
               var pak:C2s_EatAction = act.m_oDisObj;

                self.m_oDeskCardLayer.fResetDir(pak.fGetCurrPlayrPos());
         
               if(pak.fGetBelongPlayerPos() == pak.fGetCurrPlayrPos())
               {
              
                   if(pak.fGetHead().m_nErrcode == 100)
                   {
                       if(self.m_oActionLayer != null)
                       {
                           GameManager.fGetIns().m_aPackets.push(pak)
                           setTimeout(function(){   self.m_oActionLayer.fAddAction(1, pak)}, 300);
                         
                            return;
                       }
                       else
                       {
                            self.m_oActionLayer  = new ActionLayer(2, pak);
                            self.m_oActionLayer.m_oMainScene = self;
                            self.addChild( self.m_oActionLayer);
                       }
                    
                   }
                   else if(pak.fGetHead().m_nErrcode == 101)
                   {
                       if(self.m_oActionLayer == null)
                          return;
                     self.m_oActionLayer.parent.removeChild(self.m_oActionLayer);
                       self.m_oActionLayer = null;
                      var cards = pak.m_aGroupCards[0].fGetCard();
                      for(var i = 0; i < cards.length; i++)
                      {
                          //if(cards[i].m_pBelong == GameManager.fGetIns().m_pFirstPlayerPos)
                          {
                              self.m_oHandCardLayer.fReducCardDownByCardBase(cards[i], false)
                          }
                      }
                      cards.push(pak.m_aGroupCards[pak.m_aGroupCards.length - 1].fGetCard()[0])
                      self.m_oActionCardLayer.fAddCard(cards, GameManager.fGetIns().m_pFirstPlayerPos);
                   }
                 
                   
                    //self.fRestGo(pak.fGetCurrPlayrPos());
                   // console.info("peng行动1")
                  
               }
                else
               {
                     if(pak.fGetHead().m_nErrcode == 101){
     var cards = pak.m_aGroupCards[0].fGetCard();
       cards.push(pak.m_aGroupCards[1].fGetCard()[0])
                     self.m_oActionCardLayer.fAddCard(cards, pak.fGetCurrPlayrPos());
                     }
                    
                   
                 //    self.fRestGo(pak.fGetCurrPlayrPos());
                      // console.info("吃行动weizhi" + pak.fGetBelongPlayerPos());
                       // console.info("吃行动weizhi" + pak.fGetCurrPlayrPos());
               }
               
          }, C2s_ActionBase.s_Ting);
        }
         
          public fListenHu(){
              var self = this;
                 this.m_oHandle.fReceiveMessage(this, function(act:MessageEvent){
                       var pak:C2s_EatAction = act.m_oDisObj;
                          self.m_oDeskCardLayer.fResetDir(pak.fGetCurrPlayrPos());
         
               if(pak.fGetBelongPlayerPos() == pak.fGetCurrPlayrPos())
               {
                //    console.info("peng行动 m_nErrcode" + pak.fGetHead().m_nErrcode)
                   if(pak.fGetHead().m_nErrcode == 100)
                   {
                       if(self.m_oActionLayer != null)
                       {
                           GameManager.fGetIns().m_aPackets.push(pak)
                           setTimeout(function(){   self.m_oActionLayer.fAddAction(1, pak)}, 300);
                         
                            return;
                       }
                       else
                       {
                            self.m_oActionLayer  = new ActionLayer(16, pak);
                            self.m_oActionLayer.m_oMainScene = self;
                            self.addChild( self.m_oActionLayer);
                       }
                    
                   }
                   else if(pak.fGetHead().m_nErrcode == 101)
                   {
                       if(self.m_oActionLayer == null)
                          return;
                     self.m_oActionLayer.parent.removeChild(self.m_oActionLayer);
                       self.m_oActionLayer = null;
                      var cards = pak.m_aGroupCards[0].fGetCard();
                      for(var i = 0; i < cards.length; i++)
                      {
                          //if(cards[i].m_pBelong == GameManager.fGetIns().m_pFirstPlayerPos)
                          {
                              self.m_oHandCardLayer.fReducCardDownByCardBase(cards[i], false)
                          }
                      }
                      cards.push(pak.m_aGroupCards[pak.m_aGroupCards.length - 1].fGetCard()[0])
                      self.m_oActionCardLayer.fAddCard(cards, GameManager.fGetIns().m_pFirstPlayerPos);
                   }
                 
                   
                    //self.fRestGo(pak.fGetCurrPlayrPos());
                   // console.info("peng行动1")
                  
               }
                else
               {
                     if(pak.fGetHead().m_nErrcode == 101){
     var cards = pak.m_aGroupCards[0].fGetCard();
       cards.push(pak.m_aGroupCards[1].fGetCard()[0])

                     self.m_oActionCardLayer.fAddCard(cards, pak.fGetCurrPlayrPos());
                     }
                    
                   
                 //    self.fRestGo(pak.fGetCurrPlayrPos());
                      // console.info("吃行动weizhi" + pak.fGetBelongPlayerPos());
                       // console.info("吃行动weizhi" + pak.fGetCurrPlayrPos());
               }
                 },C2s_ActionBase.s_Hu)
          }

         public fListenEat(){
             
               
               this.m_oHandle.fReceiveMessage(this, function(act:MessageEvent){
                 //  console.info("吃行动")
                     var self = this;
               var pak:C2s_EatAction = act.m_oDisObj;

                self.m_oDeskCardLayer.fResetDir(pak.fGetCurrPlayrPos());
              
               if(pak.fGetBelongPlayerPos() == pak.fGetCurrPlayrPos())
               {
                    //console.info("吃行动 m_nErrcode" + pak.fGetHead().m_nErrcode)
                   if(pak.fGetHead().m_nErrcode == 100)
                   {
                       if(self.m_oActionLayer != null)
                       {
                           GameManager.fGetIns().m_aPackets.push(pak);
                     //     self.m_oActionLayer.fAddAction(0, pak.fGetCards())

                           setTimeout(function(){   self.m_oActionLayer.fAddAction(0, pak)}, 300);
                            return;
                       }
                       else
                       {
                            self.m_oActionLayer  = new ActionLayer(1, pak);
                            self.m_oActionLayer.m_oMainScene = self;
                            self.addChild( self.m_oActionLayer);
                       }
                    
                   }
                   else if(pak.fGetHead().m_nErrcode == 101)
                   {
                        if(self.m_oActionLayer == null)
                          return;
                      self.m_oActionLayer.parent.removeChild(self.m_oActionLayer);
                       self.m_oActionLayer = null;
                      var cards = pak.m_aGroupCards[0].fGetCard();
                      for(var i = 0; i < cards.length; i++)
                      {
                        //  if(cards[i].m_pBelong == GameManager.fGetIns().m_pFirstPlayerPos)
                          {
                              self.m_oHandCardLayer.fReducCardDownByCardBase(cards[i], false)
                             
                          }
                      }
                       cards.push(pak.m_aGroupCards[pak.m_aGroupCards.length - 1].fGetCard()[0])

                       self.m_oActionCardLayer.fAddCard(cards, GameManager.fGetIns().m_pFirstPlayerPos);
                   }
                 
                   
                    //self.fRestGo(pak.fGetCurrPlayrPos());
                   // console.info("吃行动1")
                  
               }
                else
               {
                      if(pak.fGetHead().m_nErrcode == 101)
                      {
                          console.log(pak.m_aGroupCards[1].fGetCard()[0])
                         var cards = pak.m_aGroupCards[0].fGetCard();
                         cards.push(pak.m_aGroupCards[1].fGetCard()[0])
                         self.m_oActionCardLayer.fAddCard(cards, pak.fGetCurrPlayrPos());
                      }
                      else if(pak.fGetHead().m_nErrcode == 102)
                      {
                          if(self.m_oActionLayer != null)
                          {
                                self.m_oActionLayer.parent.removeChild(self.m_oActionLayer);
                           self.m_oActionLayer = null;
                          }
                      }
                      
                 //    self.fRestGo(pak.fGetCurrPlayrPos());
                      // console.info("吃行动weizhi" + pak.fGetBelongPlayerPos());
                       // console.info("吃行动weizhi" + pak.fGetCurrPlayrPos());
               }
               
          }, C2s_ActionBase.s_Eat);
        }

        private fLisatenChuPai(){

              var self = this;
              
            this.m_oHandle.fReceiveMessage(self, function(act:MessageEvent)
            {
                 var chuPaiPacket:C2s_PlayHandAction = act.m_oDisObj;
                 GameManager.fGetIns().m_aPackets.push(chuPaiPacket)
             
             
             
            }, Packet.s_PlayHand );
               

        }

        private fChuPai(){
             console.info("有人出牌");
             this.m_aAllLayer.length = 0;
             this.m_aAllLayer.push(this.m_oHandCardLayer)
             var pack:C2s_PlayHandAction = <C2s_PlayHandAction>GameManager.fGetIns().m_aPackets[0];
             if( pack.m_pBelongPlayer == pack.m_pCurrentPlayer){
                  this.m_oHandCardLayer.fReducCardDown(GameManager.fGetIns().m_oChuHandCard);

             }
             else{  
                // this.m_oHandCardLayer.fReduceOtherPeopleCard(pack.m_pCurrentPlayer);

                 
                 if(pack.fGetCards().length > 1  || pack.fGetCards().length < 1)
                 {
                     console.info("pack.fGetCards().length != 1");
                 }
                 this.m_oHandCardLayer.fReduceOtherPeopleCard(pack.m_pCurrentPlayer, pack.fGetCards()[0].fGetCard()[0]);
             }

        }

             
        


        private fListenRoomInfo(){
            var self = this;

            this.m_oHandle.fReceiveMessage(self, function(act:MessageEvent)
            {
                var roomInfoPack = <C2s_RoomInfoPacket>act.m_oDisObj;
            setTimeout(function(){ self.m_oPhotoLayer.fResetPhoto();
                 self.m_labRoomId.text = GameManager.fGetIns().m_sRoomId;
                }, 1000);
               
             
            }, Packet.s_RoomInfo);
        }

        private fListenTouchCard(){
            var self = this;

            this.m_oHandle.fReceiveMessage(self, function(act:MessageEvent)
            {
             
                var pack = <C2s_TouchPacket>act.m_oDisObj;
                GameManager.fGetIns().m_aPackets.push(pack);
                if(self.m_oDeskCardLayer != null)
                  self.m_oDeskCardLayer.fResetDir(pack.fGetCurrPlayrPos())
                else 
                {
                    setTimeout(function(){self.m_oDeskCardLayer.fResetDir(pack.fGetCurrPlayrPos())}, 1000)
                }
               //   console.info('有人摸牌' + pack.fGetBelongPlayerPos() + ":" + pack.fGetCurrPlayrPos());
               
            }, Packet.s_Touch);
        }

        private fListenBeginGame(){
            var self = this;
            this.m_oHandle.fReceiveOnce(self, function(act:MessageEvent)
            {
               GameManager.fGetIns().m_aPackets.push(act.m_oDisObj)
            }, Packet.s_BeginGame)
        }

        private fBeginGame(){
            this.m_oYaoQingLayer.parent.removeChild(this.m_oYaoQingLayer);
            Utils.fRemoveArrByValue(this.m_aAllLayer, this.m_oYaoQingLayer);
           
            this.m_aAllLayer.length = 0;

            this.m_oPhotoLayer.fBeginGame();  
            this.m_aAllLayer.push(this.m_oPhotoLayer);
            this.m_oDeskCardLayer.fShowDir();
            this.m_aAllLayer.push(this.m_oDeskCardLayer);
            this.m_oHandCardLayer.fInitHandCard();
            this.m_aAllLayer.push(this.m_oHandCardLayer);
        }



         /**该场景需要加载的资源组 */
         public fSceneResGroup():string
         {
            return "main";
         }

       
         public fOnUICreate()
         {
          
            this.m_oPhotoLayer = new PhotoLayer();
            this.addChild(this.m_oPhotoLayer);
            this.m_aAllLayer.push(this.m_oPhotoLayer);

            this.m_oYaoQingLayer = new YaoQingLayer();
            this.addChild(this.m_oYaoQingLayer);
            this.m_aAllLayer.push(this.m_oYaoQingLayer);

            this.m_oHandCardLayer = new HandCardLayer();
            this.addChild(this.m_oHandCardLayer);
            this.m_oHandCardLayer.touchEnabled = false;
            this.m_oHandCardLayer.m_oMainScene = this;
            this.m_aAllLayer.push(this.m_oHandCardLayer);

            this.m_oDeskCardLayer = new DeskCardLayer();
            this.addChild(this.m_oDeskCardLayer);
            this.m_oDeskCardLayer.m_oMainScene = this;
            this.m_aAllLayer.push(this.m_oDeskCardLayer);

            this.m_labRoomId.text = GameManager.fGetIns().m_sRoomId;

            this.fSetClickButton(this.m_btnBegin);

            this.m_oActionCardLayer = new ActionCardLayer();
            this.addChild(this.m_oActionCardLayer);
            this.m_aAllLayer.push(this.m_oActionCardLayer);

            super.fOnUICreate();

          /*  var arrCardgop:CardGroup[] = [];
            var cars:CardBase[] = [];
            var card = new CardBase(5, 0,0);
            cars.push(card);
            cars.push(card);
            arrCardgop[0] = new CardGroup;
            arrCardgop[0].fSetCards(cars);
            arrCardgop[0].m_oCardStatus.m_nStatusType = CardStatus.s_Status_Eat;

            var cars1:CardBase[] = [];
            var card1 = new CardBase(5, 0,0);
            cars1.push(card1);
           
            arrCardgop[1] = new CardGroup;
            arrCardgop[1].fSetCards(cars);
            arrCardgop[1].m_oCardStatus.m_nStatusType = CardStatus.s_Status_Eat;

            this.m_oActionLayer = new ActionLayer(Math.pow(2, 0), arrCardgop);
            this.addChild(this.m_oActionLayer)


            var self = this;
            setTimeout(function(){
                 var arrCardgop:CardGroup[] = [];
            var cars:CardBase[] = [];
            var card = new CardBase(5, 0,0);
            cars.push(card);
            cars.push(card);
            arrCardgop[0] = new CardGroup;
            arrCardgop[0].fSetCards(cars);
            arrCardgop[0].m_oCardStatus.m_nStatusType = CardStatus.s_Status_Peng;

            var cars1:CardBase[] = [];
            var card1 = new CardBase(5, 0,0);
            cars1.push(card1);
           
            arrCardgop[1] = new CardGroup;
            arrCardgop[1].fSetCards(cars);
            arrCardgop[1].m_oCardStatus.m_nStatusType = CardStatus.s_Status_Peng;

            self.m_oActionLayer.fAddAction(Math.pow(2, 1), arrCardgop);
            

            }, 10000);*/

        }

        private fTouchPai(){
            this.m_aAllLayer.length = 0;

            var pack = <C2s_TouchPacket>GameManager.fGetIns().m_aPackets[0];
             if(pack.fGetBelongPlayerPos() == pack.fGetCurrPlayrPos())
             {
                 this.m_oHandCardLayer.fAddHandCardDown();
                 
             }    
             else
             {
                 this.m_oHandCardLayer.fAddOtherPeopleCard(pack.fGetCurrPlayrPos());
                 this.m_aAllLayer.push(this.m_oHandCardLayer);
             }

             
        }

        protected fUpdate(dt_ms:number)
        {
            if(this.m_bCompOnUICreate == false)
            {
                 for(var i in this.m_aAllLayer)
                 {
                    if(this.m_aAllLayer[i].m_bCompOnUICreate == false)
                    return ;
                 }

                 this.m_bCompOnUICreate = true;
            }
            else if(this.m_bFinishCurrentPacket){

                var arrPackets =  GameManager.fGetIns().m_aPackets;
                if(this.m_bFinishCurrentPacket && arrPackets.length > 0)
                {
                    this.m_bFinishCurrentPacket = false;
                    console.info(" this.m_bFinishCurrentPacket = false")
                    var self = this;
                    if(arrPackets[0].fGetHead().m_nPktType == Protocol.s_C2S_StartHand)
                    {
                      this.fBeginGame();
                      console.info("0")
                    }
                    else if(arrPackets[0].fGetHead().m_nPktType == Protocol.s_C2S_MOPAI)
                    {
                      this.fTouchPai();
                       console.info("1")
                    }
                    else if(arrPackets[0].fGetHead().m_nPktType == Protocol.s_C2S_PLAYHAND)
                    {
                         console.info("2")
                          this.fChuPai()
                    }
                     
                }
            }
            else if(! this.m_bFinishCurrentPacket)
            {
              
                   for(var i in this.m_aAllLayer)
                   {
                        if(this.m_aAllLayer[i].m_bFinishCurrentPacket == false)
                            return ;
                   }
                   this.m_aAllLayer.length = 0;
                   this.m_bFinishCurrentPacket = true;
                   GameManager.fGetIns().m_aPackets.splice(0, 1);
                      console.info(" this.m_bFinishCurrentPacket = true")    
                        
            }
           
        }
        
        public fOnClick(button)
        {
           if(button == this.m_btnBegin)
           {
               this.m_btnBegin.parent.removeChild(this.m_btnBegin);
               this.m_btnBegin = null;

                var readPkt:C2s_BeginGamePacket =  <C2s_BeginGamePacket>C2s_ActionBase.fCreateAction(C2s_ActionBase.s_BeginGame)
                
                Main.fGetIns().m_oGameSocket.fSendPkt(readPkt);
           }
        }

      
    }
}