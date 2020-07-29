import { injectable } from 'inversify';

@injectable()
export class SizeFormatter {
    formatSize(size: number) {
        return `${size}x${size}`;
    }
}
