/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

class ChatRoom{
    private users: User[]=[];
    public title: string;
    
    constructor(title: string) {
        this.title = title;
    }

    addUser(user: User) {
        console.log(`Se ha unido al chat: ${user.getName()}`);
        this.users.push(user);
        
    }
    sendMessage(sender: User, message: string) {
       const usersTosend=this.users.filter((user)=>user!==sender);
        for(const user of usersTosend) {
            user.recieveMessage(sender, message);
        }
    }
}

class User{
    private username: string;
    private chatRoom: ChatRoom;
    
    constructor(username:string,chatRoom:ChatRoom){
        this.username = username;
        this.chatRoom = chatRoom;
        chatRoom.addUser(this)
    }
    sendMessage( message: string) {
        console.log(`this user: ${this.username} send: ${message}`);
        this.chatRoom.sendMessage(this,message);
    }
    recieveMessage(sender:User,message: string) {
        console.log(`this user: ${this.username} recieve de: ${sender.username} el mensaje: ${message}`);
    }
    getName(): string {
        return this.username;
    }
    
}
function main(){
    const chatRoom=new ChatRoom('Sala de chat');
    
    const user1= new User('Josue',chatRoom);
    const user2= new User('Gracia',chatRoom);
    const user3= new User('Lyme',chatRoom);
    
    user1.sendMessage(`hola a todos`)
    user2.sendMessage(`Hola Josue`)

}

main();