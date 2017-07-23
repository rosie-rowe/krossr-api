import * as angular from 'angular';
import EventService from './EventService';

export default angular
    .module('core.eventService', [])
    .service(EventService.$name, EventService)
    .name;