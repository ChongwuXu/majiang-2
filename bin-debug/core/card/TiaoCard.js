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
   * brief:   条牌
   * date:    2017-11-09
   * author:  徐为
  */
    var TiaoCard = (function (_super) {
        __extends(TiaoCard, _super);
        function TiaoCard(type, value, index) {
            var _this = _super.call(this, type, value, index) || this;
            if (value == game.CardBase.s_Value_Tiao_1)
                _this.m_sName = '一条';
            else if (value == game.CardBase.s_Value_Tiao_2)
                _this.m_sName = '二条';
            else if (value == game.CardBase.s_Value_Tiao_3)
                _this.m_sName = '三条';
            else if (value == game.CardBase.s_Value_Tiao_4)
                _this.m_sName = '四条';
            else if (value == game.CardBase.s_Value_Tiao_5)
                _this.m_sName = '五条';
            else if (value == game.CardBase.s_Value_Tiao_6)
                _this.m_sName = '六条';
            else if (value == game.CardBase.s_Value_Tiao_7)
                _this.m_sName = '七条';
            else if (value == game.CardBase.s_Value_Tiao_8)
                _this.m_sName = '八条';
            else if (value == game.CardBase.s_Value_Tiao_9)
                _this.m_sName = '九条';
            else
                game.TipShow.fShow('TiaoCard 创建失败:value =' + value);
            return _this;
        }
        return TiaoCard;
    }(game.CardBase));
    game.TiaoCard = TiaoCard;
    __reflect(TiaoCard.prototype, "game.TiaoCard");
})(game || (game = {}));
//# sourceMappingURL=TiaoCard.js.map