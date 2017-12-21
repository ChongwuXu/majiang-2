var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * brief:   玩家位置
     * date:    2017-11-09
     * author:  徐为
   */
    var PlayePosition;
    (function (PlayePosition) {
        PlayePosition[PlayePosition["e_Unknow"] = -1] = "e_Unknow";
        PlayePosition[PlayePosition["e_Up"] = 0] = "e_Up";
        PlayePosition[PlayePosition["e_Down"] = 2] = "e_Down";
        PlayePosition[PlayePosition["e_Left"] = 1] = "e_Left";
        PlayePosition[PlayePosition["e_Right"] = 3] = "e_Right";
        PlayePosition[PlayePosition["e_Desktop"] = 4] = "e_Desktop";
    })(PlayePosition = game.PlayePosition || (game.PlayePosition = {}));
    /**
      * brief:   玩家
      * date:    2017-11-09
      * author:  徐为
    */
    var Player = (function () {
        /********************************/
        function Player(pos) {
            this.m_aHandCards = []; //手上的牌
            this.m_aEatCards = []; //吃的牌
            this.m_aPengCards = []; //碰的牌
            this.m_aGangCards = []; //杠的牌
            this.m_pPosition = pos;
        }
        Player.prototype.fGetPosition = function () {
            return this.m_pPosition;
        };
        Player.prototype.fSetPosition = function (pos) {
            this.m_pPosition = pos;
        };
        return Player;
    }());
    game.Player = Player;
    __reflect(Player.prototype, "game.Player");
})(game || (game = {}));
//# sourceMappingURL=Player.js.map