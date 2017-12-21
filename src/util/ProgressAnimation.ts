/**
 * brief:   双拼进度条动画
 * date:    2017-11-03
 * author:  徐为
 */


module game {
   
    export class ProgressAnimation {
        private leftBar;
        private rightBar;
        private currentProgress = 0;
        private startX;
        private progressWidth;
        public constructor(progressBarLeft, progressBarRight, _startX, _progressWidth) {
            this.leftBar = progressBarLeft;
            this.rightBar = progressBarRight;
            this.startX = _startX;
            this.progressWidth = _progressWidth;
        }
        set progress(value) {
            this.fSetProgress(value);
           
        }

        get progress() {
            return this.currentProgress;
        }
        
        public fSetProgress(progress: number) {
            var _progress = progress;
            if (_progress < 0)
                _progress = 0;
            else if (_progress > 1)
                _progress = 1;
            this.currentProgress = _progress;
            this.fSetProgressBase(this.leftBar, this.rightBar, this.startX, _progress);
        }

        private fSetProgressBase(progress1: eui.Image, progress2: eui.Image, oX, progressNum: number) {
            var progressW = progress1.width;
            var length = Math.ceil(progressNum * this.progressWidth);
            var lengthLeft = Math.ceil(length / 2);
            var lengthRight = Math.floor(length / 2);
            Utils.fClipDisplay(progress1, 0, 0, lengthLeft, progress1.height, oX, progress1.y);
            Utils.fClipDisplay(progress2, progress1.width - lengthRight -1 , 0, lengthRight, progress1.height, oX + lengthLeft - 0.8, progress1.y);
        }
    }
}