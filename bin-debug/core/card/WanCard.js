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
   * brief:   万牌
   * date:    2017-11-09
   * author:  徐为
  */
    var WanCard = (function (_super) {
        __extends(WanCard, _super);
        function WanCard(type, value, index) {
            var _this = _super.call(this, type, value, index) || this;
            if (value == game.CardBase.s_Value_Wan_1)
                _this.m_sName = '一万';
            else if (value == game.CardBase.s_Value_Wan_2)
                _this.m_sName = '二万';
            else if (value == game.CardBase.s_Value_Wan_3)
                _this.m_sName = '三万';
            else if (value == game.CardBase.s_Value_Wan_4)
                _this.m_sName = '四万';
            else if (value == game.CardBase.s_Value_Wan_5)
                _this.m_sName = '五万';
            else if (value == game.CardBase.s_Value_Wan_6)
                _this.m_sName = '六万';
            else if (value == game.CardBase.s_Value_Wan_7)
                _this.m_sName = '七万';
            else if (value == game.CardBase.s_Value_Wan_8)
                _this.m_sName = '八万';
            else if (value == game.CardBase.s_Value_Wan_9)
                _this.m_sName = '九万';
            else
                game.TipShow.fShow('WanCard 创建失败:value =' + value);
            return _this;
        }
        return WanCard;
    }(game.CardBase));
    game.WanCard = WanCard;
    __reflect(WanCard.prototype, "game.WanCard");
})(game || (game = {}));
//# sourceMappingURL=WanCard.js.map