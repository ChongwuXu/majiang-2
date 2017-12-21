

module game {

  /**
     * brief:   出牌活动数据包
     * date:    2017-11-09
     * author:  徐为
   */

   export class C2s_PlayHandAction extends C2s_ActionBase{
       public constructor(){
          
          super();
          this.m_oHead.m_nPktType = Protocol.s_C2S_PLAYHAND;
          this.m_sActionType = Packet.s_PlayHand;
       //   this.m_nCardsCount = 1;
       }


       public fWrite():GameByteArray{
          var by = super.fWrite();
          
          return by;
       }

       public fRead(by:GameByteArray)
       {
             super.fRead(by);
             // if(this.fGetBelongPlayerPos() == this.fGetCurrPlayrPos())
           //  {
                var card = this.m_aGroupCards[0].fGetCard()[0];
                  if(Utils.fNotUsefunData(card))
                {
                    console.error("C2s_PlayHandAction  var card = this.m_aGroupCards[0].fGetCard()[0];");
                }
                GameManager.fGetIns().m_oChuHandCard = new HandCardDown(card);
                console.info('dd')

            // }
             this.fVerifyNumber();
       }

       //成员变量校验
       private fVerifyNumber(){
           // if(this.m_nCardsCount != 1)
            {
              //  console.info('C2s_PlayHandAction this.m_nCardsCount != 1, = ' + this.m_nCardsCount);
               // alert('C2s_PlayHandAction this.m_nCardsCount != 1, = ' + this.m_nCardsCount);
            }
           
       }
      
   }


}
