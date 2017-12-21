
/**
 * brief:   游戏场景管理
 * date:    2017-11-03
 * author:  徐为
 */
module game
{
   export class GameScenenManager extends SceneManager{
      
      private static s_Ins : GameScenenManager;
      private m_oCurrentScene : Scene;

      public static fGetIns() : GameScenenManager
      {
        if(! GameScenenManager.s_Ins)
             GameScenenManager.s_Ins = new GameScenenManager;

        return GameScenenManager.s_Ins;
      }

      public constructor(){super()}

      public fEnterScene(scene:GameSceneName){
         var topScene = this.fGetTopScene();
         if(topScene != scene){
             this.fAddScene(scene);
         }
         this.fChangeToScene(scene);
      }
    

     private fChangeToScene(scene:GameSceneName, fadeIn:boolean = true, showLoad:boolean = true)
     {
         var main = Main.fGetIns();
         main.GetShowTipLayer().removeChildren();

         var lastScene = this.m_oCurrentScene;
         if(lastScene && (showLoad)){
             lastScene.parent.removeChild(lastScene);
             lastScene.fRelease();
         }

         this.m_oCurrentScene = GameScenenManager.fCreateScene(scene);
         var self = this;
         var callback = function(){
             main.m_oGameLayer.addChild(self.m_oCurrentScene);
             if(lastScene && fadeIn){

             self.m_oCurrentScene.alpha = 0;
               var tw = egret.Tween.get( self.m_oCurrentScene );
          
              tw.wait(800).to( {alpha:1}, 1000,egret.Ease.sineIn );
            }
           
         }
         if(showLoad)
              main.fLoadResGroup(this.m_oCurrentScene.fSceneResGroup(), true, callback)
         else
         {
                var tw = egret.Tween.get( lastScene );
          
                  tw.wait(500).to( {alpha:0.1}, 1000,egret.Ease.sineIn ).call(function(){ lastScene.parent.removeChild(lastScene);
             lastScene.fRelease();});
             callback();
         }
          
     }

     public fBackToLastScene(){
         if(this.fGetSceneStackLength() > 1)
         {
             this.fPop();
             this.fChangeToScene(this.fGetTopScene(), true, false)
         }
     }


     public  fGetlastGameScene(){
         return this.fGetLastScene();
     }

     public fGetCurrentGameScene():GameSceneName
     {
         return this.fGetTopScene();
     }

     public static fCreateScene(scene : GameSceneName):Scene{
         var gameScene;
         switch(scene){
             case GameSceneName.LOGIN:
                gameScene = new LoginScene;
                break;
             case GameSceneName.LOG:
                gameScene = new LoginScene;
                break;
             case GameSceneName.HALL:
                gameScene = new HallScene;
                break;
             case GameSceneName.MAIN:
                gameScene = new MainScene;
                break;
            default:
              alert('fCreateScene fail ' + scene);
         }

         return gameScene;
     }
      

   }

   export enum GameSceneName{
       LOGIN, HALL, MAIN, LOG
   }
}