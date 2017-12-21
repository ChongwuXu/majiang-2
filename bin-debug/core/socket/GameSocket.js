/**
 * brief:   webSocket重封装
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
    /*
* socket服务器类型
*/
    var SocketServerType;
    (function (SocketServerType) {
        SocketServerType[SocketServerType["e_Hall"] = 0] = "e_Hall"; //大厅
    })(SocketServerType = game.SocketServerType || (game.SocketServerType = {}));
    var GameSocket = (function (_super) {
        __extends(GameSocket, _super);
        /********************************/
        function GameSocket(type) {
            if (type === void 0) { type = SocketServerType.e_Hall; }
            var _this = _super.call(this) || this;
            _this.m_bReConnect = false;
            //192.168.1.49
            _this.m_aServerConfig = [
                { ip: "192.168.1.48", port: "9090/ws?userId=" } //大厅服务器 
            ];
            _this.m_eServerType = type;
            _this.m_nHearBeatId = 0;
            _this.fInitModules();
            return _this;
        }
        GameSocket.prototype.fInitModules = function () {
            this.m_oLoginMoudle = new game.LoginNetMoudle();
            this.m_oActionMoudle = new game.ActionMoudle();
            GameSocket.s_aProtocols[game.Protocol.s_C2S_HEARDBEAT] = [];
            GameSocket.s_aProtocols[game.Protocol.s_C2S_HEARDBEAT] = [this, this.fOnHeartBeat];
            this.m_oCreateRoomMoudle = new game.CreateRoomMoudle();
            this.m_oRoomMoudle = new game.RoomMoudle();
            this.m_oJoinRoomMoudle = new game.JoinRoomMoudle();
        };
        GameSocket.prototype.fOnHeartBeat = function (pkt) {
            console.info('心跳');
        };
        GameSocket.prototype.fOnConnect = function (event) {
            var _this = this;
            console.info('连接 已经成功建立！');
            clearInterval(this.m_nHearBeatId);
            this.m_nHearBeatId = setInterval(function () {
                _this.fSendHeartPkt();
            }, 6000);
        };
        GameSocket.prototype.fSendHeartPkt = function () {
            // var pkt:C2s_HeartBeat = new C2s_HeartBeat;
            //   var pkt:C2s_CreateRoomPacket = <C2s_CreateRoomPacket>Packet.CreateAction(Packet.s_CreateRoom);
            //  pkt.m_gameType = GameStyle.e_createRooom;
            //  pkt.m_gameName = GameName.e_ganYuMj;
            //   pkt.m_nPayStyle = 0;
            //   pkt.m_nCircle = 4;
            //   pkt.m_sRoomId = 'i 狗屎';
            //  this.fSendPkt(pkt);
            //  var pkt:Packet = Packet.fCreatePkt(Packet.s_Heart);
            // this.fSendPkt(pkt);
            //  console.info("send Hell0");
        };
        GameSocket.prototype.fSendPkt = function (pkt) {
            if (this.m_oSocket.connected) {
                console.info("发送数据包" + pkt.fGetPacketName());
                var by = new game.GameByteArray;
                var pktData = pkt.fWrite();
                by.writeInt(pktData.length + 2);
                by.writeBytes(pktData);
                this.m_oSocket.writeBytes(by);
                this.m_oSocket.flush();
            }
            else {
                console.info('服务器已经断开连接');
            }
        };
        GameSocket.prototype.fOnReceiveMessage = function (event) {
            var by = new game.GameByteArray;
            this.m_oSocket.readBytes(by);
            if (by.bytesAvailable >= 2) {
                //数据报长度
                var pktLen = by.readInt();
                //   by.position -= 2;
                //   if(by.bytesAvailable >= pktLen)
                {
                    //  pktLen = by.readShort();
                    // var pktType = by.readShort();
                    var pktType = by.readShort();
                    console.info("收到数据包, 类型为：" + pktType + "，" + game.Packet.fGetPacketNameById(pktType));
                    // pktType = by.readInt();
                    //  pktType = by.readShort();
                    by.position -= 4;
                    var pkt = game.Packet.fCreatePkt(pktType);
                    if (pkt != null) {
                        pkt.fRead(by);
                        var obj = GameSocket.s_aProtocols[pkt.fGetHead().m_nPktType];
                        if (obj == undefined)
                            return;
                        obj[1].call(obj[0], pkt);
                    }
                }
            }
        };
        GameSocket.prototype.fRemoveEvent = function () {
            if (!this.m_oSocket)
                return;
            if (this.m_oSocket.hasEventListener(egret.Event.CONNECT)) {
                this.m_oSocket.removeEventListener(egret.Event.CONNECT, this.fOnConnect, this);
            }
            if (this.m_oSocket.hasEventListener(egret.ProgressEvent.SOCKET_DATA)) {
                this.m_oSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.fOnReceiveMessage, this);
            }
            if (this.m_oSocket.hasEventListener(egret.Event.CLOSE)) {
                this.m_oSocket.removeEventListener(egret.Event.CLOSE, this.fOnClose, this);
            }
            if (this.m_oSocket.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
                this.m_oSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.fOnSocketError, this);
            }
        };
        GameSocket.prototype.fCloseSocket = function () {
            if (this.m_oSocket) {
                this.fRemoveEvent();
                this.m_oSocket.close();
                this.m_oSocket = null;
            }
        };
        GameSocket.prototype.fOnSocketError = function (event) {
            this.fOnClose(null);
        };
        GameSocket.prototype.fOnClose = function (event) {
            this.fRemoveEvent();
            if (this.m_oSocket.connected) {
                if (egret.Capabilities.os == 'IOS') {
                    this.m_bReConnect = false;
                    this.fDoReconnect();
                }
                else {
                    if (!this.m_oSocket.hasEventListener(egret.Event.CLOSE)) {
                        this.m_oSocket.addEventListener(egret.Event.CLOSE, this.fOnClose, this);
                    }
                    this.m_oSocket.close();
                }
            }
            else {
                this.m_bReConnect = false;
                this.fDoReconnect();
            }
            this.dispatchEvent(new egret.Event('NetError'));
        };
        GameSocket.prototype.fDoReconnect = function () {
            if (this.m_bReConnect == true)
                return;
            this.m_bReConnect = true;
            console.info('正在断线重连中...');
            this.m_oSocket = new egret.WebSocket();
            this.m_oSocket.type = egret.WebSocket.TYPE_BINARY;
            this.m_oSocket.addEventListener(egret.Event.CONNECT, this.fOnConnect, this);
            this.m_oSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.fOnReceiveMessage, this);
            this.m_oSocket.addEventListener(egret.Event.CLOSE, this.fOnClose, this);
            this.m_oSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.fOnSocketError, this);
            this.m_oSocket.connect(this.m_aServerConfig[this.m_eServerType].ip, this.m_aServerConfig[this.m_eServerType].port);
        };
        GameSocket.prototype.fInitSocket = function () {
            //  console.info('port=' + this.m_aServerConfig[0].port + GameManager.fGetIns().fGetUid(PlayePosition.e_Down));
            this.fCloseSocket();
            this.m_oSocket = new egret.WebSocket();
            this.m_oSocket.type = egret.WebSocket.TYPE_BINARY;
            this.m_oSocket.connect(this.m_aServerConfig[0].ip, (this.m_aServerConfig[0].port + game.GameManager.fGetIns().m_sFirstPlayerUid));
            this.m_oSocket.addEventListener(egret.Event.CONNECT, this.fOnConnect, this);
            this.m_oSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.fOnReceiveMessage, this);
            this.m_oSocket.addEventListener(egret.Event.CLOSE, this.fOnClose, this);
            this.m_oSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.fOnSocketError, this);
            // this.m_oSocket.connect(this.m_aServerConfig[this.m_eServerType].ip, <any>this.m_aServerConfig[this.m_eServerType].port)
        };
        /********************************/
        GameSocket.s_aProtocols = [];
        return GameSocket;
    }(egret.EventDispatcher));
    game.GameSocket = GameSocket;
    __reflect(GameSocket.prototype, "game.GameSocket");
})(game || (game = {}));
//# sourceMappingURL=GameSocket.js.map