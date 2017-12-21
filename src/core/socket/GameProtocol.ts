

module game {

/**
 * brief:   通讯类型协议
 * date:    2017-10-31
 * author:  徐为
 */

export class Protocol
{
  public static s_C2S_HEARDBEAT = 1;       //心跳包
   
  public static s_C2S_LOGIN  = 101;          //登录

  public static s_C2S_CREATEROOM = 102       //创建房间
  public static s_C2S_JOINROOM = 103         //加入房间
  public static s_C2S_ROOMINFO = 104         //房间信息

  public static s_C2S_Ready = 200;          //准备完毕

  public static s_C2S_StartHand = 202;     //开始游戏


  
  public static s_C2S_BASE    = 300;   


  public static s_C2S_PLAYHAND = 304;        //出牌

    public static s_C2S_MOPAI = 303;        //摸牌

  public static s_C2S_HU_PAI      = 305;     //胡牌

  public static s_C2S_EAT_PAI   = 308;       //吃牌

  public static s_C2S_PENG_PAI  = 307      //碰牌

  public static s_C2S_GANG_PAI   = 306      //杠牌

  public static s_C2S_TING_PAI = 309;      //听牌

  public static s_C2S_RELATION = 400;     //三口关系

  public static s_C2S_SPEAK = 900 ;     //语音聊天

}
	
}
