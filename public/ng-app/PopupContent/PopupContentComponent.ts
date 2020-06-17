import { Component } from "@angular/core";
import { template } from "lodash";

@Component({
    selector: 'popup-content',
    styles: [require('./PopupContentStyles.less')],
    template: require('./PopupContentView.html')
})
export class PopupContentComponent {
}