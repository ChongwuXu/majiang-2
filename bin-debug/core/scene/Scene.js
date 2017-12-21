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
    var Scene = (function (_super) {
        __extends(Scene, _super);
        /********************************/
        function Scene() {
            var _this = _super.call(this) || this;
            /********************************/
            _this.m_nTimeOnEnterFrame = 0; //上次进入frame时间
            _this.m_aClickBtns = []; //所有的按钮
            _this.m_bCompOnUICreate = false;
            _this.m_bFinishCurrentPacket = false;
            _this.m_nAllTaskCount = 0;
            _this.m_nCurrentCount = 0;
            _this.m_oHandle = new game.Handle();
            _this.once(eui.UIEvent.COMPLETE, _this.fOnUICreate, _this);
            return _this;
            //  this.once(egret.Eve, this.fOnUICreate, this);
        }
        Scene.prototype.fOnUICreate = function () {
            this.addEventListener(egret.Event.ENTER_FRAME, this.fEnterFrame, this);
            this.m_nTimeOnEnterFrame = egret.getTimer();
        };
        Scene.prototype.fAddTaskByNum = function (count) {
            this.m_nAllTaskCount += count;
            this.m_bFinishCurrentPacket = false;
        };
        Scene.prototype.fSetTask = function (count) {
            this.m_nAllTaskCount = count;
            if (this.m_nAllTaskCount <= 0) {
                this.m_bFinishCurrentPacket = true;
            }
            else {
                this.m_bFinishCurrentPacket = false;
            }
            this.m_nCurrentCount = 0;
        };
        Scene.prototype.fAddTask = function () {
            this.m_nAllTaskCount++;
            this.m_bFinishCurrentPacket = false;
            console.info("   this.m_bFinishCurrentPacket = false" + (typeof this));
        };
        Scene.prototype.fReduceTask = function () {
            this.m_nAllTaskCount--;
        };
        Scene.prototype.fAddCurrentTask = function () {
            ++this.m_nCurrentCount;
            if (this.m_nCurrentCount >= this.m_nAllTaskCount) {
                this.m_bFinishCurrentPacket = true;
                this.m_nAllTaskCount = 0;
                this.m_nCurrentCount = 0;
                console.info("   this.m_bFinishCurrentPacket = true;" + (typeof this));
            }
        };
        Scene.prototype.fInitCurrentTask = function () {
            this.m_nCurrentCount = 0;
        };
        Scene.prototype.fEnterFrame = function () {
            this.fUpdate(egret.getTimer() - this.m_nTimeOnEnterFrame);
            this.m_nTimeOnEnterFrame = egret.getTimer();
        };
        Scene.prototype.fSetVisible = function (visi) {
            this.visible = visi;
            if (!this.visible) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.fEnterFrame, this);
            }
            else {
                this.addEventListener(egret.Event.ENTER_FRAME, this.fEnterFrame, this);
                this.m_nTimeOnEnterFrame = egret.getTimer();
            }
        };
        /**该场景需要加载的资源组 */
        Scene.prototype.fSceneResGroup = function () {
            return "";
        };
        Scene.prototype.fUpdate = function (dt_ms) {
        };
        Scene.prototype.fSetClickButton = function (button) {
            if (this.m_aClickBtns.indexOf(button) == -1) {
                this.m_aClickBtns.push(button);
                if (button instanceof game.Button) {
                    button.fBindListener(this);
                }
                else if (button instanceof eui.RadioButton) {
                    button.addEventListener(egret.Event.CHANGE, this.fTouchTap, this);
                }
                else {
                    button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fTouchTap, this);
                }
            }
        };
        Scene.prototype.fTouchTap = function (event) {
            var target = event.currentTarget;
            this.fOnClick(target);
        };
        Scene.prototype.fOnClick = function (button) { };
        Scene.prototype.fRelease = function () {
            for (var i in this.m_aClickBtns) {
                this.fRemoveClickEvent(this.m_aClickBtns[i]);
            }
            this.removeEventListener(egret.Event.ENTER_FRAME, this.fEnterFrame, this);
        };
        Scene.prototype.fRemoveClickEvent = function (button) {
            if (button instanceof game.Button)
                button.fRelease();
            else
                button.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fTouchTap, this);
        };
        return Scene;
    }(eui.Component));
    game.Scene = Scene;
    __reflect(Scene.prototype, "game.Scene");
})(game || (game = {}));
//# sourceMappingURL=Scene.js.map