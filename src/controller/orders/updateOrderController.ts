import { Request, Response, NextFunction } from "express";
import Order from "../../model/order";
import throwErr from "../../util/errHandler";
import Product from "../../model/product";

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // orders/di65623y5hj22g596/?method=inc&value=5
  const { method, value } = req.query;
  const id = req.params.id;

  if (method === "inc" || !value) {
    if (value <= 0) {
      return throwErr(412, "Value cannot be equal or less than 0", next);
    }

    Order.findById(id)
      .populate("product", "stock")
      .populate("user", "_id")
      .exec()
      .then((document: any) => {
        // @ts-ignore
        if (document.user._id.toString() !== req.currentUser._id.toString()) {
          return throwErr(401, "Unauthorized", next);
        }

        if (document.orderedStock + parseInt(value) > document.product.stock) {
          return throwErr(
            412,
            `Product stock is only ${document.product.stock} and ordered stock is ${document.orderedStock}`,
            next
          );
        }

        Product.updateOne(
          { _id: document.product._id },
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
            )
              .then(result => {
                res.json({
                  request: "Update order",
                  status:
                    result.nModified && result.n > 0 ? "success" : "failed",
                  updatedOrderId: id,
                  orderProductId: document.product.id,
                  result
                });
              })
              .catch(err => {
                throwErr(500, err.message, next);
              });
          })
          .catch(err => {
            throwErr(500, err.message, next);
          });
      });
  } else if (method === "dec") {
    // dec ordered stock and inc product
    // if value 0 or negative
    if (value <= 0 || !value) {
      return throwErr(412, "You cannot specify 0 or negative value", next);
    }
    // if value is bigger than orderedStock
    Order.findById(id)
      .exec()
      .then((document: any) => {
        if (value >= document.orderedStock) {
          return throwErr(
            412,
            `Decrement value is bigger than ordered stock: ${document.orderedStock}`,
            next
          );
        }
        Product.updateOne(
          { _id: document.product._id },
          {
            $inc: {
              stock: value
            }
          }
        )
          .then(() => {
            Order.updateOne(
              { _id: id },
              {
                $inc: {
                  orderedStock: -value
                }
              }
            )
              .then(result => {
                res.json(result);
              })
              .catch(err => throwErr(500, err.message, next));
          })
          .catch(err => throwErr(500, err.message, next));
      })
      .catch(err => throwErr(500, err.message, next));
  } else {
    throwErr(412, "You should specify method of 'inc' or 'dec'", next);
  }
};
