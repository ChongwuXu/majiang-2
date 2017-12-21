
/**
 * brief:   头像
 * date:    2017-12-7
 * author:  徐为
 */
module game
{
   


    export class DeskCardUp extends DeskCard
    {


      //***********************************/
       
      //***********************************/

       
        public constructor(cardBase:CardBase)
        {
            super(cardBase);
            
            this.skinName = "resource/mjSkins/comp/DeskCardUp.exml";

        }

       
        public fOnUICreate()
        {
           this.rotation
        }
        
        public fOnClick(button)
        {
          
        }

    
    }
}