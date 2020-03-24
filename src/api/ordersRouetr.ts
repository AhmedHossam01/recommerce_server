import { getOrderes } from "./../controller/orders/getOrdersController";
import { removeOrder } from "./../controller/orders/removeOrderController";
import { updateOrder } from "./../controller/orders/updateOrderController";
import { postOrder } from "./../controller/orders/postOrderController";
import { Router } from "express";

const router = Router();

// post order and decease product stock
router.post("/", postOrder);

// Update order with increment or specified value in query
router.patch("/:id", updateOrder);

// remove order and increase product stock
router.delete("/:id", removeOrder);

// get orderes
router.get("/", getOrderes);

export default router;
