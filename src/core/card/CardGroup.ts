

module game {
    /**
 * brief:   麻将分组。比如一组吃的麻将
 * date:    2017-11-09
 * author:  徐为
 */
   export class CardStatus{
       public m_nStatusType:number;
       public m_nTime:number;

       public constructor(){
           this.m_nStatusType = -1;
           this.m_nTime = -1;
       }

         public fRead(by:GameByteArray){
             this.m_nStatusType = by.readShort();
             this.m_nTime = by.fReadLong();
         }

         public fWrite(by:GameByteArray):GameByteArray{
             by.writeShort(this.m_nStatusType);
             by.fWriteLong(this.m_nTime);
             return by;
         }



    public  static  s_Status_Desktop:number = 0;     //桌牌
    public  static  s_Status_Hand:number = 1;         //手牌
    public  static  s_Status_Mo:number  = 2;          //摸得牌
    public  static  s_Status_Launch:number = 3;       //打出去得牌
    public  static  s_Status_Eat:number = 4;          //吃
    public  static  s_Status_Peng:number = 5;          //碰
    public  static  s_Status_Gang:number = 6;         //杠
    public  static  s_Status_Hua:number = 7;          //花
    public  static  s_Status_Hu:number = 8;           //胡
   }

   export class CardGroup{

       /********************************/

     
       private m_aCards:CardBase[] = [];
       public m_pBelong:PlayePosition;              //归属者
       public m_nCardsCount:number;
       public m_oCardStatus:CardStatus;
      /********************************/
   
       public constructor()
       {
           this.m_oCardStatus = new CardStatus();
       }

       public fRead(by:GameByteArray){
           this.m_pBelong = by.readShort();
           this.m_nCardsCount = by.readShort();
           for(var i =0; i < this.m_nCardsCount; i++)
           {
               var base:CardBase = new CardBase(-1, -1, -1);
               base.fRead(by);
               this.m_aCards.push(base);
           }
         //  this.fInitSort();

           this.m_oCardStatus.fRead(by);
       }


       public fWrite(by:GameByteArray){
           by.writeShort(this.m_pBelong);
           by.writeShort(this.m_nCardsCount);
           for(var i =0; i < this.m_nCardsCount; i++)
           {
              this.m_aCards[i].fWrite(by);
           }

             this.m_oCardStatus.fWrite(by);
       }

       public fPushCard(card : CardBase){
           this.m_aCards.push(card);
       }

       public fGetCard():CardBase[]
       {
           return this.m_aCards;
       }

       public fSetCards(cards:CardBase[])
       {
           this.m_aCards = cards;
         //  this.fInitSort();
       }

       
      public fSplicCard(card:CardBase):void
      {

         var index = 0;
         for(var i in this.m_aCards)
         {
           if(card.fGetType() == this.m_aCards[i].fGetType() && card.fGetValue() == this.m_aCards[i].fGetValue() && 
           card.m_nPriority == this.m_aCards[i].m_nPriority)
           {
             this.m_aCards.splice(index, 1);
               this.m_nCardsCount --;
           }
           index++;
         }
       
      }

      //初始化排序
      public fInitSort(){
          var i:number, j:number;
          var temp:CardBase ;
          for( i = 1; i < this.m_aCards.length; i++)
          {
              temp = this.m_aCards[i];
              for(j = i; j > 0 && this.m_aCards[j - 1].m_nPriority > temp.m_nPriority; j--){
                  this.m_aCards[j] = this.m_aCards[j - 1];
              }

              this.m_aCards[j] = temp;
          }
      }

 
   }

}