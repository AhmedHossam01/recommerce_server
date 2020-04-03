import { Request, Response, NextFunction } from "express";
import Product from "../../model/product";
import throwErr from "../../util/errHandler";

export const postProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price, stock, description } = req.body;
  const image = req.file.path;

  const product = new Product({
    name,
    price,
    stock,
    description,
    image
  });

  if (!name) {
    throwErr(412, "You must provide a name for the product", next);
  }

  if (!price) {
    throwErr(412, "You must provide a price for the product", next);
  }

  product
    .save()
    .then(result => {
      res.json({
        request: "Post a product",
        status: "success",
        createdProduct: {
          ...result.toObject()
        }
      });
    })
    .catch(err => {
      throwErr(500, err._message, next);
    });
};
