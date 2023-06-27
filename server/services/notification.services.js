import notification_model from "../modules/notification.model.js";
import todo_model from "../modules/todo.model.js"

class NotificationService {
    async createNotification(notification){
        const { taskId } = notification;
        const task = await todo_model.findById(taskId);
        if(!task) return;
        return notification_model.create({taskId});
    }
    async getNotifications(){
        const notifications = await notification_model.find();
        return notifications;
    }
    async editNotificationById (id,notification){
        const updateTask = await notification_model.findByIdAndUpdate(id, {
            isNotifiedUser: notification.notification
        },{new: true, upsert: false });
        return updateTask;
    }

    async deleteNotificationById (id){
        const deleteNotification = await notification_model.findByIdAndRemove(id);
        return deleteNotification;
    }
    async getTasksWithDeadlineReached (){
        const currentDate = new Date();
        // Find all tasks with deadlines that have passed
        const tasks = await todo_model.find({ deadline: { $lte: currentDate } });


        // Process the tasks that have reached their deadlines
        tasks.forEach(task => {
            // Send notification or perform any other action
            this.sendNotification(task);

    });
        return tasks;
    }
    async sendNotification(task) {
        // Notification logic
        console.log(`Sending notification: Deadline reached for task '${task.description}' on ${task.deadline}`);
    }

}

const notificationService = new NotificationService();
export default notificationService;
