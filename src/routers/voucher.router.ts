import express from 'express';
import { voucherController } from '@/controllers';
import { validator } from '@/services';


function createRouter() {
    const router = express.Router();

    router.post('/batch', validator.run('voucher.createMany'), voucherController.createMany);
    router.get('/', validator.run('voucher.list'), voucherController.list);
    router.get('/export', validator.run('voucher.export'), voucherController.export);

    return router;
}

export default {
    createRouter,
};
