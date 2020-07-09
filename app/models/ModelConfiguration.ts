export interface ModelConfiguration<T> {
    configure(db: T): void;
}
