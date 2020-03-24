import { Request, Response, NextFunction } from "express";
import Product from "../../model/product";
import throwErr from "../../util/errHandler";

export const getAllProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Product.find()
    .exec()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      throwErr(500, err._message, next);
    });
};

export const getSpecificProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  Product.findById(id)
    .exec()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      throwErr(500, err._message, next);
    });
};
