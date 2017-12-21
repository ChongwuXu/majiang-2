var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * brief:   事件句柄
     * date:    2017-11-01
     * author:  徐为
     */
    var Handle = (function () {
        function Handle() {
        }
        /********************************/
        //发送消息
        Handle.prototype.fSendMessage = function (msgName, obj) {
            if (obj)
                game.Poster.Ins.dispatchEvent(new game.MessageEvent(msgName, obj));
            else
                game.Poster.Ins.dispatchEvent(new game.MessageEvent(msgName));
        };
        //接收消息
        Handle.prototype.fReceiveMessage = function (content, messListener) {
            var msgName = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                msgName[_i - 2] = arguments[_i];
            }
            this.m_oContent = content;
            this.m_fMessListener = messListener;
            this.m_aMsgName = msgName;
            var poster = game.Poster.Ins;
            for (var i in msgName) {
                poster.addEventListener(msgName[i], messListener, content);
            }
        };
        Handle.prototype.fReceiveOnce = function (onceContext, onceListener) {
            var onceMsgName = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                onceMsgName[_i - 2] = arguments[_i];
            }
            this.m_oOnceContent = onceContext;
            this.m_fOnceListener = onceListener;
            this.m_aOnceMsgName = onceMsgName;
            var poster = game.Poster.Ins;
            for (var i in onceMsgName) {
                poster.once(onceMsgName[i], onceListener, onceContext);
            }
            poster = null;
        };
        Handle.prototype.fRelease = function () {
            var poster = game.Poster.Ins;
            if (this.m_fMessListener) {
                for (var i in this.m_aMsgName) {
                    poster.removeEventListener(this.m_aMsgName[i], this.m_fMessListener, this.m_oContent);
                }
            }
            if (this.m_fOnceListener) {
                for (var i in this.m_aMsgName) {
                    poster.removeEventListener(this.m_aOnceMsgName[i], this.m_fOnceListener, this.m_oOnceContent);
                }
            }
        };
        return Handle;
    }());
    game.Handle = Handle;
    __reflect(Handle.prototype, "game.Handle");
})(game || (game = {}));
//# sourceMappingURL=GameHandle.js.map