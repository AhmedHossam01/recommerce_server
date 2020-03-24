import { Request, Response, NextFunction } from "express";
import Product from "../../model/product";
import Order from "../../model/order";
import throwErr from "../../util/errHandler";

export const removeOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  Order.findById(id)
    .populate("product")
    .exec()
    .then((result: any) => {
      Product.updateOne(
        { _id: result.product._id },
        {
          $inc: {
            stock: result.orderedStock
          }
        }
      )
        .then(result => {
          Order.remove({ _id: id })
            .exec()
            .then((result: any) => {
              res.json(result);
            })
            .catch(err => throwErr(500, err.message, next));
        })
        .catch(err => throwErr(500, err.message, next));
    })
    .catch(err =>
      throwErr(500, "order isnt even there or maybe some error happened", next)
    );
};
