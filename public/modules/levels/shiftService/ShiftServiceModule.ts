import * as angular from 'angular';
import ShiftService from './ShiftService';

export default angular
    .module('levels.shiftService', [])
    .service('shiftService', ShiftService)
    .name;