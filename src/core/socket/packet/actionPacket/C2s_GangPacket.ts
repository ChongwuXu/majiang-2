

module game {

  /**
     * brief:   杠数据包
     * date:    2017-12-07
     * author:  徐为
   */

   export class C2s_GangAction extends C2s_ActionBase{
       public constructor(){
          
          super();
          this.m_oHead.m_nPktType = Protocol.s_C2S_GANG_PAI;
          this.m_sActionType = Packet.s_Gang;
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
