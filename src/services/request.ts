import { Request } from '@/types';

function getRequestParams(req: Request) {
    return req.method === 'GET' ? req.query : req.body;
}

export {
    getRequestParams,
};