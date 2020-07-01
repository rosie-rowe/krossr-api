import { LevelListService } from './LevelListService';
import { ErrorHandler } from '../Error/ErrorHandler';
import { LevelListRequest } from './LevelListRequest';

export class LevelListController {
    private levelListService: LevelListService;

    constructor(
        private errorHandler: ErrorHandler
    ) {
        this.levelListService = new LevelListService();
    }

    public paginate = (req: LevelListRequest, res) => {
        let query = req.query;
        query.numPerPage = '9';
        let numPerPage = parseInt(query.numPerPage, 10);

        this.levelListService.getList(query).then((levels) => {
            return res.jsonp({
                levels: levels.rows,
                count: levels.count,
                numPerPage
            });
        }).catch((err) => {
            return res.status(500).send({
                message: this.errorHandler.getErrorMessage(err)
            });
        });
    }

}
