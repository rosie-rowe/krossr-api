import { NgModule, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { ApplicationConfiguration } from '../modules/config';
import { application } from '../modules/AppModule';

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
        this.upgrade.bootstrap(document.body, [ApplicationConfiguration.applicationModuleName], { strictDi: false });
    }
}