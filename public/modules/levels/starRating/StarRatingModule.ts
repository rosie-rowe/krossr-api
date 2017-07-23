import * as angular from 'angular';
import StarRatingComponent from './StarRatingComponent';
import StarRatingController from './StarRatingController';

export default angular
    .module('levels.starRating', [])
    .component('starRating', StarRatingComponent)
    .controller(StarRatingController.$name, StarRatingController)
    .name;