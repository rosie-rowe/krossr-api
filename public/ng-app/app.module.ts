import './angular-material-theme.scss';

import { HttpClientModule } from '@angular/common/http';
import { NgModule, DoBootstrap, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { UpgradeModule, downgradeInjectable, downgradeComponent } from '@angular/upgrade/static';
import { UIRouterUpgradeModule } from '@uirouter/angular-hybrid';
import { ApplicationConfiguration } from '../modules/config';
import { application } from '../modules/AppModule';
import * as angular from 'angular';
import { TouchService } from './Touch/TouchService';
import { SideLengthService } from './SideLength/SideLengthService';
import { TileService } from './Tile/TileService';
import { DragBoxService } from './DragBox/DragBoxService';
import { ShiftService } from './Shift/ShiftService';
import { LevelService } from './Level/LevelService';
import { TileSizeEventService } from './TileSize/TileSizeEventService';
import { TileSizeService } from './TileSize/TileSizeService';
import { GameSizeEventService } from './GameSize/GameSizeEventService';
import { GameSizeService } from './GameSize/GameSizeService';
import { Utils } from './Utils/Utils';
import { AuthenticationService } from './Authentication/AuthenticationService';
import { GameOverService } from './GameOver/GameOverService';
import { GameOverComponent } from './GameOver/GameOverComponent';
import { NumberLineComponent } from './NumberLine/NumberLineComponent';
import { NumberGridComponent } from './NumberGrid/NumberGridComponent';
import { StarRatingComponent } from './StarRating/StarRatingComponent';
import { ModeSelectorComponent } from './ModeSelector/ModeSelectorComponent';
import { TileComponent } from './Tile/TileComponent';
import { TileEventService } from './Tile/TileEventService';
import { GameComponent } from './Game/GameComponent';
import { LevelSelectComponent } from './LevelSelect/LevelSelectComponent';
import { HeaderComponent } from './Header/HeaderComponent';
import { PaginationComponent } from './Pagination/PaginationComponent';
import { RatingService } from './Rating/RatingService';
import { LoadingAnimationComponent } from './LoadingAnimation/LoadingAnimationComponent';
import { HelpComponent } from './Help/HelpComponent';
import { PopupContentComponent } from './PopupContent/PopupContentComponent';
import { EditProfileComponent } from './EditProfile/EditProfileComponent';
import { SignInComponent } from './SignIn/SignInComponent';
import { ForgotPasswordComponent } from './ForgotPassword/ForgotPasswordComponent';
import { ResetPasswordComponent } from './ResetPassword/ResetPasswordComponent';
import { SignUpComponent } from './SignUp/SignUpComponent';
import { ConfirmationComponent } from './Confirmation/ConfirmationComponent';
import { Routes } from './Routing/Routes';
import { StateProvider, UrlRouterProvider } from '@uirouter/angularjs';
import { ChangePasswordComponent } from './ChangePassword/ChangePasswordComponent';
import { UpdateUserComponent } from './User/UpdateUserComponent';
import { LevelComponent } from './Level/LevelComponent';
import { ShellComponent } from './Shell/ShellComponent';
import { ResizeDirective } from './Resize/ResizeDirective';
import { GameResizeService } from './GameSize/GameResizeService';
import { HomeComponent } from './Home/HomeComponent';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        MatDialogModule,
        ReactiveFormsModule,
        UpgradeModule,
        UIRouterUpgradeModule.forRoot()
    ],
    declarations: [
        ChangePasswordComponent,
        ConfirmationComponent,
        EditProfileComponent,
        ForgotPasswordComponent,
        GameComponent,
        GameOverComponent,
        HomeComponent,
        LevelComponent,
        HeaderComponent,
        HelpComponent,
        LoadingAnimationComponent,
        LevelSelectComponent,
        ModeSelectorComponent,
        NumberGridComponent,
        NumberLineComponent,
        PaginationComponent,
        PopupContentComponent,
        ResetPasswordComponent,
        ResizeDirective,
        ShellComponent,
        SignInComponent,
        SignUpComponent,
        StarRatingComponent,
        TileComponent,
        UpdateUserComponent,
    ],
    entryComponents: [
        ChangePasswordComponent,
        ConfirmationComponent,
        EditProfileComponent,
        ForgotPasswordComponent,
        GameComponent,
        GameOverComponent,
        HomeComponent,
        LevelComponent,
        HeaderComponent,
        HelpComponent,
        LoadingAnimationComponent,
        LevelSelectComponent,
        ModeSelectorComponent,
        NumberGridComponent,
        NumberLineComponent,
        PaginationComponent,
        PopupContentComponent,
        ResetPasswordComponent,
        ShellComponent,
        SignInComponent,
        SignUpComponent,
        StarRatingComponent,
        TileComponent,
        UpdateUserComponent
    ],
    providers: [
        { provide: 'window', useValue: window }
    ]
})
export class AppModule implements DoBootstrap {
    constructor(
        private upgrade: UpgradeModule,
        private gameResizeService: GameResizeService
    ) {
        console.log('Angular is running!');
        this.gameResizeService.initialize();
    }

    ngDoBootstrap() {
        application();

        this.registerRoutes();

        this.downgradeComponents([
            ForgotPasswordComponent,
            GameComponent,
            HeaderComponent,
            HomeComponent,
            LevelComponent,
            LoadingAnimationComponent,
            ModeSelectorComponent,
            NumberGridComponent,
            NumberLineComponent,
            ResetPasswordComponent,
            ShellComponent,
            StarRatingComponent,
            TileComponent
        ]);

        this.downgradeServices([
            AuthenticationService,
            DragBoxService,
            GameOverService,
            GameSizeService,
            GameSizeEventService,
            LevelService,
            RatingService,
            SideLengthService,
            ShiftService,
            TileEventService,
            TileService,
            TileSizeService,
            TileSizeEventService,
            TouchService,
            Utils
        ]);

        this.upgrade.bootstrap(document.body, [ApplicationConfiguration.applicationModuleName], { strictDi: true });
    }

    private registerRoutes() {
        let ng1Routes = Routes.getNg1Routes();

        angular.module(ApplicationConfiguration.applicationModuleName).config(['$stateProvider', '$urlRouterProvider', ($stateProvider: StateProvider, $urlRouterProvider: UrlRouterProvider) => {
            // Redirect to home view when route not found
            $urlRouterProvider.otherwise('/');
            
            Object.keys(ng1Routes).forEach(key => {
                $stateProvider.state(key, ng1Routes[key]);
            })
        }]);
    }

    private downgradeComponents(components: AugmentedType<any>[]) {
        components.forEach(component => {
            angular.module(ApplicationConfiguration.applicationModuleName).directive(component.$name, downgradeComponent({ component: component }));
        })
    }

    private downgradeServices(services: AugmentedType<any>[]) {
        services.forEach(service => {
            angular.module(ApplicationConfiguration.applicationModuleName).service(service.$name, downgradeInjectable(service));
        })
    }
}

interface AugmentedType<T> extends Type<T> {
    $name: string;
}