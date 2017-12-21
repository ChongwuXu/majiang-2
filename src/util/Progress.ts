/**
 * brief:   双拼进度条
 * date:    2017-11-03
 * author:  徐为
 */


module game {
    export /**
     * Progress
     */
        class Progress{
        //进度条背景,传两个进度条，通过拼接方式
        public constructor(_img:eui.Image,_img1:eui.Image) {
           
            this.m_oCurProgressL = _img;
            this.m_oCurProgressR = _img1;
            this.fInit();
        }
        private m_oCurProgressL: eui.Image;
        private m_oCurProgressR: eui.Image;
        private m_nProgressY: number;
        private m_nProgressHeight: number;
        public m_oCurProgressAnimat: ProgressAnimation;

        public fInit() {
            this.m_nProgressY = this.m_oCurProgressL.y;
            this.m_nProgressHeight = this.m_oCurProgressR.height;

            this.m_oCurProgressAnimat = new ProgressAnimation(this.m_oCurProgressL, this.m_oCurProgressR, this.m_oCurProgressL.x, this.m_oCurProgressL.width);
        }
        
        private m_nCurrentProgress: number = 0;

        public setCurProgress(progress: number, bPlayAnimation?: boolean, callback?: Function) {

            this.m_nCurrentProgress = progress;
            this.setProgress(this.m_oCurProgressAnimat, progress, bPlayAnimation, callback);
        }
        public setProgress(progressAnimation: ProgressAnimation, progress: number,
            bPlayAnimation?: boolean, callback?: Function) {
            var bPlay = false;
            if (bPlayAnimation != undefined) bPlay = bPlayAnimation;
            egret.Tween.removeTweens(progressAnimation);
            if (bPlay) {
                var duration = 500;
                var tween = egret.Tween.get(progressAnimation);
                tween.to({ progress: progress }, duration); 
                if (callback) tween.call(callback);
            } else {
                progressAnimation.progress = progress;
            }
        }
    }
}