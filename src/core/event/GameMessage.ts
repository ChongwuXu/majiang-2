

module game {

/**
 * brief:   事件重封装
 * date:    2017-11-01
 * author:  徐为
 */
export class MessageEvent extends egret.Event{
    
    public m_sName:string;
    public m_oDisObj;

    public constructor(name:string, obj?)
    {
      super(name);
      this.m_oDisObj = obj;
      this.m_sName = name;
    }
}

	
}
