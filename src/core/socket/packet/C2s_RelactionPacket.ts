

module game {


/**
 * brief:   三口关系包
 * date:    2017-10-31
 * author:  徐为
 */

export class C2s_RelationPacket extends Packet{

     /********************************/
      
      

     /********************************/

    public constructor(){
      super();
      this.m_oHead.m_nPktType = Protocol.s_C2S_LOGIN;
      this.m_sActionType = Packet.s_Login;

    }

    public fRead(by:GameByteArray):void{
      super.fRead(by);
      
      var uid = by.readUTF();
   //   GameManager.fGetIns().fSetUid(uid);
      if(Utils.fNotUsefunData(uid))
        console.warn("NotUserfunData");

      var loginType = by.readShort();
      GameManager.fGetIns().m_oGameBaseInfo.m_nLoginType = loginType;
      if(Utils.fNotUsefunData(loginType))
        console.warn("NotUserfunData");

    }

    public fWrite():GameByteArray{
          var by = super.fWrite();
         // var uid = GameManager.fGetIns().fGetUid();
         // if(Utils.fNotUsefunData(uid))
           //  console.warn("NotUserfunData");
         // by.writeUTF(uid);

          var type = GameManager.fGetIns().m_oGameBaseInfo.m_nLoginType;
          if(Utils.fNotUsefunData(type))
             console.warn("NotUserfunData");
          by.writeShort(type);

          return by;
       }
}


   
}
