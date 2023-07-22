import swaggerUi from 'swagger-ui-express'
import { Router } from 'express'
import {
    getAllBooks,
    getUniqueBook,
    purchaseBook,
} from '../controller/booksController'
import catchAsyncErrors from '../utils/catchAsyncErrors'
import swaggerDocument from '../docs/swagger.json'

const router = Router()

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))

router.get('/', catchAsyncErrors(getAllBooks))
router.get('/:id', catchAsyncErrors(getUniqueBook))
router.post('/:id/purchase', catchAsyncErrors(purchaseBook))

export default router
