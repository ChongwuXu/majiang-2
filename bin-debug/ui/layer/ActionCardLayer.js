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
 * brief:   主场景
 * date:    2017-12-7
 * author:  徐为
 */
var game;
(function (game) {
    var ActionCardLayer = (function (_super) {
        __extends(ActionCardLayer, _super);
        //***********************************/
        function ActionCardLayer() {
            var _this = _super.call(this) || this;
            _this.m_aActionCardDown = [];
            _this.m_aActionCardLeft = [];
            _this.m_aActionCardRight = [];
            _this.m_aActionCardUp = [];
            _this.skinName = "resource/mjSkins/layer/ActionCardLayer.exml";
            return _this;
        }
        ActionCardLayer.prototype.fOnUICreate = function () {
            this.m_bCompOnUICreate = true;
        };
        ActionCardLayer.prototype.fOnClick = function (button) {
        };
        ActionCardLayer.prototype.fAddCard = function (arrCardBase, pos) {
            var gamePos = Utils.fDeskPosToGamePosFirst(pos);
            var i = 0;
            var dis = 0;
            if (gamePos == game.PlayePosition.e_Left) {
                if (this.m_aActionCardLeft.length > 0)
                    dis = this.m_aActionCardLeft[this.m_aActionCardLeft.length - 1].y;
                for (i = 0; i < arrCardBase.length; i++) {
                    var left = new game.DeskCardLeft(arrCardBase[i]);
                    this.m_aActionCardLeft.push(left);
                    left.y = dis + 10 + 20 * i;
                    left.scaleX = 0.5;
                    left.scaleY = 0.5;
                    this.m_gopLeft.addChild(left);
                }
            }
            else if (gamePos == game.PlayePosition.e_Right) {
                if (this.m_aActionCardRight.length > 0)
                    dis = this.m_aActionCardRight[this.m_aActionCardRight.length - 1].y;
                for (i = 0; i < arrCardBase.length; i++) {
                    var right = new game.DeskCardRight(arrCardBase[i]);
                    this.m_aActionCardRight.push(right);
                    right.y = dis - 10 - 20 * i;
                    right.scaleX = 0.5;
                    right.scaleY = 0.5;
                    this.m_gopRight.addChild(right);
                }
            }
            else if (gamePos == game.PlayePosition.e_Down) {
                if (this.m_aActionCardDown.length > 0)
                    dis = this.m_aActionCardDown[this.m_aActionCardDown.length - 1].y;
                for (i = 0; i < arrCardBase.length; i++) {
                    var right = new game.DeskCardDown(arrCardBase[i]);
                    this.m_aActionCardDown.push(right);
                    right.x = dis + 10 + 20 * i;
                    right.scaleX = 0.5;
                    right.scaleY = 0.5;
                    this.m_gopDown.addChild(right);
                }
            }
            else if (gamePos == game.PlayePosition.e_Up) {
                if (this.m_aActionCardUp.length > 0)
                    dis = this.m_aActionCardUp[this.m_aActionCardUp.length - 1].y;
                for (i = 0; i < arrCardBase.length; i++) {
                    var right = new game.DeskCardUp(arrCardBase[i]);
                    this.m_aActionCardUp.push(right);
                    right.x = dis + 10 + 20 * i;
                    right.scaleX = 0.5;
                    right.scaleY = 0.5;
                    this.m_gopUp.addChild(right);
                }
            }
        };
        return ActionCardLayer;
    }(game.Scene));
    game.ActionCardLayer = ActionCardLayer;
    __reflect(ActionCardLayer.prototype, "game.ActionCardLayer");
})(game || (game = {}));
//# sourceMappingURL=ActionCardLayer.js.map