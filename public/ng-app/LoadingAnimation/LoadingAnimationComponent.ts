import { Component, Input } from "@angular/core";

@Component({
    selector: 'loading-animation',
    styles: [require('./LoadingAnimationStyles.less')],
    template: require('./LoadingAnimationView.html')
})
export class LoadingAnimationComponent {
    static $name = 'loadingAnimation';

    @Input() public condition: boolean;
}