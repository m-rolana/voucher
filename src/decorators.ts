/* eslint-disable @typescript-eslint/no-explicit-any */
import { CatchErrorParams } from '@/types';
import { logger, InternalError, SystemError } from '@/services';

const toLogDefault = true;
const toThrowDefault = true;

function CatchError(opts: CatchErrorParams = { message: 'Something went wrong.', toLog: toLogDefault, toThrow: toThrowDefault }) {
    if (opts.toLog === undefined) {
        opts.toLog = toLogDefault;
    }

    if (opts.toThrow === undefined) {
        opts.toThrow = toThrowDefault;
    }

    return (
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
    ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
        const oldValue = descriptor.value;
        descriptor.value = async (...args) => {
            try {
                oldValue && (await oldValue.bind(target)(...args));
            } catch (e) {
                if (opts.toLog) logger.error(e);

                const next = args[2].name === 'next' ? args[2] : null;
                if (opts.toThrow && next) {
                    const error = e instanceof SystemError ? e : new InternalError(opts.message);
                    return next(error);
                }
                throw e;
            }
        };
    };
}

export { CatchError };
