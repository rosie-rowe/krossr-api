/// <reference path="../../core/equatable/IEquatable.d.ts" />
/// <reference path="../Matrix/Matrix.ts" />

class GameMatrix implements IEquatable<GameMatrix> {
    public horizontal: BooleanMatrix;
    public vertical: BooleanMatrix;

    constructor(layout: BooleanMatrix, initialize: boolean) {
        this.horizontal = new BooleanMatrix(layout.length, layout.length);

        if (initialize) {
            this.horizontal.copyFrom(layout);
        }

        this.vertical = this.horizontal.rotate();
    }

    public equals(other: GameMatrix) {
        return this.horizontal.equals(other.horizontal);
    }

    public setValueAt(row: number, column: number, value: boolean) {
        this.horizontal.setValueAt(row, column, value);
        this.vertical = this.horizontal.rotate();
    }
}