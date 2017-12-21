

module game {


/**
 * brief:   心跳包数据
 * date:    2017-10-31
 * author:  徐为
 */

export class C2s_HeartBeat extends Packet{
   
    public constructor(){
       super();
       this.m_oHead.m_nPktType = Protocol.s_C2S_HEARDBEAT;
       C2s_HeartBeat.s_nNumber++;
    }


    public fRead(by:GameByteArray):void{
      super.fRead(by);
      
      var num = by.fReadLong();
      if(num <   C2s_HeartBeat.s_nNumber)
         console.warn('心跳包丢失,发送个数' + C2s_HeartBeat.s_nNumber + '接收个数' + num);
    }


     public fWrite():GameByteArray{
          var by = super.fWrite();
          by.fWriteLong(C2s_HeartBeat.s_nNumber)
          return by;
       }

   
     /********************************/

       static s_nNumber:number = 0;  //当前心跳次数
      
     /********************************/
}

}
