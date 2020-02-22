import { Request } from 'express'

/**
 * Check whether incoming request is an API request
 *
 * @param req
 */
export const isApiRequest = (req: Request): boolean => {
    // Check if request accepts JSON
    if (req.accepts('json')) {
        return true
    }

    // Check if route starts with MAPI
    if (req.path && req.path.startsWith(`/api`)) {
        return true
    }

    return false
}
