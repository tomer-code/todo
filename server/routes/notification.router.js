import raw from "../middleware/route.async.wrapper.js";
import express from 'express';
import notificationController from "../controllers/notification.controller.js"

const router = express.Router();
router.use(express.json())

router.get("/notifications", raw(notificationController.getAllNotification));
router.get("/", raw(notificationController.getTasksWithDeadlineReached));

router.post("/", raw(notificationController.createNotification));
router.patch("/:id", raw( notificationController.editNotificationById ));
router.delete("/:id", raw( notificationController.deleteNotificationById));

export default router;