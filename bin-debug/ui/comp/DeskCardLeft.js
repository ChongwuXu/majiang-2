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
    var DeskCardLeft = (function (_super) {
        __extends(DeskCardLeft, _super);
        //***********************************/
        //***********************************/
        function DeskCardLeft(cardBase) {
            var _this = _super.call(this, cardBase) || this;
            _this.skinName = "resource/mjSkins/comp/DeskCardLeft.exml";
            return _this;
        }
        DeskCardLeft.prototype.fOnClick = function (button) {
        };
        return DeskCardLeft;
    }(game.DeskCard));
    game.DeskCardLeft = DeskCardLeft;
    __reflect(DeskCardLeft.prototype, "game.DeskCardLeft");
})(game || (game = {}));
//# sourceMappingURL=DeskCardLeft.js.map