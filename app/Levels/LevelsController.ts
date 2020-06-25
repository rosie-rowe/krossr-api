import { IKrossrDatabase } from "../database/IKrossrDatabase";

export class LevelsController {
    constructor(private db: IKrossrDatabase) {
    }

    /**
     * Create a Level
     */
    public create = (req, res) => {
        let Level = this.db.level;
        req.body.userId = req.user.id;

        Level.create(req.body).then(function(level) {
            if (!level) {
                return res.status(500).send({
                    message: 'There was a problem creating the level'
                });
            } else {
                return res.jsonp(level);
            }
        }).catch(function(err) {
            return res.status(500).send({
                message: errorHandler.getErrorMessage(err)
            });
        });
    };

    /**
     * Show the current Level. todo types
     */
    public read = (req, res) => {
        return res.jsonp(req.level);
    }
}