import todo_model from "../modules/todo.model.js";

class TodoService {
    async createTask(task){
        const { description, deadline } = task;
        return todo_model.create({description,deadline});
    }

    async editTaskById (id,task){
        const updateTask = await todo_model.findByIdAndUpdate(id, {
            description: task.description,
            deadline: task.deadline,
            status: task.status
        },{new: true, upsert: false });
        return updateTask;
    }
    async getTaskById(id){
        const task = await todo_model.findById(id);
        return task;
    }
    async deleteTaskById (id){
        const deleteTask = await todo_model.findByIdAndRemove(id);
        return deleteTask;
    }
}

const todoService = new TodoService();
export default todoService;
