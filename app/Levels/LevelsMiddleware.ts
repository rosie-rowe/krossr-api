import { Level } from '../models/LevelModel';
import { IncludeOptions } from 'sequelize/types';
import { ErrorHandler } from '../Error/ErrorHandler';
import { injectable, inject } from 'inversify';

@injectable()
export class LevelsMiddleware {
    constructor(
        @inject(ErrorHandler) private errorHandler: ErrorHandler
    ) {
    }

    public hasAuthorization = (req, res, next) => {
        if (req.level.userId !== req.user.id) {
            return this.errorHandler.sendForbiddenErrorResponse(res);
        }

        next();
    }

    public levelByID = (req, res, next, id) => {
        let user = req.user;

        let include = user ?
            [
                {
                    association: Level.associations.ratings,
                    attributes: ['rating', 'userId'],
                    required: false,
                    where: {
                        userId: user.id
                    }
                } as IncludeOptions
            ] : null;

        Level.findOne({
            include,
            where: {
                id
            }
        }).then((level) => {
            if (!level) {
                return next(new Error('Failed to load level ' + id));
            } else {
                req.level = level;
                return next();
            }
        });
    }
}
