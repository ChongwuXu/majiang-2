var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * brief:   活动网络逻辑处理
     * date:    2017-11-01
     * author:  徐为f
     */
    var ActionMoudle = (function () {
        function ActionMoudle() {
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_PLAYHAND] = [this, this.fPlayHand];
            // GameSocket.s_aProtocols[Protocol.s_C2S_Ready] = [this, this.fReady]
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_CREATEROOM] = [this, this.fCreateRoom];
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_MOPAI] = [this, this.fCreateRoom];
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_EAT_PAI] = [this, this.fCreateRoom];
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_PENG_PAI] = [this, this.fCreateRoom];
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_GANG_PAI] = [this, this.fCreateRoom];
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_TING_PAI] = [this, this.fCreateRoom];
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_HU_PAI] = [this, this.fCreateRoom];
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_RELATION] = [this, this.fCreateRoom];
            this.m_oHandle = new game.Handle();
        }
        ActionMoudle.prototype.fPlayHand = function (pkt) {
            this.m_oHandle.fSendMessage(pkt.fGetActionType(), pkt);
        };
        ActionMoudle.prototype.fReady = function (pkt) {
            this.m_oHandle.fSendMessage(pkt.fGetActionType());
        };
        ActionMoudle.prototype.fLaunchPai = function (pkt) {
            this.m_oHandle.fSendMessage(pkt.fGetActionType(), pkt);
        };
        ActionMoudle.prototype.fCreateRoom = function (pkt) {
            this.m_oHandle.fSendMessage(pkt.fGetActionType(), pkt);
        };
        ActionMoudle.prototype.fDispatchPkt = function (pktName, pkt) {
            // var event: ModuleEvent = new ModuleEvent(pktName);
            // event.pkt = pkt;
            // WndManager.root.clientSocket.dispatchEvent(event);
        };
        return ActionMoudle;
    }());
    game.ActionMoudle = ActionMoudle;
    __reflect(ActionMoudle.prototype, "game.ActionMoudle");
})(game || (game = {}));
//# sourceMappingURL=ActionMoudle.js.map