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
    var DeskCard = (function (_super) {
        __extends(DeskCard, _super);
        //***********************************/
        function DeskCard(cardBase) {
            var _this = _super.call(this) || this;
            _this.m_oCardBase = cardBase;
            return _this;
        }
        DeskCard.prototype.fOnUICreate = function () {
            if (!Utils.fNotUsefunData(this.m_oCardBase))
                this.m_labName.text = this.m_oCardBase.m_sName;
        };
        DeskCard.prototype.fOnClick = function (button) {
        };
        return DeskCard;
    }(game.Scene));
    game.DeskCard = DeskCard;
    __reflect(DeskCard.prototype, "game.DeskCard");
})(game || (game = {}));
//# sourceMappingURL=DeskCard.js.map