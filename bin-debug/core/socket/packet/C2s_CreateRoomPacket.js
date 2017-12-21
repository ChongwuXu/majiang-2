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
     * brief:   创建房间数据
     * date:    2017-10-31
     * author:  徐为
     */
    var C2s_CreateRoomPacket = (function (_super) {
        __extends(C2s_CreateRoomPacket, _super);
        /********************************/
        function C2s_CreateRoomPacket() {
            var _this = _super.call(this) || this;
            _this.m_s = '';
            _this.m_oHead.m_nPktType = game.Protocol.s_C2S_CREATEROOM;
            _this.m_sActionType = game.Packet.s_CreateRoom;
            _this.m_sRoomId = "";
            _this.m_gameName = game.GameName.e_ganYuMj;
            _this.m_gameType = game.GameType.e_createRooom;
            _this.m_nPayStyle = 0;
            _this.m_nCircle = 4;
            _this.m_pPosition = game.PlayePosition.e_Unknow;
            _this.m_nGameChoice = 7;
            return _this;
        }
        C2s_CreateRoomPacket.prototype.fWrite = function () {
            var by = _super.prototype.fWrite.call(this);
            by.writeShort(this.m_gameName);
            by.writeShort(this.m_gameType);
            by.writeShort(this.m_nPayStyle);
            by.writeShort(this.m_nCircle);
            by.writeUTF(this.m_sRoomId);
            by.writeShort(this.m_pPosition);
            by.writeShort(this.m_nGameChoice);
            return by;
        };
        C2s_CreateRoomPacket.prototype.fRead = function (by) {
            _super.prototype.fRead.call(this, by);
            this.m_gameName = by.readShort();
            this.m_gameType = by.readShort();
            this.m_nPayStyle = by.readShort();
            this.m_nCircle = by.readShort();
            this.m_sRoomId = by.readUTF();
            game.GameManager.fGetIns().m_sRoomId = this.m_sRoomId;
            this.m_pPosition = by.readShort();
            game.GameManager.fGetIns().m_pCreatorPos = this.m_pPosition;
            game.GameManager.fGetIns().m_pCreatorPos = this.m_pPosition;
            game.GameManager.fGetIns().fSetCreateRoom(true);
            this.m_nGameChoice = by.readShort();
            this.fVerifyNumber();
        };
        //成员变量校验
        C2s_CreateRoomPacket.prototype.fVerifyNumber = function () {
            if (this.m_nPayStyle >= 2) {
                console.info('C2s_HeartCreateRoomPacket this.m_nPayStyle >= 2, = ' + this.m_nPayStyle);
                alert('C2s_HeartCreateRoomPacket this.m_nPayStyle >= 2, = ' + this.m_nPayStyle);
            }
            if (this.m_gameType != game.GameType.e_createRooom) {
                console.info('C2s_HeartCreateRoomPacket this.m_gameType != e_createRooom, = ' + this.m_gameType);
                alert('C2s_HeartCreateRoomPacket this.m_gameType != e_createRooom, = ' + this.m_gameType);
            }
        };
        return C2s_CreateRoomPacket;
    }(game.Packet));
    game.C2s_CreateRoomPacket = C2s_CreateRoomPacket;
    __reflect(C2s_CreateRoomPacket.prototype, "game.C2s_CreateRoomPacket");
})(game || (game = {}));
//# sourceMappingURL=C2s_CreateRoomPacket.js.map