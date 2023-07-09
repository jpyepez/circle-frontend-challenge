import { Router } from 'express'
import {
    getAllBooks,
    getUniqueBook,
    purchaseBook,
} from '../controller/booksController'
import catchAsyncErrors from '../utils/catchAsyncErrors'

const router = Router()

router.get('/', catchAsyncErrors(getAllBooks))
router.get('/:id', catchAsyncErrors(getUniqueBook))
router.post('/:id/purchase', catchAsyncErrors(purchaseBook))

export default router
