import * as angular from 'angular';
import { PopupContentComponent } from './PopupContentComponent';

export default angular
    .module('core.popupContent', [])
    .component(PopupContentComponent.$name, new PopupContentComponent())
    .name;