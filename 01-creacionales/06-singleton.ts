/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class DragonBalls{
   private static instance: DragonBalls;
   private ballsColleted: number;
   
   private constructor() {
    this.ballsColleted=0;   
   }
   public static getInstance(): DragonBalls{
         if(!DragonBalls.instance){
              DragonBalls.instance = new DragonBalls();
              console.log('Se ha creado una instancia de las esferas del dragon');
         }
         return DragonBalls.instance;
   }
   collectBall() {
       if (this.ballsColleted < 7) {
           this.ballsColleted++;
           console.log(`Has coleccionado ${this.ballsColleted} esferas del dragon`);
           return

       }
         console.log('Ya has coleccionado las 7 esferas del dragon, puedes pedir un deseo');
   }
   summonShenron(){
         if(this.ballsColleted===7){
              console.log('Has invocado a Shenron, puedes pedir un deseo');
              this.ballsColleted=0;
              return
         }
         console.log('No puedes invocar a Shenron, necesitas las 7 esferas del dragon');
   }
}

function main6(){
    const goku= DragonBalls.getInstance();
    goku.collectBall()
    goku.collectBall()
    goku.summonShenron()
    const vegeta= DragonBalls.getInstance();
    vegeta.collectBall()
    vegeta.collectBall()
    vegeta.collectBall()
    vegeta.collectBall()
    vegeta.collectBall()
    goku.collectBall()
    goku.summonShenron()
    vegeta.summonShenron()
}

main6()