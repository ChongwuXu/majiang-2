/**
 * brief:   webSocket重封装
 * date:    2017-10-31
 * author:  徐为
 */

module game {
	/*
* socket服务器类型
*/
export enum SocketServerType{
  e_Hall    //大厅
}

export class GameSocket extends egret.EventDispatcher{

     /********************************/

        private m_oSocket:egret.WebSocket;

        private m_eServerType:SocketServerType;

        private m_bReConnect = false;

        public m_oLoginMoudle : game.LoginNetMoudle;
        public m_oActionMoudle : game.ActionMoudle;
        public m_oCreateRoomMoudle : game.CreateRoomMoudle;
        public m_oRoomMoudle:game.RoomMoudle;
        public m_oJoinRoomMoudle:game.JoinRoomMoudle;
       //192.168.1.49
          private m_aServerConfig = [
          { ip: "192.168.1.48", port: "9090/ws?userId=" }  //大厅服务器 
       ];

    /********************************/
    


    public constructor(type = SocketServerType.e_Hall){
      super();
      this.m_eServerType = type;
      this.m_nHearBeatId = 0;

      this.fInitModules();
    }

    private fInitModules():void{
         this.m_oLoginMoudle = new LoginNetMoudle();
         this.m_oActionMoudle = new ActionMoudle();

         GameSocket.s_aProtocols[Protocol.s_C2S_HEARDBEAT] = [];
         GameSocket.s_aProtocols[Protocol.s_C2S_HEARDBEAT]= [this, this.fOnHeartBeat];

         this.m_oCreateRoomMoudle = new CreateRoomMoudle();
         this.m_oRoomMoudle = new RoomMoudle();
         this.m_oJoinRoomMoudle = new JoinRoomMoudle();
    }

    private fOnHeartBeat(pkt:C2s_HeartBeat)
    {
         console.info('心跳')
    }

    private fOnConnect(event:egret.Event):void
    {
      
        console.info('连接 已经成功建立！')
        clearInterval(this.m_nHearBeatId);
        this.m_nHearBeatId = setInterval(() => {
            this.fSendHeartPkt();
       }, 6000);
    }

    private fSendHeartPkt():void
    {
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
    }

    public fSendPkt(pkt:Packet):void
    {
       if(this.m_oSocket.connected){

         console.info("发送数据包" + pkt.fGetPacketName())
         var by:GameByteArray = new GameByteArray;
         var pktData = pkt.fWrite();
         by.writeInt(pktData.length + 2);
         by.writeBytes(pktData);
         this.m_oSocket.writeBytes(by);
         this.m_oSocket.flush();
       }
       else{
           console.info('服务器已经断开连接')
       }
    }

    private m_nHearBeatId;

    private fOnReceiveMessage(event: egret.ProgressEvent){
       
         var by:GameByteArray = new GameByteArray;
         this.m_oSocket.readBytes(by);

         if(by.bytesAvailable >= 2)
         {
           //数据报长度
           var pktLen :number = by.readInt();
         //   by.position -= 2;
         //   if(by.bytesAvailable >= pktLen)
            {
              //  pktLen = by.readShort();
               // var pktType = by.readShort();
                var  pktType = by.readShort();
                console.info("收到数据包, 类型为：" + pktType + "，" + Packet.fGetPacketNameById(pktType));
               // pktType = by.readInt();
               //  pktType = by.readShort();
                by.position -= 4;

                 var pkt: Packet = Packet.fCreatePkt(pktType);
                 if(pkt != null){
  pkt.fRead(by);

                 var obj = GameSocket.s_aProtocols[pkt.fGetHead().m_nPktType];
                 if(obj == undefined)
                   return;
                 obj[1].call(obj[0], pkt);
                 }
               
            }
         }
    }

    private fRemoveEvent()
    {
          if(!this.m_oSocket)
             return ;
          if(this.m_oSocket.hasEventListener(egret.Event.CONNECT))
          {
              this.m_oSocket.removeEventListener(egret.Event.CONNECT, this.fOnConnect, this)
          }
          if (this.m_oSocket.hasEventListener(egret.ProgressEvent.SOCKET_DATA)) 
          {
                this.m_oSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.fOnReceiveMessage, this);
          }
          if (this.m_oSocket.hasEventListener(egret.Event.CLOSE)) {
               this.m_oSocket.removeEventListener(egret.Event.CLOSE, this.fOnClose, this);
          }
          if (this.m_oSocket.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
               this.m_oSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.fOnSocketError, this);
          }
    }

    private fCloseSocket(){
      if(this.m_oSocket)
      { 
          this.fRemoveEvent();
          this.m_oSocket.close();
          this.m_oSocket = null;
      }
    }

    private fOnSocketError(event:egret.IOErrorEvent):void{
      this.fOnClose(null);
    }

    private fOnClose(event:egret.Event):void
    {
        this.fRemoveEvent();
        
        if(this.m_oSocket.connected){
           if(egret.Capabilities.os == 'IOS'){
             this.m_bReConnect = false;
             this.fDoReconnect();
           }
           else{
               if (!this.m_oSocket.hasEventListener(egret.Event.CLOSE)) {
                        this.m_oSocket.addEventListener(egret.Event.CLOSE, this.fOnClose, this);
                    }
                    this.m_oSocket.close();
           }
        }
        else{
          this.m_bReConnect = false;
          this.fDoReconnect();
        }
        this.dispatchEvent(new egret.Event('NetError'));
    }

    private fDoReconnect():void{
       if(this.m_bReConnect == true)
         return;
       this.m_bReConnect = true;
       console.info('正在断线重连中...');

       this.m_oSocket = new egret.WebSocket();
       this.m_oSocket.type = egret.WebSocket.TYPE_BINARY;

       this.m_oSocket.addEventListener(egret.Event.CONNECT, this.fOnConnect, this);
       this.m_oSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.fOnReceiveMessage, this);
       this.m_oSocket.addEventListener(egret.Event.CLOSE, this.fOnClose, this);
       this.m_oSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.fOnSocketError, this);
       
       this.m_oSocket.connect(this.m_aServerConfig[this.m_eServerType].ip, <any>this.m_aServerConfig[this.m_eServerType].port)
    }

    public fInitSocket()
    {

     //  console.info('port=' + this.m_aServerConfig[0].port + GameManager.fGetIns().fGetUid(PlayePosition.e_Down));
       this.fCloseSocket();
       
       this.m_oSocket = new egret.WebSocket();
       this.m_oSocket.type = egret.WebSocket.TYPE_BINARY;
       this.m_oSocket.connect(this.m_aServerConfig[0].ip, <any>(this.m_aServerConfig[0].port + GameManager.fGetIns().m_sFirstPlayerUid))
       this.m_oSocket.addEventListener(egret.Event.CONNECT, this.fOnConnect, this);
       this.m_oSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.fOnReceiveMessage, this);
       this.m_oSocket.addEventListener(egret.Event.CLOSE, this.fOnClose, this);
       this.m_oSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.fOnSocketError, this);
       
      // this.m_oSocket.connect(this.m_aServerConfig[this.m_eServerType].ip, <any>this.m_aServerConfig[this.m_eServerType].port)
   }


   /********************************/
     static s_aProtocols = [];
    /********************************/
}

	
}
