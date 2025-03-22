/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

class codeEditorState {
    readonly content: string;
    readonly cursorPosition: number;
    readonly unsavedChanges: boolean;

    constructor(content: string, cursorPosition: number, unsavedChanges: boolean) {
        this.content = content;
        this.cursorPosition = cursorPosition;
        this.unsavedChanges = unsavedChanges;
    }

    displayState() {
        console.log(`Estados del Editor:`);
        console.log(`Content: ${this.content}`);
        console.log(`Cursor Position: ${this.cursorPosition}`);
        console.log(`Unsaved Changes: ${this.unsavedChanges}`);
    }
    copyWith({
                 content,
                 cursorPosition,
                 unsavedChanges,
             }: Partial<codeEditorState>) {  
        return new codeEditorState(
            content ?? this.content,
            cursorPosition ?? this.cursorPosition,
            unsavedChanges ?? this.unsavedChanges
        );
    }

    
}
class CodeEditorHistory {
    public history :codeEditorState[]= [];
    public currentIndex = -1;
    
    save(state:codeEditorState){
        if(this.currentIndex<this.history.length) {
        this.history=this.history.slice(0,this.currentIndex+1);
        }
            
        this.history.push(state);
        this.currentIndex++;
    }
    redo ():codeEditorState|null{
        if(this.currentIndex<this.history.length-1) {
            this.currentIndex++;
            return this.history[this.currentIndex];
        }
        return null;
    }
    undo():codeEditorState|null{
        if(this.currentIndex>0) {
            this.currentIndex--;
            return this.history[this.currentIndex];
        }
        return null;
    }
}
function main5() {
    const history = new CodeEditorHistory();
    console.log(`history legth: ${history.history.length} currentIndex: ${history.currentIndex}`);

    let editorState= new codeEditorState(
        "console.log('Hola Mundo!');",
        2,
        false
    )
    console.log('inicio');
    history.save(editorState)
    console.log("estado inicial");
    console.log(`history legth: ${history.history.length} currentIndex: ${history.currentIndex}`);
    editorState.displayState();
    
    editorState=editorState.copyWith({
        content:"console.log('Hola Mundo!');\nconsole.log('Nueva linea!');",
        cursorPosition: 3,
        unsavedChanges:true
    })

    history.save(editorState)
    console.log("First Change");
    console.log(`history legth: ${history.history.length} currentIndex: ${history.currentIndex}`);

    editorState.displayState();
    
    editorState=editorState.copyWith({cursorPosition: 5});
    history.save(editorState)
    console.log("\nSecond Change");
    console.log(`history legth: ${history.history.length} currentIndex: ${history.currentIndex}`);

    editorState.displayState();
    
    
    console.log("\nDESPUES DEL UNDO");
    editorState=history.undo()!;
    console.log(`history legth: ${history.history.length} currentIndex: ${history.currentIndex}`);

    editorState.displayState()
    console.log("\nDESPUES DEL REDO");
    editorState=history.redo()!;
    console.log(`history legth: ${history.history.length} currentIndex: ${history.currentIndex}`);

    editorState.displayState()


  
}
main5()