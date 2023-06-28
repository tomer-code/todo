import * as sinon from "sinon";
import * as chai from "chai";

const { expect } = chai;

import DB_TODO from "../server/modules/todo.model.js"
import DB_NOTIFICATION from "../server/modules/notification.model.js"

import notificationService from "../server/services/notification.services.js"
import todoService from "../server/services/todo.services.js";

describe("NotificationService class", () => {
    describe("#createNotification", () => {
        afterEach(()=>sinon.restore())

        const notification = {
            taskId: "task123"
        };
        const task = {
            _id: "task123",
            description: "Task description",
            deadline: "2023-06-30",
            status: true
        };
        it("should be function", () => {
            expect(notificationService.createNotification).to.be.a("Function");
        });
        it("should create a notification for the specified task", async () => {
            sinon.stub(DB_TODO, "findById").resolves(task);
            sinon.stub(DB_NOTIFICATION, "create").resolves(notification);
            const createdNotification = await notificationService.createNotification(notification);
            expect(createdNotification).to.deep.equal(notification);
            expect(DB_TODO.findById.calledWithExactly(notification.taskId)).to.be.true;
            expect(DB_NOTIFICATION.create.calledWithExactly({ taskId: notification.taskId })).to.be.true;
        });
        it("should not create a notification if the task does not exist", async () => {
            sinon.stub(DB_TODO, "findById").resolves(null);
            sinon.stub(DB_NOTIFICATION, "create");

            const createdNotification = await notificationService.createNotification(notification);
            expect(createdNotification).to.be.undefined;
            expect(DB_NOTIFICATION.create.called).to.be.false;
        });
    });
    describe("#getNotifications", () => {
        afterEach(()=>sinon.restore())
        const notifications = [
            { _id: "notification1", taskId: "task1" },
            { _id: "notification2", taskId: "task2" }
        ];
        it("should be function", () => {
            expect(notificationService.getNotifications).to.be.a("Function");
        });
        it("should return all notifications", async () => {
            sinon.stub(DB_NOTIFICATION, "find").resolves(notifications);
            const retrievedNotifications = await notificationService.getNotifications();
            expect(retrievedNotifications).to.deep.equal(notifications);
            expect(DB_NOTIFICATION.find.calledOnce).to.be.true;
        });
    });
    describe("#editNotificationById", () => {
        const notificationId = "notification123";
        const updatedNotification = {
            _id: notificationId,
            isNotifiedUser: true
        };

        it("should be a function", () => {
            expect(notificationService.editNotificationById).to.be.a("function");
        });

        it("should return the updated notification", async () => {
            sinon.stub(DB_NOTIFICATION, "findByIdAndUpdate").resolves(updatedNotification);
            const actual = await notificationService.editNotificationById(notificationId, updatedNotification);
            expect(actual).to.deep.equal(updatedNotification);
            expect(DB_NOTIFICATION.findByIdAndUpdate.callCount).to.equal(1);
        });
    });
    describe("#getTasksWithDeadlineReached", () => {
        afterEach(() => sinon.restore());

        const currentDate = new Date();
        const tasks = [
            { _id: "task1", description: "Task 1", deadline: currentDate, status: true },
            { _id: "task2", description: "Task 2", deadline: currentDate, status: false }
        ];

        it("should be a function", () => {
            expect(notificationService.getTasksWithDeadlineReached).to.be.a("function");
        });

        it("should return tasks with deadlines that have passed", async () => {
            sinon.stub(DB_TODO, "find").resolves(tasks);
            sinon.stub(notificationService, "sendNotification");
            const actualTasks = await notificationService.getTasksWithDeadlineReached();
            expect(actualTasks).to.deep.equal(tasks);
            expect(notificationService.sendNotification.callCount).to.equal(2);
            expect(notificationService.sendNotification.calledWith(tasks[0])).to.be.true;
            expect(notificationService.sendNotification.calledWith(tasks[1])).to.be.true;
        });
    });
});