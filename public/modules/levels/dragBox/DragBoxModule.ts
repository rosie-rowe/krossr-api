import * as angular from 'angular';
import { DragBoxService } from './DragBoxService';

export default angular
    .module('levels.dragBox', [])
    .service(DragBoxService.$name, DragBoxService)
    .name;