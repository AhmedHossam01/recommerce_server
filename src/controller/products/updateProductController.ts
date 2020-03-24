import { Request, Response, NextFunction } from "express";
import Product from "../../model/product";
import throwErr from "../../util/errHandler";

export const updateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const updates: any = {};
  for (const el of req.body) {
    updates[el.propName] = el.value;
  }

  Product.updateOne(
    { _id: id },
    {
      $set: updates
    }
  )
    .exec()
    .then(result => {
      if (result.n === 0) {
        return throwErr(412, "No post with this id", next);
      }
      res.json({
        request: "Update a product",
        status: result.nModified != 0 ? "success" : "failed",
        updatedProps: result.nModified != 0 ? updates : "No prop updated",
        productId: id,
        result
      });
    })
    .catch(err => {
      throwErr(500, err._message, next);
    });
};
