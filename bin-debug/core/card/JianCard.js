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
     * brief:   箭牌
     *          中，发，白
     * date:    2017-11-09
     * author:  徐为
    */
    var JianCard = (function (_super) {
        __extends(JianCard, _super);
        function JianCard(type, value, index) {
            var _this = _super.call(this, type, value, index) || this;
            if (value == game.CardBase.s_Value_Jian_Zhong)
                _this.m_sName = '中';
            else if (value == game.CardBase.s_Value_Jian_Fa)
                _this.m_sName = '发';
            else if (value == game.CardBase.s_Value_Jian_Bai)
                _this.m_sName = '白';
            else
                game.TipShow.fShow('JianCard 创建失败:value =' + value);
            return _this;
        }
        return JianCard;
    }(game.CardBase));
    game.JianCard = JianCard;
    __reflect(JianCard.prototype, "game.JianCard");
})(game || (game = {}));
//# sourceMappingURL=JianCard.js.map