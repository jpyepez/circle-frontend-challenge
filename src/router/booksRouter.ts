import { Router } from 'express'
import {
    getAllBooks,
    getUniqueBook,
    purchaseBook,
} from '../controller/booksController'

const router = Router()

router.get('/', getAllBooks)
router.get('/:id', getUniqueBook)
router.post('/:id/purchase', purchaseBook)

export default router
