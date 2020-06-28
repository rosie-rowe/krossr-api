import { Level } from '../models/LevelModel';
import { IncludeOptions } from 'sequelize/types';

export class LevelsMiddleware {
    public hasAuthorization = (req, res, next) => {
        if (req.level.userId !== req.user.id) {
            return res.status(403).send('User is not authorized');
        }

        next();
    }

    public levelByID = (req, res, next, id) => {
        let user = req.user;

        let include = user ?
            [
                {
                    association: Level.associations.ratings,
                    attributes: ['rating'],
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
