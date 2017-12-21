

module game {
    /**
 * brief:   麻将管理类
 * date:    2017-11-09
 * author:  徐为
 */
   
   export class GameCardManager{
 
      /********************************/
         private m_oDownCardGroup:CardGroup;
         private m_oUpCardGroup:CardGroup;
         private m_oLeftCardGroup:CardGroup;
         private m_oRightCardGroup:CardGroup;

         private m_oDeskTopCardGroup:CardGroup;
      /********************************/

       public constructor()
       {
         this.m_oCards = [];
           console.info('gs');
       }


      private static s_ins: GameCardManager;
	
	    public static fGetIns()
		  {
		  	if (!GameCardManager.s_ins)
		  	{
			  	GameCardManager.s_ins = new GameCardManager();
			  }
		    return GameCardManager.s_ins;
		  }

      public m_oCards:CardBase[] = [];

      public fClear(){
        this.m_oCards = [];
        this.m_oDeskTopCardGroup = null;
        this.m_oDownCardGroup = null;
        this.m_oLeftCardGroup = null;
        this.m_oRightCardGroup = null;
        this.m_oUpCardGroup = null;

      }

     

      public fPushCard(card:CardBase, pos:PlayePosition):void
      {
          this.m_oCards.push(card);
          if(PlayePosition.e_Desktop)
          {
            this.m_oDeskTopCardGroup.fPushCard(card);
          }
      }

      public fSplicCard(card:CardBase):void
      {

         var index = 0;
         for(var i in this.m_oCards)
         {
           if(card.fGetType() == this.m_oCards[i].fGetType() && card.fGetValue() == this.m_oCards[i].fGetValue())
           {
             this.m_oCards.splice(index, 1);
           }
           index++;
         }
      }
   }
}
