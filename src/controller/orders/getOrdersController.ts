import { Request, Response, NextFunction } from "express";
import Order from "../../model/order";
import throwErr from "../../util/errHandler";

export const getOrderes = (req: Request, res: Response, next: NextFunction) => {
  Order.find()
    .populate("product")
    .exec()
    .then(result => {
      res.json(result);
    })
    .catch(err => throwErr(500, err.message, next));
};

export const getSpecificOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Order.findById(req.params.id)
    .populate("product")
    .populate("user", "_id")
    .exec()
    .then(result => {
      // @ts-ignore
      if (result.user._id.toString() !== req.currentUser._id.toString()) {
        return throwErr(401, "Unauthorized", next);
      }
      res.json(result);
    })
    .catch(err => throwErr(500, err.message, next));
};
