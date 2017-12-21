

module game {


/**
 * brief:   事件触发器重封装
 * date:    2017-11-01
 * author:  徐为
 */
export class Poster extends egret.EventDispatcher{
     private static s_Ins:Poster;

     public static get Ins():Poster
     {
         if(this.s_Ins == null)
             this.s_Ins = new Poster();

         return this.s_Ins;
     }
}

	
}
