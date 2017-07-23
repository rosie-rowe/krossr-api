import * as angular from 'angular';
import SideLengthService from './SideLengthService';

export default angular
    .module('levels.sideLengthService', [])
    .service(SideLengthService.$name, SideLengthService)
    .name;