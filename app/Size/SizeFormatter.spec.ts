import jasmine from 'jasmine';
require('reflect-metadata');
import { SizeFormatter } from './SizeFormatter';

describe('SizeFormatter', () => {
    let sizeFormatter: SizeFormatter;

    beforeEach(() => {
        sizeFormatter = new SizeFormatter();
    });

    it('should format the size correctly', () => {
        let formatted = sizeFormatter.formatSize(5);
        expect(formatted).toEqual('5x5');
    });
});
