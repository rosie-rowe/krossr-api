import angular from 'angular';
import EditProfileComponent from './EditProfileComponent';
import EditProfileController from './EditProfileController';

export default angular
    .module('users.editProfile', [])
    .component(EditProfileComponent.$name, new EditProfileComponent())
    .controller(EditProfileController.$name, EditProfileController)
    .name;