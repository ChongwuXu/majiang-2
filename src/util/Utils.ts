/**
 * brief:   游戏工具类
 * date:    2017-11-02
 * author:  徐为
 */


class Utils{

    /*
    *重新设置锚点
    */
    public static fResetAnchor(obj:egret.DisplayObject, anchorX? : number, anchorY? : number){
        var width = obj.width, height = obj.height;
        var _anchorX = 0.5, _anchorY = 0.5;
        if(anchorX != undefined) _anchorX = anchorX;
        if(anchorY != undefined) _anchorY = anchorY;

        var _anchorOffsetX = _anchorX * width;   //偏移长度
        var _anchorOffsetY = _anchorY * height;  //偏移宽度

        if(obj instanceof eui.Label)
        {
            var label = <eui.Label>obj;
            width = label.measuredWidth;
            height = label.measuredHeight;
        }

        var obX = obj.x, obY = obj.y;
        var newX = obX + _anchorOffsetX - obj.anchorOffsetX;
        var newY = obY + _anchorOffsetY - obj.anchorOffsetY;
        obj.anchorOffsetX = _anchorOffsetX;
        obj.anchorOffsetY = _anchorOffsetY;
        obj.x = newX;
        obj.y  = newY;
    }

    public static fNotUsefunData(data):boolean
    {
        if(data == undefined || data == null || data == '' || data == NaN)
          return true;
        else
          return false;
    }

    public static fGetValueByBit(bit:number, num:number):boolean{
      if((num & Math.pow(2, bit) ) >= 1 )
        return true;
      else
        return false;
    }

    public static fRemoveArrByValue(arr, val) 
    {   
      for(var i=0; i<arr.length; i++) {   
          if(arr[i] == val) {      
             arr.splice(i, 1);       
             break;    
          }   
        } 
    } 

    //游戏速度真实时间
    public static fTByGSpeed(time:number):number{
      return time / game.GameManager.fGetIns().m_nGameSpeed;
    }

    public static fGetAncestor(display:egret.DisplayObject)
    {
        var parent = display;
        while(parent.parent)
        {
            parent = parent.parent;
        }
        return parent;
    }
	
	 public static fClipDisplay(display: egret.DisplayObject,srcX,srcY,srcW,srcH,dstX,dstY) 
      {
           if(!display.mask)
           {
              display.mask = new egret.Rectangle();
           }
           display.mask.x = srcX;
           display.mask.y = srcY;
           display.mask.width = srcW;
           display.mask.height = srcH;
          display.x = dstX - srcX;
           display.y = dstY - srcY;
      }


      public static fGetRandomNum(Min,Max):number
      {   
        var Range = Max - Min;   
        var Rand = Math.random();   
        return(Min + Math.round(Rand * Range));   
      } 

      public static fDeskPosToGamePosFirst(otherPlayPos:game.PlayePosition){
         return Utils.fDeskPosToGamePos(game.GameManager.fGetIns().m_pFirstPlayerPos, otherPlayPos);
      }  

      /**
       * 桌子位置转换为游戏位置
       * 
       * @ ownPlayPos  第一玩家位置
       * 
       * @ otherPlayPos 其他的任意一个玩家位置
       */
      public static fDeskPosToGamePos(ownPlayPos:game.PlayePosition, otherPlayPos:game.PlayePosition):game.PlayePosition{
            if(ownPlayPos == otherPlayPos)
               return game.PlayePosition.e_Down;
             else if(ownPlayPos == game.PlayePosition.e_Down)
             {   
                 if(otherPlayPos == game.PlayePosition.e_Right)  //东
                   return game.PlayePosition.e_Right;
                 else if(otherPlayPos == game.PlayePosition.e_Left)   //西
                   return game.PlayePosition.e_Left;
                 else if(otherPlayPos == game.PlayePosition.e_Up)     //北
                    return game.PlayePosition.e_Up;
                 else
                    return otherPlayPos;
             }
            else  if(ownPlayPos == game.PlayePosition.e_Left)   //第一玩家在西边
             {
                 if(otherPlayPos == game.PlayePosition.e_Right)  //东
                   return game.PlayePosition.e_Up;
                 else if(otherPlayPos == game.PlayePosition.e_Down)   //南
                   return game.PlayePosition.e_Right;
                 else if(otherPlayPos == game.PlayePosition.e_Up)     //北
                    return game.PlayePosition.e_Left;
                 else
                    return otherPlayPos;
             }
             else if(ownPlayPos == game.PlayePosition.e_Right)   //第一玩家在东边
             {
                 if(otherPlayPos == game.PlayePosition.e_Left)  //西
                    return game.PlayePosition.e_Up;
                 else if(otherPlayPos == game.PlayePosition.e_Down) //南
                    return game.PlayePosition.e_Left;
                 else if(otherPlayPos == game.PlayePosition.e_Up)   //北
                    return game.PlayePosition.e_Right
                 else 
                    return otherPlayPos;
             }  
             else if(ownPlayPos == game.PlayePosition.e_Up)   //第一家玩家在北边
             {
                 if(otherPlayPos == game.PlayePosition.e_Down)  //南
                   return game.PlayePosition.e_Up;
                 else if(otherPlayPos == game.PlayePosition.e_Right) //东
                   return game.PlayePosition.e_Left;
                else if(otherPlayPos == game.PlayePosition.e_Left)
                   return game.PlayePosition.e_Right;
                else 
                   return otherPlayPos;
             } 
             else
                return otherPlayPos;
      }

      //根据桌子座位方向获取座位名
      public static fGetNameByDesktopPos(pos:game.PlayePosition):string{
          if(pos == game.PlayePosition.e_Up)
             return "北"
          else if(pos == game.PlayePosition.e_Down)
             return "南";
          else if(pos == game.PlayePosition.e_Left)
             return "西";
          else if(pos == game.PlayePosition.e_Right)
             return "东";
      }

      /*
      *  初始化拿牌第几张牌
      *  num0 第一个筛子数
      *  num1 第二个筛子数
      */

       public static  fGetInitFaPaiDistance(num0:number, num1:number):number{
            num0 > num1 ? 0:num0 = num1;
            return (num0-1) * 2;
           
       }
      
      /*
      *  初始化拿牌方向
      *  pos 庄家家桌面方向
      *  num 两个筛子数目的和
      */
      public static  fGetInitFaPaiDirector(pos:game.PlayePosition, num:number):game.PlayePosition{
         console.info("庄家坐标为" + pos);
          if( (num == 1) || (num == 5) || (num == 9) )
          {
              return pos;
          }
          else if((num == 2) || (num == 6) || (num == 10))  //下家
          {
              if(pos == game.PlayePosition.e_Down)
                return game.PlayePosition.e_Right;
              else if(pos == game.PlayePosition.e_Right)
                return game.PlayePosition.e_Up;
              else if(pos == game.PlayePosition.e_Up)
                return game.PlayePosition.e_Left;
              else 
                return game.PlayePosition.e_Down;
          }
          else if((num == 3) || (num == 7) || (num == 11)) //对家
          {
             if(pos == game.PlayePosition.e_Down)
                return game.PlayePosition.e_Up;
              else if(pos == game.PlayePosition.e_Right)
                return game.PlayePosition.e_Left;
              else if(pos == game.PlayePosition.e_Up)
                return game.PlayePosition.e_Down;
              else 
                return game.PlayePosition.e_Right;
          }
           else if((num == 4) || (num == 8) || (num == 12)) //上家
          {
             if(pos == game.PlayePosition.e_Down)
                return game.PlayePosition.e_Left;
              else if(pos == game.PlayePosition.e_Right)
                return game.PlayePosition.e_Down;
              else if(pos == game.PlayePosition.e_Up)
                return game.PlayePosition.e_Right;
              else 
                return game.PlayePosition.e_Up;
          }
          
          return null;
      }

 public static fInsetCard(card:game.HandCardDown, cards:game.HandCardDown[]):number{
    for(var i = 0; i < cards.length ; i++)
    {
        if(card.m_oCardBase.m_nPriority <= cards[i].m_oCardBase.m_nPriority){
           cards.splice(i , 0, card); 
           return i;
        }
    }

    return cards.length;
 }
}



