var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * brief:   房间网络逻辑处理
     * date:    2017-11-01
     * author:  徐为
     */
    var RoomMoudle = (function () {
        function RoomMoudle() {
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_ROOMINFO] = [this, this.fRoom];
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_Ready] = [this, this.fRoom];
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_StartHand] = [this, this.fRoom];
            this.m_oHandle = new game.Handle();
        }
        RoomMoudle.prototype.fRoom = function (pkt) {
            this.m_oHandle.fSendMessage(pkt.fGetActionType(), pkt);
        };
        RoomMoudle.prototype.fReadyActive = function (pkt) {
            this.m_oHandle.fSendMessage(pkt.fGetActionType(), pkt);
        };
        return RoomMoudle;
    }());
    game.RoomMoudle = RoomMoudle;
    __reflect(RoomMoudle.prototype, "game.RoomMoudle");
})(game || (game = {}));
//# sourceMappingURL=RoomMoudle.js.map