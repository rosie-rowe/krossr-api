import { LevelListService } from './LevelListService';
import { ErrorHandler } from '../Error/ErrorHandler';
import { LevelListLevelViewModelMapper } from './LevelListLevelViewModelMapper';
import { injectable, inject } from 'inversify';
import { KrossrRequest } from '../KrossrRequest/KrossrRequest';
import { Response } from 'express';
import { LevelListRequest } from './LevelListRequest';

@injectable()
export class LevelListController {
    constructor(
        @inject(ErrorHandler) private errorHandler: ErrorHandler,
        @inject(LevelListLevelViewModelMapper) private levelListMapper: LevelListLevelViewModelMapper,
        @inject(LevelListService) private levelListService: LevelListService,
    ) {
    }

    public getOptions = async (req: KrossrRequest, res: Response) => {
        let options = this.levelListService.getOptions();
        res.jsonp(options);
    }

    public paginate = async (req: LevelListRequest, res: Response) => {
        let query = req.query;
        query.numPerPage = '9';
        let numPerPage = parseInt(query.numPerPage, 10);

        try {
            let levels = await this.levelListService.getList(query);
            let rows = await Promise.all(levels.rows.map(level => this.levelListMapper.toViewModel(level)));

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
