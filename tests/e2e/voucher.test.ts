import apiRequest from '../helpers/apiRequest';

const nonExistentCampaignId = '00000000-0000-0000-0000-000000000000';
const invalidCampaignId = 'invalid';

describe('Voucher controller test', () => {
    describe('Voucher create', () => {
        const defaultCampaignId = '00000000-0000-0000-0000-000000000002';
        const url = 'vouchers/batch';
        const method = 'POST';

        it('Can create', async () => {
            const payload = {
                campaignId: defaultCampaignId,
                amount: 1,
            };
            const result = await apiRequest({ url, method, body: payload });
            expect(result?.status).toBe(200);
        });

        it('Can create 100 vouchers', async () => {
            const payload = {
                campaignId: defaultCampaignId,
                amount: 100,
            };
            const result = await apiRequest({ url, method, body: payload });
            expect(result?.status).toBe(200);
        });

        it('Can NOT create more than 100 vouchers', async () => {
            const payload = {
                campaignId: defaultCampaignId,
                amount: 101,
            };
            const result = await apiRequest({ url, method, body: payload });
            expect(result?.status).toBe(400);
        });

        it('Can NOT create less than 1 vouchers', async () => {
            const payload = {
                campaignId: defaultCampaignId,
                amount: 0,
            };
            const result = await apiRequest({ url, method, body: payload });
            expect(result?.status).toBe(400);
        });

        it('Returns vouchers', async () => {
            const payload = {
                campaignId: defaultCampaignId,
                amount: 1,
            };

            const result = await apiRequest({ url, method, body: payload });
            expect(result?.status).toBe(200);
            expect(result?.data.vouchers).toHaveLength(1);
            expect(result?.data.vouchers[0].campaignId).toBe(payload.campaignId);
        });

        it('Can NOT create w/o campaignId', async () => {
            const payload = {
                amount: 1,
            };
            const result = await apiRequest({ url, method, body: payload });
            expect(result?.status).toBe(400);
        });

        it('Can NOT create for invalid campaignId', async () => {
            const payload = {
                campaignId: invalidCampaignId,
            };
            const result = await apiRequest({ url, method, body: payload });
            expect(result?.status).toBe(400);
        });

        it('Can NOT create w/o amount', async () => {
            const payload = {
                campaignId: defaultCampaignId,
            };
            const result = await apiRequest({ url, method, body: payload });
            expect(result?.status).toBe(400);
        });

    });

    describe('Voucher list', () => {
        const defaultCampaignId = '00000000-0000-0000-0000-000000000004';
        const url = 'vouchers';
        const method = 'GET';

        it('Can list with min payload', async () => {
            const payload = {
                campaignId: defaultCampaignId,
            };

            const result = await apiRequest({ url, method, queryParams: payload });
            expect(result?.status).toBe(200);
            expect(result?.data.success).toBeTruthy();
            expect(result?.data.vouchers.length).toBeTruthy();
        });

        it('Can list with take', async () => {
            const payload = {
                campaignId: defaultCampaignId,
                take: 10,
            };

            const result = await apiRequest({ url, method, queryParams: payload });

            expect(result?.status).toBe(200);
            expect(result?.data.success).toBeTruthy();
            expect(result?.data.vouchers.length).toBeTruthy();
        });

        it('Can list with skip', async () => {
            const payload = {
                campaignId: defaultCampaignId,
                skip: 1,
            };

            const result = await apiRequest({ url, method, queryParams: payload });
            expect(result?.status).toBe(200);
            expect(result?.data.success).toBeTruthy();
            expect(result?.data.vouchers.length).toBeTruthy();
        });

        it('Can list with take and skip', async () => {
            const payload = {
                campaignId: defaultCampaignId,
                take: 10,
                skip: 1,
            };

            const result = await apiRequest({ url, method, queryParams: payload });
            expect(result?.status).toBe(200);
            expect(result?.data.success).toBeTruthy();
            expect(result?.data.vouchers.length).toBeTruthy();
        });

        it('Returns vouchers', async () => {
            const payload = {
                campaignId: defaultCampaignId,
                take: 2,
            };

            const result = await apiRequest({ url, method, queryParams: payload });
            expect(result?.status).toBe(200);
            expect(result?.data.vouchers).toHaveLength(2);
        });

        it('Can NOT list with negative take', async () => {
            const payload = {
                campaignId: defaultCampaignId,
                take: -1,
            };

            const result = await apiRequest({ url, method, queryParams: payload });
            expect(result?.status).toBe(400);
        });

        it('Can NOT list with big take', async () => {
            const payload = {
                campaignId: defaultCampaignId,
                take: 1_000,
            };

            const result = await apiRequest({ url, method, queryParams: payload });
            expect(result?.status).toBe(400);
        });

        it('Can NOT list with negative skip', async () => {
            const payload = {
                campaignId: defaultCampaignId,
                skip: -1,
            };

            const result = await apiRequest({ url, method, queryParams: payload });
            expect(result?.status).toBe(400);
        });
    });

    describe('Voucher export', () => {
        const url = 'vouchers/export';
        const method = 'GET';

        it('Can export', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000004',
            };

            const result = await apiRequest({ url, method, queryParams: payload });
            expect(result?.status).toBe(200);
            expect(result?.headers['content-type']).toBe('text/csv');
            expect(result?.data).toBeTruthy();
        });

        it('Can export when no vouchers', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000004',
            };

            const result = await apiRequest({ url, method, queryParams: payload });
            expect(result?.status).toBe(200);
            expect(result?.headers['content-type']).toBe('text/csv');
            expect(result?.data).toBeTruthy();
        });

        it('Can NOT export for non-existent campaign', async () => {
            const payload = {
                campaignId: nonExistentCampaignId,
            };

            const result = await apiRequest({ url, method, queryParams: payload });
            expect(result?.status).toBe(404);
        });

        it('Can NOT export for invalid campaign', async () => {
            const payload = {
                campaignId: invalidCampaignId,
            };

            const result = await apiRequest({ url, method, queryParams: payload });
            expect(result?.status).toBe(400);
        });
    });

});
