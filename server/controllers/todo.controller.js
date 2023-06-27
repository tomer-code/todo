import todoService from "../services/todo.services.js";

class TodoController {
    createTask = async (req, res) => {
        const task = await todoService.createTask(req.body);
        if(!task) return res.status(404).json({ status: "No task create." });
        const response  ={
            code : 200,
            message : "new task was added",
            data : task
        }
        res.status(response.code).json(response);
    };
    editTaskById = async (req, res) => {
        const task = await todoService.editTaskById(req.params.id,req.body);
        if (!task) return res.status(404).json({ status: "No task found for update" });
        const response  ={
            code : 200,
            message : "task was updated",
            data : task
        }
        res.status(response.code).json(response);
    };
    getTaskById  = async (req, res) => {
        const task = await todoService.getTaskById(req.params.id);
        if (!task) return res.status(404).json({ status: "No task found" });
        const response  ={
            code : 200,
            message : "task was found",
            data : task
        }
        res.status(response.code).json(response);
    };
    deleteTaskById  = async (req, res) => {
        const task = await todoService.deleteTaskById(req.params.id);
        if (!task) return res.status(404).json({ status: "No task found for delete" });
        const response  ={
            code : 200,
            message : "task was deleted",
            data : task
        }
        res.status(response.code).json(response);
    };
}

const todoController = new TodoController();
export default todoController;


