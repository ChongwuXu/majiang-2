

module game {

/**
 * brief:   事件句柄
 * date:    2017-11-01
 * author:  徐为
 */
export class Handle{

    /********************************/

   private m_oContent:egret.DisplayObject;       //监听者对象

   private m_fMessListener:Function;             //监听函数

   private m_aMsgName:string[];                 //监听事件名称

   private m_oOnceContent:egret.DisplayObject;    //监听者对象

   private m_fOnceListener:Function;      //监听函数

   private m_aOnceMsgName:string[];        //监听事件名称

   /********************************/

  //发送消息
   public fSendMessage(msgName:string, obj?):void{
      if(obj)
         Poster.Ins.dispatchEvent(new MessageEvent(msgName, obj));
      else
         Poster.Ins.dispatchEvent(new MessageEvent(msgName))
   }

   //接收消息
   public fReceiveMessage(content:egret.DisplayObject, messListener:Function, ...msgName:string[]):void{
       this.m_oContent = content;
       this.m_fMessListener = messListener;
       this.m_aMsgName = msgName;
      
       var poster:Poster = Poster.Ins;
       for(var i in msgName)
       {
         poster.addEventListener(msgName[i], messListener, content);
       }

   }

   public fReceiveOnce(onceContext: egret.DisplayObject, onceListener: Function, ...onceMsgName: string[]):void{
         this.m_oOnceContent = onceContext;
        this.m_fOnceListener = onceListener;
        this.m_aOnceMsgName = onceMsgName
        var poster: Poster = Poster.Ins;
        for (var i in onceMsgName) {
            poster.once(onceMsgName[i], onceListener, onceContext);
        }
        poster = null;
    }

    public fRelease():void
    {
       var poster:Poster = Poster.Ins;
       if(this.m_fMessListener)
       {
         for(var i in this.m_aMsgName)
         {
           poster.removeEventListener(this.m_aMsgName[i], this.m_fMessListener, this.m_oContent)
         }
       }

        if(this.m_fOnceListener)
       {
         for(var i in this.m_aMsgName)
         {
           poster.removeEventListener(this.m_aOnceMsgName[i], this.m_fOnceListener, this.m_oOnceContent)
         }
       }
    }
}
	
}
