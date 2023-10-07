import express from 'express';
import { voucherController } from '@/controllers';


function createRouter() {
    const router = express.Router();

    router.post('/batch', voucherController.createMany);
    router.get('/', voucherController.list);

    return router;
}

export default {
    createRouter,
};
