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
 * brief:   加载场景
 * date:    2017-11-03
 * author:  徐为
 */
var game;
(function (game) {
    var LoadingScene = (function (_super) {
        __extends(LoadingScene, _super);
        /********************************/
        function LoadingScene() {
            var _this = _super.call(this) || this;
            _this.m_bCreated = false;
            _this.bTips = false;
            _this.skinName = "resource/mjSkins/scene/LoadingScene.exml";
            return _this;
        }
        LoadingScene.prototype.fOnUICreate = function () {
            this.m_nLastUpdateTime = 0;
            _super.prototype.fOnUICreate.call(this);
            // this.m_bCreated = true;
            //  this.m_oProgress = new Progress(this.m_imgProgressL, this.m_imgProgressR);
            //  this.m_oProgress.setCurProgress(0);
            //  if (this.bTips)
            //  {
            //    this.fShowTips();
            // }    
        };
        LoadingScene.prototype.fUpdate = function (dt_ms) {
            this.m_nLastUpdateTime += dt_ms;
            if (this.m_nLastUpdateTime >= 160) {
                if (this.m_labLoading.text == "加载中...") {
                    this.m_labLoading.text = '加载中';
                }
                else if (this.m_labLoading.text == '加载中') {
                    this.m_labLoading.text = '加载中.';
                }
                else if (this.m_labLoading.text == '加载中.') {
                    this.m_labLoading.text = '加载中..';
                }
                else if (this.m_labLoading.text == '加载中..') {
                    this.m_labLoading.text = '加载中...';
                }
                this.m_nLastUpdateTime = 0;
            }
        };
        LoadingScene.prototype.fSetProgress = function (progress) {
            if (this.m_oProgress) {
                this.m_oProgress.setCurProgress(progress);
                var percent = Math.floor(progress * 100);
            }
        };
        LoadingScene.prototype.fShowTips = function () {
            // if (!this.m_bCreated) return;
            // var count = Common.LOADING_HELP.length;
            // var index = GameUtils.getRandom(0, count - 1);
            //var tips = Common.LOADING_HELP[index];
            // this.labelHelpTips.text = tips;
        };
        LoadingScene.prototype.fStartHelpTips = function () {
            this.bTips = true;
            this.fShowTips();
        };
        return LoadingScene;
    }(game.Scene));
    game.LoadingScene = LoadingScene;
    __reflect(LoadingScene.prototype, "game.LoadingScene");
})(game || (game = {}));
//# sourceMappingURL=LoadingScene.js.map