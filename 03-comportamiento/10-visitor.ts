/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */


interface Visitor{

    visitRollerCoaster(rollerCoaster:RollerCoaster):void;
    visitHauntedHouse(hauntedHouse:HauntedHouse):void;
    visitFerrisWheel(ferrisWheel:FerrisWheel):void;
}

interface Attraction{
    accept(visitor:Visitor):void;
    getPrice():number;
}

class RollerCoaster implements Attraction{
    
    private price:number=50;
    getPrice():number;
    
    getPrice(){
        return this.price;
    }
    
    accept(visitor: Visitor) {
        visitor.visitRollerCoaster(this);
    }
}

class HauntedHouse implements Attraction{

    private price:number=40;

    getPrice(){
        return this.price;
    }

    accept(visitor: Visitor) {
        visitor.visitHauntedHouse(this);
    }
}
class FerrisWheel implements Attraction{

    private price:number=30;

    getPrice(){
        return this.price;
    }

    accept(visitor: Visitor) {
        visitor.visitFerrisWheel(this);
    }
}


class ChildVisitor implements Visitor{
    
    visitRollerCoaster(rollerCoaster: RollerCoaster) {
        console.log(`Ninio en Monta;a rusa: Precio con descuento $${rollerCoaster.getPrice()*0.5}`);
    }
    visitHauntedHouse(hauntedHouse:HauntedHouse){
        console.log(`Ninio en Casa embrujada: Precio con descuento $${hauntedHouse.getPrice()*0.7}`);

    }
    visitFerrisWheel(ferrisWheel: FerrisWheel) {
        console.log(`Ninio en Rueda de fortuna: Precio con descuento $${ferrisWheel.getPrice()*0.6}`);

    }
}

class AdultVisitor implements Visitor{

    visitRollerCoaster(rollerCoaster: RollerCoaster) {
        console.log(`Adulto en Monta;a rusa: Precio con descuento $${rollerCoaster.getPrice()}`);
    }
    visitHauntedHouse(hauntedHouse:HauntedHouse){
        console.log(`Adulto en Casa embrujada: Precio con descuento $${hauntedHouse.getPrice()}`);

    }
    visitFerrisWheel(ferrisWheel: FerrisWheel) {
        console.log(`Adulto en Rueda de fortuna: Precio con descuento $${ferrisWheel.getPrice()}`);

    }
}

class SeniorVisitor implements Visitor{

    visitRollerCoaster(rollerCoaster: RollerCoaster) {
        console.log(`Anciano en Monta;a rusa: Precio con descuento $${rollerCoaster.getPrice()*0.85}`);
    }
    visitHauntedHouse(hauntedHouse:HauntedHouse){
        console.log(`Anciano en Casa embrujada: Precio con descuento $${hauntedHouse.getPrice()*0.85}`);

    }
    visitFerrisWheel(ferrisWheel: FerrisWheel) {
        console.log(`Anciano en Rueda de fortuna: Precio con descuento $${ferrisWheel.getPrice()*0.85}`);

    }
}
function main(){
    const attractions:Attraction[] = [
        new RollerCoaster(),
        new HauntedHouse(),
        new FerrisWheel(),
        ]
    const childVisitor=new ChildVisitor()
    const adultVisitor=new AdultVisitor();
    const seniorVisitor=new SeniorVisitor();
    console.log(`\nVisitante ninio,`);

    
    attractions.forEach(attraction => {attraction.accept(childVisitor); console.log(`Precio normal:`+attraction.getPrice());})
    console.log(`\nVisitante adulto,`);
    attractions.forEach(attraction => {attraction.accept(adultVisitor); console.log(`Precio normal:`+attraction.getPrice());})
    console.log(`\nVisitante Anciano,`);
    attractions.forEach(attraction => {attraction.accept(seniorVisitor); console.log(`Precio normal:`+attraction.getPrice());})
}
main();