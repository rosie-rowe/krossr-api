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

    public paginate = async (req: LevelListRequest, res) => {
        let query = req.query;
        query.numPerPage = '9';
        let numPerPage = parseInt(query.numPerPage, 10);

        try {
            let levels = await this.levelListService.getList(query);

            return res.jsonp({
                levels: levels.rows,
                count: levels.count,
                numPerPage
            });
        } catch (err) {
            return this.errorHandler.sendServerErrorResponse(res, this.errorHandler.getErrorMessage(err));
        }
    }
}
