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
 * brief:   主场景
 * date:    2017-12-7
 * author:  徐为
 */
var game;
(function (game) {
    var DeskCardLayer = (function (_super) {
        __extends(DeskCardLayer, _super);
        //***********************************/
        function DeskCardLayer() {
            var _this = _super.call(this) || this;
            _this.m_aDeskCardsUp = [];
            _this.m_aDeskCardsDown = [];
            _this.m_aDeskCardsLeft = [];
            _this.m_aDeskCardsRight = [];
            _this.skinName = "resource/mjSkins/layer/DeskCardLayer.exml";
            return _this;
        }
        DeskCardLayer.prototype.fOnUICreate = function () {
            this.m_oDirection.visible = false;
            this.m_bCompOnUICreate = true;
        };
        DeskCardLayer.prototype.fShowDir = function () {
            this.m_oDirection.visible = true;
            this.m_oDirection.fInitDir();
            this.m_bFinishCurrentPacket = true;
        };
        DeskCardLayer.prototype.fResetDir = function (deskPos) {
            console.info("重设方向了，方向为" + deskPos);
            this.m_oDirection.fResetDir(deskPos);
        };
        DeskCardLayer.prototype.fAddCard = function (cardBase, pos) {
            var deskCard = new game.DeskCardDown(cardBase);
            console.info("添加桌牌" + cardBase.m_sName);
            if (pos == game.PlayePosition.e_Down) {
                // deskCard = new DeskCardDown(cardBase);
                this.m_aDeskCardsDown.push(deskCard);
                this.m_gopDown.addChild(deskCard);
                deskCard.x = 290;
                deskCard.y = 60;
                deskCard.scaleX = deskCard.scaleY = 2;
                egret.Tween.get(deskCard).wait(400)
                    .to({ x: this.m_aDeskCardsDown.length % 6 * 30,
                    y: Math.ceil(this.m_aDeskCardsDown.length / 6) * 30,
                    scaleX: 1, scaleY: 1 }, 100);
            }
            else if (pos == game.PlayePosition.e_Up) {
                //  deskCard = new DeskCardUp(cardBase);
                this.m_aDeskCardsUp.push(deskCard);
                this.m_gopUp.addChild(deskCard);
                deskCard.x = this.m_aDeskCardsUp.length % 6 * 30;
                deskCard.y = Math.ceil(this.m_aDeskCardsUp.length / 6) * 30;
            }
            else if (pos == game.PlayePosition.e_Left) {
                // deskCard = new DeskCardLeft(cardBase);
                this.m_aDeskCardsLeft.push(deskCard);
                this.m_gopLeft.addChild(deskCard);
                deskCard.x = this.m_aDeskCardsLeft.length % 6 * 30;
                deskCard.y = Math.ceil(this.m_aDeskCardsLeft.length / 6) * 30;
            }
            else if (pos == game.PlayePosition.e_Right) {
                //  deskCard = new DeskCardRight(cardBase);
                this.m_aDeskCardsRight.push(deskCard);
                this.m_gopRight.addChild(deskCard);
                deskCard.x = this.m_aDeskCardsRight.length % 6 * 30;
                deskCard.y = -Math.ceil(this.m_aDeskCardsRight.length / 6) * 30;
            }
        };
        return DeskCardLayer;
    }(game.Scene));
    game.DeskCardLayer = DeskCardLayer;
    __reflect(DeskCardLayer.prototype, "game.DeskCardLayer");
})(game || (game = {}));
//# sourceMappingURL=DeskCardLayer.js.map