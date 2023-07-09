import { NextFunction, Request, Response } from 'express'
import ErrorHandler from '../utils/ErrorHandler'

export const errorHandler = (
    err: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(status).json({ message })
}
