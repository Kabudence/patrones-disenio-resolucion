/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 * 
 */


interface Observer{
    notify(videoTitle:string): void;
}

class YoutubeChannel{
    
    private subscribers:Observer[] = [];
    private name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    subscribe(observer:Observer){
        this.subscribers.push(observer);
        console.log('Nuevo subscriptor al canal ' + this.name);
    }        
    unsubscribe(observer:Observer){
        this.subscribers=this.subscribers.filter(sub=>sub!==observer);
        console.log('Un subscriptor se ha dado de baja '+this.name);
    }
    uploadVideo(videoTitle:string){
        console.log(`El canal ${this.name}`,' Upload video:', videoTitle);
        
        for (const suscriber of this.subscribers) {
            suscriber.notify(videoTitle);
        }
    }
}

class Subscriber implements Observer{
    
    private name:string;
    
    constructor(name:string){
        this.name = name;
    }
    
    notify(videoTitle: string) {
    console.log(`${this.name} Ha sido notificado de un nuevo video:  ${videoTitle}`);    
    }
}

function main(){
     const channel= new YoutubeChannel(`Partyrock340`)
    const lyme= new Subscriber(`lyme`)
    const candy= new Subscriber(`candy`)
    const gitano= new Subscriber(`gitano`)
    
    channel.subscribe(lyme);
    channel.subscribe(candy);
    channel.uploadVideo(`Tutorial de warcraft`)
    channel.unsubscribe(lyme)
    channel.uploadVideo(`Tutorial de warcraft 2`)

    
}
main();





