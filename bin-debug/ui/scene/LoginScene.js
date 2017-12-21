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
    var LoginScene = (function (_super) {
        __extends(LoginScene, _super);
        //***********************************/
        function LoginScene() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/mjSkins/scene/LoginScene.exml";
            return _this;
        }
        /**该场景需要加载的资源组 */
        LoginScene.prototype.fSceneResGroup = function () {
            return "login";
        };
        LoginScene.prototype.fOnUICreate = function () {
            this.m_textIptUid = new eui.TextInput();
            this.m_textIptUid.width = 15;
            this.m_textIptUid.prompt = "请输入账号:";
            this.m_textIptUid.textColor = 0xffffff;
            this.m_textIptUid.restrict = "0-9";
            this.m_textIptUid.x = this.width / 7 + 50;
            this.m_textIptUid.y = this.height - 80;
            this.addChild(this.m_textIptUid);
            this.fSetClickButton(this.m_btnLogin);
        };
        LoginScene.prototype.onChange = function () { };
        LoginScene.prototype.fOnClick = function (button) {
            if (Utils.fNotUsefunData(this.m_textIptUid.text)) {
                // alert('未输入账号')
                game.TipShow.fShow('请输入账号');
                return;
            }
            game.GameManager.fGetIns().m_sFirstPlayerUid = this.m_textIptUid.text;
            Main.fGetIns().m_oGameSocket.fInitSocket();
            game.GameScenenManager.fGetIns().fEnterScene(game.GameSceneName.HALL);
        };
        return LoginScene;
    }(game.Scene));
    game.LoginScene = LoginScene;
    __reflect(LoginScene.prototype, "game.LoginScene");
})(game || (game = {}));
//# sourceMappingURL=LoginScene.js.map