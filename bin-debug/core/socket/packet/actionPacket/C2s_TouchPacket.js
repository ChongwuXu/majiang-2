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
       * brief:   摸排
       * date:    2017-12-04
       * author:  徐为
     */
    var C2s_TouchPacket = (function (_super) {
        __extends(C2s_TouchPacket, _super);
        /********************************/
        /********************************/
        function C2s_TouchPacket() {
            var _this = _super.call(this) || this;
            _this.m_oHead.m_nPktType = game.Protocol.s_C2S_MOPAI;
            _this.m_sActionType = game.Packet.s_Touch;
            return _this;
        }
        C2s_TouchPacket.prototype.fWrite = function () {
            var by = _super.prototype.fWrite.call(this);
            return by;
        };
        C2s_TouchPacket.prototype.fRead = function (by) {
            _super.prototype.fRead.call(this, by);
            game.GameManager.fGetIns().m_nPlayerActionPos = this.m_pCurrentPlayer;
            if (this.fGetBelongPlayerPos() == this.fGetCurrPlayrPos()) {
                var card = this.m_aGroupCards[0].fGetCard()[0];
                if (Utils.fNotUsefunData(card)) {
                    console.error("C2s_TouchPacket var card = this.m_aGroupCards[0].fGetCard()[0];");
                }
                game.GameManager.fGetIns().m_oTouchHandCard = new game.HandCardDown(card);
                console.info(" GameManager.fGetIns().m_oTouchHandCard" + game.GameManager.fGetIns().m_oTouchHandCard.m_oCardBase);
            }
            console.info('dddd');
            this.fVerifyNumber();
        };
        //成员变量校验
        C2s_TouchPacket.prototype.fVerifyNumber = function () {
            // if(this.m_nCardsCount != 3)
            {
                //    console.info('C2s_EatAction this.m_nCardsCount != 3, = ' + this.m_nCardsCount);
                //   alert('C2s_EatAction this.m_nCardsCount != 3, = ' + this.m_nCardsCount);
            }
        };
        return C2s_TouchPacket;
    }(game.C2s_ActionBase));
    game.C2s_TouchPacket = C2s_TouchPacket;
    __reflect(C2s_TouchPacket.prototype, "game.C2s_TouchPacket");
})(game || (game = {}));
//# sourceMappingURL=C2s_TouchPacket.js.map