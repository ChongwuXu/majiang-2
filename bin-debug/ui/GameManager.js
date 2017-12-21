var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
* brief:   游戏名
* date:    2017-11-09
* author:  徐为
*/
    var GameName;
    (function (GameName) {
        GameName[GameName["e_xinPuMj"] = 0] = "e_xinPuMj";
        GameName[GameName["e_ganYuMj"] = 1] = "e_ganYuMj";
    })(GameName = game.GameName || (game.GameName = {}));
    /**
     * brief:   游戏方式
     * date:    2017-11-09
     * author:  徐为
     */
    var GameType;
    (function (GameType) {
        GameType[GameType["e_createRooom"] = 0] = "e_createRooom";
        GameType[GameType["e_joinRoom"] = 1] = "e_joinRoom";
    })(GameType = game.GameType || (game.GameType = {}));
    var BaseUserInfo = (function () {
        function BaseUserInfo() {
        }
        return BaseUserInfo;
    }());
    game.BaseUserInfo = BaseUserInfo;
    __reflect(BaseUserInfo.prototype, "game.BaseUserInfo");
    var GameBaseInfo = (function () {
        function GameBaseInfo() {
            this.m_aDiceNum = []; //筛子数
            /********************************/
        }
        return GameBaseInfo;
    }());
    game.GameBaseInfo = GameBaseInfo;
    __reflect(GameBaseInfo.prototype, "game.GameBaseInfo");
    var GameManager = (function () {
        /********************************/
        function GameManager() {
            /********************************/
            this.m_oGameBaseInfo = new GameBaseInfo;
            this.m_aHandCardsDown = [];
            this.m_oTouchHandCard = null; //当前摸到的牌
            this.m_aPlayerInfo = [];
            this.m_bCreateRoom = false; //是否第一玩家创建的游戏
            this.m_aPackets = [];
            this.m_bFirstTouchCard = false;
            this.m_nGameSpeed = 1; //游戏速度
        }
        GameManager.fGetIns = function () {
            if (!GameManager.s_ins) {
                GameManager.s_ins = new GameManager();
            }
            return GameManager.s_ins;
        };
        GameManager.prototype.fIsCreateGame = function () {
            return this.m_bCreateRoom;
        };
        GameManager.prototype.fSetCreateRoom = function (create) {
            this.m_bCreateRoom = create;
        };
        GameManager.prototype.fResetByRoomInfoPacket = function (pak) {
            this.m_sRoomId = pak.m_sRoomId;
            var userInfo = pak.m_aPlayerInfo;
            for (var i in userInfo) {
                if (userInfo[i].m_sUid == GameManager.fGetIns().m_sFirstPlayerUid)
                    this.m_pFirstPlayerPos = userInfo[i].m_pPosition;
            }
            //玩家信息
            for (var i in userInfo) {
                var info = new BaseUserInfo();
                info.m_sUid = userInfo[i].m_sUid;
                info.m_nStatus = userInfo[i].m_nStatus;
                this.m_aPlayerInfo.push(info);
            }
        };
        GameManager.prototype.fSetFirstPos = function (pak) {
            for (var i in pak.m_aPlayerInfo) {
                if (pak.m_aPlayerInfo[i] == undefined)
                    continue;
                if (pak.m_aPlayerInfo[i].m_sUid == GameManager.fGetIns().m_sFirstPlayerUid)
                    GameManager.fGetIns().m_pFirstPlayerPos = pak.m_aPlayerInfo[i].m_pPosition;
            }
        };
        GameManager.prototype.fGetPlayerInfo = function () {
            return this.m_aPlayerInfo;
        };
        GameManager.prototype.fPushPlayerInfo = function (info) {
            for (var i in this.m_aPlayerInfo) {
                if (parseInt(i) == info.m_pDeskPos) {
                    return;
                }
            }
            this.m_aPlayerInfo[info.m_pDeskPos] = info;
        };
        GameManager.s_ReadyCancel = 104;
        return GameManager;
    }());
    game.GameManager = GameManager;
    __reflect(GameManager.prototype, "game.GameManager");
})(game || (game = {}));
//# sourceMappingURL=GameManager.js.map