import { NgModule, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule
    ]
})
export class AppModule implements DoBootstrap {
    constructor(private upgrade: UpgradeModule) {
        console.log('Angular is running!');
    }

    ngDoBootstrap() {
        application();

        this.downgradeServices([
            DragBoxService,
            GameSizeEventService,
            LevelService,
            SideLengthService,
            ShiftService,
            TileService,
            TileSizeService,
            TileSizeEventService,
            TouchService
        ]);

        this.upgrade.bootstrap(document.body, [ApplicationConfiguration.applicationModuleName], { strictDi: false });
    }

    private downgradeServices(services: any[]) {
        services.forEach(service => {
            angular.module(ApplicationConfiguration.applicationModuleName).service(service.$name, downgradeInjectable(service));
        })
    }
}