import { createDb } from './helpers/createDb';
import { dropDb } from './helpers/dropDb';
import { fillDb } from './helpers/fillDb';

export default async () => {
    await dropDb();
    await createDb();
    await fillDb();
}