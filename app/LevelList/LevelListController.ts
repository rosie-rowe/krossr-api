import { IKrossrDatabase } from "../Database/IKrossrDatabase"
import { LevelListService } from "./LevelListService";
import { LevelListQuery } from "./LevelListQuery";
import { ErrorHandler } from "../Error/ErrorHandler";

export class LevelListController {
    private levelListService: LevelListService;

    constructor(
        db: IKrossrDatabase,
        private errorHandler: ErrorHandler
    ) {
        this.levelListService = new LevelListService(db);
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