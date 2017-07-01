class GameMatrix {
    public horizontal: BooleanMatrix;
    public vertical: BooleanMatrix;

    constructor(layout: BooleanMatrix, initialize: boolean) {
        this.horizontal = new BooleanMatrix(layout.length, layout.length);

        if (initialize) {
            this.horizontal.copyFrom(layout);
        }

        this.vertical = this.horizontal.rotate();
    }
}