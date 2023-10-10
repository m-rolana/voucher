import _ from 'lodash';
import { Request, Response, NextFunction, ValidationSchema, Middleware } from '@/types';
import { ILogger } from '../services/logger';
import { requestService } from '@/services';
import { BadRequestError } from '@/services/error';

class Validator {
    private logger: ILogger;
    private readonly rules: object;

    constructor(logger: ILogger, rules: object) {
        this.logger = logger;
        this.rules = rules;
    }

    run(ruleKey: string): Middleware {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const rule: ValidationSchema = _.get(this.rules, ruleKey);
                const params = requestService.getRequestParams(req);
                await rule.validateAsync(params);
                return next();
            } catch (e) {
                this.logger.error(e);
                return next(new BadRequestError(`Invalid parameter: ${(e as Error).message}`));
            }
        };
    }
}

export default Validator;
