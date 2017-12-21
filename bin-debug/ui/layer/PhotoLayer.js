var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * brief:   主场景
 * date:    2017-12-7
 * author:  徐为
 */
var game;
(function (game) {
    var PhotoLayer = (function (_super) {
        __extends(PhotoLayer, _super);
        //***********************************/
        function PhotoLayer() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/mjSkins/layer/PhotoLayer.exml";
            return _this;
        }
        PhotoLayer.prototype.fHideAllPhoto = function () {
            this.m_oPhotoDown.fVisibleJoinGroup(false);
            this.m_oPhotoUp.fVisibleJoinGroup(false);
            this.m_oPhotoLeft.fVisibleJoinGroup(false);
            this.m_oPhotoRight.fVisibleJoinGroup(false);
        };
        PhotoLayer.prototype.fHideAllReady = function () {
            this.m_imgReadyDown.visible = false;
            this.m_imgReadyUp.visible = false;
            this.m_imgReadyRight.visible = false;
            this.m_imgReadyLeft.visible = false;
        };
        PhotoLayer.prototype.fOnUICreate = function () {
            this.m_bCompOnUICreate = true;
            this.fSetClickButton(this.m_btnReady);
            this.fHideAllPhoto();
            this.fHideAllReady();
            if (game.GameManager.fGetIns().fIsCreateGame()) {
                this.m_oPhotoDown.fVisibleJoinGroup(true);
                this.m_oPhotoDown.m_labName.text = game.GameManager.fGetIns().m_sFirstPlayerUid;
                this.m_imgReadyDown.visible = false;
                this.m_oPhotoDown.fVisibleOwner(true);
            }
        };
        PhotoLayer.prototype.fResetPhoto = function () {
            var playesInfo = game.GameManager.fGetIns().fGetPlayerInfo();
            if (playesInfo.length > 4) {
                console.error("fResetPhoto playesInfo.length > 4");
                return;
            }
            this.fHideAllPhoto();
            this.fHideAllReady();
            if (game.GameManager.fGetIns().fIsCreateGame()) {
                this.m_oPhotoDown.fVisibleJoinGroup(true);
                this.m_oPhotoDown.m_labName.text = game.GameManager.fGetIns().m_sFirstPlayerUid;
            }
            for (var i = 0; i < playesInfo.length; i++) {
                if (playesInfo[i] == undefined)
                    continue;
                var gamePos = Utils.fDeskPosToGamePosFirst(playesInfo[i].m_pDeskPos);
                var gop = this.getChildByName("m_gop" + gamePos);
                var photo = gop.getChildByName("m_oPhoto" + gamePos);
                photo.visible = true;
                photo.fVisibleJoinGroup(true);
                photo.m_labName.text = playesInfo[i].m_sUid;
                var readyImg = gop.getChildByName("m_imgReady" + gamePos);
                this.fSetReadyStatus(playesInfo[i].m_nStatus, readyImg);
                if (game.GameManager.fGetIns().m_pCreatorPos == playesInfo[i].m_pDeskPos) {
                    photo.fVisibleOwner(true);
                }
                else {
                    photo.fVisibleOwner(false);
                }
            }
        };
        PhotoLayer.prototype.fSetReadyStatus = function (ready, image) {
            if (ready == 1)
                image.visible = true;
            else
                image.visible = false;
        };
        PhotoLayer.prototype.fOnClick = function (button) {
            if (button == this.m_btnReady) {
                var pack = game.Packet.fCreateAction(game.Packet.s_PlayerReady);
                pack.m_nReadyNum = 1;
                pack.m_aReadyPos.push(game.GameManager.fGetIns().m_pFirstPlayerPos);
                pack.fGetHead().m_nErrcode = 1;
                Main.fGetIns().m_oGameSocket.fSendPkt(pack);
                this.m_btnReady.parent.removeChild(this.m_btnReady);
                this.m_btnReady = null;
            }
        };
        PhotoLayer.prototype.fBeginGame = function () {
            this.fSetTask(4);
            this.fHideAllReady();
            var twDown = egret.Tween.get(this.m_gopDown);
            twDown.to({ x: 4, y: 376 }, 300).call(this.fAddCurrentTask, this);
            var twLeft = egret.Tween.get(this.m_gopLeft);
            twLeft.to({ x: 4, y: 100 }, 300).call(this.fAddCurrentTask, this);
            var twUp = egret.Tween.get(this.m_gopUp);
            twUp.to({ x: 370, y: 0 }, 300).call(this.fAddCurrentTask, this);
            var twRight = egret.Tween.get(this.m_gopRight);
            twRight.to({ x: 1136, y: 116 }, 300).call(this.fAddCurrentTask, this);
        };
        return PhotoLayer;
    }(game.Scene));
    game.PhotoLayer = PhotoLayer;
    __reflect(PhotoLayer.prototype, "game.PhotoLayer");
})(game || (game = {}));
//# sourceMappingURL=PhotoLayer.js.map