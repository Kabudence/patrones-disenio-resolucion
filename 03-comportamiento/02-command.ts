/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */
import * as readlineSync from 'readline-sync';

interface Command{
    execute():void;
    
}

class Light{
    turnOn(){
        console.log(`Luz encendida`) 
    }
    turnOff(){
        console.log(`Luz Apagada`)
    }
}
class Fan{
    on(){
        console.log(`El ventilador esta encedido`)
        
    }
    off(){
        console.log(`El ventilador esta apagado`)
    }
}

class LightOnCommand implements Command{
    
    constructor(private light: Light) {
    }
    
    execute():void{
            this.light.turnOn()
    }
}

class LightOffCommand implements Command{

    constructor(private light: Light) {
    }

    execute():void{
        this.light.turnOff()
    }
}

class FanOnCommand implements Command{

    constructor(private fan: Fan) {
    }

    execute():void{
        this.fan.on()
    }
}

class FanOffCommand implements Command{

    constructor(private fan: Fan) {
    }

    execute():void{
        this.fan.off()
    }
}
class RemoteControl{
    private commands:Record<string,Command>={};
    
    setCommand(button:string,command:Command){
        this.commands[button]=command;
        
    }
    pressButton(button:string){
        if(this.commands[button]){
            this.commands[button].execute();
            return;
        }
        console.log(`No se ha asignado un commando a ese button`)
    }
}

function main() : void{
    const remoteControl = new RemoteControl();
    const light = new Light();
    const fan = new Fan();
    //create commands
    const lightOnCommand=new LightOnCommand(light);
    const lightOffCommand=new LightOnCommand(light);
    const fanOnCommand=new FanOnCommand(fan)
    const fanOffCommand=new FanOnCommand(fan)
    
    //asignar las acciones
    remoteControl.setCommand('1',lightOnCommand);
    remoteControl.setCommand('2',lightOffCommand);
    remoteControl.setCommand('3',fanOnCommand);
    remoteControl.setCommand('4',fanOffCommand);
    
    let continueProgram=true;

    do{
        console.clear();
        const pressedButton= readlineSync.question( `presiona button que quieres:\n 1,2,3,4\n`)??''
        remoteControl.pressButton(pressedButton);
        const continueResponse= readlineSync.question(`Desea continuar? y/n`)
        
        continueProgram = continueResponse =='n' ?false:true;
    }while(continueProgram);
    
}
main();