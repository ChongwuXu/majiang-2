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
/**
 * brief:   头像
 * date:    2017-12-7
 * author:  徐为
 */
var game;
(function (game) {
    var Direction = (function (_super) {
        __extends(Direction, _super);
        //***********************************/
        function Direction() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/mjSkins/comp/Direction.exml";
            return _this;
        }
        Direction.prototype.fOnUICreate = function () {
            this.fHideLight();
            this.fInitDir();
        };
        Direction.prototype.fOnClick = function (button) {
        };
        Direction.prototype.fInitDir = function () {
            if (game.GameManager.fGetIns().m_pFirstPlayerPos == game.PlayePosition.e_Right) {
                this.m_imgDirDown.texture = RES.getRes("games_res_set_timer_location_1_png");
                this.m_imgDirRight.texture = RES.getRes("games_res_set_timer_location_4_png");
                this.m_imgDirUp.texture = RES.getRes("games_res_set_timer_location_3_png");
                this.m_imgDirLeft.texture = RES.getRes("games_res_set_timer_location_2_png");
            }
            else if (game.GameManager.fGetIns().m_pFirstPlayerPos == game.PlayePosition.e_Up) {
                this.m_imgDirDown.texture = RES.getRes("games_res_set_timer_location_4_png");
                this.m_imgDirRight.texture = RES.getRes("games_res_set_timer_location_3_png");
                this.m_imgDirUp.texture = RES.getRes("games_res_set_timer_location_2_png");
                this.m_imgDirLeft.texture = RES.getRes("games_res_set_timer_location_1_png");
            }
            else if (game.GameManager.fGetIns().m_pFirstPlayerPos == game.PlayePosition.e_Left) {
                this.m_imgDirDown.texture = RES.getRes("games_res_set_timer_location_3_png");
                this.m_imgDirRight.texture = RES.getRes("games_res_set_timer_location_2_png");
                this.m_imgDirUp.texture = RES.getRes("games_res_set_timer_location_1_png");
                this.m_imgDirLeft.texture = RES.getRes("games_res_set_timer_location_4_png");
            }
        };
        Direction.prototype.fResetDir = function (deskPos) {
            this.fHideLight();
            var gamePos = Utils.fDeskPosToGamePosFirst(deskPos);
            if (gamePos == game.PlayePosition.e_Down) {
                this.m_imgLightDown.visible = true;
            }
            else if (gamePos == game.PlayePosition.e_Up) {
                this.m_imgLightUp.visible = true;
            }
            else if (gamePos == game.PlayePosition.e_Left) {
                this.m_imgLightLeft.visible = true;
            }
            else if (gamePos == game.PlayePosition.e_Right) {
                this.m_imgLightRight.visible = true;
            }
        };
        Direction.prototype.fHideLight = function () {
            this.m_imgLightDown.visible = false;
            this.m_imgLightUp.visible = false;
            this.m_imgLightLeft.visible = false;
            this.m_imgLightRight.visible = false;
        };
        return Direction;
    }(game.Scene));
    game.Direction = Direction;
    __reflect(Direction.prototype, "game.Direction");
})(game || (game = {}));
//# sourceMappingURL=Direction.js.map