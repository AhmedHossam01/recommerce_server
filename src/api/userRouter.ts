import { Router } from "express";
import { signupController } from "../controller/user/signupController";

const router = Router();

// post order and decease product stock
router.post("/signup", signupController);

export default router;
