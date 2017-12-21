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
     * brief:   玩家信息
     * date:    2017-11-30
     * author:  徐为
     */
    var C2s_UserInfoPacket = (function (_super) {
        __extends(C2s_UserInfoPacket, _super);
        /********************************/
        function C2s_UserInfoPacket() {
            var _this = _super.call(this) || this;
            _this.m_aPlayCardGroup = [];
            _this.m_oHead.m_nPktType = game.Protocol.s_C2S_ROOMINFO;
            _this.m_sActionType = game.Packet.s_RoomInfo;
            _this.m_pPosition = game.PlayePosition.e_Unknow;
            return _this;
        }
        C2s_UserInfoPacket.prototype.fGetHandCardGop = function () {
            for (var i in this.m_aPlayCardGroup) {
                if (this.m_aPlayCardGroup[i].m_oCardStatus.m_nStatusType == game.CardStatus.s_Status_Hand)
                    return this.m_aPlayCardGroup[i];
            }
        };
        /* public fWrite():GameByteArray{
               var by = super.fWrite();
               by.writeShort(this.m_gameName);
               by.writeShort(this.m_gameType);
               by.writeShort(this.m_nPayStyle);
               by.writeShort(this.m_nCircle);
               by.writeUTF(this.m_sRoomId);
               by.writeShort(this.m_pPosition);
               return by;
            }*/
        C2s_UserInfoPacket.prototype.fRead = function (by, sup) {
            if (sup === void 0) { sup = true; }
            if (sup) {
                _super.prototype.fRead.call(this, by);
            }
            this.m_sUid = by.readUTF();
            this.m_sUserName = by.readUTF();
            this.m_nVipDegree = by.readShort();
            this.m_sUserIcon = by.readUTF();
            this.m_nStatus = by.readShort();
            this.m_pPosition = by.readShort();
            this.m_nGroupNum = by.readShort();
            for (var i = 0; i < this.m_nGroupNum; i++) {
                var gop = new game.CardGroup();
                gop.fRead(by);
                this.m_aPlayCardGroup.push(gop);
            }
            // GameManager.fGetIns().m_oRoomInfo.m_sRoomId = this.m_sRoomId;
            // this.m_pPosition = by.readShort();
            //   GameManager.fGetIns().m_pCreatorPos = this.m_pPosition;
            this.fVerifyNumber();
        };
        C2s_UserInfoPacket.prototype.fWrite_0 = function (by) {
            return null;
        };
        //成员变量校验
        C2s_UserInfoPacket.prototype.fVerifyNumber = function () {
        };
        return C2s_UserInfoPacket;
    }(game.Packet));
    game.C2s_UserInfoPacket = C2s_UserInfoPacket;
    __reflect(C2s_UserInfoPacket.prototype, "game.C2s_UserInfoPacket");
})(game || (game = {}));
//# sourceMappingURL=C2s_UserInfoPacket.js.map