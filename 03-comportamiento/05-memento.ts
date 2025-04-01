/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

class GameMemento{
    private level: number;
    private hp: number;
    private position: string;
    
    constructor(level: number, hp: number, position: string) {
        this.level = level;
        this.hp = hp;
        this.position = position;
    }
    
    getlevel(): number {
        return this.level;
    }
    getHp(): number {
        return this.hp;
    }
    getPosition(): string {
        return this.position;
    }

}

class Game{
    private level: number=1;
    private hp: number=100;
    private position:string ='inicio';

    constructor() {
        console.log(
            `
        Jugando en el nivel ${this.level}!
        salud: ${this.hp}
        position: ${this.position}`);
    }
    save(): GameMemento{
        return new GameMemento(this.level, this.hp, this.position);
    }
    play(level: number, hp:number, position:string): void {
        this.level = level;
        this.hp = hp;
        this.position = position;
        console.log(`
        Jugando en el nivel ${this.level}!
        salud: ${this.hp}
        position: ${this.position}`
        );
    }
    restore(memento: GameMemento): void {
        this.level=memento.getlevel()
        this.hp=memento.getHp()
        this.position=memento.getPosition()
        console.log(`
        Progreso restaurado
        Jugando en el nivel ${this.level}!
        salud: ${this.hp}
        position: ${this.position}
        `)
        
    }
}

class GameHistory{
    private mementos: GameMemento[] = [];
    
    push(memento: GameMemento) {
        this.mementos.push(memento)
    }
    pop(): GameMemento| undefined {
        return this.mementos.pop() ?? null
    }
}

function createGame(){
    const game = new Game(); 
    const history = new GameHistory();
    history.push(game.save());
    
    //jugador avanza en el juego
    
    game.play(2,90,`bosque encantado`);
    history.push(game.save());
    
    game.play(3,50,`bosque DE FUEGO`);
    history.push(game.save());
    
    game.play(4,150,`bosque DE FUEGO`);
    
    
    
    console.log(`restore:`);
    game.restore(history.pop()!)

    console.log(`restore:`);
    game.restore(history.pop()!)
}
createGame();