/**
 * brief:   游戏工具类
 * date:    2017-11-02
 * author:  徐为
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    /*
    *重新设置锚点
    */
    Utils.fResetAnchor = function (obj, anchorX, anchorY) {
        var width = obj.width, height = obj.height;
        var _anchorX = 0.5, _anchorY = 0.5;
        if (anchorX != undefined)
            _anchorX = anchorX;
        if (anchorY != undefined)
            _anchorY = anchorY;
        var _anchorOffsetX = _anchorX * width; //偏移长度
        var _anchorOffsetY = _anchorY * height; //偏移宽度
        if (obj instanceof eui.Label) {
            var label = obj;
            width = label.measuredWidth;
            height = label.measuredHeight;
        }
        var obX = obj.x, obY = obj.y;
        var newX = obX + _anchorOffsetX - obj.anchorOffsetX;
        var newY = obY + _anchorOffsetY - obj.anchorOffsetY;
        obj.anchorOffsetX = _anchorOffsetX;
        obj.anchorOffsetY = _anchorOffsetY;
        obj.x = newX;
        obj.y = newY;
    };
    Utils.fNotUsefunData = function (data) {
        if (data == undefined || data == null || data == '' || data == NaN)
            return true;
        else
            return false;
    };
    Utils.fGetValueByBit = function (bit, num) {
        if ((num & Math.pow(2, bit)) >= 1)
            return true;
        else
            return false;
    };
    Utils.fRemoveArrByValue = function (arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    };
    //游戏速度真实时间
    Utils.fTByGSpeed = function (time) {
        return time / game.GameManager.fGetIns().m_nGameSpeed;
    };
    Utils.fGetAncestor = function (display) {
        var parent = display;
        while (parent.parent) {
            parent = parent.parent;
        }
        return parent;
    };
    Utils.fClipDisplay = function (display, srcX, srcY, srcW, srcH, dstX, dstY) {
        if (!display.mask) {
            display.mask = new egret.Rectangle();
        }
        display.mask.x = srcX;
        display.mask.y = srcY;
        display.mask.width = srcW;
        display.mask.height = srcH;
        display.x = dstX - srcX;
        display.y = dstY - srcY;
    };
    Utils.fGetRandomNum = function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    };
    Utils.fDeskPosToGamePosFirst = function (otherPlayPos) {
        return Utils.fDeskPosToGamePos(game.GameManager.fGetIns().m_pFirstPlayerPos, otherPlayPos);
    };
    /**
     * 桌子位置转换为游戏位置
     *
     * @ ownPlayPos  第一玩家位置
     *
     * @ otherPlayPos 其他的任意一个玩家位置
     */
    Utils.fDeskPosToGamePos = function (ownPlayPos, otherPlayPos) {
        if (ownPlayPos == otherPlayPos)
            return game.PlayePosition.e_Down;
        else if (ownPlayPos == game.PlayePosition.e_Down) {
            if (otherPlayPos == game.PlayePosition.e_Right)
                return game.PlayePosition.e_Right;
            else if (otherPlayPos == game.PlayePosition.e_Left)
                return game.PlayePosition.e_Left;
            else if (otherPlayPos == game.PlayePosition.e_Up)
                return game.PlayePosition.e_Up;
            else
                return otherPlayPos;
        }
        else if (ownPlayPos == game.PlayePosition.e_Left) {
            if (otherPlayPos == game.PlayePosition.e_Right)
                return game.PlayePosition.e_Up;
            else if (otherPlayPos == game.PlayePosition.e_Down)
                return game.PlayePosition.e_Right;
            else if (otherPlayPos == game.PlayePosition.e_Up)
                return game.PlayePosition.e_Left;
            else
                return otherPlayPos;
        }
        else if (ownPlayPos == game.PlayePosition.e_Right) {
            if (otherPlayPos == game.PlayePosition.e_Left)
                return game.PlayePosition.e_Up;
            else if (otherPlayPos == game.PlayePosition.e_Down)
                return game.PlayePosition.e_Left;
            else if (otherPlayPos == game.PlayePosition.e_Up)
                return game.PlayePosition.e_Right;
            else
                return otherPlayPos;
        }
        else if (ownPlayPos == game.PlayePosition.e_Up) {
            if (otherPlayPos == game.PlayePosition.e_Down)
                return game.PlayePosition.e_Up;
            else if (otherPlayPos == game.PlayePosition.e_Right)
                return game.PlayePosition.e_Left;
            else if (otherPlayPos == game.PlayePosition.e_Left)
                return game.PlayePosition.e_Right;
            else
                return otherPlayPos;
        }
        else
            return otherPlayPos;
    };
    //根据桌子座位方向获取座位名
    Utils.fGetNameByDesktopPos = function (pos) {
        if (pos == game.PlayePosition.e_Up)
            return "北";
        else if (pos == game.PlayePosition.e_Down)
            return "南";
        else if (pos == game.PlayePosition.e_Left)
            return "西";
        else if (pos == game.PlayePosition.e_Right)
            return "东";
    };
    /*
    *  初始化拿牌第几张牌
    *  num0 第一个筛子数
    *  num1 第二个筛子数
    */
    Utils.fGetInitFaPaiDistance = function (num0, num1) {
        num0 > num1 ? 0 : num0 = num1;
        return (num0 - 1) * 2;
    };
    /*
    *  初始化拿牌方向
    *  pos 庄家家桌面方向
    *  num 两个筛子数目的和
    */
    Utils.fGetInitFaPaiDirector = function (pos, num) {
        console.info("庄家坐标为" + pos);
        if ((num == 1) || (num == 5) || (num == 9)) {
            return pos;
        }
        else if ((num == 2) || (num == 6) || (num == 10)) {
            if (pos == game.PlayePosition.e_Down)
                return game.PlayePosition.e_Right;
            else if (pos == game.PlayePosition.e_Right)
                return game.PlayePosition.e_Up;
            else if (pos == game.PlayePosition.e_Up)
                return game.PlayePosition.e_Left;
            else
                return game.PlayePosition.e_Down;
        }
        else if ((num == 3) || (num == 7) || (num == 11)) {
            if (pos == game.PlayePosition.e_Down)
                return game.PlayePosition.e_Up;
            else if (pos == game.PlayePosition.e_Right)
                return game.PlayePosition.e_Left;
            else if (pos == game.PlayePosition.e_Up)
                return game.PlayePosition.e_Down;
            else
                return game.PlayePosition.e_Right;
        }
        else if ((num == 4) || (num == 8) || (num == 12)) {
            if (pos == game.PlayePosition.e_Down)
                return game.PlayePosition.e_Left;
            else if (pos == game.PlayePosition.e_Right)
                return game.PlayePosition.e_Down;
            else if (pos == game.PlayePosition.e_Up)
                return game.PlayePosition.e_Right;
            else
                return game.PlayePosition.e_Up;
        }
        return null;
    };
    Utils.fInsetCard = function (card, cards) {
        for (var i = 0; i < cards.length; i++) {
            if (card.m_oCardBase.m_nPriority <= cards[i].m_oCardBase.m_nPriority) {
                cards.splice(i, 0, card);
                return i;
            }
        }
        return cards.length;
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map