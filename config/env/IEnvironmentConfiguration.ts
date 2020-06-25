import { IDatabaseConfiguration } from "./IDatabaseConfiguration";
import { IApplicationConfiguration } from "./IApplicationConfiguration";

export interface IEnvironmentConfiguration {
    app: IApplicationConfiguration;
    db: IDatabaseConfiguration;
    forceDbSync?: boolean;
    ipaddr?: string;
    port?: number;
    enableSequelizeLog: string;
    templateEngine?: string;
}