import { describe, it, expect } from "vitest";
import { createTodo } from "../js/utils.js";

describe("createTodo()", () => {

    it("should create a todo object", () => {

        const todo = createTodo("Study JavaScript");

        expect(todo.text).toBe("Study JavaScript");
        expect(todo.completed).toBe(false);
        expect(typeof todo.id).toBe("number");
        expect(todo.createdAt).toBeDefined();

    });

    it("should create different ids", () => {

        const todo1 = createTodo("Task One");
        const todo2 = createTodo("Task Two");

        expect(todo1.id).not.toBe(todo2.id);

    });

});
