/**
 * brief:   按钮重封装
 * date:    2017-11-02
 * author:  徐为
 */

module game {
	
	export class Button extends eui.Button
    {
       
		public constructor() 
		{
            super();
            this.once(egret.Event.ADDED_TO_STAGE,this.fOnUICreate,this)
		}
        protected fOnUICreate() 
        {
          
            if(this.m_sImageUse)
            {
                var img = <eui.Image>this.getChildAt(0);
                if(img)
                {
                    img.source = this.m_sImageUse;
                }
            }
            Utils.fResetAnchor(this);
            this.includeInLayout = false;

            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.fOnBegin,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.fOnEnd,this);
            var ancestor = Utils.fGetAncestor(this);
            ancestor.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.fOnMove,this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.fOnOutSide, this);
        }
        
        private m_sImageUse: string;
        public fSetImage(imgName: string) 
        {
            this.m_sImageUse = imgName;
            var img = <eui.Image>this.getChildAt(0);
            if(img)
            {
                img.source = this.m_sImageUse;
            }
        }
        
        public fRelease()
        {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.fOnBegin,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END,this.fOnEnd,this);
            var ancestor = Utils.fGetAncestor(this);
            ancestor.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.fOnMove,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.fOnOutSide,this);
        }
        
        private fOnBegin() 
        {
            this.fSetPressed(true);
        }
        private fOnEnd() 
        {
            if(this.isPressed)
            {
                if(this.m_oListenerBind)
                {
                    this.m_oListenerBind.fOnClick(this);
                }
            }
            this.fOnTouchRelease();
        }
        private fOnMove(event: egret.TouchEvent) 
        {
            var hit = this.hitTestPoint(event.stageX,event.stageY);
            if(!hit)
            {
                this.fOnTouchRelease();
            }
        }
        private fOnOutSide() 
        {
            this.fOnTouchRelease();
        }
        private fOnTouchRelease() 
        {
            this.fSetPressed(false);
        }
        private isPressed = false;
        protected fSetPressed(bPressed: boolean) 
        {
            this.isPressed = bPressed;
            var scale = 1;
            if(this.isPressed) scale = 1.05;
            this.scaleX = scale;
            this.scaleY = scale;
        }
        
        private m_oListenerBind: Scene;
        public fBindListener(scene:Scene)
        {
            this.m_oListenerBind = scene;
        }
	}
}
