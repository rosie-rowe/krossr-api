import angular from 'angular';
import ShiftService from './ShiftService';

export default angular
    .module('levels.shiftService', [])
    .service(ShiftService.$name, ShiftService)
    .name;