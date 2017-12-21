/**
 * brief:   二进制读写重封装
 * date:    2017-10-31
 * author:  徐为
 */
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
    var GameByteArray = (function (_super) {
        __extends(GameByteArray, _super);
        function GameByteArray(buffer) {
            var _this = _super.call(this, buffer) || this;
            _this.endian = egret.Endian.BIG_ENDIAN;
            return _this;
        }
        //64位读
        GameByteArray.prototype.fReadLong = function () {
            var height = this.readInt() << 32;
            return height + this.readInt();
        };
        //64位写
        GameByteArray.prototype.fWriteLong = function (value) {
            var height = value & 0xffffffff00000000;
            var low = value & 0x00000000ffffffff;
            this.writeInt(height);
            this.writeInt(low);
        };
        return GameByteArray;
    }(egret.ByteArray));
    game.GameByteArray = GameByteArray;
    __reflect(GameByteArray.prototype, "game.GameByteArray");
})(game || (game = {}));
//# sourceMappingURL=GameByteArray.js.map