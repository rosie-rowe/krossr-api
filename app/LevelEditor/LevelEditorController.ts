import { injectable, inject } from "inversify";
import { LevelEditorService } from "./LevelEditorService";
import { Response } from "express";
import { KrossrRequest } from "../KrossrRequest/KrossrRequest";

@injectable()
export class LevelEditorController {
    constructor(
        @inject(LevelEditorService) private levelEditorService: LevelEditorService
    ) {
    }

    getOptions = (req: KrossrRequest, res: Response) => {
        let options = this.levelEditorService.getOptions();
        res.jsonp(options);
    }
}
