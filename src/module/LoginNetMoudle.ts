
module game{

/**
 * brief:   登录网络逻辑处理
 * date:    2017-11-01
 * author:  徐为
 */

export class LoginNetMoudle{

  private m_oHandle:Handle;

  public constructor(){
     GameSocket.s_aProtocols[Protocol.s_C2S_LOGIN] = [this, this.fOnLogin]
     this.m_oHandle = new Handle();
  }

  public fOnLogin(pkt: C2s_GameLogin):void{
      
  }
}
}
