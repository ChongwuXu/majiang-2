var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * brief:   主场景
 * date:    2017-12-7
 * author:  徐为
 */
var game;
(function (game) {
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        //***********************************/
        function MainScene() {
            var _this = _super.call(this) || this;
            _this.m_oDeskCardLayer = null;
            _this.m_bAllCompOnUICreate = false; //所有层fOnUICreate渲染成功
            _this.m_aAllLayer = [];
            _this.m_bFinishCurrentPacket = true; //当前数据包是否完成
            _this.fListenRoomInfo();
            _this.fListenBeginGame();
            _this.fListenTouchCard();
            _this.fLisatenChuPai();
            _this.fListenPeng();
            _this.fListenGang();
            _this.fListenEat();
            _this.fListenTing();
            _this.fListenHu();
            _this.m_oHandle.fReceiveMessage(_this, function (act) { });
            _this.skinName = "resource/mjSkins/scene/GameMainScene.exml";
            return _this;
        }
        MainScene.prototype.fListenGang = function () {
            this.m_oHandle.fReceiveMessage(this, function (act) {
                var pak = act.m_oDisObj;
                var self = this;
                self.m_oDeskCardLayer.fResetDir(pak.fGetCurrPlayrPos()); //调整
                if (pak.fGetBelongPlayerPos() == pak.fGetCurrPlayrPos()) {
                    if (pak.fGetHead().m_nErrcode == 100) {
                        if (self.m_oActionLayer != null) {
                            game.GameManager.fGetIns().m_aPackets.push(pak);
                            setTimeout(function () { self.m_oActionLayer.fAddAction(2, pak); }, 300);
                            return;
                        }
                        else {
                            self.m_oActionLayer = new game.ActionLayer(4, pak);
                            self.m_oActionLayer.m_oMainScene = self;
                            self.addChild(self.m_oActionLayer);
                        }
                    }
                    else if (pak.fGetHead().m_nErrcode == 101) {
                        if (self.m_oActionLayer == null)
                            return;
                        self.m_oActionLayer.parent.removeChild(self.m_oActionLayer);
                        self.m_oActionLayer = null;
                        var cards = pak.m_aGroupCards[0].fGetCard();
                        for (var i = 0; i < cards.length; i++) {
                            //if(cards[i].m_pBelong == GameManager.fGetIns().m_pFirstPlayerPos)
                            {
                                self.m_oHandCardLayer.fReducCardDownByCardBase(cards[i], false);
                            }
                        }
                        self.m_oActionCardLayer.fAddCard(cards, game.GameManager.fGetIns().m_pFirstPlayerPos);
                    }
                    //self.fRestGo(pak.fGetCurrPlayrPos());
                    //  console.info("gang行动1")
                }
                else {
                    if (pak.fGetHead().m_nErrcode == 101) {
                        var cards = pak.m_aGroupCards[0].fGetCard();
                        cards.push(pak.m_aGroupCards[1].fGetCard()[0]);
                        self.m_oActionCardLayer.fAddCard(cards, pak.fGetCurrPlayrPos());
                    }
                    //    self.fRestGo(pak.fGetCurrPlayrPos());
                    // console.info("吃行动weizhi" + pak.fGetBelongPlayerPos());
                    // console.info("吃行动weizhi" + pak.fGetCurrPlayrPos());
                }
            }, game.C2s_ActionBase.s_Gang);
        };
        MainScene.prototype.fListenPeng = function () {
            this.m_oHandle.fReceiveMessage(this, function (act) {
                //    console.info("peng行动")
                var self = this;
                var pak = act.m_oDisObj;
                self.m_oDeskCardLayer.fResetDir(pak.fGetCurrPlayrPos());
                if (pak.fGetBelongPlayerPos() == pak.fGetCurrPlayrPos()) {
                    //    console.info("peng行动 m_nErrcode" + pak.fGetHead().m_nErrcode)
                    if (pak.fGetHead().m_nErrcode == 100) {
                        if (self.m_oActionLayer != null) {
                            game.GameManager.fGetIns().m_aPackets.push(pak);
                            setTimeout(function () { self.m_oActionLayer.fAddAction(1, pak); }, 300);
                            return;
                        }
                        else {
                            self.m_oActionLayer = new game.ActionLayer(2, pak);
                            self.m_oActionLayer.m_oMainScene = self;
                            self.addChild(self.m_oActionLayer);
                        }
                    }
                    else if (pak.fGetHead().m_nErrcode == 101) {
                        if (self.m_oActionLayer == null)
                            return;
                        self.m_oActionLayer.parent.removeChild(self.m_oActionLayer);
                        self.m_oActionLayer = null;
                        var cards = pak.m_aGroupCards[0].fGetCard();
                        for (var i = 0; i < cards.length; i++) {
                            //if(cards[i].m_pBelong == GameManager.fGetIns().m_pFirstPlayerPos)
                            {
                                self.m_oHandCardLayer.fReducCardDownByCardBase(cards[i], false);
                            }
                        }
                        cards.push(pak.m_aGroupCards[pak.m_aGroupCards.length - 1].fGetCard()[0]);
                        self.m_oActionCardLayer.fAddCard(cards, game.GameManager.fGetIns().m_pFirstPlayerPos);
                    }
                    //self.fRestGo(pak.fGetCurrPlayrPos());
                    // console.info("peng行动1")
                }
                else {
                    if (pak.fGetHead().m_nErrcode == 101) {
                        var cards = pak.m_aGroupCards[0].fGetCard();
                        cards.push(pak.m_aGroupCards[1].fGetCard()[0]);
                        self.m_oActionCardLayer.fAddCard(cards, pak.fGetCurrPlayrPos());
                    }
                    //    self.fRestGo(pak.fGetCurrPlayrPos());
                    // console.info("吃行动weizhi" + pak.fGetBelongPlayerPos());
                    // console.info("吃行动weizhi" + pak.fGetCurrPlayrPos());
                }
            }, game.C2s_ActionBase.s_Peng);
        };
        MainScene.prototype.fListenTing = function () {
            this.m_oHandle.fReceiveMessage(this, function (act) {
                var self = this;
                var pak = act.m_oDisObj;
                self.m_oDeskCardLayer.fResetDir(pak.fGetCurrPlayrPos());
                if (pak.fGetBelongPlayerPos() == pak.fGetCurrPlayrPos()) {
                    if (pak.fGetHead().m_nErrcode == 100) {
                        if (self.m_oActionLayer != null) {
                            game.GameManager.fGetIns().m_aPackets.push(pak);
                            setTimeout(function () { self.m_oActionLayer.fAddAction(1, pak); }, 300);
                            return;
                        }
                        else {
                            self.m_oActionLayer = new game.ActionLayer(2, pak);
                            self.m_oActionLayer.m_oMainScene = self;
                            self.addChild(self.m_oActionLayer);
                        }
                    }
                    else if (pak.fGetHead().m_nErrcode == 101) {
                        if (self.m_oActionLayer == null)
                            return;
                        self.m_oActionLayer.parent.removeChild(self.m_oActionLayer);
                        self.m_oActionLayer = null;
                        var cards = pak.m_aGroupCards[0].fGetCard();
                        for (var i = 0; i < cards.length; i++) {
                            //if(cards[i].m_pBelong == GameManager.fGetIns().m_pFirstPlayerPos)
                            {
                                self.m_oHandCardLayer.fReducCardDownByCardBase(cards[i], false);
                            }
                        }
                        cards.push(pak.m_aGroupCards[pak.m_aGroupCards.length - 1].fGetCard()[0]);
                        self.m_oActionCardLayer.fAddCard(cards, game.GameManager.fGetIns().m_pFirstPlayerPos);
                    }
                    //self.fRestGo(pak.fGetCurrPlayrPos());
                    // console.info("peng行动1")
                }
                else {
                    if (pak.fGetHead().m_nErrcode == 101) {
                        var cards = pak.m_aGroupCards[0].fGetCard();
                        cards.push(pak.m_aGroupCards[1].fGetCard()[0]);
                        self.m_oActionCardLayer.fAddCard(cards, pak.fGetCurrPlayrPos());
                    }
                    //    self.fRestGo(pak.fGetCurrPlayrPos());
                    // console.info("吃行动weizhi" + pak.fGetBelongPlayerPos());
                    // console.info("吃行动weizhi" + pak.fGetCurrPlayrPos());
                }
            }, game.C2s_ActionBase.s_Ting);
        };
        MainScene.prototype.fListenHu = function () {
            var self = this;
            this.m_oHandle.fReceiveMessage(this, function (act) {
                var pak = act.m_oDisObj;
                self.m_oDeskCardLayer.fResetDir(pak.fGetCurrPlayrPos());
                if (pak.fGetBelongPlayerPos() == pak.fGetCurrPlayrPos()) {
                    //    console.info("peng行动 m_nErrcode" + pak.fGetHead().m_nErrcode)
                    if (pak.fGetHead().m_nErrcode == 100) {
                        if (self.m_oActionLayer != null) {
                            game.GameManager.fGetIns().m_aPackets.push(pak);
                            setTimeout(function () { self.m_oActionLayer.fAddAction(1, pak); }, 300);
                            return;
                        }
                        else {
                            self.m_oActionLayer = new game.ActionLayer(16, pak);
                            self.m_oActionLayer.m_oMainScene = self;
                            self.addChild(self.m_oActionLayer);
                        }
                    }
                    else if (pak.fGetHead().m_nErrcode == 101) {
                        if (self.m_oActionLayer == null)
                            return;
                        self.m_oActionLayer.parent.removeChild(self.m_oActionLayer);
                        self.m_oActionLayer = null;
                        var cards = pak.m_aGroupCards[0].fGetCard();
                        for (var i = 0; i < cards.length; i++) {
                            //if(cards[i].m_pBelong == GameManager.fGetIns().m_pFirstPlayerPos)
                            {
                                self.m_oHandCardLayer.fReducCardDownByCardBase(cards[i], false);
                            }
                        }
                        cards.push(pak.m_aGroupCards[pak.m_aGroupCards.length - 1].fGetCard()[0]);
                        self.m_oActionCardLayer.fAddCard(cards, game.GameManager.fGetIns().m_pFirstPlayerPos);
                    }
                    //self.fRestGo(pak.fGetCurrPlayrPos());
                    // console.info("peng行动1")
                }
                else {
                    if (pak.fGetHead().m_nErrcode == 101) {
                        var cards = pak.m_aGroupCards[0].fGetCard();
                        cards.push(pak.m_aGroupCards[1].fGetCard()[0]);
                        self.m_oActionCardLayer.fAddCard(cards, pak.fGetCurrPlayrPos());
                    }
                    //    self.fRestGo(pak.fGetCurrPlayrPos());
                    // console.info("吃行动weizhi" + pak.fGetBelongPlayerPos());
                    // console.info("吃行动weizhi" + pak.fGetCurrPlayrPos());
                }
            }, game.C2s_ActionBase.s_Hu);
        };
        MainScene.prototype.fListenEat = function () {
            this.m_oHandle.fReceiveMessage(this, function (act) {
                //  console.info("吃行动")
                var self = this;
                var pak = act.m_oDisObj;
                self.m_oDeskCardLayer.fResetDir(pak.fGetCurrPlayrPos());
                if (pak.fGetBelongPlayerPos() == pak.fGetCurrPlayrPos()) {
                    //console.info("吃行动 m_nErrcode" + pak.fGetHead().m_nErrcode)
                    if (pak.fGetHead().m_nErrcode == 100) {
                        if (self.m_oActionLayer != null) {
                            game.GameManager.fGetIns().m_aPackets.push(pak);
                            //     self.m_oActionLayer.fAddAction(0, pak.fGetCards())
                            setTimeout(function () { self.m_oActionLayer.fAddAction(0, pak); }, 300);
                            return;
                        }
                        else {
                            self.m_oActionLayer = new game.ActionLayer(1, pak);
                            self.m_oActionLayer.m_oMainScene = self;
                            self.addChild(self.m_oActionLayer);
                        }
                    }
                    else if (pak.fGetHead().m_nErrcode == 101) {
                        if (self.m_oActionLayer == null)
                            return;
                        self.m_oActionLayer.parent.removeChild(self.m_oActionLayer);
                        self.m_oActionLayer = null;
                        var cards = pak.m_aGroupCards[0].fGetCard();
                        for (var i = 0; i < cards.length; i++) {
                            //  if(cards[i].m_pBelong == GameManager.fGetIns().m_pFirstPlayerPos)
                            {
                                self.m_oHandCardLayer.fReducCardDownByCardBase(cards[i], false);
                            }
                        }
                        cards.push(pak.m_aGroupCards[pak.m_aGroupCards.length - 1].fGetCard()[0]);
                        self.m_oActionCardLayer.fAddCard(cards, game.GameManager.fGetIns().m_pFirstPlayerPos);
                    }
                    //self.fRestGo(pak.fGetCurrPlayrPos());
                    // console.info("吃行动1")
                }
                else {
                    if (pak.fGetHead().m_nErrcode == 101) {
                        console.log(pak.m_aGroupCards[1].fGetCard()[0]);
                        var cards = pak.m_aGroupCards[0].fGetCard();
                        cards.push(pak.m_aGroupCards[1].fGetCard()[0]);
                        self.m_oActionCardLayer.fAddCard(cards, pak.fGetCurrPlayrPos());
                    }
                    else if (pak.fGetHead().m_nErrcode == 102) {
                        if (self.m_oActionLayer != null) {
                            self.m_oActionLayer.parent.removeChild(self.m_oActionLayer);
                            self.m_oActionLayer = null;
                        }
                    }
                    //    self.fRestGo(pak.fGetCurrPlayrPos());
                    // console.info("吃行动weizhi" + pak.fGetBelongPlayerPos());
                    // console.info("吃行动weizhi" + pak.fGetCurrPlayrPos());
                }
            }, game.C2s_ActionBase.s_Eat);
        };
        MainScene.prototype.fLisatenChuPai = function () {
            var self = this;
            this.m_oHandle.fReceiveMessage(self, function (act) {
                var chuPaiPacket = act.m_oDisObj;
                game.GameManager.fGetIns().m_aPackets.push(chuPaiPacket);
            }, game.Packet.s_PlayHand);
        };
        MainScene.prototype.fChuPai = function () {
            console.info("有人出牌");
            this.m_aAllLayer.length = 0;
            this.m_aAllLayer.push(this.m_oHandCardLayer);
            var pack = game.GameManager.fGetIns().m_aPackets[0];
            if (pack.m_pBelongPlayer == pack.m_pCurrentPlayer) {
                this.m_oHandCardLayer.fReducCardDown(game.GameManager.fGetIns().m_oChuHandCard);
            }
            else {
                // this.m_oHandCardLayer.fReduceOtherPeopleCard(pack.m_pCurrentPlayer);
                if (pack.fGetCards().length > 1 || pack.fGetCards().length < 1) {
                    console.info("pack.fGetCards().length != 1");
                }
                this.m_oHandCardLayer.fReduceOtherPeopleCard(pack.m_pCurrentPlayer, pack.fGetCards()[0].fGetCard()[0]);
            }
        };
        MainScene.prototype.fListenRoomInfo = function () {
            var self = this;
            this.m_oHandle.fReceiveMessage(self, function (act) {
                var roomInfoPack = act.m_oDisObj;
                setTimeout(function () {
                    self.m_oPhotoLayer.fResetPhoto();
                    self.m_labRoomId.text = game.GameManager.fGetIns().m_sRoomId;
                }, 1000);
            }, game.Packet.s_RoomInfo);
        };
        MainScene.prototype.fListenTouchCard = function () {
            var self = this;
            this.m_oHandle.fReceiveMessage(self, function (act) {
                var pack = act.m_oDisObj;
                game.GameManager.fGetIns().m_aPackets.push(pack);
                if (self.m_oDeskCardLayer != null)
                    self.m_oDeskCardLayer.fResetDir(pack.fGetCurrPlayrPos());
                else {
                    setTimeout(function () { self.m_oDeskCardLayer.fResetDir(pack.fGetCurrPlayrPos()); }, 1000);
                }
                //   console.info('有人摸牌' + pack.fGetBelongPlayerPos() + ":" + pack.fGetCurrPlayrPos());
            }, game.Packet.s_Touch);
        };
        MainScene.prototype.fListenBeginGame = function () {
            var self = this;
            this.m_oHandle.fReceiveOnce(self, function (act) {
                game.GameManager.fGetIns().m_aPackets.push(act.m_oDisObj);
            }, game.Packet.s_BeginGame);
        };
        MainScene.prototype.fBeginGame = function () {
            this.m_oYaoQingLayer.parent.removeChild(this.m_oYaoQingLayer);
            Utils.fRemoveArrByValue(this.m_aAllLayer, this.m_oYaoQingLayer);
            this.m_aAllLayer.length = 0;
            this.m_oPhotoLayer.fBeginGame();
            this.m_aAllLayer.push(this.m_oPhotoLayer);
            this.m_oDeskCardLayer.fShowDir();
            this.m_aAllLayer.push(this.m_oDeskCardLayer);
            this.m_oHandCardLayer.fInitHandCard();
            this.m_aAllLayer.push(this.m_oHandCardLayer);
        };
        /**该场景需要加载的资源组 */
        MainScene.prototype.fSceneResGroup = function () {
            return "main";
        };
        MainScene.prototype.fOnUICreate = function () {
            this.m_oPhotoLayer = new game.PhotoLayer();
            this.addChild(this.m_oPhotoLayer);
            this.m_aAllLayer.push(this.m_oPhotoLayer);
            this.m_oYaoQingLayer = new game.YaoQingLayer();
            this.addChild(this.m_oYaoQingLayer);
            this.m_aAllLayer.push(this.m_oYaoQingLayer);
            this.m_oHandCardLayer = new game.HandCardLayer();
            this.addChild(this.m_oHandCardLayer);
            this.m_oHandCardLayer.touchEnabled = false;
            this.m_oHandCardLayer.m_oMainScene = this;
            this.m_aAllLayer.push(this.m_oHandCardLayer);
            this.m_oDeskCardLayer = new game.DeskCardLayer();
            this.addChild(this.m_oDeskCardLayer);
            this.m_oDeskCardLayer.m_oMainScene = this;
            this.m_aAllLayer.push(this.m_oDeskCardLayer);
            this.m_labRoomId.text = game.GameManager.fGetIns().m_sRoomId;
            this.fSetClickButton(this.m_btnBegin);
            this.m_oActionCardLayer = new game.ActionCardLayer();
            this.addChild(this.m_oActionCardLayer);
            this.m_aAllLayer.push(this.m_oActionCardLayer);
            _super.prototype.fOnUICreate.call(this);
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
        };
        MainScene.prototype.fTouchPai = function () {
            this.m_aAllLayer.length = 0;
            var pack = game.GameManager.fGetIns().m_aPackets[0];
            if (pack.fGetBelongPlayerPos() == pack.fGetCurrPlayrPos()) {
                this.m_oHandCardLayer.fAddHandCardDown();
            }
            else {
                this.m_oHandCardLayer.fAddOtherPeopleCard(pack.fGetCurrPlayrPos());
                this.m_aAllLayer.push(this.m_oHandCardLayer);
            }
        };
        MainScene.prototype.fUpdate = function (dt_ms) {
            if (this.m_bCompOnUICreate == false) {
                for (var i in this.m_aAllLayer) {
                    if (this.m_aAllLayer[i].m_bCompOnUICreate == false)
                        return;
                }
                this.m_bCompOnUICreate = true;
            }
            else if (this.m_bFinishCurrentPacket) {
                var arrPackets = game.GameManager.fGetIns().m_aPackets;
                if (this.m_bFinishCurrentPacket && arrPackets.length > 0) {
                    this.m_bFinishCurrentPacket = false;
                    console.info(" this.m_bFinishCurrentPacket = false");
                    var self = this;
                    if (arrPackets[0].fGetHead().m_nPktType == game.Protocol.s_C2S_StartHand) {
                        this.fBeginGame();
                        console.info("0");
                    }
                    else if (arrPackets[0].fGetHead().m_nPktType == game.Protocol.s_C2S_MOPAI) {
                        this.fTouchPai();
                        console.info("1");
                    }
                    else if (arrPackets[0].fGetHead().m_nPktType == game.Protocol.s_C2S_PLAYHAND) {
                        console.info("2");
                        this.fChuPai();
                    }
                }
            }
            else if (!this.m_bFinishCurrentPacket) {
                for (var i in this.m_aAllLayer) {
                    if (this.m_aAllLayer[i].m_bFinishCurrentPacket == false)
                        return;
                }
                this.m_aAllLayer.length = 0;
                this.m_bFinishCurrentPacket = true;
                game.GameManager.fGetIns().m_aPackets.splice(0, 1);
                console.info(" this.m_bFinishCurrentPacket = true");
            }
        };
        MainScene.prototype.fOnClick = function (button) {
            if (button == this.m_btnBegin) {
                this.m_btnBegin.parent.removeChild(this.m_btnBegin);
                this.m_btnBegin = null;
                var readPkt = game.C2s_ActionBase.fCreateAction(game.C2s_ActionBase.s_BeginGame);
                Main.fGetIns().m_oGameSocket.fSendPkt(readPkt);
            }
        };
        return MainScene;
    }(game.Scene));
    game.MainScene = MainScene;
    __reflect(MainScene.prototype, "game.MainScene");
})(game || (game = {}));
//# sourceMappingURL=MainScene.js.map