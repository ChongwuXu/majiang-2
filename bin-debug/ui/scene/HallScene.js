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
/**
 * brief:   登录
 * date:    2017-11-17
 * author:  徐为
 */
var game;
(function (game) {
    var HallScene = (function (_super) {
        __extends(HallScene, _super);
        //***********************************/
        function HallScene() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/mjSkins/scene/HallScene.exml";
            return _this;
        }
        /**该场景需要加载的资源组 */
        HallScene.prototype.fSceneResGroup = function () {
            return "hall";
        };
        //隐藏麻将和扑克
        HallScene.prototype.fHide = function () {
            this.m_gopGame.visible = false;
            this.m_gopMj.visible = true;
        };
        HallScene.prototype.fShow = function () {
            this.m_gopGame.visible = true;
            this.m_gopMj.visible = false;
        };
        HallScene.prototype.fOnUICreate = function () {
            this.fSetClickButton(this.m_btnMj);
            this.fSetClickButton(this.m_btnXinPu);
            this.fSetClickButton(this.m_btnPingMing);
            this.fSetClickButton(this.m_btnGoBackHall);
            this.m_gopMj.visible = false;
            var self = this;
            this.m_oHandle.fReceiveOnce(this, function (act) {
                var pack = act.m_oDisObj;
                if (pack.fGetHead().m_nErrcode) {
                    game.TipShow.fShow('创建房间失败' + pack.fGetHead().m_nErrcode);
                }
                else {
                    game.GameScenenManager.fGetIns().fEnterScene(game.GameSceneName.MAIN);
                }
            }, game.Packet.s_CreateRoom);
            this.m_oHandle.fReceiveOnce(this, function (act) {
                var joinPack = act.m_oDisObj;
                if (joinPack.fGetHead().m_nErrcode) {
                    game.TipShow.fShow('加入房间失败' + joinPack.fGetHead().m_nErrcode);
                }
                else {
                    //.   self.fExit();
                    game.GameScenenManager.fGetIns().fEnterScene(game.GameSceneName.MAIN);
                }
            }, game.Packet.s_JoinRoom);
            console.log(game.GameScenenManager.fGetIns().fGetLastScene());
            if (game.GameScenenManager.fGetIns().fGetLastScene() == 2) {
                console.log(111111);
                this.fHide();
            }
        };
        HallScene.prototype.fOnClick = function (button) {
            if (button == this.m_btnMj) {
                this.m_gopGame.visible = false;
                this.m_gopMj.visible = true;
                this.m_gopMj.touchEnabled = true;
            }
            else if (this.m_btnXinPu == button) {
                var pack = game.Packet.fCreateAction(game.Packet.s_CreateRoom);
                pack.m_gameName = 0;
                pack.m_nPayStyle = 0;
                pack.m_nCircle = 4;
                Main.fGetIns().m_oGameSocket.fSendPkt(pack);
            }
            else if (this.m_btnPingMing == button) {
                var jonPack = game.Packet.fCreateAction(game.Packet.s_JoinRoom);
                jonPack.m_gameName = 0;
                jonPack.m_sRoomId = '100000';
                Main.fGetIns().m_oGameSocket.fSendPkt(jonPack);
            }
        };
        return HallScene;
    }(game.Scene));
    game.HallScene = HallScene;
    __reflect(HallScene.prototype, "game.HallScene");
})(game || (game = {}));
//# sourceMappingURL=HallScene.js.map