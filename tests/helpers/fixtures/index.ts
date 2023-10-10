import createVouchers from './createVouchers'
import campaignWithVouchers from './campaignWithVouchers'
import deleteCampaign from './deleteCampaign'
import existentCampaign from './existentCampaign'

export default [
    ...createVouchers,
    ...campaignWithVouchers,
    ...deleteCampaign,
    ...existentCampaign,
];
