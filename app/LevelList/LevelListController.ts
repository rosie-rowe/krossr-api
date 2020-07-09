import { LevelListService } from './LevelListService';
import { ErrorHandler } from '../Error/ErrorHandler';
import { LevelListRequest } from './LevelListRequest';
import { LevelListLevelViewModelMapper } from './LevelListLevelViewModelMapper';
import { injectable, inject } from 'inversify';

@injectable()
export class LevelListController {
    constructor(
        @inject(ErrorHandler) private errorHandler: ErrorHandler,
        @inject(LevelListLevelViewModelMapper) private levelListMapper: LevelListLevelViewModelMapper,
        @inject(LevelListService) private levelListService: LevelListService
    ) {
    }

    public paginate = async (req: LevelListRequest, res) => {
        let query = req.query; // TODO
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
            return this.errorHandler.sendUnknownServerErrorResponse(res, err);
        }
    }
}
