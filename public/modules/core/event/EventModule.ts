import angular from 'angular';
import EventService from './EventService';

export default angular
    .module('core.event')
    .service(EventService.$name, EventService)
    .name;