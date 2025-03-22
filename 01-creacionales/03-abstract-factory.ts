/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

import {COLORS} from "../helpers/colors";

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

interface Hamburger{
    prepare(): void;
}
interface Drink{
    pour(): void;
}

class ChikenBurger implements Hamburger{
    prepare(): void {
        console.log('Preparando hamburguesa de %cpollo',COLORS.yellow);
    }
}
class BeefBurger implements Hamburger{
    prepare(): void {
        console.log('Preparando hamburguesa de res');
    }
}

class CocaCola implements Drink{
    pour(): void {
        console.log('Sirviendo Coca Cola');
    }
}
class Water implements Drink{
    pour(): void {
        console.log('Sirviendo Aagua');
    }
}

interface RestaurantFactory{
    createHamburger(): Hamburger;
    createDrink(): Drink;
    
}


class FastFoodRestaurantFactory implements RestaurantFactory{
    createHamburger(): Hamburger {
        return new BeefBurger();
    }
    createDrink(): Drink {
        return new CocaCola();
    }
}
class HealthyFoodRestaurantFactory implements RestaurantFactory{
    createHamburger(): Hamburger {
        return new ChikenBurger();
    }
    createDrink(): Drink {
        return new Water();
    }
}
function main(factory: RestaurantFactory){
    const hamburger= factory.createHamburger();
    const drink= factory.createDrink();
    hamburger.prepare();
    drink.pour();
}
console.log('%cFast Food Restaurant',COLORS.blue);
main(new FastFoodRestaurantFactory());

console.log('%cHealthy Food Restaurant',COLORS.green);
main(new HealthyFoodRestaurantFactory());
