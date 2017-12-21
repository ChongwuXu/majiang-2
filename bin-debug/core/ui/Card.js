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
     *
     * @author
     *
     */
    var Card = (function (_super) {
        __extends(Card, _super);
        /********************************/
        function Card(name, cardBase) {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/gameSkins/HandCardDown.exml";
            _this.once(eui.UIEvent.COMPLETE, _this.fOnUICreate, _this);
            _this.m_oCardBuf = cardBase;
            _this.m_labValue.text = name;
            return _this;
        }
        Card.prototype.fOnUICreate = function () {
        };
        return Card;
    }(eui.Component));
    game.Card = Card;
    __reflect(Card.prototype, "game.Card");
    var CardLeft = (function (_super) {
        __extends(CardLeft, _super);
        /********************************/
        function CardLeft(name, cardBase) {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/gameSkins/HandCardLeft.exml";
            _this.once(eui.UIEvent.COMPLETE, _this.fOnUICreate, _this);
            _this.m_oCardBuf = cardBase;
            return _this;
        }
        CardLeft.prototype.fOnUICreate = function () {
        };
        return CardLeft;
    }(eui.Component));
    game.CardLeft = CardLeft;
    __reflect(CardLeft.prototype, "game.CardLeft");
    var CardUp = (function (_super) {
        __extends(CardUp, _super);
        /********************************/
        function CardUp(name, cardBase) {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/gameSkins/HandCardUp.exml";
            _this.once(eui.UIEvent.COMPLETE, _this.fOnUICreate, _this);
            _this.m_oCardBuf = cardBase;
            return _this;
        }
        CardUp.prototype.fOnUICreate = function () {
        };
        return CardUp;
    }(eui.Component));
    game.CardUp = CardUp;
    __reflect(CardUp.prototype, "game.CardUp");
    var CardRight = (function (_super) {
        __extends(CardRight, _super);
        /********************************/
        function CardRight(name, cardBase) {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/gameSkins/HandCardRight.exml";
            _this.once(eui.UIEvent.COMPLETE, _this.fOnUICreate, _this);
            _this.m_oCardBuf = cardBase;
            return _this;
        }
        CardRight.prototype.fOnUICreate = function () {
        };
        return CardRight;
    }(eui.Component));
    game.CardRight = CardRight;
    __reflect(CardRight.prototype, "game.CardRight");
})(game || (game = {}));
//# sourceMappingURL=Card.js.map