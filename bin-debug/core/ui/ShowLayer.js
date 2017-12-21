/**
 * brief:   显示层
 * date:    2017-11-15
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
    /**
     *
     * @author
     *
     */
    var DIALOG_PLAYTYPE;
    (function (DIALOG_PLAYTYPE) {
        DIALOG_PLAYTYPE[DIALOG_PLAYTYPE["TYPE_ZOOM"] = 0] = "TYPE_ZOOM";
        DIALOG_PLAYTYPE[DIALOG_PLAYTYPE["TYPE_DROP"] = 1] = "TYPE_DROP";
    })(DIALOG_PLAYTYPE = game.DIALOG_PLAYTYPE || (game.DIALOG_PLAYTYPE = {}));
    var ShowLayer = (function (_super) {
        __extends(ShowLayer, _super);
        function ShowLayer() {
            var _this = _super.call(this) || this;
            _this.offsetX = 0;
            _this.offsetY = 0;
            return _this;
        }
        ShowLayer.fSetDialogLayer = function (layer) {
            ShowLayer.defaultLayer = layer;
        };
        ShowLayer.prototype.fSetOffset = function (offsetX, offsetY) {
            this.offsetX = offsetX;
            this.offsetY = offsetY;
        };
        ShowLayer.prototype.fShow = function (layer) {
            this.dialogLayer = ShowLayer.defaultLayer;
            if (layer)
                this.dialogLayer = layer;
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            this.x = 512 - this.offsetX;
            this.y = 301 - this.offsetY;
            ShowLayer.fAddDialog(this, this.dialogLayer);
        };
        ShowLayer.prototype.fShowPlay = function (type, layer) {
            this.fShow(layer);
            switch (type) {
                case DIALOG_PLAYTYPE.TYPE_ZOOM:
                    this.fPlayAnimationZoom();
                    break;
                case DIALOG_PLAYTYPE.TYPE_DROP:
                    this.fPlayAnimationDrop();
                    break;
                default:
                    break;
            }
        };
        ShowLayer.prototype.fPlayAnimationZoom = function (callback) {
            this.scaleY = 0.1;
            var tween = egret.Tween.get(this);
            tween.to({ scaleY: 1.1 }, 150, egret.Ease.getPowIn(2));
            tween.to({ scaleY: 1 }, 150, egret.Ease.getPowIn(2));
            if (callback)
                tween.call(callback);
        };
        ShowLayer.prototype.fPlayAnimationDrop = function (callback) {
            var endY = this.y;
            this.y = -this.height / 2;
            var tween = egret.Tween.get(this);
            tween.to({ y: endY }, 200, egret.Ease.getPowIn(2));
            tween.to({ y: endY - 20 }, 100, egret.Ease.getPowOut(2));
            tween.to({ y: endY }, 100, egret.Ease.getPowOut(2));
            if (callback)
                tween.call(callback);
        };
        ShowLayer.prototype.fExit = function () {
            ShowLayer.removeDialog(this, this.dialogLayer);
        };
        //        private static curDialogMask: eui.Rect;
        ShowLayer.fAddDialog = function (dialog, layer) {
            //            if(layer.numElements == 0)
            {
                //                var dialogMask = new Rect(480,800,0);
                var dialogMask = new eui.Image("global_ui_dialog_bg_png");
                dialogMask.width = 480;
                dialogMask.height = 800;
                //                dialogMask.alpha = 0.5;
                dialogMask.touchEnabled = true;
                layer.addChild(dialogMask);
                dialog.bgMask = dialogMask;
                //                Dialog.curDialogMask = dialogMask;
            }
            layer.addChild(dialog);
        };
        ShowLayer.removeDialog = function (dialog, layer) {
            dialog.fRelease();
            if (layer.contains(dialog)) {
                layer.removeChild(dialog.bgMask);
                layer.removeChild(dialog);
            }
            //            if(layer.numElements == 1)
            //            {
            //                layer.removeChildren();
            //            }
        };
        ShowLayer.fHasDialog = function () {
            return ShowLayer.defaultLayer.numElements > 0;
        };
        return ShowLayer;
    }(game.Scene));
    game.ShowLayer = ShowLayer;
    __reflect(ShowLayer.prototype, "game.ShowLayer");
})(game || (game = {}));
//# sourceMappingURL=ShowLayer.js.map