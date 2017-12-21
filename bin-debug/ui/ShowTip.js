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
 * brief:   通用提示框
 * date:    2017-11-22
 * author:  徐为
 */
var game;
(function (game) {
    var TipShow = (function (_super) {
        __extends(TipShow, _super);
        //***********************************/
        function TipShow(tip) {
            var _this = _super.call(this) || this;
            _this.m_sTipText = tip;
            _this.skinName = "resource/gameSkins/layer/ShowTip.exml";
            return _this;
        }
        TipShow.fShow = function (tip) {
            var tipshow = new TipShow(tip);
            //    Main.fGetIns().GetShowTipLayer().addChild(tipshow);
        };
        TipShow.prototype.fOnUICreate = function () {
            this.m_labTip.text = this.m_sTipText;
            this.fSetClickButton(this);
        };
        TipShow.prototype.fOnClick = function (button) {
            this.parent.removeChild(this);
        };
        return TipShow;
    }(game.Scene));
    game.TipShow = TipShow;
    __reflect(TipShow.prototype, "game.TipShow");
})(game || (game = {}));
//# sourceMappingURL=ShowTip.js.map