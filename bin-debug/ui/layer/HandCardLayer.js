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
    var HandCardLayer = (function (_super) {
        __extends(HandCardLayer, _super);
        //***********************************/
        function HandCardLayer() {
            var _this = _super.call(this) || this;
            _this.m_aCardsLeft = [];
            _this.m_aCardsRight = [];
            _this.m_aCarsUp = [];
            _this.m_aCardsDown = [];
            _this.skinName = "resource/mjSkins/layer/HandCardLayer.exml";
            return _this;
        }
        HandCardLayer.prototype.fOnUICreate = function () {
            this.m_bCompOnUICreate = true;
        };
        HandCardLayer.prototype.fOnClick = function (button) {
            console.info('card click');
            if (game.GameManager.fGetIns().m_pFirstPlayerPos != game.GameManager.fGetIns().m_nPlayerActionPos)
                return;
            var handCards = game.GameManager.fGetIns().m_aHandCardsDown;
            for (var i = 0; i < handCards.length; i++) {
                if (handCards[i] == button) {
                    if (handCards[i].y == -20) {
                        var pack = game.Packet.fCreateAction(game.Packet.s_PlayHand);
                        pack.m_nCardsGroupCount = 1;
                        pack.m_pBelongPlayer = game.GameManager.fGetIns().m_pFirstPlayerPos;
                        pack.m_pCurrentPlayer = game.GameManager.fGetIns().m_pFirstPlayerPos;
                        var gop = new game.CardGroup();
                        gop.m_oCardStatus = new game.CardStatus();
                        gop.m_pBelong = game.GameManager.fGetIns().m_pFirstPlayerPos;
                        gop.m_nCardsCount = 1;
                        gop.fPushCard(handCards[i].m_oCardBase);
                        pack.m_aGroupCards.push(gop);
                        Main.fGetIns().m_oGameSocket.fSendPkt(pack);
                    }
                    else {
                        handCards[i].y = -20;
                    }
                }
                else if (handCards[i].y == -20) {
                    handCards[i].y = 0;
                }
            }
            if (button == game.GameManager.fGetIns().m_oTouchHandCard) {
                if (game.GameManager.fGetIns().m_oTouchHandCard.y == -20) {
                    var pack = game.Packet.fCreateAction(game.Packet.s_PlayHand);
                    pack.m_nCardsGroupCount = 1;
                    pack.m_pBelongPlayer = game.GameManager.fGetIns().m_pFirstPlayerPos;
                    pack.m_pCurrentPlayer = game.GameManager.fGetIns().m_pFirstPlayerPos;
                    var gop = new game.CardGroup();
                    gop.m_oCardStatus = new game.CardStatus();
                    gop.m_pBelong = game.GameManager.fGetIns().m_pFirstPlayerPos;
                    gop.m_nCardsCount = 1;
                    gop.fPushCard(game.GameManager.fGetIns().m_oTouchHandCard.m_oCardBase);
                    pack.m_aGroupCards.push(gop);
                    Main.fGetIns().m_oGameSocket.fSendPkt(pack);
                }
                else {
                    game.GameManager.fGetIns().m_oTouchHandCard.y = -20;
                }
            }
        };
        HandCardLayer.prototype.fAddHandCardDown = function () {
            this.m_gopDown.addChild(game.GameManager.fGetIns().m_oTouchHandCard);
            game.GameManager.fGetIns().m_oTouchHandCard.x = 78 * 13 + 15;
            this.fSetClickButton(game.GameManager.fGetIns().m_oTouchHandCard);
            console.info('有人摸牌1');
        };
        HandCardLayer.prototype.fReducCardDown = function (handCardDown) {
            var arrCards = game.GameManager.fGetIns().m_aHandCardsDown;
            if (game.GameManager.fGetIns().m_oTouchHandCard != null && handCardDown.m_oCardBase.fEqual(game.GameManager.fGetIns().m_oTouchHandCard.m_oCardBase, true)) {
                this.fSetTask(0);
                game.GameManager.fGetIns().m_oTouchHandCard.parent.removeChild(game.GameManager.fGetIns().m_oTouchHandCard);
                this.m_oMainScene.m_oDeskCardLayer.fAddCard(game.GameManager.fGetIns().m_oTouchHandCard.m_oCardBase, game.PlayePosition.e_Down);
            }
            else {
                this.fSetTask(1);
                for (var i = 0; i < arrCards.length; i++) {
                    if (arrCards[i].m_oCardBase.fEqual(handCardDown.m_oCardBase, true)) {
                        this.m_oMainScene.m_oDeskCardLayer.fAddCard(arrCards[i].m_oCardBase, game.PlayePosition.e_Down);
                        arrCards[i].parent.removeChild(arrCards[i]);
                        arrCards.splice(i, 1);
                        var pos = Utils.fInsetCard(game.GameManager.fGetIns().m_oTouchHandCard, arrCards);
                        console.info("插入的位置为 + ", pos);
                        var tw = egret.Tween.get(game.GameManager.fGetIns().m_oTouchHandCard);
                        var twTime = Utils.fTByGSpeed(100 + pos * 78 / 100);
                        var waitTime = Utils.fTByGSpeed(1000);
                        var slef = this;
                        tw.wait(waitTime).to({ x: pos * 78 }, twTime).call(slef.fAddCurrentTask);
                        var cardCount = game.GameManager.fGetIns().m_nInitPlayerCardNum;
                        var twHand = egret.Tween.get(this);
                        twHand.wait(twTime + waitTime).call(function () {
                            for (var j = arrCards.length - 1; j >= 0; j--) {
                                arrCards[j].x = (cardCount - 1) * 78;
                                cardCount--;
                            }
                        });
                        /*wait(2000).call(function(){
                            for(var j = arrCards.length - 1; j >= 0; j--)
                            {
                                arrCards[j].x = j * 78;
                            }
                        });*/
                    }
                }
            }
        };
        HandCardLayer.prototype.fReducCardDownByCardBase = function (cardBase, addDesk) {
            if (addDesk === void 0) { addDesk = true; }
            var arrCards = game.GameManager.fGetIns().m_aHandCardsDown;
            if (game.GameManager.fGetIns().m_oTouchHandCard != null && cardBase.fEqual(game.GameManager.fGetIns().m_oTouchHandCard.m_oCardBase, true)) {
                game.GameManager.fGetIns().m_oTouchHandCard.parent.removeChild(game.GameManager.fGetIns().m_oTouchHandCard);
            }
            else {
                for (var i = 0; i < arrCards.length; i++) {
                    if (arrCards[i].m_oCardBase.fEqual(cardBase, true)) {
                        arrCards[i].parent.removeChild(arrCards[i]);
                        if (addDesk == true)
                            this.m_oMainScene.m_oDeskCardLayer.fAddCard(arrCards[i].m_oCardBase, game.PlayePosition.e_Down);
                        arrCards.splice(i, 1);
                        //  var pos = Utils.fInsetCard(GameManager.fGetIns().m_oTouchHandCard, arrCards);
                        //  var tw = egret.Tween.get(GameManager.fGetIns().m_oTouchHandCard);
                        //  tw.wait(5000).to({x:pos * 78}, 400).wait(2000).call(function(){
                        var count = game.GameManager.fGetIns().m_nInitPlayerCardNum;
                        for (var j = arrCards.length - 1; j >= 0; j--) {
                            arrCards[j].x = (count - 1) * 78;
                            --count;
                        }
                        // });
                    }
                }
            }
        };
        HandCardLayer.prototype.fReduceOtherPeopleCard = function (pos, cardBase) {
            this.fSetTask(0);
            console.info('有人出牌2');
            var deskPos = Utils.fDeskPosToGamePosFirst(pos);
            console.info('有人出牌2， 方向' + deskPos);
            var cardCount;
            var card;
            this.m_oMainScene.m_oDeskCardLayer.fAddCard(cardBase, deskPos);
            if (deskPos == game.PlayePosition.e_Left) {
                cardCount = this.m_aCardsLeft.length;
                var index = Utils.fGetRandomNum(0, cardCount - 1);
                for (var i = index + 1; i < this.m_aCardsLeft.length; i++) {
                    this.m_aCardsLeft[i].y = (i - 1) * 15;
                }
                this.m_gopLeft.removeChild(this.m_aCardsLeft[index]);
                this.m_aCardsLeft.splice(index, 1);
            }
            else if (deskPos == game.PlayePosition.e_Right) {
                cardCount = this.m_aCardsRight.length;
                var index = Utils.fGetRandomNum(0, cardCount - 1);
                for (var i = index + 1; i < this.m_aCardsRight.length; i++) {
                    this.m_aCardsRight[i].y = (i - 1) * 15;
                }
                this.m_gopRight.removeChild(this.m_aCardsRight[index]);
                this.m_aCardsRight.splice(index, 1);
            }
            else if (deskPos == game.PlayePosition.e_Up) {
                cardCount = this.m_aCarsUp.length;
                var index = Utils.fGetRandomNum(0, cardCount - 1);
                for (var i = index + 1; i < this.m_aCarsUp.length; i++) {
                    this.m_aCarsUp[i].x = (i - 1) * 40;
                }
                this.m_gopUp.removeChildAt(index);
                this.m_aCarsUp.splice(index, 1);
            }
        };
        HandCardLayer.prototype.fAddOtherPeopleCard = function (pos) {
            this.fSetTask(1);
            var deskPos = Utils.fDeskPosToGamePosFirst(pos);
            var cardCount;
            var card;
            var i = 0;
            var index = 0;
            if (deskPos == game.PlayePosition.e_Left) {
                cardCount = this.m_aCardsLeft.length; //this.m_gopLeft.numChildren;
                for (i = index; i < this.m_aCardsLeft.length; i++) {
                    this.m_aCardsLeft[i].y = 15 * (i + 1);
                }
                card = new eui.Image("majiangzi_cemian2_png");
                this.m_gopLeft.addChildAt(card, index);
                this.m_aCardsLeft.splice(index, 0, card);
                var tw = egret.Tween.get(card);
                console.info("index=" + index);
                var self = this;
                tw.to({ y: index * 15, x: 4 }, 300).call(self.fAddCurrentTask, self);
            }
            else if (deskPos == game.PlayePosition.e_Right) {
                cardCount = this.m_aCardsRight.length;
                // index = Utils.fGetRandomNum(0, cardCount);
                console.info('index= ', index);
                for (i = index; i < this.m_aCardsRight.length; i++) {
                    this.m_aCardsRight[i].y = 15 * (i + 1);
                }
                card = new eui.Image("majiangzi_cemian1_png");
                this.m_gopRight.addChildAt(card, index);
                this.m_aCardsRight.splice(index, 0, card);
                //setTimeout(function(){  card.y = index * 15;card.x = 4;console.info('right')}, 100)
                var tw = egret.Tween.get(card);
                var self = this;
                tw.to({ y: index * 15 }, 300).call(self.fAddCurrentTask, self);
            }
            else if (deskPos == game.PlayePosition.e_Up) {
                cardCount = this.m_aCarsUp.length;
                //   index = Utils.fGetRandomNum(0, cardCount);
                console.info('index= ', index);
                for (i = index; i < this.m_aCarsUp.length; i++) {
                    this.m_aCarsUp[i].x = 40 * (i + 1);
                }
                card = new eui.Image("handcardUp_png");
                this.m_gopUp.addChildAt(card, index);
                this.m_aCarsUp.splice(index, 0, card);
                // setTimeout(function(){  card.x = index * 40; card.y = 5;console.info('up')}, 100)
                var tw = egret.Tween.get(card);
                var self = this;
                tw.to({ x: index * 15 }, 300).call(self.fAddCurrentTask, self);
                //  card.x = index * 40;
            }
        };
        HandCardLayer.prototype.fInitHandCard = function () {
            this.fInitHandCardDown();
            this.fInitHandCardLeft();
            this.fInitHandCardRight();
            this.fInitHandCardUp();
            this.fAddTaskByNum(game.GameManager.fGetIns().m_nInitPlayerCardNum * 3);
            this.fAddTaskByNum(game.GameManager.fGetIns().m_aHandCardsDown.length);
        };
        HandCardLayer.prototype.fInitHandCardDown = function () {
            var cards = game.GameManager.fGetIns().m_aHandCardsDown;
            var self = this;
            for (var i = 0; i < cards.length; i++) {
                this.m_gopDown.addChildAt(cards[i], 0);
                this.fSetClickButton(cards[i]);
                var tw = egret.Tween.get(cards[i]);
                tw.to({ x: i * 78 }, Utils.fTByGSpeed(200 + i * 30)).call(self.fAddCurrentTask, self);
                ;
            }
        };
        HandCardLayer.prototype.fInitHandCardUp = function () {
            var self = this;
            for (var i = 0; i < game.GameManager.fGetIns().m_nInitPlayerCardNum; i++) {
                var card = new eui.Image("handcardUp_png");
                this.m_gopUp.addChild(card);
                this.m_aCarsUp.push(card);
                var tw = egret.Tween.get(card);
                tw.to({ x: i * 40 }, Utils.fTByGSpeed(100 + i * 30)).call(self.fAddCurrentTask, self);
                ;
            }
        };
        HandCardLayer.prototype.fInitHandCardLeft = function () {
            var self = this;
            for (var i = 0; i < game.GameManager.fGetIns().m_nInitPlayerCardNum; i++) {
                var card = new eui.Image("majiangzi_cemian2_png");
                this.m_gopLeft.addChild(card);
                this.m_aCardsLeft.push(card);
                var tw = egret.Tween.get(card);
                tw.to({ y: i * 15 }, 80 + i * 30).call(self.fAddCurrentTask, self);
            }
        };
        HandCardLayer.prototype.fInitHandCardRight = function () {
            var self = this;
            for (var i = 0; i < game.GameManager.fGetIns().m_nInitPlayerCardNum; i++) {
                var card = new eui.Image("majiangzi_cemian1_png");
                this.m_gopRight.addChild(card);
                this.m_aCardsRight.push(card);
                var tw = egret.Tween.get(card);
                tw.to({ y: i * 15 }, 80 + i * 30).call(self.fAddCurrentTask, self);
                ;
            }
        };
        return HandCardLayer;
    }(game.Scene));
    game.HandCardLayer = HandCardLayer;
    __reflect(HandCardLayer.prototype, "game.HandCardLayer");
})(game || (game = {}));
//# sourceMappingURL=HandCardLayer.js.map