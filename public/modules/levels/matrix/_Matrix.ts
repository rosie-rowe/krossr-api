/// <reference path="../../core/equatable/IEquatable.d.ts" />

/**
 * Container for a 2D array
 * A lot of this still assumes all matrices are square. Will fix if ever necessary.
 */

class Matrix<T> implements IEquatable<Matrix<T>>{
    protected matrix: T[][];

    constructor(rowCount: number, colCount: number) {
        this.matrix = this.createMatrix(rowCount, colCount);
    }

    get length() {
        return this.matrix.length;
    }

    private createMatrix(rowCount: number, colCount: number): T[][] {
        let finalMatrix = [];

        for (let i = 0; i < rowCount; i++) {
            finalMatrix.push(new Array(colCount));
        }

        return finalMatrix;
    }

    copyFrom(source: Matrix<T>) {
        this.matrix = source.matrix;
    }

    /** Return a COPY of the current layout to preserve encapsulation -- you shouldn't be able to modify a matrix by normal means */
    getLayout() {
        return angular.copy(this.matrix);
    }

    equals(other: Matrix<T>) {
        return angular.equals(this.matrix, other.matrix);
    }

    initializeWith(values: T[][]) {
        this.matrix = values;
    }

    /* Perform the passed-in function on every cell of the matrix */
    iterate(fn: (row, column) => void) {
        let rowLen = this.matrix.length;

        for (let i = 0; i < rowLen; i++) {
            let columnLen = this.matrix[i].length;

            for (let j = 0; j < columnLen; j++) {
                fn(i, j);
            }
        }
    }

    clear() {
    }

    flatten() {
        return Array.prototype.concat.apply([], this.matrix);
    }

    /* Create a new matrix of equal size to the one passed in, and assign it to the original rotated 90 degrees */
    rotate() {
        let rotatedMatrix = new Matrix<T>(this.matrix.length, this.matrix.length);

        rotatedMatrix.iterate((row, column) => {
            let y = this.matrix.length - row - 1;
            let x = column;
    
            rotatedMatrix.setValueAt(column, row, this.matrix[y][x]);
        });
            
        return rotatedMatrix; 
    }

    getValueAt(row: number, column: number) {
        return this.matrix[row][column];
    }

    setValueAt(row: number, column: number, value: T) {
        this.matrix[row][column] = value;
    }
}