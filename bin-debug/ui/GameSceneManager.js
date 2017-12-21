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
 * brief:   游戏场景管理
 * date:    2017-11-03
 * author:  徐为
 */
var game;
(function (game) {
    var GameScenenManager = (function (_super) {
        __extends(GameScenenManager, _super);
        function GameScenenManager() {
            return _super.call(this) || this;
        }
        GameScenenManager.fGetIns = function () {
            if (!GameScenenManager.s_Ins)
                GameScenenManager.s_Ins = new GameScenenManager;
            return GameScenenManager.s_Ins;
        };
        GameScenenManager.prototype.fEnterScene = function (scene) {
            var topScene = this.fGetTopScene();
            if (topScene != scene) {
                this.fAddScene(scene);
            }
            this.fChangeToScene(scene);
        };
        GameScenenManager.prototype.fChangeToScene = function (scene, fadeIn, showLoad) {
            if (fadeIn === void 0) { fadeIn = true; }
            if (showLoad === void 0) { showLoad = true; }
            var main = Main.fGetIns();
            main.GetShowTipLayer().removeChildren();
            var lastScene = this.m_oCurrentScene;
            if (lastScene && (showLoad)) {
                lastScene.parent.removeChild(lastScene);
                lastScene.fRelease();
            }
            this.m_oCurrentScene = GameScenenManager.fCreateScene(scene);
            var self = this;
            var callback = function () {
                main.m_oGameLayer.addChild(self.m_oCurrentScene);
                if (lastScene && fadeIn) {
                    self.m_oCurrentScene.alpha = 0;
                    var tw = egret.Tween.get(self.m_oCurrentScene);
                    tw.wait(800).to({ alpha: 1 }, 1000, egret.Ease.sineIn);
                }
            };
            if (showLoad)
                main.fLoadResGroup(this.m_oCurrentScene.fSceneResGroup(), true, callback);
            else {
                var tw = egret.Tween.get(lastScene);
                tw.wait(500).to({ alpha: 0.1 }, 1000, egret.Ease.sineIn).call(function () {
                    lastScene.parent.removeChild(lastScene);
                    lastScene.fRelease();
                });
                callback();
            }
        };
        GameScenenManager.prototype.fBackToLastScene = function () {
            if (this.fGetSceneStackLength() > 1) {
                this.fPop();
                this.fChangeToScene(this.fGetTopScene(), true, false);
            }
        };
        GameScenenManager.prototype.fGetlastGameScene = function () {
            return this.fGetLastScene();
        };
        GameScenenManager.prototype.fGetCurrentGameScene = function () {
            return this.fGetTopScene();
        };
        GameScenenManager.fCreateScene = function (scene) {
            var gameScene;
            switch (scene) {
                case GameSceneName.LOGIN:
                    gameScene = new game.LoginScene;
                    break;
                case GameSceneName.LOG:
                    gameScene = new game.LoginScene;
                    break;
                case GameSceneName.HALL:
                    gameScene = new game.HallScene;
                    break;
                case GameSceneName.MAIN:
                    gameScene = new game.MainScene;
                    break;
                default:
                    alert('fCreateScene fail ' + scene);
            }
            return gameScene;
        };
        return GameScenenManager;
    }(game.SceneManager));
    game.GameScenenManager = GameScenenManager;
    __reflect(GameScenenManager.prototype, "game.GameScenenManager");
    var GameSceneName;
    (function (GameSceneName) {
        GameSceneName[GameSceneName["LOGIN"] = 0] = "LOGIN";
        GameSceneName[GameSceneName["HALL"] = 1] = "HALL";
        GameSceneName[GameSceneName["MAIN"] = 2] = "MAIN";
        GameSceneName[GameSceneName["LOG"] = 3] = "LOG";
    })(GameSceneName = game.GameSceneName || (game.GameSceneName = {}));
})(game || (game = {}));
//# sourceMappingURL=GameSceneManager.js.map