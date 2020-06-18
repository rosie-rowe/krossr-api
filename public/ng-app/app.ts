import 'angular';
import 'angular-animate'
import './polyfills';
import  { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { UIRouter, UrlService } from '@uirouter/core';
import { NgZone } from '@angular/core';

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
    const urlService: UrlService = platformRef.injector.get(UIRouter).urlService;

    // TODO UIRouter error handling (401 signout and redirect?)
    function startUIRouter() {
        urlService.listen();
        urlService.sync();
    }

    platformRef.injector.get<NgZone>(NgZone).run(startUIRouter);
});