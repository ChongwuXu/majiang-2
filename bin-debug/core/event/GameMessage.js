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
     * brief:   事件重封装
     * date:    2017-11-01
     * author:  徐为
     */
    var MessageEvent = (function (_super) {
        __extends(MessageEvent, _super);
        function MessageEvent(name, obj) {
            var _this = _super.call(this, name) || this;
            _this.m_oDisObj = obj;
            _this.m_sName = name;
            return _this;
        }
        return MessageEvent;
    }(egret.Event));
    game.MessageEvent = MessageEvent;
    __reflect(MessageEvent.prototype, "game.MessageEvent");
})(game || (game = {}));
//# sourceMappingURL=GameMessage.js.map