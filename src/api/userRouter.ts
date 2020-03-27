import { loginController } from "./../controller/user/loginController";
import { Router } from "express";
import { signupController } from "../controller/user/signupController";

const router = Router();

// post order and decease product stock
router.post("/signup", signupController);
router.post("/login", loginController);

export default router;
