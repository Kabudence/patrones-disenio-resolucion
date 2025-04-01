/**
 * ! Patrón Iterator
 * Este patrón permite recorrer los elementos de una colección sin exponer
 * la estructura interna de la colección.
 *
 * * Es útil cuando se necesita recorrer una colección de elementos sin importar
 * * cómo se almacenan los elementos.
 *
 * https://refactoring.guru/es/design-patterns/iterator
 */
class Card {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

// 🔹 Clase Iteradora Personalizada
class CardIterator implements IterableIterator<Card> {
  private index = 0;
  private cards: Card[];

  constructor(cards: Card[], private ascending: boolean) {
    // Ordenamos las cartas en base al orden especificado
    this.cards = [...cards].sort((a, b) => ascending ? a.value - b.value : b.value - a.value);
  }

  next(): IteratorResult<Card> {
    if (this.index < this.cards.length) {
      return { value: this.cards[this.index++], done: false };
    } else {
      return { value: null, done: true };
    }
  }

  [Symbol.iterator](): IterableIterator<Card> {
    return this;
  }
}

// 🔹 Clase que representa la colección de cartas
class CardCollection {
  private cards: Card[] = [];

  addCard(card: Card): void {
    this.cards.push(card);
  }

  // Implementamos el iterador para orden ascendente
  getAscIterator(): IterableIterator<Card> {
    return new CardIterator(this.cards, true);
  }

  // Implementamos el iterador para orden descendente
  getDescIterator(): IterableIterator<Card> {
    return new CardIterator(this.cards, false);
  }
}

// Código Cliente para probar el iterador
function main(): void {
  const deck = new CardCollection();

  // Agregar algunas cartas a la colección (desordenadas)
  deck.addCard(new Card('Rey de Corazones', 13));
  deck.addCard(new Card('Jota de Corazones', 11));
  deck.addCard(new Card('As de Corazones', 1));
  deck.addCard(new Card('Reina de Corazones', 12));

  console.log('Cartas ordenadas de menor a mayor:');
  for (const card of deck.getAscIterator()) {
    console.log(`Carta: ${card.name}, Valor: ${card.value}`);
  }

  console.log('\nCartas ordenadas de mayor a menor:');
  for (const card of deck.getDescIterator()) {
    console.log(`Carta: ${card.name}, Valor: ${card.value}`);
  }
}

main();
