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
var game;
(function (game) {
    /**
       * brief:   基本活动数据包
       * date:    2017-11-09
       * author:  徐为
     */
    var C2s_ActionBase = (function (_super) {
        __extends(C2s_ActionBase, _super);
        /********************************/
        function C2s_ActionBase() {
            var _this = _super.call(this) || this;
            _this.m_aGroupCards = []; //活动用到的牌组
            _this.m_oHead.m_nPktType = game.Protocol.s_C2S_BASE;
            _this.m_sActionType = game.Packet.s_BaseAct;
            return _this;
        }
        C2s_ActionBase.prototype.fGetCurrPlayrPos = function () {
            return this.m_pCurrentPlayer;
        };
        C2s_ActionBase.prototype.fGetBelongPlayerPos = function () {
            return this.m_pBelongPlayer;
        };
        C2s_ActionBase.prototype.fGetCards = function () {
            return this.m_aGroupCards;
        };
        C2s_ActionBase.prototype.fSetCards = function (cards) {
            this.m_aGroupCards = cards;
        };
        C2s_ActionBase.prototype.fWrite = function () {
            var by = _super.prototype.fWrite.call(this);
            by.writeShort(this.m_pBelongPlayer);
            by.writeShort(this.m_pCurrentPlayer);
            by.writeShort(this.m_nCardsGroupCount);
            //    by.writeUTF(this.m_sActionType);
            for (var i in this.m_aGroupCards) {
                this.m_aGroupCards[i].fWrite(by);
                //   by.writeShort(this.m_aGroupCards[i].fGetType())
                //   by.writeShort(this.m_aGroupCards[i].fGetValue())
            }
            return by;
        };
        C2s_ActionBase.prototype.fRead = function (by) {
            _super.prototype.fRead.call(this, by);
            this.m_pBelongPlayer = by.readShort();
            this.m_pCurrentPlayer = by.readShort();
            this.m_nCardsGroupCount = by.readShort();
            if (this.m_pBelongPlayer == this.m_pCurrentPlayer || (this.m_oHead.m_nPktType == game.Protocol.s_C2S_PLAYHAND) ||
                (this.m_oHead.m_nPktType == game.Protocol.s_C2S_EAT_PAI && this.m_oHead.m_nErrcode == 101)
                || (this.m_oHead.m_nPktType == game.Protocol.s_C2S_PENG_PAI && this.m_oHead.m_nErrcode == 101)
                || (this.m_oHead.m_nPktType == game.Protocol.s_C2S_GANG_PAI && this.m_oHead.m_nErrcode == 101)) {
                for (var i = 0; i < this.m_nCardsGroupCount; i++) {
                    var cardGop = new game.CardGroup();
                    cardGop.fRead(by);
                    this.m_aGroupCards.push(cardGop);
                }
            }
        };
        return C2s_ActionBase;
    }(game.Packet));
    game.C2s_ActionBase = C2s_ActionBase;
    __reflect(C2s_ActionBase.prototype, "game.C2s_ActionBase");
})(game || (game = {}));
//# sourceMappingURL=C2s_BaseActionPacket.js.map