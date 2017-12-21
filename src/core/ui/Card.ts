module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class Card extends eui.Component{

        /********************************/

         private m_labValue:eui.Label;
         public m_oCardBuf:CardBase;
         private m_sName:string;
        /********************************/

      

        public constructor(name:string, cardBase:CardBase)
        {
            super();
            this.skinName = "resource/gameSkins/HandCardDown.exml";
            this.once(eui.UIEvent.COMPLETE, this.fOnUICreate, this);
            this.m_oCardBuf = cardBase;
           this.m_labValue.text = name;
        }

        protected fOnUICreate(){
          
           
        }
      
    }

    	export class CardLeft extends eui.Component{

        /********************************/

            public m_oCardBuf:CardBase;
        /********************************/

      

        public constructor(name:string, cardBase:CardBase)
        {
            super();
            this.skinName = "resource/gameSkins/HandCardLeft.exml";
            this.once(eui.UIEvent.COMPLETE, this.fOnUICreate, this);
             this.m_oCardBuf = cardBase;
        }

        protected fOnUICreate(){
          
         
        }
      
    }

    	export class CardUp extends eui.Component{

        /********************************/
           public m_oCardBuf:CardBase;
       
        /********************************/

      

        public constructor(name:string, cardBase:CardBase)
        {
            super();
            this.skinName = "resource/gameSkins/HandCardUp.exml";
            this.once(eui.UIEvent.COMPLETE, this.fOnUICreate, this);
            this.m_oCardBuf = cardBase;
        }

        protected fOnUICreate(){
          
         
        }
      
    }

   	export class CardRight extends eui.Component{

        /********************************/
         public m_oCardBuf:CardBase;
    
        /********************************/

      

        public constructor(name:string, cardBase:CardBase)
        {
            super();
            this.skinName = "resource/gameSkins/HandCardRight.exml";
            this.once(eui.UIEvent.COMPLETE, this.fOnUICreate, this);
            this.m_oCardBuf = cardBase;
        }

        protected fOnUICreate(){
          
         
        }
      
    }
}
