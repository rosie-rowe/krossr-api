export interface ILevel {
    currentView: 'edit' | 'new' | 'view';
    id?;
    name: string;
    ratings?;
    ready: boolean;
    won?: boolean;
    layout?: Boolean[][];
    yourRating?;
}