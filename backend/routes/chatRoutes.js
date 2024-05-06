import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  accessChat,
  fetchChats,
  createGroupChat,
} from "../controllers/chatControllers.js";

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameChat);
// router.route("/groupremove").put(protect, removeGroupChat);
// router.route("/groupadd").put(protect, addGroupChat);

export default router;
