/**
 * brief:   双拼进度条动画
 * date:    2017-11-03
 * author:  徐为
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ProgressAnimation = (function () {
        function ProgressAnimation(progressBarLeft, progressBarRight, _startX, _progressWidth) {
            this.currentProgress = 0;
            this.leftBar = progressBarLeft;
            this.rightBar = progressBarRight;
            this.startX = _startX;
            this.progressWidth = _progressWidth;
        }
        Object.defineProperty(ProgressAnimation.prototype, "progress", {
            get: function () {
                return this.currentProgress;
            },
            set: function (value) {
                this.fSetProgress(value);
            },
            enumerable: true,
            configurable: true
        });
        ProgressAnimation.prototype.fSetProgress = function (progress) {
            var _progress = progress;
            if (_progress < 0)
                _progress = 0;
            else if (_progress > 1)
                _progress = 1;
            this.currentProgress = _progress;
            this.fSetProgressBase(this.leftBar, this.rightBar, this.startX, _progress);
        };
        ProgressAnimation.prototype.fSetProgressBase = function (progress1, progress2, oX, progressNum) {
            var progressW = progress1.width;
            var length = Math.ceil(progressNum * this.progressWidth);
            var lengthLeft = Math.ceil(length / 2);
            var lengthRight = Math.floor(length / 2);
            Utils.fClipDisplay(progress1, 0, 0, lengthLeft, progress1.height, oX, progress1.y);
            Utils.fClipDisplay(progress2, progress1.width - lengthRight - 1, 0, lengthRight, progress1.height, oX + lengthLeft - 0.8, progress1.y);
        };
        return ProgressAnimation;
    }());
    game.ProgressAnimation = ProgressAnimation;
    __reflect(ProgressAnimation.prototype, "game.ProgressAnimation");
})(game || (game = {}));
//# sourceMappingURL=ProgressAnimation.js.map