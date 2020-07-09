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
import { ChangePasswordController } from './app/Users/ChangePasswordController';
import { ForgotPasswordController } from './app/Users/ForgotPasswordController';
import { ResetPasswordController } from './app/Users/ResetPasswordController';
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

let DIContainer = new Container();
DIContainer.bind<ErrorHandler>(ErrorHandler).toSelf();

DIContainer.bind<LevelViewModelMapper>(LevelViewModelMapper).toSelf();
DIContainer.bind<LevelListLevelViewModelMapper>(LevelListLevelViewModelMapper).toSelf();

DIContainer.bind<UserViewModelMapper>(UserViewModelMapper).toSelf();

DIContainer.bind<LevelService>(LevelService).toSelf();
DIContainer.bind<LevelListService>(LevelListService).toSelf();
DIContainer.bind<MailerService>(MailerService).toSelf();

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

DIContainer.bind<ExpressConfiguration>(ExpressConfiguration).toSelf().inSingletonScope();
DIContainer.bind<SequelizeConfiguration>(SequelizeConfiguration).toSelf().inSingletonScope();

export default DIContainer;
