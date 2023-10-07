import express from 'express';
import { campaignController } from '@/controllers';


function createRouter() {
    const router = express.Router();

    router.post('/', campaignController.create);
    router.get('/', campaignController.list);
    router.delete('/:id', campaignController.delete);

    return router;
}

export default {
    createRouter,
};
