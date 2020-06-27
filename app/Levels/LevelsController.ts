import { IKrossrDatabase } from "../Database/IKrossrDatabase";
import { ErrorHandler } from "../Error/ErrorHandler";

export class LevelsController {
    constructor(
        private db: IKrossrDatabase,
        private errorHandler: ErrorHandler
    ) {
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
                message: this.errorHandler.getErrorMessage(err)
            });
        });
    };

    /**
     * Delete a Level
     */
    public delete = (req, res) => {
        var level = req.level;

        level.destroy().then(function() {
            return res.jsonp(level);
        }).catch(function(err) {
            return res.status(500).send({
                message: this.errorHandler.getErrorMessage(err)
            });
        });
    }

    /**
     * Show the current Level. todo types
     */
    public read = (req, res) => {
        return res.jsonp(req.level);
    }

    public update = (req, res) => {
        var level = req.level;

        return level.update({
            name: req.body.name,
            layout: req.body.layout,
            size: req.body.size
        }).then(level => {
            return res.jsonp(level);
        }).catch(err => {
            return res.status(500).send({
                message: this.errorHandler.getErrorMessage(err)
            });
        });
    }
}