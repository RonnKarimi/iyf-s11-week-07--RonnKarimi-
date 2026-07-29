export function createTodo(text) {

    return {

        id: Date.now(),

        text: text,

        completed: false,

        createdAt: new Date().toISOString()

    };

}
