/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */
import {COLORS} from "../helpers/colors";

class Documentt{
    public title:string;
    private content:string;
    public author:string;
    
    constructor(title:string ,content:string,author:string){
        this.title = title;
        this.content = content;
        this.author = author;
    }
    displayInfo(){
        console.log(`%cTitle: ${this.title}`,COLORS.red);
        console.log(`Content: ${this.content}`);
        console.log(`Author: ${this.author}`);
    }
    clone():Documentt{
        return new Documentt(this.title,this.content,this.author);
    }
    
}

function Runmain(){
    const document1 = new Documentt('Prototype Pattern','Contenido del documento','Autor del documento');
    console.log(document1);
    document1.displayInfo();
    
    const document2=document1.clone();
    document2.title='Contenido del documento';
    console.log(document2);
    document2.displayInfo();
    
}

Runmain()