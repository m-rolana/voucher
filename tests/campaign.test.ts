import { apiRequest } from './helpers';

describe('Campaign controller test', () => {
    describe('Campaign create', () => {
        it('Can create', async () => {
            const payload = { prefix: 'RECHARGE' };

            const { data, status } = await apiRequest({ url: "campaigns", method: "POST", body: payload });

            expect(status).toBe(200);
        })
    })
})