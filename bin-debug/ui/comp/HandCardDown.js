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
 * brief:   头像
 * date:    2017-12-7
 * author:  徐为
 */
var game;
(function (game) {
    var HandCardDown = (function (_super) {
        __extends(HandCardDown, _super);
        //***********************************/
        function HandCardDown(cardBase) {
            var _this = _super.call(this) || this;
            _this.m_oCardBase = cardBase;
            _this.skinName = "resource/mjSkins/comp/HandCardDown.exml";
            return _this;
        }
        HandCardDown.prototype.fOnUICreate = function () {
            this.m_labName.text = this.m_oCardBase.m_sName;
        };
        HandCardDown.prototype.fOnClick = function (button) {
        };
        return HandCardDown;
    }(game.Scene));
    game.HandCardDown = HandCardDown;
    __reflect(HandCardDown.prototype, "game.HandCardDown");
})(game || (game = {}));
//# sourceMappingURL=HandCardDown.js.map