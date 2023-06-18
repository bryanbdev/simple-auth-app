import { Router } from "express";
import {
  home,
  registerUser,
  register,
  login,
  dashboard,
  loginUser,
} from "../controllers/user.js";
const router = Router();

// route get home page
router.get("/", home);

// route get register page
router.get("/register", register);

// route register new user in db
router.post("/register", registerUser);

// route get login page
router.get("/login", login);

// rout login user
router.post("/login", loginUser);

// route get user dashboard
router.get("/dashboard", dashboard);

export default router;
