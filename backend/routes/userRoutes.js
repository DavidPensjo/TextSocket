import express from "express";
import {
  registerUser,
  authUser,
  allUsers,
  updateProfilePicture,
} from "../controllers/userControllers.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);
router.put("/profilepicture", protect, upload.single("image"), updateProfilePicture);

export default router;
