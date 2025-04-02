/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { question } from "readline-sync";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */
import * as readlineSync from 'readline-sync';
import {sleep} from "../helpers/sleep";

interface State{
    name :string;
    
    insertMoney():void;
    selectProduct():void;
    dispenseProduct():void;
}
class VendingMachine{

    public state:State;
    
    constructor(){
        this.state = new WaitingForMoney(this)
    }

    insertMoney(){
     this.state.insertMoney();  
    }
    selectProduct(){
        this.state.selectProduct();
        
    };
    dispenseProduct(){
        this.state.dispenseProduct()
        
    };
    getStateName():string{
        return this.state.name;
    }
    setState(state:State){
        this.state = state;
        console.log(`El estado cambio a :`,state.name);
    }
}

class WaitingForMoney implements State{
    public name:string = 'Esperando Dinero';
    private vendingMachine:VendingMachine;
    
    constructor(vendingMachine:VendingMachine){
        this.vendingMachine = vendingMachine;
    }
    
    insertMoney():void{
        console.log(`Insertando Dinero. Ahora puedes insertar un producto.`)
        this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
    }
    dispenseProduct():void{
        console.log(`primero debes insertar dinero.`)
    }
    selectProduct():void{
     console.log(`primero debes insertar dinero.`)   
    }
}

class ProductSelected implements State{
    public name:string = 'Seleccionando producto';
    private vendingMachine:VendingMachine;

    constructor( vendingMachine:VendingMachine){
        this.vendingMachine = vendingMachine;
    }

    insertMoney():void{
        console.log(`Porfavor selecciona un producto.-dinero ya insertado`)
    }
    dispenseProduct():void{
        console.log(`Porfavor selecciona un producto. antes de despachado`)
    }
    selectProduct():void{
        console.log('seleccionando producto')
        this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));

    }
}

class DispensingProduct implements State{
    public name:string = 'Despachando producto';
    private vendingMachine:VendingMachine;

    constructor( vendingMachine:VendingMachine){
        this.vendingMachine = vendingMachine;
    }

    insertMoney():void{
        console.log(`Porfavor espera que se entregue el producto`)
        // this.vendingMachine.setState('')
    }
    dispenseProduct():void{
        console.log(`producto despachado, cambiado estado a esperando dinero...`)
        this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
    }
    selectProduct():void{
        console.log(`Producto ya seleccionado, despachando`)
    }
    
}
async function  main(){
    
    const vendingMachine = new VendingMachine();
    let selectedOption:string | null = '4';
    
    do{
        console.clear();
        console.log(`Seleccione una opcion ${vendingMachine.getStateName()}`);
        selectedOption=readlineSync.question(`
        1.Ingresar dinero
        2.Seleccionar producto
        3.Despachar producto
        4.Salir
        `)

        switch(selectedOption){

            case '1':
                vendingMachine.insertMoney()
                break;
            case '2':
                vendingMachine.selectProduct()
                break;
            case '3':
                vendingMachine.dispenseProduct()
                break;
            case '4':
                console.log('Saliendo de la maquina')
                break;
            default:
                console.log(`Opcion no valida`)
                break;
                
        }
       await sleep(2000)
        
    }while(selectedOption!=='4');
    

}

main();