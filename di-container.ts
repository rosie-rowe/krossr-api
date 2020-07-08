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

let DIContainer = new Container();
DIContainer.bind<ErrorHandler>(ErrorHandler).toSelf();
DIContainer.bind<LevelViewModelMapper>(LevelViewModelMapper).toSelf();
DIContainer.bind<LevelListLevelViewModelMapper>(LevelListLevelViewModelMapper).toSelf();
DIContainer.bind<LevelListService>(LevelListService).toSelf();

DIContainer.bind<LevelListController>(LevelListController).toSelf();
DIContainer.bind<LevelsController>(LevelsController).toSelf();
DIContainer.bind<RatingsController>(RatingsController).toSelf();
DIContainer.bind<LevelsMiddleware>(LevelsMiddleware).toSelf();
DIContainer.bind<UsersMiddleware>(UsersMiddleware).toSelf();

DIContainer.bind<LevelsRoutes>(LevelsRoutes).toSelf().inSingletonScope();

export default DIContainer;
