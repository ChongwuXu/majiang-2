
/**
 * brief:   加载场景
 * date:    2017-11-03
 * author:  徐为
 */
module game
{



    export class LoadingScene extends Scene
    {
        
    //    private m_imgProgressL: eui.Image;
      //  private m_imgProgressR: eui.Image;

         /********************************/

        private m_labLoading:eui.Label;

        private m_nLastUpdateTime:number;

         /********************************/
        public constructor()
        {
            super();
            this.skinName = "resource/mjSkins/scene/LoadingScene.exml";
        }

        private m_bCreated = false;        
        private m_oProgress: Progress;
        public fOnUICreate()
        {
            this.m_nLastUpdateTime = 0;
            super.fOnUICreate();


           // this.m_bCreated = true;
          //  this.m_oProgress = new Progress(this.m_imgProgressL, this.m_imgProgressR);
          //  this.m_oProgress.setCurProgress(0);
          //  if (this.bTips)
          //  {
            //    this.fShowTips();
           // }    
        }


        protected fUpdate(dt_ms):void
        {
           this.m_nLastUpdateTime += dt_ms;
           if(this.m_nLastUpdateTime >= 160)
           {
                   if(this.m_labLoading.text == "加载中...")
                   {
                    this.m_labLoading.text = '加载中'
                  }
                   else if(this.m_labLoading.text == '加载中')
                 {
                   this.m_labLoading.text = '加载中.'
                 }
                  else if(this.m_labLoading.text == '加载中.')
                 {
                   this.m_labLoading.text = '加载中..'
                 }
                else if(this.m_labLoading.text == '加载中..')
                {
                  this.m_labLoading.text = '加载中...'
               }
               this.m_nLastUpdateTime = 0;
           }
         
        }

        public fSetProgress(progress: number)
        {
            if (this.m_oProgress)
            {
                this.m_oProgress.setCurProgress(progress);
                var percent = Math.floor(progress * 100);
               
            }
        }

        public fShowTips()
        {
           // if (!this.m_bCreated) return;
           // var count = Common.LOADING_HELP.length;
           // var index = GameUtils.getRandom(0, count - 1);
            //var tips = Common.LOADING_HELP[index];
           // this.labelHelpTips.text = tips;
        }
        
        private bTips = false;
        public fStartHelpTips()
        {
            this.bTips = true;
            this.fShowTips();
        }
    }
}