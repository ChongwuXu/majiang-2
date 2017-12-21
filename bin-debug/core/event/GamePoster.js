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
     * brief:   事件触发器重封装
     * date:    2017-11-01
     * author:  徐为
     */
    var Poster = (function (_super) {
        __extends(Poster, _super);
        function Poster() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Poster, "Ins", {
            get: function () {
                if (this.s_Ins == null)
                    this.s_Ins = new Poster();
                return this.s_Ins;
            },
            enumerable: true,
            configurable: true
        });
        return Poster;
    }(egret.EventDispatcher));
    game.Poster = Poster;
    __reflect(Poster.prototype, "game.Poster");
})(game || (game = {}));
//# sourceMappingURL=GamePoster.js.map