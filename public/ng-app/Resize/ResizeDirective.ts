import { debounce } from '../Debounce/Debounce';
import { Inject, Directive, OnInit } from '@angular/core';
import { ResizeEventService } from './ResizeEventService';

@Directive({
    selector: '[krossrResize]'
})
export class ResizeDirective implements OnInit {
    constructor(
        @Inject('window') private window: any,
        private resizeEventService: ResizeEventService
    ) {
    }

    public ngOnInit() {
        let resizeFn = debounce(() => {
            this.resizeEventService.windowResized.emit();
        });

        this.window.addEventListener('resize', () => {
            resizeFn.next();
        });
    }
}