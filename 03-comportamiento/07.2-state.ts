/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 */




/**
 * !Objetivo:
 * Implementar el patrón State para simular el funcionamiento de una puerta
 * automática.
 *
 * La puerta tiene diferentes estados:
 *  - Cerrada
 *  - Abriéndose
 *  - Abierta
 *  - Cerrándose
 * Su comportamiento varía dependiendo del estado actual.
 */
import { COLORS } from "../helpers/colors";
import { sleep } from "../helpers/sleep";
import * as readlineSync from "readline-sync";

// Interfaz State
interface State {
  open(): void;
  close(): void;
  getName(): string;
}

// Clase abstracta que implementa la interfaz
abstract class BaseState implements State {
  protected name: string; // Propiedad protegida, accesible solo dentro de esta clase y sus subclases
  protected door: AutomaticDoor;

  constructor(door: AutomaticDoor, name: string) {
    this.door = door;
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  abstract open(): void;
  abstract close(): void;
}

// Clase Context - AutomaticDoor
class AutomaticDoor {
  private state: State;

  constructor() {
    this.state = new Closed(this);
  }

  setState(state: State): void {
    this.state = state;
    console.log(`%cEstado cambiado a: ${state.getName()}`, COLORS.green);
  }

  open(): void {
    this.state.open();
  }

  close(): void {
    this.state.close();
  }

  getStateName(): string {
    return this.state.getName();
  }
}

// Estado 1 - Cerrada
class Closed extends BaseState {
  constructor(door: AutomaticDoor) {
    super(door, "Puerta Cerrada");
  }

  open(): void {
    console.log("Abriendo la puerta...");
    this.door.setState(new Opening(this.door));
  }

  close(): void {
    console.log("La puerta ya está cerrada.");
  }
}

// Estado 2 - Abriéndose
class Opening extends BaseState {
  constructor(door: AutomaticDoor) {
    super(door, "Puerta Abriéndose");
  }

  private async afterOpen() {
    await sleep(3000);
    console.log("La puerta se ha abierto.");
    this.door.setState(new Open(this.door));
  }

  open(): void {
    console.log("La puerta ya se está abriendo.");
    this.door.setState(new Open(this.door));
  }

  close(): void {
    console.log("La puerta no puede cerrarse mientras se abre.");
  }
}

// Estado 3 - Abierta
class Open extends BaseState {
  constructor(door: AutomaticDoor) {
    super(door, "Puerta Abierta");
  }

  open(): void {
    console.log("La puerta ya está abierta.");
  }

  close(): void {
    console.log("Cerrando la puerta...");
    this.door.setState(new Closing(this.door));
  }
}

// Estado 4 - Cerrándose
class Closing extends BaseState {
  constructor(door: AutomaticDoor) {
    super(door, "Puerta Cerrándose");
  }

  open(): void {
    console.log("Detectando movimiento. Abriendo la puerta nuevamente...");
    this.door.setState(new Opening(this.door));
  }

  close(): void {
    console.log("La puerta se ha cerrado.");
    this.door.setState(new Closed(this.door));
  }
}

// Código Cliente para probar el patrón State
async function main() {
  const door = new AutomaticDoor();
  let selectedOption: string | null = "3";

  do {
    console.clear();
    console.log(`Estado actual: ${door.getStateName()}`);

    selectedOption = readlineSync.question(`
      1. Abrir puerta
      2. Cerrar puerta
      3. Salir

      Selecciona una opción: 
    `);

    switch (selectedOption) {
      case "1":
        door.open();
        break;
      case "2":
        door.close();
        break;
      case "3":
        console.log("Saliendo del simulador...");
        break;
      default:
        console.log("Opción no válida.");
        break;
    }

    await sleep(2000);
  } while (selectedOption !== "3");
}

main();


main();
