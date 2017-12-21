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
 * brief:
 * date:    2017-12-7
 * author:  徐为
 */
var game;
(function (game) {
    var YaoQingLayer = (function (_super) {
        __extends(YaoQingLayer, _super);
        //***********************************/
        function YaoQingLayer() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/mjSkins/layer/YaoQingLayer.exml";
            return _this;
        }
        YaoQingLayer.prototype.fSceneResGroup = function () {
            return "";
        };
        YaoQingLayer.prototype.fOnUICreate = function () {
            this.m_bCompOnUICreate = true;
            this.touchEnabled = false;
            this.m_gopNotOwner.touchEnabled = false;
            this.m_gopOwner.touchEnabled = false;
            if (!game.GameManager.fGetIns().fIsCreateGame())
                this.m_gopOwner.parent.removeChild(this.m_gopOwner);
            else
                this.m_gopNotOwner.parent.removeChild(this.m_gopNotOwner);
            this.fSetClickButton(this.m_btnJieSan);
            this.fSetClickButton(this.m_btnLeval);
            this.fSetClickButton(this.m_btnLevalNot);
        };
        YaoQingLayer.prototype.fOnClick = function (button) {
            if (this.m_btnJieSan == button || this.m_btnLeval == button || this.m_btnLevalNot == button) {
                game.GameScenenManager.fGetIns().fEnterScene(game.GameSceneName.HALL);
            }
        };
        return YaoQingLayer;
    }(game.Scene));
    game.YaoQingLayer = YaoQingLayer;
    __reflect(YaoQingLayer.prototype, "game.YaoQingLayer");
})(game || (game = {}));
//# sourceMappingURL=YaoQingLayer.js.map