import { Request, Response, NextFunction } from "express";
import Order from "../../model/order";
import throwErr from "../../util/errHandler";
import Product from "../../model/product";

export const postOrder = (req: Request, res: Response, next: NextFunction) => {
  const { product, orderedStock } = req.body;

  const order = new Order({
    product,
    orderedStock
  });

  Product.findById(product)
    .exec()
    .then((document: any) => {
      if (document === null) {
        return throwErr(404, "Cannot find product", next);
      }
      if (document.stock === 0) {
        return throwErr(412, "Product has no more stock", next);
      }
      if (orderedStock > document.stock) {
        return throwErr(412, `Product stock is just ${document.stock}`, next);
      }
      if (orderedStock <= 0) {
        return throwErr(412, "You cannot order 0 or negative number", next);
      }

      order
        .save()
        .then(result => {
          Product.updateOne(
            { _id: product },
            {
              $inc: {
                stock: -orderedStock
              }
            }
          )
            .exec()
            .then(() => {
              res.json({
                request: "Create new order",
                status: "success",
                order: result
              });
            })
            .catch(err => {
              return throwErr(500, err.message, next);
            });
        })
        .catch(err => {
          throwErr(500, err._message, next);
        });
    })
    .catch(err => {
      throwErr(500, err.message, next);
    });
};
