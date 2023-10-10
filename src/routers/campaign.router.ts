import express, { Router } from 'express';
import { campaignController } from '@/controllers';
import { validator } from '@/services';

function createRouter(): Router {
    const router = express.Router();

    router.post('/', validator.run('campaign.create'), campaignController.create);
    router.get('/', validator.run('campaign.list'), campaignController.list);
    router.delete('/:id', campaignController.delete);

    return router;
}

export default {
    createRouter,
};
