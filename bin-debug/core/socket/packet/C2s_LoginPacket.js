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
     * brief:   登录包数据
     * date:    2017-10-31
     * author:  徐为
     */
    var C2s_GameLogin = (function (_super) {
        __extends(C2s_GameLogin, _super);
        /********************************/
        /********************************/
        function C2s_GameLogin() {
            var _this = _super.call(this) || this;
            _this.m_oHead.m_nPktType = game.Protocol.s_C2S_LOGIN;
            _this.m_sActionType = game.Packet.s_Login;
            return _this;
        }
        C2s_GameLogin.prototype.fRead = function (by) {
            _super.prototype.fRead.call(this, by);
            var uid = by.readUTF();
            //   GameManager.fGetIns().fSetUid(uid);
            if (Utils.fNotUsefunData(uid))
                console.warn("NotUserfunData");
            var loginType = by.readShort();
            game.GameManager.fGetIns().m_oGameBaseInfo.m_nLoginType = loginType;
            if (Utils.fNotUsefunData(loginType))
                console.warn("NotUserfunData");
        };
        C2s_GameLogin.prototype.fWrite = function () {
            var by = _super.prototype.fWrite.call(this);
            // var uid = GameManager.fGetIns().fGetUid();
            // if(Utils.fNotUsefunData(uid))
            //  console.warn("NotUserfunData");
            // by.writeUTF(uid);
            var type = game.GameManager.fGetIns().m_oGameBaseInfo.m_nLoginType;
            if (Utils.fNotUsefunData(type))
                console.warn("NotUserfunData");
            by.writeShort(type);
            return by;
        };
        return C2s_GameLogin;
    }(game.Packet));
    game.C2s_GameLogin = C2s_GameLogin;
    __reflect(C2s_GameLogin.prototype, "game.C2s_GameLogin");
})(game || (game = {}));
//# sourceMappingURL=C2s_LoginPacket.js.map