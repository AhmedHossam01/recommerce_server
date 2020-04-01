import { auth } from "./../middleware/auth";
import { getUser } from "./../controller/user/getUserController";
import { loginController } from "./../controller/user/loginController";
import { Router } from "express";
import { signupController } from "../controller/user/signupController";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);

router.get("/", auth(), getUser);

export default router;
