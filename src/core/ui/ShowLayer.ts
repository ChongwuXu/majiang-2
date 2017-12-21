/**
 * brief:   显示层
 * date:    2017-11-15
 * author:  徐为
 */

module game {
	/**
	 *
	 * @author 
	 *
	 */
    export enum DIALOG_PLAYTYPE {
        TYPE_ZOOM, TYPE_DROP
    }
    export class ShowLayer extends Scene {

        public static defaultLayer: eui.Group;
        public bgMask;
        private offsetX: number = 0;
        private offsetY: number = 0;

        public static fSetDialogLayer(layer: eui.Group) {
            ShowLayer.defaultLayer = layer;
        }

        private dialogLayer: eui.Group;
        public constructor() {
            super();
            
        }

        public fSetOffset(offsetX: number, offsetY: number) {
            this.offsetX = offsetX;
            this.offsetY = offsetY;
        }

        public fShow(layer?: eui.Group) {
            this.dialogLayer = ShowLayer.defaultLayer;
            if (layer) this.dialogLayer = layer;
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            this.x =  512 - this.offsetX;
            this.y = 301 - this.offsetY;
            ShowLayer.fAddDialog(this, this.dialogLayer);


        }
        public fShowPlay(type, layer?: eui.Group) {

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
        }
        public fPlayAnimationZoom(callback?: Function) {
            this.scaleY = 0.1;
            var tween = egret.Tween.get(this);
            tween.to({ scaleY: 1.1 }, 150, egret.Ease.getPowIn(2));
            tween.to({ scaleY: 1 }, 150, egret.Ease.getPowIn(2));
            if (callback) tween.call(callback);
        }
        public fPlayAnimationDrop(callback?: Function) {
            var endY = this.y;
            this.y = -this.height / 2;
            var tween = egret.Tween.get(this);
            tween.to({ y: endY }, 200, egret.Ease.getPowIn(2));
            tween.to({ y: endY - 20 }, 100, egret.Ease.getPowOut(2));
            tween.to({ y: endY }, 100, egret.Ease.getPowOut(2));
            if (callback) tween.call(callback);
        }
        public fExit() {
           
            ShowLayer.removeDialog(this, this.dialogLayer);
           
        }

        //        private static curDialogMask: eui.Rect;
        private static fAddDialog(dialog: ShowLayer, layer: eui.Group) {
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
        }
        private static removeDialog(dialog: ShowLayer, layer: eui.Group) {
            dialog.fRelease();
            if (layer.contains(dialog)) {
                layer.removeChild(dialog.bgMask);
                layer.removeChild(dialog);
            }
            //            if(layer.numElements == 1)
            //            {
            //                layer.removeChildren();
            //            }
        }

        
        public static fHasDialog()
        {
            return ShowLayer.defaultLayer.numElements > 0;
        }
    }
}
