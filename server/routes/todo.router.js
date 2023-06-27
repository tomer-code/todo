import raw from "../middleware/route.async.wrapper.js";
import express from 'express';
import todoController from "../controllers/todo.controller.js"
import {checkTask} from "../validation/validator.js";

const router = express.Router();
router.use(express.json())
// create all routes
router.get("/:id", raw( todoController.getTaskById));
router.post("/", checkTask, raw( todoController.createTask));
router.patch("/:id", raw( todoController.editTaskById ));
router.delete("/:id", raw( todoController.deleteTaskById));

// get all tasks
export default router;



