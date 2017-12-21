var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * brief:   通信数据包头
     * date:    2017-10-31
     * author:  徐为
     */
    var PacketHead = (function () {
        function PacketHead() {
            this.m_nErrcode = 0;
        }
        /********************************/
        PacketHead.prototype.fWrite = function () {
            var by = new game.GameByteArray;
            by.writeShort(this.m_nPktType);
            by.writeInt(this.m_nErrcode);
            return by;
        };
        PacketHead.prototype.fRead = function (by) {
            this.m_nPktLen = by.readShort();
            this.m_nPktType = by.readShort();
            this.m_nErrcode = by.readInt();
        };
        return PacketHead;
    }());
    __reflect(PacketHead.prototype, "PacketHead");
    /**
     * brief:   通信基础数据
     * date:    2017-10-31
     * author:  徐为
     */
    var Packet = (function () {
        function Packet() {
            this.m_oHead = new PacketHead;
            /********************************/
        }
        Packet.prototype.fWrite = function () {
            return this.m_oHead.fWrite();
        };
        Packet.prototype.fRead = function (by) {
            this.m_oHead.fRead(by);
        };
        Packet.prototype.fGetHead = function () {
            return this.m_oHead;
        };
        Packet.prototype.fGetPacketName = function () {
            return this.m_sActionType;
        };
        Packet.fInitPacketMap = function () {
            if (Packet.s_aPacketMapStrValue.length)
                return;
            Packet.s_aPacketMapStrValue.push([game.Packet.s_PlayHand, function () { return new game.C2s_PlayHandAction; }]);
            Packet.s_aPacketMapStrValue.push([game.Packet.s_Touch, function () { return new game.C2s_TouchPacket; }]);
            Packet.s_aPacketMapStrValue.push([game.Packet.s_Eat, function () { return new game.C2s_EatAction; }]);
            Packet.s_aPacketMapStrValue.push([game.Packet.s_Peng, function () { return new game.C2s_PengAction; }]);
            Packet.s_aPacketMapStrValue.push([game.Packet.s_Gang, function () { return new game.C2s_GangAction; }]);
            Packet.s_aPacketMapStrValue.push([game.Packet.s_BeginGame, function () { return new game.C2s_BeginGamePacket; }]);
            Packet.s_aPacketMapStrValue.push([game.Packet.s_CreateRoom, function () { return new game.C2s_CreateRoomPacket; }]);
            Packet.s_aPacketMapStrValue.push([game.Packet.s_JoinRoom, function () { return new game.C2s_JoinRoomPacket; }]);
            Packet.s_aPacketMapStrValue.push([game.Packet.s_Login, function () { return new game.C2s_GameLogin; }]);
            Packet.s_aPacketMapStrValue.push([game.Packet.s_RoomInfo, function () { return new game.C2s_RoomInfoPacket; }]);
            Packet.s_aPacketMapStrValue.push([game.Packet.s_PlayerReady, function () { return new game.S2C_ReadyActive; }]);
            Packet.s_aPacketMapStrValue.push([game.Packet.s_Speak, function () { return new game.C2s_SpeakPacket; }]);
            Packet.s_aPacketMapStrValue.push([game.Packet.s_Hu, function () { return new game.C2s_HuActionPacket; }]);
            Packet.s_aPacketMapStrValue.push([game.Packet.s_Ting, function () { return new game.C2s_TingActionPacket; }]);
            Packet.s_aPacketMapNumValue.push([game.Protocol.s_C2S_PLAYHAND, function () { return new game.C2s_PlayHandAction; }]);
            Packet.s_aPacketMapNumValue.push([game.Protocol.s_C2S_MOPAI, function () { return new game.C2s_TouchPacket; }]);
            Packet.s_aPacketMapNumValue.push([game.Protocol.s_C2S_EAT_PAI, function () { return new game.C2s_EatAction; }]);
            Packet.s_aPacketMapNumValue.push([game.Protocol.s_C2S_PENG_PAI, function () { return new game.C2s_PengAction; }]);
            Packet.s_aPacketMapNumValue.push([game.Protocol.s_C2S_GANG_PAI, function () { return new game.C2s_GangAction; }]);
            Packet.s_aPacketMapNumValue.push([game.Protocol.s_C2S_StartHand, function () { return new game.C2s_BeginGamePacket; }]);
            Packet.s_aPacketMapNumValue.push([game.Protocol.s_C2S_CREATEROOM, function () { return new game.C2s_CreateRoomPacket; }]);
            Packet.s_aPacketMapNumValue.push([game.Protocol.s_C2S_JOINROOM, function () { return new game.C2s_JoinRoomPacket; }]);
            Packet.s_aPacketMapNumValue.push([game.Protocol.s_C2S_LOGIN, function () { return new game.C2s_GameLogin; }]);
            Packet.s_aPacketMapNumValue.push([game.Protocol.s_C2S_ROOMINFO, function () { return new game.C2s_RoomInfoPacket; }]);
            Packet.s_aPacketMapNumValue.push([game.Protocol.s_C2S_Ready, function () { return new game.S2C_ReadyActive; }]);
            Packet.s_aPacketMapNumValue.push([game.Protocol.s_C2S_SPEAK, function () { return new game.C2s_SpeakPacket; }]);
            Packet.s_aPacketMapNumValue.push([game.Protocol.s_C2S_HU_PAI, function () { return new game.C2s_HuActionPacket; }]);
            Packet.s_aPacketMapNumValue.push([game.Protocol.s_C2S_TING_PAI, function () { return new game.C2s_TingActionPacket; }]);
            Packet.s_aPacketMapNumStr.push([game.Protocol.s_C2S_PLAYHAND, game.Packet.s_PlayHand]);
            Packet.s_aPacketMapNumStr.push([game.Protocol.s_C2S_MOPAI, game.Packet.s_Touch]);
            Packet.s_aPacketMapNumStr.push([game.Protocol.s_C2S_EAT_PAI, game.Packet.s_Eat]);
            Packet.s_aPacketMapNumStr.push([game.Protocol.s_C2S_PENG_PAI, game.Packet.s_Peng]);
            Packet.s_aPacketMapNumStr.push([game.Protocol.s_C2S_GANG_PAI, game.Packet.s_Gang]);
            Packet.s_aPacketMapNumStr.push([game.Protocol.s_C2S_StartHand, game.Packet.s_BeginGame]);
            Packet.s_aPacketMapNumStr.push([game.Protocol.s_C2S_CREATEROOM, game.Packet.s_CreateRoom]);
            Packet.s_aPacketMapNumStr.push([game.Protocol.s_C2S_JOINROOM, game.Packet.s_JoinRoom]);
            Packet.s_aPacketMapNumStr.push([game.Protocol.s_C2S_LOGIN, game.Packet.s_Login]);
            Packet.s_aPacketMapNumStr.push([game.Protocol.s_C2S_ROOMINFO, game.Packet.s_RoomInfo]);
            Packet.s_aPacketMapNumStr.push([game.Protocol.s_C2S_Ready, game.Packet.s_PlayerReady]);
            Packet.s_aPacketMapNumStr.push([game.Protocol.s_C2S_SPEAK, game.Packet.s_Speak]);
            Packet.s_aPacketMapNumStr.push([game.Protocol.s_C2S_HU_PAI, game.Packet.s_Hu]);
            Packet.s_aPacketMapNumStr.push([game.Protocol.s_C2S_TING_PAI, game.Packet.s_Ting]);
        };
        Packet.fGetPacketNameById = function (type) {
            for (var i = 0; i < Packet.s_aPacketMapNumStr.length; i++) {
                if (Packet.s_aPacketMapNumStr[i][0] == type)
                    return Packet.s_aPacketMapNumStr[i][1];
            }
        };
        Packet.fCreateAction = function (type) {
            var action = null;
            if (!Packet.s_aPacketMapStrValue.length) {
                console.warn('Packet.s_aPacketMap 未初始化');
                return null;
            }
            for (var i in Packet.s_aPacketMapStrValue) {
                if (Packet.s_aPacketMapStrValue[i][0] == type)
                    action = Packet.s_aPacketMapStrValue[i][1]();
            }
            if (action == null) {
                console.warn('C2s_ActionBase.CreateAction fail ' + type);
            }
            return action;
        };
        Packet.prototype.fGetActionType = function () {
            return this.m_sActionType;
        };
        Packet.fCreatePkt = function (type) {
            var action = null;
            if (!Packet.s_aPacketMapNumValue.length) {
                console.warn('Packet.s_aPacketMap 未初始化');
                return null;
            }
            for (var i in Packet.s_aPacketMapNumValue) {
                if (Packet.s_aPacketMapNumValue[i][0] == type)
                    action = Packet.s_aPacketMapNumValue[i][1]();
            }
            if (action == null) {
                console.warn("fCreatePkt fail" + type);
            }
            return action;
        };
        Packet.s_aPacketMapStrValue = [];
        Packet.s_aPacketMapNumValue = [];
        Packet.s_aPacketMapNumStr = [];
        /********************************/
        Packet.s_Eat = "吃牌";
        Packet.s_Peng = "碰牌";
        Packet.s_Gang = "杠牌";
        Packet.s_Hu = "胡牌";
        Packet.s_Ting = "听牌";
        Packet.s_Touch = "摸牌";
        Packet.s_PlayHand = "出牌";
        Packet.s_BeginGame = "开始打牌";
        Packet.s_CreateRoom = "创建房间";
        Packet.s_JoinRoom = '加入房间';
        Packet.s_BaseAct = "基本";
        Packet.s_Login = "登录";
        Packet.s_Heart = "心跳";
        Packet.s_RoomInfo = "房间信息";
        Packet.s_PlayerReady = "玩家准备";
        Packet.s_Speak = "语音聊天";
        Packet.s_SanKou = "三口关系";
        return Packet;
    }());
    game.Packet = Packet;
    __reflect(Packet.prototype, "game.Packet");
})(game || (game = {}));
//# sourceMappingURL=Packet.js.map