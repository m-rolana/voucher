import { apiRequest } from './helpers';
import { addSeconds } from 'date-fns';
import { PREFIX } from '../src/types';

describe('Campaign controller test', () => {
    describe('Campaign create', () => {
        it('Can create with min payload', async () => {
            const payload = { prefix: PREFIX.RECHARGE };

            const result = await apiRequest({ url: 'campaigns', method: 'POST', body: payload });

            expect(result?.status).toBe(200);
        });

        it('Can create with max payload', async () => {
            const payload = {
                prefix: PREFIX.RECHARGE,
                startsAt: addSeconds(new Date(), 1),
                endsAt: addSeconds(new Date(), 2),
                amount: 1,
                currency: 'EUR',
            };

            const result = await apiRequest({ url: 'campaigns', method: 'POST', body: payload });

            expect(result?.status).toBe(200);
            expect(result?.data).toBeTruthy();
        });

        it('Returns campaign entity', async () => {
            const payload = { prefix: PREFIX.RECHARGE };

            const result = await apiRequest({ url: 'campaigns', method: 'POST', body: payload });
            const properties = [
                'id',
                'startsAt',
                'endsAt',
                'prefix',
                'amount',
                'currency',
                'createdAt'
            ]

            properties.forEach(p => {
                expect(result?.data).toHaveProperty(p);
            })
        });

        it('Can NOT create w/o prefix', async () => {
            const payload = {};

            const result = await apiRequest({ url: 'campaigns', method: 'POST', body: payload });

            expect(result?.status).toBe(400);
        });

        it('Can NOT create with invalid prefix', async () => {
            const payload = { prefix: 'INVALID' };

            const result = await apiRequest({ url: 'campaigns', method: 'POST', body: payload });

            expect(result?.status).toBe(400);
        });

        it('Can NOT create with invalid prefix', async () => {
            const payload = { prefix: 'INVALID' };

            const result = await apiRequest({ url: 'campaigns', method: 'POST', body: payload });

            expect(result?.status).toBe(400);
        });

        it('Can NOT create if start date is in the past', async () => {
            const payload = {
                prefix: PREFIX.RECHARGE,
                startsAt: addSeconds(new Date(), -1),
            };

            const result = await apiRequest({ url: 'campaigns', method: 'POST', body: payload });

            expect(result?.status).toBe(400);
        });

        it('Can NOT create if end date is less than start date', async () => {
            const payload = {
                prefix: PREFIX.RECHARGE,
                endsAt: addSeconds(new Date(), -1),
            };

            const result = await apiRequest({ url: 'campaigns', method: 'POST', body: payload });

            expect(result?.status).toBe(400);
        });

        it('Can NOT create with negative amount', async () => {
            const payload = {
                prefix: PREFIX.RECHARGE,
                amount: -1,
            };

            const result = await apiRequest({ url: 'campaigns', method: 'POST', body: payload });

            expect(result?.status).toBe(400);
        });

        it('Can NOT create with invalid currency', async () => {
            const payload = {
                prefix: PREFIX.RECHARGE,
                currency: 'INVALID',
            };

            const result = await apiRequest({ url: 'campaigns', method: 'POST', body: payload });

            expect(result?.status).toBe(400);
        });
    });

    describe('Campaign list', () => {

        it('Can list with min payload', async () => {
            const result = await apiRequest({ url: 'campaigns', method: 'GET' });
            expect(result?.status).toBe(200);
            expect(result?.data).toBeTruthy();
        });

        it('Can list with take', async () => {
            const payload = {
                take: 10,
            };

            const result = await apiRequest({ url: 'campaigns', method: 'GET', queryParams: payload });

            expect(result?.status).toBe(200);
            expect(result?.data).toBeTruthy();
        });

        it('Can list with skip', async () => {
            const payload = {
                skip: 10,
            };

            const result = await apiRequest({ url: 'campaigns', method: 'GET', queryParams: payload });

            expect(result?.status).toBe(200);
            expect(result?.data).toBeTruthy();
        });

        it('Can list with take and skip', async () => {
            const payload = {
                take: 10,
                skip: 10,
            };

            const result = await apiRequest({ url: 'campaigns', method: 'GET', queryParams: payload });

            expect(result?.status).toBe(200);
            expect(result?.data).toBeTruthy();
        });

        it('Returns campaigns', async () => {
            const payload = {
                take: 2,
            };

            const result = await apiRequest({ url: 'campaigns', method: 'GET', queryParams: payload });

            expect(result?.status).toBe(200);
            expect(result?.data.length).toBe(2);
        });

        it('Can NOT list with negative take', async () => {
            const payload = {
                take: -1,
            };

            const result = await apiRequest({ url: 'campaigns', method: 'GET', queryParams: payload });

            expect(result?.status).toBe(400);
        });

        it('Can NOT list with big take', async () => {
            const payload = {
                take: 1_000,
            };

            const result = await apiRequest({ url: 'campaigns', method: 'GET', queryParams: payload });

            expect(result?.status).toBe(400);
        });

        it('Can NOT list with negative skip', async () => {
            const payload = {
                skip: -1,
            };

            const result = await apiRequest({ url: 'campaigns', method: 'GET', queryParams: payload });

            expect(result?.status).toBe(400);
        });
    });
});
