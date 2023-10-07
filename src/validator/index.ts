import _ from 'lodash';
import { Request, Response, NextFunction, ValidationSchema } from '@/types';
import { ILogger } from "../services/logger";
import { getErrorMessage, requestService } from '@/services';

class Validator {
    private logger: ILogger;
    readonly rules: object;

    constructor(logger: ILogger, rules: object) {
        this.logger = logger;
        this.rules = rules;
    }

    run(ruleKey: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const rule: ValidationSchema = _.get(this.rules, ruleKey);
                const params = requestService.getRequestParams(req);
                await rule.validateAsync(params);
                return next();
            } catch(e) {
                this.logger.error(e);
                res.status(400).json({
                    success: false,
                    message: `Invalid parameter: ${getErrorMessage(e)}`,
                })
            }
        }
    }
}

export default Validator;