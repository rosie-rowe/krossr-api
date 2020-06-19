import { Component } from "@angular/core";

@Component({
    selector: 'home',
    template: require('./HomeView.html')
})
export class HomeComponent {
    public static $name = 'home'
}