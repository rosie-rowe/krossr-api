class GameMatrix {
    public horizontal: BooleanMatrix;
    public vertical: BooleanMatrix;

    constructor(layout: boolean[][], initialize: boolean) {
        this.horizontal = new BooleanMatrix(layout.length, layout.length);

        if (initialize) {
            this.horizontal.initializeWith(layout);
        }

        this.vertical = this.horizontal.rotate();
    }
}