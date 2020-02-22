import { Request, Response } from 'express'
import logger from 'helpers/logger'

/**
 * Send JSON response
 *
 * @param res
 * @param data
 */
const ToJson = (req: Request, res: Response, data: any) => {
    logger.info({ req: { path: req.originalUrl }, res: data }, `API response`)
    return res.json(data).end()
}

export default ToJson
