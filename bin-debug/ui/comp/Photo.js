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
    var Photo = (function (_super) {
        __extends(Photo, _super);
        //***********************************/
        function Photo() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/mjSkins/layer/Photo.exml";
            return _this;
        }
        Photo.prototype.fOnUICreate = function () {
            this.m_imgOwner.visible = false;
        };
        Photo.prototype.fOnClick = function (button) {
        };
        Photo.prototype.fVisibleJoinGroup = function (visible) {
            this.m_gopJoin.visible = visible;
        };
        Photo.prototype.fVisibleOwner = function (visible) {
            this.m_imgOwner.visible = visible;
        };
        return Photo;
    }(game.Scene));
    game.Photo = Photo;
    __reflect(Photo.prototype, "game.Photo");
})(game || (game = {}));
//# sourceMappingURL=Photo.js.map