import { Request, Response, NextFunction } from "express";
import Order from "../../model/order";
import throwErr from "../../util/errHandler";
import Product from "../../model/product";
import User from "../../model/user";

export const postOrder = (req: Request, res: Response, next: NextFunction) => {
  const { product, orderedStock } = req.body;
  // @ts-ignore
  const userId = req.currentUser._id;

  const order = new Order({
    product,
    orderedStock,
    user: userId
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

      // @ts-ignore
      Order.findOne({ user: req.currentUser._id, product })
        .exec()
        .then(orderFound => {
          if (orderFound) {
            return throwErr(
              412,
              "Order of this product already exist. Please update your order instead",
              next
            );
          } else {
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
                  .then(() => {
                    User.updateOne(
                      { _id: userId },
                      {
                        $push: {
                          orderes: result._id
                        }
                      }
                    ).exec();
                  })
                  .catch(err => {
                    return throwErr(500, err.message, next);
                  });
              })
              .catch(err => {
                throwErr(500, err._message, next);
              });
          }
        });
    })
    .catch(err => {
      throwErr(500, err.message, next);
    });
};
