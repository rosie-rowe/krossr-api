import angular from 'angular';
import StarRatingComponent from './StarRatingComponent';
import StarRatingController from './StarRatingController';

export default angular
    .module('levels.starRating', [])
    .component(StarRatingComponent.$name, new StarRatingComponent())
    .controller(StarRatingController.$name, StarRatingController)
    .name;