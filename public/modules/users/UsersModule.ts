import * as angular from 'angular';

import EditProfileModule from './editProfile/EditProfileModule';
import ForgotPasswordModule from './forgotPassword/ForgotPasswordModule';
import ResetPasswordModule from './resetPassword/ResetPasswordModule';
import SignInModule from './signIn/SignInModule';
import SignUpModule from './signUp/SignUpModule';
import UsersServiceModule from './usersService/UsersServiceModule';

import { errorHandler } from './config/ErrorHandler';
import { routing } from './config/RouteModule';

export default angular
    .module('users', [
        EditProfileModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        SignInModule,
        SignUpModule,
        UsersServiceModule
    ])
    .config(errorHandler)
    .config(routing)
    .name;