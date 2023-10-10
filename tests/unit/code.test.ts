import { createCode } from '@/services';
import config from '@/config';

describe('Discount code', () => {
    it('Can create code with length = 1', async () => {
        const length = 1;
        const result = createCode(length);
        expect(result).toHaveLength(length);
    });

    it('Can create code with length from config', async () => {
        const result = createCode();
        expect(result).toHaveLength(config.discountCode.length);
    });

    it('Can create code with length = 1_000_000', async () => {
        const length = 1_000_000;
        const result = createCode(length);
        expect(result).toHaveLength(length);
    });

    it('Can NOT create code with length = 0', async () => {
        const length = 0;
        expect(() => {
            createCode(length);
        }).toThrow()
    });

    it('Can NOT create code with negative length', async () => {
        const length = -1;
        expect(() => {
            createCode(length);
        }).toThrow()
    });

    it('Default code contains just uppercase letters', async () => {
        const result = createCode();
        expect(result).toMatch(/^[A-Z]+$/);
    });
});
