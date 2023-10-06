import express from "express";
import campaignRouter from '@/routers/campaign.router';


function createRouter() {
    const router = express.Router();

    router.use('/campaigns', campaignRouter.createRouter());

    return router;
}

export default createRouter;