import * as sinon from "sinon";
import * as chai from "chai";

const { expect } = chai;

import DB_TODO from "../server/modules/todo.model.js"
import todoService from "../server/services/todo.services.js"

describe("TodoService class", () => {
    describe("#createTask", () => {
        afterEach(()=>sinon.restore())

        const task1 = {
            description  : "learn to play a game",
            deadline  : "2023-05-08"
        }
        it("should be function", () => {
            expect(todoService.createTask).to.be.a("Function");
        });
        it("should return the todo that was created", async () => {
            sinon.stub(DB_TODO, 'create').resolves(task1); // Use resolves instead of resolve
            const actual = await todoService.createTask(task1);
            expect(actual.description).to.be.equal("learn to play a game");
        });
    });
    describe("#editTaskById", () => {
        afterEach(()=>sinon.restore())

        const taskId = "task123";
        const updatedTask = {
            description: "Updated task",
            deadline: "2023-06-30",
            status: true
        };
        it("should be function", () => {
            expect(todoService.editTaskById).to.be.a("Function");
        });
        it("should return the updated todo", async () => {
            sinon.stub(DB_TODO, 'findByIdAndUpdate').resolves(updatedTask);
            const actual = await todoService.editTaskById(taskId, updatedTask);
            expect(actual).to.deep.equal(updatedTask);
        });
    });
    describe("#getTaskById", () => {
        afterEach(()=>sinon.restore())
        const taskId = "task123";
        const expectedTask = {
            _id: taskId,
            description: "Task description",
            deadline: "2023-06-30",
            status: true
        };
        it("should be function", () => {
            expect(todoService.getTaskById).to.be.a("Function");
        });
        it("should return the task with the specified ID", async () => {
            sinon.stub(DB_TODO, 'findById').resolves(expectedTask);
            const actual = await todoService.getTaskById(taskId);
            expect(actual).to.deep.equal(expectedTask);
        });
    });
    describe("#deleteTaskById", () => {
        afterEach(()=>sinon.restore())
        const taskId = "task123";
        it("should be function", () => {
            expect(todoService.deleteTaskById).to.be.a("Function");
        });
        it("should delete the task with the specified ID", async () => {
            sinon.stub(DB_TODO, 'findByIdAndRemove').resolves({ _id: taskId });
            const deletedTask = await todoService.deleteTaskById(taskId);
            expect(deletedTask).to.deep.equal({ _id: taskId });
        });

    });
});