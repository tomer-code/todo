import notificationService from "../services/notification.services.js";
import router from "../routes/notification.router.js";

class TodoController {
    createNotification = async (req, res) => {
        const notification = await notificationService.createNotification(req.body);
        if(!notification) return res.status(404).json({ status: "No notification create." });
        const response  ={
            code : 200,
            message : "new notification was added",
            data : notification
        }
        res.status(response.code).json(response);
    };
    editNotificationById = async (req, res) => {
        const notification = await notificationService.editNotificationById(req.params.id,req.body);
        if (!notification) return res.status(404).json({ status: "No notification found for update" });
        const response  ={
            code : 200,
            message : "notification was updated",
            data : task
        }
        res.status(response.code).json(response);
    };
    getAllNotification  = async (req, res) => {
        const notifications =await notificationService.getNotifications();
        if (!notifications) return res.status(404).json({ status: "No notification found" });
        const response  = {
            code : 200,
            message : "notifications were found",
            data : notifications
        }
        res.status(response.code).json(response);
    };
    getTasksWithDeadlineReached  = async (req, res) => {
        const finishedTasks =await notificationService.getTasksWithDeadlineReached();
        if (finishedTasks<=0) return res.status(404).json({ status: "No notification found" });
        const response  = {
            code : 200,
            message : "notifications were found",
            data : finishedTasks
        }
        res.status(response.code).json(response);
    };
    deleteNotificationById  = async (req, res) => {
        const notification = await notificationService.deleteNotificationById(req.params.id);
        if (!notification) return res.status(404).json({ status: "No notification found for delete" });
        const response  ={
            code : 200,
            message : "notification was deleted",
            data : notification
        }
        res.status(response.code).json(response);
    };
}

const todoController = new TodoController();
export default todoController;


