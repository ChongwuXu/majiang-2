/**
 * brief:   二进制读写重封装
 * date:    2017-10-31
 * author:  徐为
 */

module game {

export class GameByteArray extends egret.ByteArray
{
    public constructor(buffer?:ArrayBuffer)
    {
      super(buffer);
      this.endian = egret.Endian.BIG_ENDIAN;
    }

    //64位读
    public fReadLong():number
    {
        var height = this.readInt() << 32;
        return height + this.readInt();
    }

    //64位写
    public fWriteLong(value:number):void
    {
        var height = value & 0xffffffff00000000;
        var low = value & 0x00000000ffffffff;
        this.writeInt(height);
        this.writeInt(low);
    }
}

	
}
