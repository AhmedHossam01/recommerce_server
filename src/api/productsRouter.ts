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
router.post("/", postProduct);

// Remove Product
router.delete("/:id", removeProduct);

// Remove Many Products
router.delete("/", removeManyProducts);

// Update Prodcuts
router.patch("/:id", updateProduct);

export default router;
