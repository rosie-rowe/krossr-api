import { IDatabaseConfiguration } from "./IDatabaseConfiguration";
import { IApplicationConfiguration } from "./IApplicationConfiguration";

export interface IEnvironmentConfiguration {
    app: IApplicationConfiguration;
    db: IDatabaseConfiguration;
    forceDbSync?: string;
    enableSequelizeLog: string;
}