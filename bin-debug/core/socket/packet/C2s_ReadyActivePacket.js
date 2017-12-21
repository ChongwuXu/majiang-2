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
     * brief:   准备包数据
     * date:    2017-10-31
     * author:  徐为
     */
    var S2C_ReadyActive = (function (_super) {
        __extends(S2C_ReadyActive, _super);
        /********************************/
        function S2C_ReadyActive() {
            var _this = _super.call(this) || this;
            _this.m_aReadyPos = [];
            _this.m_oHead.m_nPktType = game.Protocol.s_C2S_Ready;
            _this.m_sActionType = game.Packet.s_PlayerReady;
            return _this;
        }
        S2C_ReadyActive.prototype.fRead = function (by) {
            _super.prototype.fRead.call(this, by);
            this.m_nReadyNum = by.readShort();
            for (var i = 0; i < this.m_nReadyNum; i++) {
                var pos = by.readShort();
                this.m_aReadyPos.push(pos);
            }
        };
        S2C_ReadyActive.prototype.fWrite = function () {
            var by = _super.prototype.fWrite.call(this);
            by.writeShort(this.m_nReadyNum);
            for (var i = 0; i < this.m_nReadyNum; i++) {
                by.writeShort(this.m_aReadyPos[i]);
            }
            return by;
        };
        return S2C_ReadyActive;
    }(game.Packet));
    game.S2C_ReadyActive = S2C_ReadyActive;
    __reflect(S2C_ReadyActive.prototype, "game.S2C_ReadyActive");
})(game || (game = {}));
//# sourceMappingURL=C2s_ReadyActivePacket.js.map