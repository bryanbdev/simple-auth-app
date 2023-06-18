import { Router } from "express";
import {
  home,
  registerUser,
  register,
  login,
  dashboard,
  loginUser,
  logout,
} from "../controllers/user.js";
import { checkUser, requireAuth } from "../middleware/authMiddleware.js";
const router = Router();

// checks for user in every get request route
router.get("*", checkUser);

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

// route get user dashboard if logged in
router.get("/dashboard", requireAuth, dashboard);

// route logout user
router.get("/logout", requireAuth, logout);

export default router;
