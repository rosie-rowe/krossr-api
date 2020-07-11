import { injectable, inject } from "inversify";
import { LevelEditorService } from "./LevelEditorService";
import { Response } from "express";

@injectable()
export class LevelEditorController {
    constructor(
        @inject(LevelEditorService) private levelEditorService: LevelEditorService
    ) {
    }

    getOptions = (req, res: Response) => {
        let options = this.levelEditorService.getOptions();
        res.jsonp(options);
    }
}
