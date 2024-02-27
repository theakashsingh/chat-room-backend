import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { accessChat } from "../controllers/chatController.js";

const router = express.Router();

router.route('/').post(protect,accessChat)
// router.route('/').get(protect,fetchChats)
// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/removegroup").put(protect, renameFromGroup);
// router.route("/removeadd").put(protect, addToGroup);


export default router