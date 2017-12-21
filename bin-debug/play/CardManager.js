var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
 * brief:   麻将管理类
 * date:    2017-11-09
 * author:  徐为
 */
    var GameCardManager = (function () {
        /********************************/
        function GameCardManager() {
            this.m_oCards = [];
            this.m_oCards = [];
            console.info('gs');
        }
        GameCardManager.fGetIns = function () {
            if (!GameCardManager.s_ins) {
                GameCardManager.s_ins = new GameCardManager();
            }
            return GameCardManager.s_ins;
        };
        GameCardManager.prototype.fClear = function () {
            this.m_oCards = [];
            this.m_oDeskTopCardGroup = null;
            this.m_oDownCardGroup = null;
            this.m_oLeftCardGroup = null;
            this.m_oRightCardGroup = null;
            this.m_oUpCardGroup = null;
        };
        GameCardManager.prototype.fPushCard = function (card, pos) {
            this.m_oCards.push(card);
            if (game.PlayePosition.e_Desktop) {
                this.m_oDeskTopCardGroup.fPushCard(card);
            }
        };
        GameCardManager.prototype.fSplicCard = function (card) {
            var index = 0;
            for (var i in this.m_oCards) {
                if (card.fGetType() == this.m_oCards[i].fGetType() && card.fGetValue() == this.m_oCards[i].fGetValue()) {
                    this.m_oCards.splice(index, 1);
                }
                index++;
            }
        };
        return GameCardManager;
    }());
    game.GameCardManager = GameCardManager;
    __reflect(GameCardManager.prototype, "game.GameCardManager");
})(game || (game = {}));
//# sourceMappingURL=CardManager.js.map