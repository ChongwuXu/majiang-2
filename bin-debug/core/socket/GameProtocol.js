var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * brief:   通讯类型协议
     * date:    2017-10-31
     * author:  徐为
     */
    var Protocol = (function () {
        function Protocol() {
        }
        Protocol.s_C2S_HEARDBEAT = 1; //心跳包
        Protocol.s_C2S_LOGIN = 101; //登录
        Protocol.s_C2S_CREATEROOM = 102; //创建房间
        Protocol.s_C2S_JOINROOM = 103; //加入房间
        Protocol.s_C2S_ROOMINFO = 104; //房间信息
        Protocol.s_C2S_Ready = 200; //准备完毕
        Protocol.s_C2S_StartHand = 202; //开始游戏
        Protocol.s_C2S_BASE = 300;
        Protocol.s_C2S_PLAYHAND = 304; //出牌
        Protocol.s_C2S_MOPAI = 303; //摸牌
        Protocol.s_C2S_HU_PAI = 305; //胡牌
        Protocol.s_C2S_EAT_PAI = 308; //吃牌
        Protocol.s_C2S_PENG_PAI = 307; //碰牌
        Protocol.s_C2S_GANG_PAI = 306; //杠牌
        Protocol.s_C2S_TING_PAI = 309; //听牌
        Protocol.s_C2S_RELATION = 400; //三口关系
        Protocol.s_C2S_SPEAK = 900; //语音聊天
        return Protocol;
    }());
    game.Protocol = Protocol;
    __reflect(Protocol.prototype, "game.Protocol");
})(game || (game = {}));
//# sourceMappingURL=GameProtocol.js.map