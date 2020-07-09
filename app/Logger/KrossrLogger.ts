export interface KrossrLogger {
    verbose: boolean;
    info(message: string): void;
    error(message: string, err: any): void;
}
