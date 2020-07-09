// this file should ONLY be imported into server.ts

import { Container } from 'inversify';
import { ErrorHandler } from './app/Error/ErrorHandler';
import { LevelListLevelViewModelMapper } from './app/LevelList/LevelListLevelViewModelMapper';
import { LevelViewModelMapper } from './app/Levels/LevelViewModelMapper';
import { LevelListService } from './app/LevelList/LevelListService';
import { LevelListController } from './app/LevelList/LevelListController';
import { RatingsController } from './app/Ratings/RatingsController';
import { LevelsMiddleware } from './app/Levels/LevelsMiddleware';
import { LevelsRoutes } from './app/Routes/LevelsRoutes';
import { LevelsController } from './app/Levels/LevelsController';
import { UsersMiddleware } from './app/Users/UsersMiddleware';
import { UserViewModelMapper } from './app/Users/UserViewModelMapper';
import { MailerService } from './app/Mailer/MailerService';
import { SignOutController } from './app/Users/SignOutController';
import { UserProfileController } from './app/Users/UserProfileController';
import { SignInController } from './app/Users/SignInController';
import { SignUpController } from './app/Users/SignUpController';
import { ChangePasswordController } from './app/ChangePassword/ChangePasswordController';
import { ForgotPasswordController } from './app/ForgotPassword/ForgotPasswordController';
import { ResetPasswordController } from './app/ResetPassword/ResetPasswordController';
import { UsersRoutes } from './app/Routes/UsersRoutes';
import { ExpressConfiguration } from './config/expressConfig';
import { RouteConfiguration } from './app/Routes/RouteConfiguration';
import { RouteSymbols } from './app/routes/RouteSymbols';
import { LevelService } from './app/Levels/LevelService';
import { ModelConfiguration } from './app/models/ModelConfiguration';
import { Sequelize } from 'sequelize/types';
import { ModelSymbols } from './app/models/ModelSymbols';
import { LevelConfiguration } from './app/models/LevelModel';
import { RatingConfiguration } from './app/models/RatingModel';
import { UserConfiguration } from './app/models/UserModel';
import { SequelizeConfiguration } from './config/sequelizeConfig';
import { AuthenticationStrategy } from './config/strategies/AuthenticationStrategy';
import { AuthenticationStrategySymbols } from './config/strategies/AuthenticationStrategySymbols';
import { LocalPassportStrategy } from './config/strategies/LocalPassportStrategy';
import { PassportConfiguration } from './config/passportConfig';
import { EnvironmentConfiguration } from './config/config';
import { EnvironmentConfigurationDefaults } from './config/env/all';
import { KrossrLoggerProvider } from './app/Logger/KrossrLoggerProvider';
import { LoggerSymbols } from './app/Logger/LoggerSymbols';
import { WinstonConfiguration } from './config/winston';
import { RatingsService } from './app/Ratings/RatingsService';

let DIContainer = new Container();
DIContainer.bind<ErrorHandler>(ErrorHandler).toSelf();

DIContainer.bind<LevelViewModelMapper>(LevelViewModelMapper).toSelf();
DIContainer.bind<LevelListLevelViewModelMapper>(LevelListLevelViewModelMapper).toSelf();

DIContainer.bind<UserViewModelMapper>(UserViewModelMapper).toSelf();

DIContainer.bind<LevelService>(LevelService).toSelf();
DIContainer.bind<LevelListService>(LevelListService).toSelf();
DIContainer.bind<MailerService>(MailerService).toSelf();
DIContainer.bind<RatingsService>(RatingsService).toSelf();

DIContainer.bind<LevelListController>(LevelListController).toSelf();
DIContainer.bind<LevelsController>(LevelsController).toSelf();
DIContainer.bind<RatingsController>(RatingsController).toSelf();

DIContainer.bind<ChangePasswordController>(ChangePasswordController).toSelf();
DIContainer.bind<ForgotPasswordController>(ForgotPasswordController).toSelf();
DIContainer.bind<ResetPasswordController>(ResetPasswordController).toSelf();
DIContainer.bind<SignInController>(SignInController).toSelf();
DIContainer.bind<SignOutController>(SignOutController).toSelf();
DIContainer.bind<SignUpController>(SignUpController).toSelf();
DIContainer.bind<UserProfileController>(UserProfileController).toSelf();

DIContainer.bind<LevelsMiddleware>(LevelsMiddleware).toSelf();
DIContainer.bind<UsersMiddleware>(UsersMiddleware).toSelf();

/** order */
DIContainer.bind<ModelConfiguration<Sequelize>>(ModelSymbols.ModelConfiguration).to(RatingConfiguration);
DIContainer.bind<ModelConfiguration<Sequelize>>(ModelSymbols.ModelConfiguration).to(UserConfiguration);
DIContainer.bind<ModelConfiguration<Sequelize>>(ModelSymbols.ModelConfiguration).to(LevelConfiguration);
/** is important */

DIContainer.bind<RouteConfiguration>(RouteSymbols.RouteConfiguration).to(LevelsRoutes).inSingletonScope();
DIContainer.bind<RouteConfiguration>(RouteSymbols.RouteConfiguration).to(UsersRoutes).inSingletonScope();

DIContainer.bind<AuthenticationStrategy>(AuthenticationStrategySymbols.AuthenticationStrategy).to(LocalPassportStrategy);

DIContainer.bind<EnvironmentConfigurationDefaults>(EnvironmentConfigurationDefaults).toSelf();

DIContainer.bind<KrossrLoggerProvider>(LoggerSymbols.KrossrLogger).to(WinstonConfiguration).inSingletonScope();

DIContainer.bind<EnvironmentConfiguration>(EnvironmentConfiguration).toSelf().inSingletonScope();

DIContainer.bind<ExpressConfiguration>(ExpressConfiguration).toSelf().inSingletonScope();
DIContainer.bind<PassportConfiguration>(PassportConfiguration).toSelf().inSingletonScope();
DIContainer.bind<SequelizeConfiguration>(SequelizeConfiguration).toSelf().inSingletonScope();

export default DIContainer;
