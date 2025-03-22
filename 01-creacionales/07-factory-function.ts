/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */
type Language = 'es' | 'en' | 'pt';

function createGreeter(lang: Language) {
    const messages = {
        es: {
            greet: (name: string) => `Hola, ${name}`,
            farewell: (name: string) => `Adiós, ${name}`,
            insultar: (name: string) => `Vete a la mierda, ${name}`,
        },
        en: {
            greet: (name: string) => `Hello, ${name}`,
            farewell: (name: string) => `Goodbye, ${name}`,
            insultar: (name: string) => `Vete a la mierda, ${name}`,

        },
        pt: {
            greet: (name: string) => `Ola, ${name}`,
            farewell: (name: string) => `Adeus, ${name}`,
            insultar: (name: string) => `Vete a la mierda, ${name}`,

        },
    };

    return {
        greet(name: string) {
            console.log(messages[lang].greet(name));
        },
        insultar(name: string) {
          return messages[lang].insultar(name)
        },
        farewell(name: string) {
            console.log(messages[lang].farewell(name));
        },
        // Puedes agregar más métodos aquí
    };

}
function main(){
    const spanishGreeter = createGreeter('es');
    console.log(
    spanishGreeter.insultar('Josue')
);
    const englishGreeter = createGreeter('en');
}
main()