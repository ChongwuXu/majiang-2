/**
 * brief:   场景管理
 * date:    2017-11-02
 * author:  徐为
 */
module game {
	
	export class SceneManager {

        /********************************/

          private m_nMaxSceneCount:number = 5;

          private m_oSceneStack:any[] = [];

          private m_oLastScene:any;

        /********************************/
    
     

       public constructor(){}

       public fGetTopScene():any{
           if(this.m_oSceneStack.length < 1)
             return null;
           return this.m_oSceneStack[this.m_oSceneStack.length - 1];
       }    

       public fAddScene(sceneName):boolean
       {
           var curScene = this.fGetTopScene();
           this.m_oLastScene = curScene;
           if(sceneName != undefined && curScene != sceneName)
           {
               if(this.m_oSceneStack.length >= this.m_nMaxSceneCount)
               {
                   this.m_oSceneStack.shift();
               }

                 this.m_oSceneStack.push(sceneName);
                return true;
           }

           return false;
       }

       public fGetSceneStackLength(){
           return this.m_oSceneStack.length;
       }

       public fClear(){
           this.m_oSceneStack = [];
       }

       public fGetLastScene(){
           return this.m_oLastScene;
       }

       public fPop() 
       {
           this.m_oLastScene  = this.fGetTopScene();
           this.m_oSceneStack.pop();
       }
    }
}
