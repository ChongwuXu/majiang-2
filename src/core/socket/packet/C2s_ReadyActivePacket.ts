

module game {


/**
 * brief:   准备包数据
 * date:    2017-10-31
 * author:  徐为
 */

export class S2C_ReadyActive extends Packet{

     /********************************/
      
      public m_nReadyNum:number;  //准备的玩家数量
      public m_aReadyPos:PlayePosition[] = [];

     /********************************/

    public constructor(){
      super();
      this.m_oHead.m_nPktType = Protocol.s_C2S_Ready;
      this.m_sActionType = Packet.s_PlayerReady;

    }

    public fRead(by:GameByteArray):void{
      super.fRead(by);
      
      this.m_nReadyNum = by.readShort();
      for(var i = 0; i < this.m_nReadyNum; i++)
      {
         var pos = by.readShort();
         this.m_aReadyPos.push(pos);
      }

    }

    public fWrite():GameByteArray{
          var by = super.fWrite();
          by.writeShort(this.m_nReadyNum)
          for(var i = 0; i < this.m_nReadyNum; i++)
          {
              by.writeShort(this.m_aReadyPos[i]);
          }
          return by;
       }
}


   
}
