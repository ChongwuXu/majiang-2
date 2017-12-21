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
     * brief:   心跳包数据
     * date:    2017-10-31
     * author:  徐为
     */
    var C2s_HeartBeat = (function (_super) {
        __extends(C2s_HeartBeat, _super);
        function C2s_HeartBeat() {
            var _this = _super.call(this) || this;
            _this.m_oHead.m_nPktType = game.Protocol.s_C2S_HEARDBEAT;
            C2s_HeartBeat.s_nNumber++;
            return _this;
        }
        C2s_HeartBeat.prototype.fRead = function (by) {
            _super.prototype.fRead.call(this, by);
            var num = by.fReadLong();
            if (num < C2s_HeartBeat.s_nNumber)
                console.warn('心跳包丢失,发送个数' + C2s_HeartBeat.s_nNumber + '接收个数' + num);
        };
        C2s_HeartBeat.prototype.fWrite = function () {
            var by = _super.prototype.fWrite.call(this);
            by.fWriteLong(C2s_HeartBeat.s_nNumber);
            return by;
        };
        /********************************/
        C2s_HeartBeat.s_nNumber = 0; //当前心跳次数
        return C2s_HeartBeat;
    }(game.Packet));
    game.C2s_HeartBeat = C2s_HeartBeat;
    __reflect(C2s_HeartBeat.prototype, "game.C2s_HeartBeat");
})(game || (game = {}));
//# sourceMappingURL=C2s_HeartPacket.js.map