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
     * brief:   筒牌
     * date:    2017-11-09
     * author:  徐为
    */
    var TongCard = (function (_super) {
        __extends(TongCard, _super);
        function TongCard(type, value, index) {
            var _this = _super.call(this, type, value, index) || this;
            if (value == game.CardBase.s_Value_Tong_1)
                _this.m_sName = '一筒';
            else if (value == game.CardBase.s_Value_Tong_2)
                _this.m_sName = '二筒';
            else if (value == game.CardBase.s_Value_Tong_3)
                _this.m_sName = '三筒';
            else if (value == game.CardBase.s_Value_Tong_4)
                _this.m_sName = '四筒';
            else if (value == game.CardBase.s_Value_Tong_5)
                _this.m_sName = '五筒';
            else if (value == game.CardBase.s_Value_Tong_6)
                _this.m_sName = '六筒';
            else if (value == game.CardBase.s_Value_Tong_7)
                _this.m_sName = '七筒';
            else if (value == game.CardBase.s_Value_Tong_8)
                _this.m_sName = '八筒';
            else if (value == game.CardBase.s_Value_Tong_9)
                _this.m_sName = '九筒';
            else
                game.TipShow.fShow('TongCard 创建失败:value =' + value);
            return _this;
        }
        return TongCard;
    }(game.CardBase));
    game.TongCard = TongCard;
    __reflect(TongCard.prototype, "game.TongCard");
})(game || (game = {}));
//# sourceMappingURL=TongCard.js.map