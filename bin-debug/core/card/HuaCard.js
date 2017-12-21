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
     * brief:   花牌
     *          春，夏，秋，冬，梅，兰，竹，菊
     * date:    2017-11-09
     * author:  徐为
    */
    var HuaCard = (function (_super) {
        __extends(HuaCard, _super);
        function HuaCard(type, value, index) {
            var _this = _super.call(this, type, value, index) || this;
            if (game.CardBase.s_Value_Hua_Chun == value)
                _this.m_sName = '春';
            else if (game.CardBase.s_Value_Hua_Xia == value)
                _this.m_sName = '夏';
            else if (game.CardBase.s_Value_Hua_Qiu == value)
                _this.m_sName = '秋';
            else if (game.CardBase.s_Value_Hua_Dong == value)
                _this.m_sName = '冬';
            else if (game.CardBase.s_Value_Hua_Mei == value)
                _this.m_sName = '梅';
            else if (game.CardBase.s_Value_Hua_Lan == value)
                _this.m_sName = '兰';
            else if (game.CardBase.s_Value_Hua_Zhu == value)
                _this.m_sName = '竹';
            else if (game.CardBase.s_Value_Hua_Ju == value)
                _this.m_sName = '菊';
            else
                game.TipShow.fShow('HuaCard 创建失败:value =' + value);
            return _this;
        }
        return HuaCard;
    }(game.CardBase));
    game.HuaCard = HuaCard;
    __reflect(HuaCard.prototype, "game.HuaCard");
})(game || (game = {}));
//# sourceMappingURL=HuaCard.js.map