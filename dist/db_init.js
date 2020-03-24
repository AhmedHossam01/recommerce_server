"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { DB_HOST, DB_NAME } = process.env;
const db_init = () => {
    return mongoose_1.default
        .connect(`mongodb://${DB_HOST}/${DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log("DB OK"))
        .catch(err => console.log(err));
};
exports.default = db_init;
