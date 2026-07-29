import { describe, it, expect } from "vitest";

describe("Project Structure", () => {

    it("should verify JavaScript is running", () => {

        expect(true).toBe(true);

    });

    it("should verify arrays work correctly", () => {

        const todos = [];

        todos.push("Learn JavaScript");

        expect(todos.length).toBe(1);

    });

    it("should verify filtering completed tasks", () => {

        const todos = [
            { completed: true },
            { completed: false },
            { completed: true }
        ];

        const completed = todos.filter(todo => todo.completed);

        expect(completed.length).toBe(2);

    });

});
