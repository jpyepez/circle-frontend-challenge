"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksRouter_1 = __importDefault(require("./router/booksRouter"));
const errorHandler_1 = require("./middleware/errorHandler");
const ErrorHandler_1 = __importDefault(require("./utils/ErrorHandler"));
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
app.use('/books', booksRouter_1.default);
app.use((_req, _res, next) => {
    next(new ErrorHandler_1.default('Route not found', 404));
});
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`🚀 Example app listening at http://localhost:${port}`);
});
