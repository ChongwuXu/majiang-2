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
     * brief:   加入房间数据
     * date:    2017-11-20
     * author:  徐为
     */
    var C2s_JoinRoomPacket = (function (_super) {
        __extends(C2s_JoinRoomPacket, _super);
        /********************************/
        function C2s_JoinRoomPacket() {
            var _this = _super.call(this) || this;
            _this.m_oHead.m_nPktType = game.Protocol.s_C2S_JOINROOM;
            _this.m_sActionType = game.Packet.s_JoinRoom;
            _this.m_gameType = 1;
            return _this;
        }
        C2s_JoinRoomPacket.prototype.fWrite = function () {
            var by = _super.prototype.fWrite.call(this);
            by.writeShort(this.m_gameName);
            by.writeShort(this.m_gameType);
            by.writeUTF(this.m_sRoomId);
            return by;
        };
        C2s_JoinRoomPacket.prototype.fRead = function (by) {
            _super.prototype.fRead.call(this, by);
            this.m_gameName = by.readShort();
            this.m_gameType = by.readShort();
            this.m_sRoomId = by.readUTF();
            this.fVerifyNumber();
        };
        //成员变量校验
        C2s_JoinRoomPacket.prototype.fVerifyNumber = function () {
            if (this.m_gameType != game.GameType.e_joinRoom) {
                console.info('C2s_JoinRoomPacket this.m_gameType != e_joinRoom, = ' + this.m_gameType);
                alert('C2s_JoinRoomPacket this.m_gameType != e_joinRoom, = ' + this.m_gameType);
            }
        };
        return C2s_JoinRoomPacket;
    }(game.Packet));
    game.C2s_JoinRoomPacket = C2s_JoinRoomPacket;
    __reflect(C2s_JoinRoomPacket.prototype, "game.C2s_JoinRoomPacket");
})(game || (game = {}));
//# sourceMappingURL=C2s_JionRoomPacket.js.map