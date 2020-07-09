import { KrossrLogger } from "./KrossrLogger";

export interface KrossrLoggerProvider {
    getLogger(): KrossrLogger;
    initialize(): void;
}
