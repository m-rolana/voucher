import { apiRequest } from './helpers';

describe('Voucher controller test', () => {
    describe('Voucher create', () => {
        it('Can create', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000002',
                amount: 1,
            };
            const result = await apiRequest({ url: 'vouchers/batch', method: 'POST', body: payload });
            expect(result?.status).toBe(200);
        });

        it('Can create 100 vouchers', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000002',
                amount: 100,
            };
            const result = await apiRequest({ url: 'vouchers/batch', method: 'POST', body: payload });
            expect(result?.status).toBe(200);
        });

        it('Can NOT create more than 100 vouchers', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000002',
                amount: 101,
            };
            const result = await apiRequest({ url: 'vouchers/batch', method: 'POST', body: payload });
            expect(result?.status).toBe(400);
        });

        it('Can NOT create less than 1 vouchers', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000002',
                amount: 0,
            };
            const result = await apiRequest({ url: 'vouchers/batch', method: 'POST', body: payload });
            expect(result?.status).toBe(400);
        });

        it('Returns vouchers', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000002',
                amount: 1,
            };

            const result = await apiRequest({ url: 'vouchers/batch', method: 'POST', body: payload });
            expect(result?.status).toBe(200);
            expect(result?.data.length).toBe(1);
            expect(result?.data[0].campaignId).toBe(payload.campaignId);
        });

        it('Can NOT create w/o campaignId', async () => {
            const payload = {
                amount: 1,
            };
            const result = await apiRequest({ url: 'vouchers/batch', method: 'POST', body: payload });
            expect(result?.status).toBe(400);
        });

        it('Can NOT create for invalid campaignId', async () => {
            const payload = {
                campaignId: 'invalid',
            };
            const result = await apiRequest({ url: 'vouchers/batch', method: 'POST', body: payload });
            expect(result?.status).toBe(400);
        });

        it('Can NOT create w/o amount', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000002',
            };
            const result = await apiRequest({ url: 'vouchers/batch', method: 'POST', body: payload });
            expect(result?.status).toBe(400);
        });

    });

    describe('Voucher list', () => {

        it('Can list with min payload', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000003',
            };

            const result = await apiRequest({ url: 'vouchers', method: 'GET', queryParams: payload });
            expect(result?.status).toBe(200);
            expect(result?.data).toBeTruthy();
        });

        it('Can list with take', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000003',
                take: 10,
            };

            const result = await apiRequest({ url: 'vouchers', method: 'GET', queryParams: payload });

            expect(result?.status).toBe(200);
            expect(result?.data).toBeTruthy();
        });

        it('Can list with skip', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000003',
                skip: 1,
            };

            const result = await apiRequest({ url: 'vouchers', method: 'GET', queryParams: payload });

            expect(result?.status).toBe(200);
            expect(result?.data).toBeTruthy();
        });

        it('Can list with take and skip', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000003',
                take: 10,
                skip: 1,
            };

            const result = await apiRequest({ url: 'vouchers', method: 'GET', queryParams: payload });

            expect(result?.status).toBe(200);
            expect(result?.data).toBeTruthy();
        });

        it('Returns vouchers', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000003',
                take: 2,
            };

            const result = await apiRequest({ url: 'vouchers', method: 'GET', queryParams: payload });

            expect(result?.status).toBe(200);
            expect(result?.data.length).toBe(2);
        });

        it('Can NOT list with negative take', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000003',
                take: -1,
            };

            const result = await apiRequest({ url: 'vouchers', method: 'GET', queryParams: payload });

            expect(result?.status).toBe(400);
        });

        it('Can NOT list with big take', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000003',
                take: 1_000,
            };

            const result = await apiRequest({ url: 'vouchers', method: 'GET', queryParams: payload });

            expect(result?.status).toBe(400);
        });

        it('Can NOT list with negative skip', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000003',
                skip: -1,
            };

            const result = await apiRequest({ url: 'vouchers', method: 'GET', queryParams: payload });

            expect(result?.status).toBe(400);
        });
    });

    describe('Voucher export', () => {
        it('Can export', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000003',
            };

            const result = await apiRequest({ url: 'vouchers/export', method: 'GET', queryParams: payload });
            expect(result?.status).toBe(200);
            expect(result?.headers['content-type']).toBe('text/csv');
            expect(result?.data).toBeTruthy();
        });

        it('Can export when no vouchers', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000002',
            };

            const result = await apiRequest({ url: 'vouchers/export', method: 'GET', queryParams: payload });
            expect(result?.status).toBe(200);
            expect(result?.headers['content-type']).toBe('text/csv');
            expect(result?.data).toBeTruthy();
        });

        it('Can NOT export for non-existent campaign', async () => {
            const payload = {
                campaignId: '00000000-0000-0000-0000-000000000000',
            };

            const result = await apiRequest({ url: 'vouchers/export', method: 'GET', queryParams: payload });
            expect(result?.status).toBe(404);
        });

        it('Can NOT export for invalid campaign', async () => {
            const payload = {
                campaignId: 'invalid',
            };

            const result = await apiRequest({ url: 'vouchers/export', method: 'GET', queryParams: payload });
            expect(result?.status).toBe(400);
        });
    });

});
