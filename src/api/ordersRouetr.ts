import { auth } from "./../middleware/auth";
import {
  getOrderes,
  getSpecificOrder
} from "./../controller/orders/getOrdersController";
import { removeOrder } from "./../controller/orders/removeOrderController";
import { updateOrder } from "./../controller/orders/updateOrderController";
import { postOrder } from "./../controller/orders/postOrderController";
import { Router } from "express";

const router = Router();

// post order and decease product stock
router.post("/", auth(), postOrder);

// Update order with increment or specified value in query
router.patch("/:id", auth(), updateOrder);

// remove order and increase product stock
router.delete("/:id", auth(), removeOrder);

// get orderes
router.get("/", getOrderes);

// get specific order
router.get("/:id", auth(), getSpecificOrder);

export default router;
