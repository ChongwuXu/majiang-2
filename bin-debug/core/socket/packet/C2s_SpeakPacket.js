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
     * brief:   玩家信息
     * date:    2017-11-30
     * author:  徐为
     */
    var C2s_SpeakPacket = (function (_super) {
        __extends(C2s_SpeakPacket, _super);
        /********************************/
        function C2s_SpeakPacket() {
            var _this = _super.call(this) || this;
            /********************************/
            _this.m_nVoiceCount = 0;
            _this.m_aVoice = [];
            _this.m_oHead.m_nPktType = game.Protocol.s_C2S_SPEAK;
            _this.m_sActionType = game.Packet.s_Speak;
            return _this;
        }
        C2s_SpeakPacket.prototype.fSetVoice = function (str) {
            console.info("xuwei: str.length = " + str.length);
            while (str.length >= 30000) {
                this.m_aVoice[this.m_nVoiceCount] = str.slice(0, 30000);
                str = str.slice(30000, str.length);
                this.m_nVoiceCount++;
            }
            this.m_aVoice[this.m_nVoiceCount++] = str;
            console.info("xuwei: m_nVoiceCount = " + this.m_nVoiceCount);
        };
        C2s_SpeakPacket.prototype.fWrite = function () {
            var by = _super.prototype.fWrite.call(this);
            by.writeShort(this.m_nVoiceCount);
            for (var i = 0; i < this.m_nVoiceCount; i++)
                by.writeUTF(this.m_aVoice[i]);
            return by;
        };
        C2s_SpeakPacket.prototype.fRead = function (by) {
            _super.prototype.fRead.call(this, by);
            this.m_nVoiceCount = by.readShort();
            console.info("xuwei: fRead = " + this.m_nVoiceCount);
            for (var i = 0; i < this.m_nVoiceCount; i++) {
                this.m_aVoice[i] = by.readUTF();
                console.info("xuwei: fRead = " + this.m_aVoice[i]);
            }
        };
        return C2s_SpeakPacket;
    }(game.Packet));
    game.C2s_SpeakPacket = C2s_SpeakPacket;
    __reflect(C2s_SpeakPacket.prototype, "game.C2s_SpeakPacket");
})(game || (game = {}));
//# sourceMappingURL=C2s_SpeakPacket.js.map