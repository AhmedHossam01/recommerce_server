import { updateOrder } from "./../controller/orders/updateOrderController";
import { postOrder } from "./../controller/orders/postOrderController";
import { Router } from "express";

const router = Router();

// post order and decease product stock
router.post("/", postOrder);

// TODO: Update order with increment or specified value in query
router.patch("/:id", updateOrder);

// TODO: remove order and increase product stock

export default router;
