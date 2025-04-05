/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy{
    move(): void;
    
}

//Strategy 1 RAPIDA PERO COSTOSA
class SwimFast implements MovementStrategy{
    move() {
        console.log("El pato nada sobre el agua\n");
    }
}

//Strategy 1 RAPIDA PERO NO TAN COSTOSA
class FlyOverWater implements MovementStrategy{
    move() {
        console.log("El pato vuela velozmente sobre el agua\n");
    }
}
//Strategy 1 LENTA Y ECONOMICA
class WalkClumsily implements MovementStrategy{
    move() {
        console.log("El pato rodea la orilla\n");
    }
}

//Consumidor
class Duck{
    private name:string;
    private movementStrategy:MovementStrategy;
    
    constructor(name:string, movementStrategy:MovementStrategy){
        this.name = name;
        this.movementStrategy = movementStrategy;
        console.log(`El pato esta listo para competir`)
    }
    
    performMove(){
        console.log(`El pato ${this.name} se prepara para moverse...`)
        this.movementStrategy.move();
    }
    setMovementStrategy(movementStrategy:MovementStrategy){
        this.movementStrategy = movementStrategy;
        console.log(`El pato ${this.name} cambio de estrategia`) 
    }
    
}
function main(){
        
    const duck1=new Duck('pato rapido',new SwimFast());
    const duck2=new Duck('pato volador',new FlyOverWater());
    const duck3=new Duck('pato torpe',new WalkClumsily());
    console.log('Comienza la carrera de patos')
    duck1.performMove();
    duck2.performMove();
    duck3.performMove();
    
    duck3.setMovementStrategy(new FlyOverWater())
    duck3.setMovementStrategy(new FlyOverWater())
}

main();
