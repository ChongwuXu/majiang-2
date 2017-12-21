var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * brief:   创建房间网络逻辑处理
     * date:    2017-11-01
     * author:  徐为
     */
    var CreateRoomMoudle = (function () {
        function CreateRoomMoudle() {
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_CREATEROOM] = [this, this.fCreateRoom];
            game.GameSocket.s_aProtocols[game.Protocol.s_C2S_SPEAK] = [this, this.fCreateRoom];
            this.m_oHandle = new game.Handle();
        }
        CreateRoomMoudle.prototype.fSpeak = function (pkt) {
            this.m_oHandle.fSendMessage(pkt.fGetActionType(), pkt);
        };
        CreateRoomMoudle.prototype.fCreateRoom = function (pkt) {
            game.GameManager.fGetIns().m_oGameBaseInfo.m_gameName = pkt.m_gameName;
            game.GameManager.fGetIns().m_oGameBaseInfo.m_gameType = pkt.m_gameType; ////fSetGameStyle(pkt.m_gameType);
            game.GameManager.fGetIns().m_oGameBaseInfo.m_nPayStyle = pkt.m_nPayStyle;
            game.GameManager.fGetIns().m_oGameBaseInfo.m_nCircle = pkt.m_nCircle;
            game.GameManager.fGetIns().m_sRoomId = pkt.m_sRoomId;
            var useinfo = new game.BaseUserInfo();
            useinfo.m_sUid = game.GameManager.fGetIns().m_sFirstPlayerUid;
            useinfo.m_nStatus = 0;
            useinfo.m_pDeskPos = game.GameManager.fGetIns().m_pCreatorPos;
            game.GameManager.fGetIns().fGetPlayerInfo()[useinfo.m_pDeskPos] = useinfo;
            this.m_oHandle.fSendMessage(pkt.fGetActionType(), pkt);
            //this.m_oHandle.fSendMessage(Packet.s_RoomInfo,   GameManager.fGetIns().m_aPlayerInfo)
        };
        return CreateRoomMoudle;
    }());
    game.CreateRoomMoudle = CreateRoomMoudle;
    __reflect(CreateRoomMoudle.prototype, "game.CreateRoomMoudle");
})(game || (game = {}));
//# sourceMappingURL=CreateRoomMoudle.js.map