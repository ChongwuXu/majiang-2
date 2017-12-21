

module game {

  /**
     * brief:   摸排
     * date:    2017-12-04
     * author:  徐为
   */

   export class C2s_TouchPacket extends C2s_ActionBase{
        /********************************/
           
        /********************************/

       public constructor(){
          
          super();
          this.m_oHead.m_nPktType = Protocol.s_C2S_MOPAI;
          this.m_sActionType = Packet.s_Touch;
      
       }


       public fWrite():GameByteArray{
          var by = super.fWrite();
          return by;
       }

       public fRead(by:GameByteArray)
       {
             super.fRead(by);
             GameManager.fGetIns().m_nPlayerActionPos = this.m_pCurrentPlayer;
             if(this.fGetBelongPlayerPos() == this.fGetCurrPlayrPos())
             {
                var card = this.m_aGroupCards[0].fGetCard()[0];
                if(Utils.fNotUsefunData(card))
                {
                    console.error("C2s_TouchPacket var card = this.m_aGroupCards[0].fGetCard()[0];");
                }
             
                GameManager.fGetIns().m_oTouchHandCard = new HandCardDown(card);
                console.info(" GameManager.fGetIns().m_oTouchHandCard" + GameManager.fGetIns().m_oTouchHandCard.m_oCardBase)

            }
            console.info('dddd');

             this.fVerifyNumber();
       }

       //成员变量校验
       private fVerifyNumber(){
           // if(this.m_nCardsCount != 3)
            {
            //    console.info('C2s_EatAction this.m_nCardsCount != 3, = ' + this.m_nCardsCount);
             //   alert('C2s_EatAction this.m_nCardsCount != 3, = ' + this.m_nCardsCount);
            }
            
       }
      
   }

  

}
