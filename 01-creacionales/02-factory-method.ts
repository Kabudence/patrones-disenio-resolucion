/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */
import {COLORS} from "../helpers/colors";
import readlineSync from 'readline-sync';

interface Hamburger {
    prepare(): void;



}

class ChikenHamburger implements Hamburger{

    prepare(): void {
        console.log('Preparando hamburguesa de pollo');
    }
}
class BifeHamburger implements Hamburger{

    prepare(): void {
        console.log('Preparando hamburguesa de carne'
        );
    }
}
class BeanHamburger implements Hamburger{

    prepare(): void {
        console.log('Preparando hamburguesa de frijol');
    }
}
abstract class Restaurant{
    abstract createHamburger(): Hamburger;

    orderHamburger(){
        const hamburger = this.createHamburger();
        hamburger.prepare();
    }

}
class chikenRestaurant extends Restaurant{

    override createHamburger(): Hamburger {
        return new ChikenHamburger();
    }
}

class bifeRestaurant extends Restaurant{

    override createHamburger(): Hamburger {
        return new BifeHamburger();
    }
}
class BeanRestaurant extends Restaurant{

    override createHamburger(): Hamburger {
        return new BeanHamburger();
    }
}




function main() {


        let restaurant : Restaurant;
    const burgerType = readlineSync.question('Ingrese el tipo de hamburguesa que desea: 1. Pollo 2. Carne 3. Bean\n');


    switch ( burgerType ){
        case '1':
            restaurant = new chikenRestaurant();
            break;
        case '2':
            restaurant = new bifeRestaurant();
            break;
        case '3':
            restaurant = new BeanRestaurant();
            break;
        default:
            throw new Error('Opción no válida');

    }
    restaurant.orderHamburger()
}

main();
