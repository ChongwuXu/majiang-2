var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * brief:   加入房间网络逻辑处理
     * date:    2017-12-01
     * author:  徐为
     */
    var JoinRoomMoudle = (function () {
        function JoinRoomMoudle() {
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_JOINROOM] = [this, this.fJoinRoom];
            this.m_oHandle = new game.Handle();
        }
        JoinRoomMoudle.prototype.fJoinRoom = function (pkt) {
            this.m_oHandle.fSendMessage(pkt.fGetActionType(), pkt);
        };
        return JoinRoomMoudle;
    }());
    game.JoinRoomMoudle = JoinRoomMoudle;
    __reflect(JoinRoomMoudle.prototype, "game.JoinRoomMoudle");
})(game || (game = {}));
//# sourceMappingURL=JoinRoomMoudle.js.map