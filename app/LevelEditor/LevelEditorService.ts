import { LevelEditorSelectOptionsViewModel, Dictionary } from '@krossr/types';
import { SizeOptions } from '../Size/SizeOptions';
import { inject, injectable } from 'inversify';
import { SizeFormatter } from '../Size/SizeFormatter';

@injectable()
export class LevelEditorService {
    constructor(
        @inject(SizeFormatter) private sizeFormatter: SizeFormatter
    ) {
    }

    public getOptions(): LevelEditorSelectOptionsViewModel {
        let sizeOptions = {};

        SizeOptions.Options.forEach(option => {
            // sizes in sizeOptions are per-side, but the editor needs to know the total number
            // this assumes square matrices, as most of the app does
            sizeOptions[this.sizeFormatter.formatSize(option)] = Math.pow(option, 2);
        });

        return { sizeOptions };
    }
}
