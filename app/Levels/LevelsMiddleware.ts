import { IKrossrDatabase } from "../database/IKrossrDatabase";

export class LevelsMiddleware {
    constructor(
        private db: IKrossrDatabase
    ) {
    }

    public hasAuthorization = (req, res, next) => {
        if (req.level.userId !== req.user.id) {
            return res.status(403).send('User is not authorized');
        }

        next();
    }

    public levelByID = (req, res, next, id) => {
        let Level = this.db.level;
        let Rating = this.db.rating;
        var user = req.user;

        var include = user ?
            [
                {
                    attributes: ['rating'],
                    model: Rating,
                    required: false,
                    where: {
                        userId: user.id
                    }
                }
            ] : null;

        Level
            .findOne({
                include: include,
                where: {
                    id: id
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