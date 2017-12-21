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
       * brief:   出牌活动数据包
       * date:    2017-11-09
       * author:  徐为
     */
    var C2s_PlayHandAction = (function (_super) {
        __extends(C2s_PlayHandAction, _super);
        function C2s_PlayHandAction() {
            var _this = _super.call(this) || this;
            _this.m_oHead.m_nPktType = game.Protocol.s_C2S_PLAYHAND;
            _this.m_sActionType = game.Packet.s_PlayHand;
            return _this;
            //   this.m_nCardsCount = 1;
        }
        C2s_PlayHandAction.prototype.fWrite = function () {
            var by = _super.prototype.fWrite.call(this);
            return by;
        };
        C2s_PlayHandAction.prototype.fRead = function (by) {
            _super.prototype.fRead.call(this, by);
            // if(this.fGetBelongPlayerPos() == this.fGetCurrPlayrPos())
            //  {
            var card = this.m_aGroupCards[0].fGetCard()[0];
            if (Utils.fNotUsefunData(card)) {
                console.error("C2s_PlayHandAction  var card = this.m_aGroupCards[0].fGetCard()[0];");
            }
            game.GameManager.fGetIns().m_oChuHandCard = new game.HandCardDown(card);
            console.info('dd');
            // }
            this.fVerifyNumber();
        };
        //成员变量校验
        C2s_PlayHandAction.prototype.fVerifyNumber = function () {
            // if(this.m_nCardsCount != 1)
            {
                //  console.info('C2s_PlayHandAction this.m_nCardsCount != 1, = ' + this.m_nCardsCount);
                // alert('C2s_PlayHandAction this.m_nCardsCount != 1, = ' + this.m_nCardsCount);
            }
        };
        return C2s_PlayHandAction;
    }(game.C2s_ActionBase));
    game.C2s_PlayHandAction = C2s_PlayHandAction;
    __reflect(C2s_PlayHandAction.prototype, "game.C2s_PlayHandAction");
})(game || (game = {}));
//# sourceMappingURL=C2s_PlayHandPacket.js.map