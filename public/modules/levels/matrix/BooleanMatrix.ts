import { Matrix } from './Matrix';

/**
* The matrix implementation we'll use for the game functionality
*/

class BooleanMatrix extends Matrix<boolean> {
    constructor(rowCount: number, colCount: number) {
        super(rowCount, colCount);

        // Initialize to false
        this.clear();
    }

    clear() {
        this.iterate((row, column) => {
            this.setValueAt(row, column, false);
        });
    }
}