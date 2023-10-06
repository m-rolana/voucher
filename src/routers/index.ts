import express from "express";
import campaignRouter from '@/routers/campaign.router';
import voucherRouter from '@/routers/voucher.router';


function createRouter() {
    const router = express.Router();

    router.use('/campaigns', campaignRouter.createRouter());
    router.use('/vouchers', voucherRouter.createRouter());

    return router;
}

export default createRouter;