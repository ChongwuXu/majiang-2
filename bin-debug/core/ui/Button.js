/**
 * brief:   按钮重封装
 * date:    2017-11-02
 * author:  徐为
 */
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
var game;
(function (game) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            var _this = _super.call(this) || this;
            _this.isPressed = false;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.fOnUICreate, _this);
            return _this;
        }
        Button.prototype.fOnUICreate = function () {
            if (this.m_sImageUse) {
                var img = this.getChildAt(0);
                if (img) {
                    img.source = this.m_sImageUse;
                }
            }
            Utils.fResetAnchor(this);
            this.includeInLayout = false;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.fOnBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.fOnEnd, this);
            var ancestor = Utils.fGetAncestor(this);
            ancestor.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.fOnMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.fOnOutSide, this);
        };
        Button.prototype.fSetImage = function (imgName) {
            this.m_sImageUse = imgName;
            var img = this.getChildAt(0);
            if (img) {
                img.source = this.m_sImageUse;
            }
        };
        Button.prototype.fRelease = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.fOnBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.fOnEnd, this);
            var ancestor = Utils.fGetAncestor(this);
            ancestor.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.fOnMove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.fOnOutSide, this);
        };
        Button.prototype.fOnBegin = function () {
            this.fSetPressed(true);
        };
        Button.prototype.fOnEnd = function () {
            if (this.isPressed) {
                if (this.m_oListenerBind) {
                    this.m_oListenerBind.fOnClick(this);
                }
            }
            this.fOnTouchRelease();
        };
        Button.prototype.fOnMove = function (event) {
            var hit = this.hitTestPoint(event.stageX, event.stageY);
            if (!hit) {
                this.fOnTouchRelease();
            }
        };
        Button.prototype.fOnOutSide = function () {
            this.fOnTouchRelease();
        };
        Button.prototype.fOnTouchRelease = function () {
            this.fSetPressed(false);
        };
        Button.prototype.fSetPressed = function (bPressed) {
            this.isPressed = bPressed;
            var scale = 1;
            if (this.isPressed)
                scale = 1.05;
            this.scaleX = scale;
            this.scaleY = scale;
        };
        Button.prototype.fBindListener = function (scene) {
            this.m_oListenerBind = scene;
        };
        return Button;
    }(eui.Button));
    game.Button = Button;
    __reflect(Button.prototype, "game.Button");
})(game || (game = {}));
//# sourceMappingURL=Button.js.map