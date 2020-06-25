import { IKrossrDatabase } from "../database/IKrossrDatabase"
import { LevelListService } from "./LevelListService";
import { LevelListQuery } from "./LevelListQuery";
import { ErrorHandler } from "../Error/errors.server.controller";

export class LevelListController {
    private errorHandler: ErrorHandler;
    private levelListService: LevelListService;

    constructor(db: IKrossrDatabase) {
        this.levelListService = new LevelListService(db);
        this.errorHandler = new ErrorHandler();
    }

    public paginate = (req, res) => {
        let query = req.query as LevelListQuery;
        let numPerPage = query.numPerPage = 9;

        this.levelListService.getList(req.query as LevelListQuery).then((levels) => {
            return res.jsonp({
                levels: levels.rows,
                count: levels.count,
                numPerPage: numPerPage
            });
        }).catch((err) => {
            return res.status(500).send({
                message: this.errorHandler.getErrorMessage(err)
            });
        });
    }

}