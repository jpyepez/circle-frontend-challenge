"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseBook = exports.getUniqueBook = exports.getAllBooks = void 0;
const client_1 = __importDefault(require("../db/client"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const getAllBooks = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield client_1.default.book.findMany();
    return res.status(200).json({ books });
});
exports.getAllBooks = getAllBooks;
const getUniqueBook = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield client_1.default.book.findUnique({
        where: { id: +req.params.id },
    });
    if (!book)
        throw new ErrorHandler_1.default('Book not found', 404);
    const delay = Math.random() * 4000;
    setTimeout(() => {
        return res.status(200).json({ book });
    }, delay);
});
exports.getUniqueBook = getUniqueBook;
const purchase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const book = yield tx.book.update({
                where: { id },
                data: { availableStock: { decrement: 1 } },
            });
            if (book.availableStock < 0) {
                throw new Error(`Book '${book.title}' is currently out of stock`);
            }
            return book;
        }
        catch (err) {
            if (err instanceof Error) {
                if (/record to update not found/i.test(err.message)) {
                    throw new ErrorHandler_1.default('Book not found', 404);
                }
                else {
                    throw err;
                }
            }
        }
    }));
});
const purchaseBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const purchaseChance = Math.random();
    if (purchaseChance < 0.2)
        throw new ErrorHandler_1.default('Unable to complete purchase, please try again later.', 500);
    const book = yield purchase(+req.params.id);
    return res.status(200).send({ message: 'Purchase successful', book });
});
exports.purchaseBook = purchaseBook;
