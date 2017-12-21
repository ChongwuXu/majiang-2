var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * brief:   场景管理
 * date:    2017-11-02
 * author:  徐为
 */
var game;
(function (game) {
    var SceneManager = (function () {
        /********************************/
        function SceneManager() {
            /********************************/
            this.m_nMaxSceneCount = 5;
            this.m_oSceneStack = [];
        }
        SceneManager.prototype.fGetTopScene = function () {
            if (this.m_oSceneStack.length < 1)
                return null;
            return this.m_oSceneStack[this.m_oSceneStack.length - 1];
        };
        SceneManager.prototype.fAddScene = function (sceneName) {
            var curScene = this.fGetTopScene();
            this.m_oLastScene = curScene;
            if (sceneName != undefined && curScene != sceneName) {
                if (this.m_oSceneStack.length >= this.m_nMaxSceneCount) {
                    this.m_oSceneStack.shift();
                }
                this.m_oSceneStack.push(sceneName);
                return true;
            }
            return false;
        };
        SceneManager.prototype.fGetSceneStackLength = function () {
            return this.m_oSceneStack.length;
        };
        SceneManager.prototype.fClear = function () {
            this.m_oSceneStack = [];
        };
        SceneManager.prototype.fGetLastScene = function () {
            return this.m_oLastScene;
        };
        SceneManager.prototype.fPop = function () {
            this.m_oLastScene = this.fGetTopScene();
            this.m_oSceneStack.pop();
        };
        return SceneManager;
    }());
    game.SceneManager = SceneManager;
    __reflect(SceneManager.prototype, "game.SceneManager");
})(game || (game = {}));
//# sourceMappingURL=SceneManager.js.map