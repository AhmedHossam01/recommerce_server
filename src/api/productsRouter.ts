import { auth } from "./../middleware/auth";
import { updateProduct } from "../controller/products/updateProductController";
import {
  removeProduct,
  removeManyProducts
} from "../controller/products/removeProductController";
import { postProduct } from "../controller/products/postProductController";
import {
  getAllProducts,
  getSpecificProduct
} from "../controller/products/getProductsController";
import { Router } from "express";

const router = Router();

// GET All Products
router.get("/", getAllProducts);

// GET Specific Product
router.get("/:id", getSpecificProduct);

// POST Products
router.post("/", auth(["admin"]), postProduct);

// Remove Product
router.delete("/:id", auth(["admin"]), removeProduct);

// Remove Many Products
router.delete("/", auth(["admin"]), removeManyProducts);

// Update Prodcuts
router.patch("/:id", auth(["admin"]), updateProduct);

export default router;
