import express from 'express';
import { campaignController } from '@/controllers';


function createRouter() {
    const router = express.Router();

    router.post('/', campaignController.create);

    return router;
}

export default {
    createRouter,
};
