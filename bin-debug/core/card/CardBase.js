var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
 * brief:   基本麻将类
 * date:    2017-11-09
 * author:  徐为
 */
    var CardBase = (function () {
        /********************************/
        function CardBase(type, value, index) {
            this.m_aAction = []; //所有活动
            this.m_nType = type;
            this.m_nIndex = index;
            this.m_nValue = value;
        }
        CardBase.prototype.fRead = function (by) {
            this.m_nType = by.readShort();
            this.m_nValue = by.readShort();
            this.m_nIndex = by.readShort();
            this.m_nPriority = by.readShort();
            this.m_sName = by.readUTF();
        };
        CardBase.prototype.fWrite = function (by) {
            by.writeShort(this.m_nType);
            by.writeShort(this.m_nValue);
            by.writeShort(this.m_nIndex);
            by.writeShort(this.m_nPriority);
            by.writeUTF(this.m_sName);
            return by;
        };
        //插入排序
        CardBase.fInsetCard = function (card, cards) {
            var low = 0, high = cards.length;
            var mid = Math.floor(((high + low) / 2));
            while (mid > 0 && mid < (high - 1)) {
                if (card.m_nPriority >= cards[mid - 1].m_nPriority && card.m_nPriority <= cards[mid + 1].m_nPriority) {
                    if ((high + low) % 2 == 0)
                        cards.splice(mid + 1, 0, card);
                    else
                        cards.splice(mid + 1, 0, card);
                    return;
                }
                else if (card.m_nPriority > cards[mid].m_nPriority)
                    mid = Math.floor((high + mid) / 2);
                else
                    mid = Math.floor((mid) / 2);
            }
            if (mid != 0)
                cards.splice(mid + 1, 0, card);
            else
                cards.splice(mid, 0, card);
        };
        CardBase.prototype.fEqual = function (card, index) {
            if (index === void 0) { index = false; }
            if (index) {
                if ((this.m_nType == card.m_nType) && (this.m_nValue == card.m_nValue) && (this.m_nIndex == card.m_nIndex))
                    return true;
                else
                    return false;
            }
            else {
                if ((this.m_nType == card.m_nType) && (this.m_nValue == card.m_nValue))
                    return true;
                else
                    return false;
            }
        };
        // public constructor(){}
        CardBase.prototype.fGetType = function () { return this.m_nType; };
        CardBase.prototype.fSetType = function (type) { this.m_nType = type; };
        CardBase.prototype.fGetValue = function () { return this.m_nValue; };
        CardBase.prototype.fSetValue = function (value) { this.m_nValue = value; };
        CardBase.prototype.fGetIndex = function () {
            return this.m_nIndex;
        };
        CardBase.fCreateCard = function (type, value, index) {
            switch (type) {
                case game.FengCard.s_Type_Feng:
                    return new game.FengCard(type, value, index);
                case game.HuaCard.s_Type_Hua:
                    return new game.HuaCard(type, value, index);
                case game.JianCard.s_Type_Jian:
                    return new game.JianCard(type, value, index);
                case game.TiaoCard.s_Type_Tiao:
                    return new game.TiaoCard(type, value, index);
                case game.WanCard.s_Type_Wan:
                    return new game.WanCard(type, value, index);
                case game.WanCard.s_Type_Tong:
                    return new game.TongCard(type, value, index);
                default:
                    alert('生成Card失败' + type + value + index);
                    return null;
            }
        };
        //**********************风牌************************//
        CardBase.s_Type_Feng = 0;
        //东风
        CardBase.s_Value_Feng_Dong = 0;
        //南风
        CardBase.s_Value_Feng_Nan = 2;
        //西风
        CardBase.s_Value_Feng_Xi = 1;
        //北风
        CardBase.s_Value_Feng_Bei = 3;
        //**********************花牌************************//
        CardBase.s_Type_Hua = 1;
        //春
        CardBase.s_Value_Hua_Chun = 0;
        //夏
        CardBase.s_Value_Hua_Xia = 1;
        //秋
        CardBase.s_Value_Hua_Qiu = 2;
        //冬
        CardBase.s_Value_Hua_Dong = 3;
        //梅
        CardBase.s_Value_Hua_Mei = 4;
        //兰
        CardBase.s_Value_Hua_Lan = 5;
        //竹
        CardBase.s_Value_Hua_Zhu = 6;
        //菊
        CardBase.s_Value_Hua_Ju = 7;
        //**********************箭牌************************//
        CardBase.s_Type_Jian = 2;
        //中
        CardBase.s_Value_Jian_Zhong = 0;
        //发
        CardBase.s_Value_Jian_Fa = 1;
        //白
        CardBase.s_Value_Jian_Bai = 2;
        //**********************条牌************************//
        CardBase.s_Type_Tiao = 3;
        //1条
        CardBase.s_Value_Tiao_1 = 1;
        //2条
        CardBase.s_Value_Tiao_2 = 2;
        //3条
        CardBase.s_Value_Tiao_3 = 3;
        //4条
        CardBase.s_Value_Tiao_4 = 4;
        //5条
        CardBase.s_Value_Tiao_5 = 5;
        //6条
        CardBase.s_Value_Tiao_6 = 6;
        //7条
        CardBase.s_Value_Tiao_7 = 7;
        //8条
        CardBase.s_Value_Tiao_8 = 8;
        //9条
        CardBase.s_Value_Tiao_9 = 9;
        //**********************筒牌************************//
        CardBase.s_Type_Tong = 4;
        //1筒
        CardBase.s_Value_Tong_1 = 1;
        //2筒
        CardBase.s_Value_Tong_2 = 2;
        //3筒
        CardBase.s_Value_Tong_3 = 3;
        //4筒
        CardBase.s_Value_Tong_4 = 4;
        //5筒
        CardBase.s_Value_Tong_5 = 5;
        //6筒
        CardBase.s_Value_Tong_6 = 6;
        //7筒
        CardBase.s_Value_Tong_7 = 7;
        //8筒
        CardBase.s_Value_Tong_8 = 8;
        //9筒
        CardBase.s_Value_Tong_9 = 9;
        //**********************万牌************************//
        CardBase.s_Type_Wan = 5;
        //1万
        CardBase.s_Value_Wan_1 = 1;
        //2万
        CardBase.s_Value_Wan_2 = 2;
        //3万
        CardBase.s_Value_Wan_3 = 3;
        //4万
        CardBase.s_Value_Wan_4 = 4;
        //5万
        CardBase.s_Value_Wan_5 = 5;
        //6万
        CardBase.s_Value_Wan_6 = 6;
        //7万
        CardBase.s_Value_Wan_7 = 7;
        //8万
        CardBase.s_Value_Wan_8 = 8;
        //9万
        CardBase.s_Value_Wan_9 = 9;
        return CardBase;
    }());
    game.CardBase = CardBase;
    __reflect(CardBase.prototype, "game.CardBase");
})(game || (game = {}));
//# sourceMappingURL=CardBase.js.map