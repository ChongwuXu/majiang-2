

module game {

  /**
     * brief:   听数据包
     * date:    2017-12-21
     * author:  徐为
   */

   export class C2s_TingActionPacket extends C2s_ActionBase{
       public constructor(){
          
          super();
          this.m_oHead.m_nPktType = Protocol.s_C2S_TING_PAI;
          this.m_sActionType = Packet.s_Ting;
       //   this.m_nCardsCount = 3;
       }


       public fWrite():GameByteArray{
          var by = super.fWrite();
          return by;
       }

       public fRead(by:GameByteArray)
       {
             super.fRead(by);
             GameManager.fGetIns().m_nPlayerActionPos = this.m_pCurrentPlayer;
             this.fVerifyNumber();
       }

       //成员变量校验
       private fVerifyNumber(){
           // if(this.m_nCardsCount != 3)
            {
                //console.info('C2s_EatAction this.m_nCardsCount != 3, = ' + this.m_nCardsCount);
               // alert('C2s_EatAction this.m_nCardsCount != 3, = ' + this.m_nCardsCount);
            }
            
       }
      
   }

  

}
