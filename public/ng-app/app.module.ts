import './angular-material-theme.scss';

import { NgModule, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { UpgradeModule, downgradeInjectable } from '@angular/upgrade/static';
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

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        MatDialogModule,
        UpgradeModule
    ],
    declarations: [
        GameOverComponent,
    ],
    entryComponents: [
        GameOverComponent
    ],
    providers: [
        { provide: 'window', useValue: window }
    ]
})
export class AppModule implements DoBootstrap {
    constructor(private upgrade: UpgradeModule) {
        console.log('Angular is running!');
    }

    ngDoBootstrap() {
        application();

        this.downgradeServices([
            AuthenticationService,
            DragBoxService,
            GameOverService,
            GameSizeService,
            GameSizeEventService,
            LevelService,
            SideLengthService,
            ShiftService,
            TileService,
            TileSizeService,
            TileSizeEventService,
            TouchService,
            Utils
        ]);

        this.upgrade.bootstrap(document.body, [ApplicationConfiguration.applicationModuleName], { strictDi: true });
    }

    private downgradeServices(services: any[]) {
        services.forEach(service => {
            angular.module(ApplicationConfiguration.applicationModuleName).service(service.$name, downgradeInjectable(service));
        })
    }
}