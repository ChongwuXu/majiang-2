
/**
 * brief:   登录
 * date:    2017-11-17
 * author:  徐为
 */
module game
{
    export class HallScene extends Scene
    {


      //***********************************/

        private m_btnMj:game.Button;
        private m_gopMj:eui.Group;
        private m_gopGame:eui.Group;
        private m_btnXinPu:eui.Button;
        private m_btnPingMing:eui.Button;



        private m_btnGoBackHall:eui.Button;
      //***********************************/

      

        public constructor()
        {
            super();
             
            this.skinName = "resource/mjSkins/scene/HallScene.exml";
        }
      

         /**该场景需要加载的资源组 */
        public fSceneResGroup():string
        {
            return "hall";
        }
        
        
    
        //隐藏麻将和扑克
        public  fHide(){ 
            this.m_gopGame.visible = false;
            this.m_gopMj.visible = true;
        }
        public fShow(){
            this.m_gopGame.visible = true;
            this.m_gopMj.visible =false ;
        }

       
        public fOnUICreate()
        {
           
           this.fSetClickButton(this.m_btnMj);   
           this.fSetClickButton(this.m_btnXinPu);
           this.fSetClickButton(this.m_btnPingMing);
           this.fSetClickButton(this.m_btnGoBackHall);

           this.m_gopMj.visible = false;

           var self = this;

            this.m_oHandle.fReceiveOnce(this, function(act){
               var pack:C2s_CreateRoomPacket = act.m_oDisObj;
              
               if(pack.fGetHead().m_nErrcode)
               {
                      TipShow.fShow('创建房间失败' + pack.fGetHead().m_nErrcode);
               }
               else
               {
            
                    game.GameScenenManager.fGetIns().fEnterScene(GameSceneName.MAIN)
               }
              
          }, Packet.s_CreateRoom);

           this.m_oHandle.fReceiveOnce(this, function(act){
              
              var joinPack = <C2s_JoinRoomPacket>act.m_oDisObj;
               if(joinPack.fGetHead().m_nErrcode)
               {
                      TipShow.fShow('加入房间失败' + joinPack.fGetHead().m_nErrcode);
               }
               else
               {
                  //.   self.fExit();
                     game.GameScenenManager.fGetIns().fEnterScene(GameSceneName.MAIN)
               }
              
          }, Packet.s_JoinRoom);
          
          console.log(GameScenenManager.fGetIns().fGetLastScene());
           if(GameScenenManager.fGetIns().fGetLastScene()==2){
               console.log(111111);
                this.fHide();
            }
      
        
        }
        
      
        public fOnClick(button)
        {
          if(button == this.m_btnMj)
          {
               this.m_gopGame.visible = false;
               this.m_gopMj.visible = true;
               this.m_gopMj.touchEnabled = true;
          }
          else if(this.m_btnXinPu == button)
          {
              var pack = <C2s_CreateRoomPacket>Packet.fCreateAction(Packet.s_CreateRoom);
              pack.m_gameName = 0;
              pack.m_nPayStyle = 0;
              pack.m_nCircle = 4;   
            
              Main.fGetIns().m_oGameSocket.fSendPkt(pack);
          }
          else if(this.m_btnPingMing == button)
          {
              var jonPack = <C2s_JoinRoomPacket>Packet.fCreateAction(Packet.s_JoinRoom);
              jonPack.m_gameName = 0;
           
              jonPack.m_sRoomId = '100000';
              Main.fGetIns().m_oGameSocket.fSendPkt(jonPack);
          }
          
        }

        }
    }
