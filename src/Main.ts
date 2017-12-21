
declare function fGetStack();
class Main extends eui.UILayer {
   
     private static s_Ins:Main;
     public m_oGameSocket:game.GameSocket;

     public static fGetIns(){
        return Main.s_Ins;
     }

    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();
        console.info('hahahaa');
        Main.s_Ins = this;
        super.createChildren();
      
       egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            console.info("onPause")
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            console.info("resume")
            egret.ticker.resume();
        }
    

    var k = Utils.fGetInitFaPaiDistance(2, 3)
    
          this.m_oGameSocket = new game.GameSocket();
       
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter",assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");

      
      
     // game.GameManager.fGetIns().fGetUid()
    }
    
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
       
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private isThemeLoadEnd: boolean = false;
  
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
   
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    private createScene(){
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
            this.startCreateScene();
        }
    }
    
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    
    private onResourceLoadError(event:RES.ResourceEvent):void {
      
        console.warn("Group:" + event.groupName + " has failed to load");
       
        this.onResourceLoadComplete(event);
    }
   
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
           this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
        else
            this.m_oLoadingScene.fSetProgress(event.itemsLoaded/event.itemsTotal);
    }
    private textfield:egret.TextField;

    private fKeyBoard(event:egret.Event){
       console.info(event.target.inputs[0])
    }
    
    protected startCreateScene(): void {
        console.warn('startCreateScene');
   
        var ph = new game.Photo();
        new game.DeskCardDown(null);
        new game.DeskCardLeft(null);
        new game.DeskCardRight(null);
        new game.DeskCardUp(null);
        new game.Direction();
      //  this.addChild(ph);
        game.Packet.fInitPacketMap();

      
     //   egret.ExternalInterface.call("sendToNative", "message from js");
      
        //   var card = game.CardBase.fCreateCard(game.CardBase.s_Type_Feng, 'w_1_0');
     //   this.m_oKeyBoard = new KeyBoard();
	//	this.m_oKeyBoard.addEventListener(KeyBoard.onkeydown,this.fKeyBoard,this);
       
        var load = new game.LoadingScene();
        this.addChild(load);

        this.m_oGameLayer = new eui.UILayer;
        this.addChild(this.m_oGameLayer);

        this.m_oDialogLayer = new eui.Group;
      
        this.addChild(this.m_oDialogLayer);
    
        game.ShowLayer.fSetDialogLayer(this.m_oDialogLayer);

        this.m_oLoadingLayer = new eui.Group;
        this.addChild(this.m_oLoadingLayer); 
      
      // var mainScene = new game.MainScene();
       // this.addChild(mainScene);
      
        this.m_oLoadingLayer.visible = false;
    
     
    
        setTimeout(function(){
              game.GameScenenManager.fGetIns().fEnterScene(game.GameSceneName.LOGIN);
        }, 10)

     /*   var descJson = RES.getRes("cards_json");
        var descArray: JSON[] = descJson.card;
        var index = 0;
        var prority = 0;
        var name;
        for(var i in descArray)
        {
            if(name != descArray[i]['value'])
               index = 0;
            for(var j = 0; j < 4; j++)
            {
           //     game.GameCardManager.fGetIns().fPushCard(descArray[i]['value'] + '_' + index, descArray[i]['type'], prority);
                index ++;
            }
            name = descArray[i]['value'];
            

            prority ++;
        }

        var cards =   game.GameCardManager.fGetIns().m_oCards;*/


    }
   public GetShowTipLayer()
   {
     return this.m_oDialogLayer;
   }

    public m_oGameLayer:eui.UILayer;
    private m_oDialogLayer:eui.Group;
  private m_oLoadingLayer:eui.Group;
   
  //  private m_oKeyBoard:KeyBoard;

    private m_oLoadingScene:game.LoadingScene;

    public fLoadIngVisible(visi:boolean):void
    {
        this.m_oLoadingLayer.visible = visi;

        if(!visi)
        {
            if(this.m_oLoadingScene)
            {
               this.m_oLoadingScene.parent.removeChild(this.m_oLoadingScene);
               this.m_oLoadingScene = null;
           }
        }
        else
       {
          
              this.m_oLoadingScene = new game.LoadingScene();
              this.m_oLoadingLayer.addChild(this.m_oLoadingScene);
        }
       
    }

     public fLoadResGroup(groupName, showLoading:boolean, onCompleteCallback:Function){
        if(!groupName || groupName == "")
        {
            if(onCompleteCallback) onCompleteCallback.call(null);
            this.fLoadIngVisible(false);
            return;
        }
        this.fLoadIngVisible(true);
        var self = this;
        var onResLoadComplete = function(event:RES.ResourceEvent){
            if(event.groupName == groupName){
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResLoadComplete, self);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onResourceLoadError, self);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, self.onResourceProgress, self);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, self.onItemLoadError, self);
                if(onCompleteCallback) onCompleteCallback.call(null);
    
               var tw = egret.Tween.get( this.m_oLoadingScene );
          
               tw.wait(500).to( {alpha:0.1}, 1000,egret.Ease.sineIn ).call(function(){ self.fLoadIngVisible(false);});
               
            }
        }

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup(groupName);
       
    }

   
  
}
