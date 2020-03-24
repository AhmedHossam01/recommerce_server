"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importDefault(require("../model/product"));
const errHandler_1 = __importDefault(require("../util/errHandler"));
const router = express_1.Router();
router.get("/", (req, res, next) => {
    product_1.default.find()
        .exec()
        .then(result => {
        res.json(result);
    })
        .catch(() => {
        errHandler_1.default(500, "Something went wrong!", next);
    });
});
router.post("/", (req, res, next) => {
    const product = new product_1.default({
        name: "ahmed",
        price: "dsdsdsd"
    });
    product
        .save()
        .then(result => {
        res.json(result);
    })
        .catch(() => {
        errHandler_1.default(500, "Something went wrong", next);
    });
});
exports.default = router;
