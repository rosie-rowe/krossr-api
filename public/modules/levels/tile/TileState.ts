export enum TileState {
    empty, // blank, default state
    pending, // translucent overlay, for dragging & selecting multiple
    marked, // x'd out, for marking that the tile is known not to be correct
    selected // colored in, for marking that the tile is correct
}