"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booksController_1 = require("../controller/booksController");
const catchAsyncErrors_1 = __importDefault(require("../utils/catchAsyncErrors"));
const router = (0, express_1.Router)();
router.get('/', (0, catchAsyncErrors_1.default)(booksController_1.getAllBooks));
router.get('/:id', (0, catchAsyncErrors_1.default)(booksController_1.getUniqueBook));
router.post('/:id/purchase', (0, catchAsyncErrors_1.default)(booksController_1.purchaseBook));
exports.default = router;
