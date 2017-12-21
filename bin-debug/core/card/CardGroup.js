var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
 * brief:   麻将分组。比如一组吃的麻将
 * date:    2017-11-09
 * author:  徐为
 */
    var CardStatus = (function () {
        function CardStatus() {
            this.m_nStatusType = -1;
            this.m_nTime = -1;
        }
        CardStatus.prototype.fRead = function (by) {
            this.m_nStatusType = by.readShort();
            this.m_nTime = by.fReadLong();
        };
        CardStatus.prototype.fWrite = function (by) {
            by.writeShort(this.m_nStatusType);
            by.fWriteLong(this.m_nTime);
            return by;
        };
        CardStatus.s_Status_Desktop = 0; //桌牌
        CardStatus.s_Status_Hand = 1; //手牌
        CardStatus.s_Status_Mo = 2; //摸得牌
        CardStatus.s_Status_Launch = 3; //打出去得牌
        CardStatus.s_Status_Eat = 4; //吃
        CardStatus.s_Status_Peng = 5; //碰
        CardStatus.s_Status_Gang = 6; //杠
        CardStatus.s_Status_Hua = 7; //花
        CardStatus.s_Status_Hu = 8; //胡
        return CardStatus;
    }());
    game.CardStatus = CardStatus;
    __reflect(CardStatus.prototype, "game.CardStatus");
    var CardGroup = (function () {
        /********************************/
        function CardGroup() {
            /********************************/
            this.m_aCards = [];
            this.m_oCardStatus = new CardStatus();
        }
        CardGroup.prototype.fRead = function (by) {
            this.m_pBelong = by.readShort();
            this.m_nCardsCount = by.readShort();
            for (var i = 0; i < this.m_nCardsCount; i++) {
                var base = new game.CardBase(-1, -1, -1);
                base.fRead(by);
                this.m_aCards.push(base);
            }
            //  this.fInitSort();
            this.m_oCardStatus.fRead(by);
        };
        CardGroup.prototype.fWrite = function (by) {
            by.writeShort(this.m_pBelong);
            by.writeShort(this.m_nCardsCount);
            for (var i = 0; i < this.m_nCardsCount; i++) {
                this.m_aCards[i].fWrite(by);
            }
            this.m_oCardStatus.fWrite(by);
        };
        CardGroup.prototype.fPushCard = function (card) {
            this.m_aCards.push(card);
        };
        CardGroup.prototype.fGetCard = function () {
            return this.m_aCards;
        };
        CardGroup.prototype.fSetCards = function (cards) {
            this.m_aCards = cards;
            //  this.fInitSort();
        };
        CardGroup.prototype.fSplicCard = function (card) {
            var index = 0;
            for (var i in this.m_aCards) {
                if (card.fGetType() == this.m_aCards[i].fGetType() && card.fGetValue() == this.m_aCards[i].fGetValue() &&
                    card.m_nPriority == this.m_aCards[i].m_nPriority) {
                    this.m_aCards.splice(index, 1);
                    this.m_nCardsCount--;
                }
                index++;
            }
        };
        //初始化排序
        CardGroup.prototype.fInitSort = function () {
            var i, j;
            var temp;
            for (i = 1; i < this.m_aCards.length; i++) {
                temp = this.m_aCards[i];
                for (j = i; j > 0 && this.m_aCards[j - 1].m_nPriority > temp.m_nPriority; j--) {
                    this.m_aCards[j] = this.m_aCards[j - 1];
                }
                this.m_aCards[j] = temp;
            }
        };
        return CardGroup;
    }());
    game.CardGroup = CardGroup;
    __reflect(CardGroup.prototype, "game.CardGroup");
})(game || (game = {}));
//# sourceMappingURL=CardGroup.js.map