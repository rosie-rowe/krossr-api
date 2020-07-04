import { LevelListService } from './LevelListService';
import { ErrorHandler } from '../Error/ErrorHandler';
import { LevelListRequest } from './LevelListRequest';
import { LevelListLevelViewModelMapper } from './LevelListLevelViewModelMapper';

export class LevelListController {
    private levelListService: LevelListService;

    constructor(
        private errorHandler: ErrorHandler,
        private levelListMapper: LevelListLevelViewModelMapper
    ) {
        this.levelListService = new LevelListService();
    }

    public paginate = async (req: LevelListRequest, res) => {
        let query = req.query;
        query.numPerPage = '9';
        let numPerPage = parseInt(query.numPerPage, 10);

        try {
            let levels = await this.levelListService.getList(query);

            let rows = levels.rows.map(level => this.levelListMapper.toViewModel(level));

            return res.jsonp({
                levels: rows,
                count: levels.count,
                numPerPage
            });
        } catch (err) {
            return this.errorHandler.sendServerErrorResponse(res, this.errorHandler.getErrorMessage(err));
        }
    }
}
