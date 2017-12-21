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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isThemeLoadEnd = false;
        _this.isResourceLoadEnd = false;
        return _this;
    }
    Main.fGetIns = function () {
        return Main.s_Ins;
    };
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        console.info('hahahaa');
        Main.s_Ins = this;
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            console.info("onPause");
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            console.info("resume");
            egret.ticker.resume();
        };
        var k = Utils.fGetInitFaPaiDistance(2, 3);
        this.m_oGameSocket = new game.GameSocket();
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        // game.GameManager.fGetIns().fGetUid()
    };
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    Main.prototype.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        this.createScene();
    };
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    };
    Main.prototype.createScene = function () {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.startCreateScene();
        }
    };
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    Main.prototype.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    };
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
        else
            this.m_oLoadingScene.fSetProgress(event.itemsLoaded / event.itemsTotal);
    };
    Main.prototype.fKeyBoard = function (event) {
        console.info(event.target.inputs[0]);
    };
    Main.prototype.startCreateScene = function () {
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
        setTimeout(function () {
            game.GameScenenManager.fGetIns().fEnterScene(game.GameSceneName.LOGIN);
        }, 10);
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
    };
    Main.prototype.GetShowTipLayer = function () {
        return this.m_oDialogLayer;
    };
    Main.prototype.fLoadIngVisible = function (visi) {
        this.m_oLoadingLayer.visible = visi;
        if (!visi) {
            if (this.m_oLoadingScene) {
                this.m_oLoadingScene.parent.removeChild(this.m_oLoadingScene);
                this.m_oLoadingScene = null;
            }
        }
        else {
            this.m_oLoadingScene = new game.LoadingScene();
            this.m_oLoadingLayer.addChild(this.m_oLoadingScene);
        }
    };
    Main.prototype.fLoadResGroup = function (groupName, showLoading, onCompleteCallback) {
        if (!groupName || groupName == "") {
            if (onCompleteCallback)
                onCompleteCallback.call(null);
            this.fLoadIngVisible(false);
            return;
        }
        this.fLoadIngVisible(true);
        var self = this;
        var onResLoadComplete = function (event) {
            if (event.groupName == groupName) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResLoadComplete, self);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onResourceLoadError, self);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, self.onResourceProgress, self);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, self.onItemLoadError, self);
                if (onCompleteCallback)
                    onCompleteCallback.call(null);
                var tw = egret.Tween.get(this.m_oLoadingScene);
                tw.wait(500).to({ alpha: 0.1 }, 1000, egret.Ease.sineIn).call(function () { self.fLoadIngVisible(false); });
            }
        };
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup(groupName);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map