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
import multer from "multer";
import throwErr from "../util/errHandler";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + "_" + file.originalname);
  }
});

// @ts-ignore
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

const router = Router();

// GET All Products
router.get("/", getAllProducts);

// GET Specific Product
router.get("/:id", getSpecificProduct);

// POST Products
router.post("/", auth(["admin"]), upload.single("image"), postProduct);

// Remove Product
router.delete("/:id", auth(["admin"]), removeProduct);

// Remove Many Products
router.delete("/", auth(["admin"]), removeManyProducts);

// Update Prodcuts
router.patch("/:id", auth(["admin"]), updateProduct);

export default router;
