import { Request, Response, NextFunction } from "express";
import Order from "../../model/order";
import throwErr from "../../util/errHandler";
import Product from "../../model/product";

export const updateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // orders/5454615/?method=inc&value=5
  const { method, value } = req.query;
  const id = req.params.id;

  if (method === "inc") {
    if (value <= 0) {
      return throwErr(412, "Value cannot be equal or less than 0", next);
    }
    Order.findById(id)
      .populate("product", "stock")
      .exec()
      .then((document: any) => {
        if (document.orderedStock + value > document.product.stock) {
          return throwErr(
            412,
            `Product stock is only ${document.product.stock}`,
            next
          );
        }
        Product.updateOne(
          { _id: document.product.id },
          {
            $inc: {
              stock: -value
            }
          }
        )
          .then(() => {
            Order.updateOne(
              { _id: id },
              {
                $inc: {
                  orderedStock: value
                }
              }
            ).catch(err => {
              throwErr(500, err.message, next);
            });
          })
          .catch(err => {
            throwErr(500, err.message, next);
          });
      });
  } else if (method === "dec") {
    // dec ordered stock and inc product
  } else if (method === "specify") {
  } else {
    // error you should specify method
  }
};
