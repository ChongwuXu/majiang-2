

module game {
    /**
 * brief:   基本麻将类
 * date:    2017-11-09
 * author:  徐为
 */
   

   export class CardBase{

       /********************************/

       private m_nType:number;                      //类型

       private m_nValue:number;                     //如'1'

       private m_nIndex:number                      //同一种牌可能会有4个
       
       public  m_nPriority:number;                  //排序优先级
      
       public m_pBelong:PlayePosition;              //归属者
    
       public m_aAction:C2s_ActionBase[] = [];      //所有活动

       public m_sName:string;

      /********************************/
   
       public constructor(type : number, value : number, index : number)
       {
           this.m_nType = type;
           this.m_nIndex = index;
           this.m_nValue = value;
       }

       public fRead(by:GameByteArray){
         this.m_nType = by.readShort();
         this.m_nValue = by.readShort();
         this.m_nIndex = by.readShort();
         this.m_nPriority = by.readShort();
         this.m_sName = by.readUTF();
       
       }

       public fWrite(by:GameByteArray){
            by.writeShort(this.m_nType);
            by.writeShort( this.m_nValue);
            by.writeShort( this.m_nIndex);
            by.writeShort(this.m_nPriority);
            by.writeUTF(this.m_sName);
            return by;
            
       }

            //插入排序
      public static fInsetCard(card:CardBase, cards:CardBase[]):void{
          var low = 0, high = cards.length;
            var mid = Math.floor(((high+low)/2)) ;
            while(mid > 0 && mid < (high-1))
            {
                if(card.m_nPriority >= cards[mid-1].m_nPriority  && card.m_nPriority <= cards[mid + 1].m_nPriority)
                {
                        if((high + low) % 2 == 0)
                           cards.splice(mid + 1, 0, card); 
                        else
                           cards.splice(mid +1, 0, card); 
                       return;
                }
                else if(card.m_nPriority > cards[mid].m_nPriority)  
                    mid =   Math.floor((high+mid)/2) ;
                else
                   mid =  Math.floor((mid)/2) ;
            }
            if(mid != 0)
               cards.splice(mid + 1, 0, card); 
            else 
                cards.splice(mid, 0, card); 
      } 

       public fEqual(card:CardBase, index:boolean = false):boolean{
         if(index)
         {
              if((this.m_nType == card.m_nType) && (this.m_nValue == card.m_nValue) && (this.m_nIndex == card.m_nIndex))
               return true;
               else
                 return false;
         }
         else{
          if((this.m_nType == card.m_nType) && (this.m_nValue == card.m_nValue))
           return true;
         else
           return false;
         }
        
       }

      // public constructor(){}

       public fGetType():number{return this.m_nType;}
       public fSetType(type:number){this.m_nType = type;}

       public fGetValue():number{return this.m_nValue;}
       public fSetValue(value:number){this.m_nValue = value;}

       public fGetIndex(){
         return this.m_nIndex;
       }
       public static fCreateCard(type:number, value:number, index:number):CardBase
       {
           switch(type)
           {
               case FengCard.s_Type_Feng:
                 return new FengCard(type, value, index);
               case HuaCard.s_Type_Hua:
                 return new HuaCard(type, value, index);
               case  JianCard.s_Type_Jian:
                 return new JianCard(type, value, index);
               case TiaoCard.s_Type_Tiao:
                 return new TiaoCard(type, value, index);
               case WanCard.s_Type_Wan:
                 return new WanCard(type, value, index);
               case WanCard.s_Type_Tong:
                 return new TongCard(type, value, index);
               default:
                 alert('生成Card失败' + type + value + index);
                 return null;
           }
       }


       //**********************风牌************************//
      public static  s_Type_Feng = 0;
      //东风
      public static s_Value_Feng_Dong = 0;
      //南风
      public static s_Value_Feng_Nan = 2;
      //西风
      public static s_Value_Feng_Xi = 1;
      //北风
      public static s_Value_Feng_Bei = 3;


      //**********************花牌************************//
      public static s_Type_Hua = 1;
      //春
      public static s_Value_Hua_Chun = 0;
      //夏
      public static s_Value_Hua_Xia = 1;
      //秋
      public static s_Value_Hua_Qiu = 2;
      //冬
      public static s_Value_Hua_Dong = 3;
      //梅
      public static s_Value_Hua_Mei = 4;
      //兰
      public static s_Value_Hua_Lan = 5;
      //竹
      public static s_Value_Hua_Zhu = 6;
      //菊
      public static s_Value_Hua_Ju = 7;

      //**********************箭牌************************//
      public static  s_Type_Jian = 2;
      //中
      public static s_Value_Jian_Zhong = 0;
      //发
      public static s_Value_Jian_Fa = 1;
      //白
      public static s_Value_Jian_Bai = 2;

      //**********************条牌************************//
      public static s_Type_Tiao = 3;
      //1条
      public static s_Value_Tiao_1 = 1;
      //2条
      public static s_Value_Tiao_2 = 2;
      //3条
      public static s_Value_Tiao_3 = 3;
      //4条
      public static s_Value_Tiao_4 = 4;
      //5条
      public static s_Value_Tiao_5 = 5;
      //6条
      public static s_Value_Tiao_6 = 6;
      //7条
      public static s_Value_Tiao_7 = 7;
      //8条
      public static s_Value_Tiao_8 = 8;
      //9条
      public static s_Value_Tiao_9 = 9;


      //**********************筒牌************************//
      public static s_Type_Tong = 4;

      //1筒
      public static s_Value_Tong_1 = 1;
      //2筒
      public static s_Value_Tong_2 = 2;
      //3筒
      public static s_Value_Tong_3 = 3;
      //4筒
      public static s_Value_Tong_4 = 4;
      //5筒
      public static s_Value_Tong_5 = 5;
      //6筒
      public static s_Value_Tong_6 = 6;
      //7筒
      public static s_Value_Tong_7 = 7;
      //8筒
      public static s_Value_Tong_8 = 8;
      //9筒
      public static s_Value_Tong_9 = 9;

      //**********************万牌************************//
      public static s_Type_Wan = 5;
       //1万
       public static s_Value_Wan_1 = 1;
        //2万
       public static s_Value_Wan_2 = 2;
        //3万
       public static s_Value_Wan_3 = 3;
        //4万
       public static s_Value_Wan_4 = 4;
        //5万
       public static s_Value_Wan_5 = 5;
        //6万
       public static s_Value_Wan_6 = 6;
        //7万
       public static s_Value_Wan_7 = 7;
        //8万
       public static s_Value_Wan_8 = 8;
        //9万
       public static s_Value_Wan_9 = 9;
   }

}