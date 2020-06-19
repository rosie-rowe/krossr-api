import { Ng2StateDeclaration, Transition } from "@uirouter/angular";
import { HomeComponent } from "../Home/HomeComponent";
import { LevelComponent } from "../Level/LevelComponent";
import { ForgotPasswordComponent } from "../ForgotPassword/ForgotPasswordComponent";
import { ResetPasswordComponent } from "../ResetPassword/ResetPasswordComponent";

export class Routes {
    static getNg2Routes(): Ng2StateDeclaration[] {
        return [
            {
                name: 'home',
                url: '/',
                component: HomeComponent
            },
            /** Level */
            {
                name: 'create-level',
                url: '/level/new',
                component: LevelComponent,
                resolve: [
                    { provide: 'mode', useFactory: () => 'new' }
                ]
            },
            {
                name: 'level',
                url: '/level/:levelId',
                component: LevelComponent,
                resolve: [
                    { provide: 'mode', useFactory: () => 'view' },
                    {
                        token: 'levelId',
                        deps: [Transition],
                        resolveFn: (trans) => {
                            return trans.params().levelId;
                        }
                    }
                ]
            },
            {
                name: 'update-level',
                url: '/level/:levelId/edit',
                component: LevelComponent,
                resolve: [
                    { provide: 'mode', useFactory: () => 'edit' },
                    {
                        token: 'levelId',
                        deps: [Transition],
                        resolveFn: (trans) => {
                            return trans.params().levelId;
                        }
                    }
                ]
            },
            /** Password */
            {
                name: 'reset-invalid',
                url: '/password/reset/invalid',
                component: ForgotPasswordComponent,
                resolve: [
                    { provide: 'invalid', useFactory: () => true }
                ]
            },
            {
                name: 'reset',
                url: '/password/reset/:token',
                component: ResetPasswordComponent,
                resolve: [
                    {
                        token: 'token',
                        deps: [Transition],
                        resolveFn: (trans) => trans.params().token
                    }
                ]
            },
        ];
    }
}