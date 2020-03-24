import { updateProduct } from "./../controller/updateProductController";
import {
  removeProduct,
  removeManyProducts
} from "./../controller/removeProduct";
import { postProduct } from "./../controller/postProductController";
import {
  getAllProducts,
  getSpecificProduct
} from "./../controller/getProductsController";
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

// TODO: Update Prodcuts
router.patch("/:id", updateProduct);

export default router;
