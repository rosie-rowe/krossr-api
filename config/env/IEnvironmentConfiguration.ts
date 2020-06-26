import { IDatabaseConfiguration } from "./IDatabaseConfiguration";
import { IApplicationConfiguration } from "./IApplicationConfiguration";
import { IMailerOptions } from "./IMailerOptions";

export interface IEnvironmentConfiguration {
    app: IApplicationConfiguration;
    db: IDatabaseConfiguration;
    forceDbSync?: boolean;
    mailer?: IMailerOptions;
    ipaddr?: string;
    port?: number;
    enableSequelizeLog: string;
    templateEngine?: string;
}