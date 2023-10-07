import express from 'express';
import { campaignController } from '@/controllers';
import { validator } from '@/services';


function createRouter() {
    const router = express.Router();

    router.post('/', validator.run('campaign.create'), campaignController.create);
    router.get('/', campaignController.list);
    router.delete('/:id', campaignController.delete);

    return router;
}

export default {
    createRouter,
};
