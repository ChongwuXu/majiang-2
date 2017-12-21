

module game {


/**
 * brief:   玩家信息
 * date:    2017-11-30
 * author:  徐为
 */

export class C2s_SpeakPacket extends Packet{
   
     /********************************/
       public m_nVoiceCount:number = 0;
       public m_aVoice:string[]  = [];
     /********************************/

    public constructor(){
       super();
       this.m_oHead.m_nPktType = Protocol.s_C2S_SPEAK;
       this.m_sActionType = Packet.s_Speak;
      
  

    }

    public fSetVoice(str:string){
      console.info("xuwei: str.length = " + str.length);
         while(str.length >= 30000)
         {
           this.m_aVoice[this.m_nVoiceCount] = str.slice(0, 30000);
           str = str.slice(30000, str.length);
           this.m_nVoiceCount ++;
         }
        
          this.m_aVoice[this.m_nVoiceCount ++] = str;
            console.info("xuwei: m_nVoiceCount = " + this.m_nVoiceCount);
         
    }

      public fWrite():GameByteArray
      {
          var by = super.fWrite();
          by.writeShort(this.m_nVoiceCount);

          for(var i = 0; i < this.m_nVoiceCount; i++)
             by.writeUTF(this.m_aVoice[i]);
          return by;
      }

     public fRead(by:GameByteArray)
     {
        super.fRead(by);
        this.m_nVoiceCount = by.readShort();
         console.info("xuwei: fRead = " + this.m_nVoiceCount);
        for(var i = 0; i < this.m_nVoiceCount; i++)
        {
           this.m_aVoice[i] = by.readUTF();
           console.info("xuwei: fRead = " +  this.m_aVoice[i]);
        }
         
     }


   
}

}
