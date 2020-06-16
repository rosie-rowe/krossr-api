import { NgModule, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule, downgradeInjectable } from '@angular/upgrade/static';
import { ApplicationConfiguration } from '../modules/config';
import { application } from '../modules/AppModule';
import * as angular from 'angular';
import { TouchService } from './Touch/TouchService';
import { SideLengthService } from './SideLength/SideLengthService';

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
            SideLengthService,
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