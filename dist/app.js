"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_init_1 = __importDefault(require("./db_init"));
const cors_1 = __importDefault(require("cors"));
const productsRoute_1 = __importDefault(require("./api/productsRoute"));
const errHandler_1 = __importStar(require("./util/errHandler"));
const port = process.env.PORT || 5050;
const app = express_1.default();
db_init_1.default();
app.listen(port, () => console.log("SERVER OK"));
app.use(morgan_1.default("dev"));
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/products", productsRoute_1.default);
app.all("*", (req, res, next) => {
    errHandler_1.default(404, "Route not found", next);
});
app.use((err, req, res, next) => {
    errHandler_1.handleErr(err, res);
});
