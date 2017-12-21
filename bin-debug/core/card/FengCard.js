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
    * brief:   风牌
    *          东, 西，南, 北风
    * date:    2017-11-09
    * author:  徐为
   */
    var FengCard = (function (_super) {
        __extends(FengCard, _super);
        function FengCard(type, value, index) {
            var _this = _super.call(this, type, value, index) || this;
            if (game.CardBase.s_Value_Feng_Dong == value)
                _this.m_sName = '东风';
            else if (game.CardBase.s_Value_Feng_Xi == value)
                _this.m_sName = '西风';
            else if (game.CardBase.s_Value_Feng_Nan == value)
                _this.m_sName = '南风';
            else if (game.CardBase.s_Value_Feng_Bei)
                _this.m_sName = '北风';
            else
                game.TipShow.fShow('FengCard 创建失败:value =' + value);
            return _this;
        }
        return FengCard;
    }(game.CardBase));
    game.FengCard = FengCard;
    __reflect(FengCard.prototype, "game.FengCard");
})(game || (game = {}));
//# sourceMappingURL=FengCard.js.map