var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * brief:   登录网络逻辑处理
     * date:    2017-11-01
     * author:  徐为
     */
    var LoginNetMoudle = (function () {
        function LoginNetMoudle() {
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_LOGIN] = [this, this.fOnLogin];
            this.m_oHandle = new game.Handle();
        }
        LoginNetMoudle.prototype.fOnLogin = function (pkt) {
        };
        return LoginNetMoudle;
    }());
    game.LoginNetMoudle = LoginNetMoudle;
    __reflect(LoginNetMoudle.prototype, "game.LoginNetMoudle");
})(game || (game = {}));
//# sourceMappingURL=LoginNetMoudle.js.map