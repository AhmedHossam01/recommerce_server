import { Request, Response, NextFunction } from "express";
import Product from "../model/product";
import throwErr from "../util/errHandler";

export const removeProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  Product.deleteOne({ _id: id })
    .exec()
    .then(result => {
      if (result.deletedCount === 0) {
        return throwErr(404, "Product not found!", next);
      }
      res.json({
        request: "Delete a product",
        status: "Success",
        deletedCount: result.deletedCount
      });
    })
    .catch(err => {
      throwErr(500, err._message, next);
    });
};

export const removeManyProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ids = req.body.ids;

  if (!Array.isArray(ids)) {
    return throwErr(412, "You must provide an array of ids", next);
  }

  Product.deleteMany({
    _id: {
      $in: ids
    }
  })
    .exec()
    .then(result => {
      res.json({
        request: "Delete many products",
        status: "Success",
        deletedCount: result.deletedCount
      });
    })
    .catch(err => {
      throwErr(500, err._message, next);
    });
};
