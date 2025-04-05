/**
 * ! Patrón Template Method
 *
 * El patrón Template Method es un patrón de diseño de comportamiento
 * que define el esqueleto de un algoritmo en una operación,
 * delegando algunos pasos a las subclases.
 *
 * Permite que las subclases redefinan ciertos pasos de un algoritmo
 * sin cambiar su estructura.
 *
 * * Es útil cuando se tiene un algoritmo que sigue una secuencia de pasos
 * * y se quiere permitir a las subclases que redefinan algunos de esos pasos.
 *
 * https://refactoring.guru/es/design-patterns/template-method
 */

/**
 * Contexto: Vamos a implementar un sistema que permite preparar
 * diferentes bebidas calientes, como café y té.
 *
 * Aunque el proceso general para preparar ambas bebidas es similar
 * (hervir agua, añadir el ingrediente principal, servir en una taza),
 * hay pasos específicos que varían dependiendo de la bebida.
 *
 * El patrón Template Method es perfecto para este caso,
 * ya que define un esqueleto general del algoritmo en una clase base
 * y delega los detalles específicos a las subclases.
 */

abstract class HotBeverage{
    
    prepare(){
        this.boilWater();
        this.addMainIngredient()
        this.pourInCub()
        this.addCondiments()
    }
    
    private boilWater(){
        console.log('Hirviendo agua...')
    }
    
    private pourInCub(){
        console.log('Sirviendo en la taza...')
    }
    
    protected abstract addMainIngredient(): void;
    protected abstract addCondiments(): void;
    
    
}

class Tea extends HotBeverage{
    
    protected override addMainIngredient(){
        console.log('Aniadiendo bolsa de te')
     }

    protected override addCondiments() {
        console.log('Aniadiendo miel y limon')
    }
}

class Coffe extends HotBeverage{

    protected override addMainIngredient(){
        console.log('Aniadiendo caffe molido')
    }

    protected override addCondiments() {
        console.log('Aniadiendo estevia')
    }
}

function main(){
    console.log('Preparando el te\n');
    const tea= new Tea();
    tea.prepare(); 
    console.log('\nPreparando el cafe\n');
    const caffe= new Coffe();
    caffe.prepare();
}

main();