export interface ILevel {
    currentView: 'edit' | 'new' | 'view';
    id?;
    name: string;
    ratings?;
    ready: boolean;
    layout?: Boolean[][];
    size: number;
    yourRating?;
}