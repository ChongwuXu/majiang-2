/**
 * brief:   双拼进度条
 * date:    2017-11-03
 * author:  徐为
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Progress = (function () {
        //进度条背景,传两个进度条，通过拼接方式
        function Progress(_img, _img1) {
            this.m_nCurrentProgress = 0;
            this.m_oCurProgressL = _img;
            this.m_oCurProgressR = _img1;
            this.fInit();
        }
        Progress.prototype.fInit = function () {
            this.m_nProgressY = this.m_oCurProgressL.y;
            this.m_nProgressHeight = this.m_oCurProgressR.height;
            this.m_oCurProgressAnimat = new game.ProgressAnimation(this.m_oCurProgressL, this.m_oCurProgressR, this.m_oCurProgressL.x, this.m_oCurProgressL.width);
        };
        Progress.prototype.setCurProgress = function (progress, bPlayAnimation, callback) {
            this.m_nCurrentProgress = progress;
            this.setProgress(this.m_oCurProgressAnimat, progress, bPlayAnimation, callback);
        };
        Progress.prototype.setProgress = function (progressAnimation, progress, bPlayAnimation, callback) {
            var bPlay = false;
            if (bPlayAnimation != undefined)
                bPlay = bPlayAnimation;
            egret.Tween.removeTweens(progressAnimation);
            if (bPlay) {
                var duration = 500;
                var tween = egret.Tween.get(progressAnimation);
                tween.to({ progress: progress }, duration);
                if (callback)
                    tween.call(callback);
            }
            else {
                progressAnimation.progress = progress;
            }
        };
        return Progress;
    }());
    game.Progress = Progress;
    __reflect(Progress.prototype, "game.Progress");
})(game || (game = {}));
//# sourceMappingURL=Progress.js.map