import { Request, Response, Router } from 'express'

import Json from 'views/json'
import TransactionService from 'services/transaction'
import { Transaction } from 'types/transaction'

const router: Router = Router()
const transactionService: TransactionService = new TransactionService()

/**
 * Get transactions API
 */
router.get('/transactions', (req: Request, res: Response) => {
    const { transactionId, confidenceLevel = 0 } = req.query
    const data: Array<Transaction> = transactionService.getList(
        transactionId,
        parseInt(confidenceLevel, 10),
    )
    return Json(req, res, data)
})

export default router
