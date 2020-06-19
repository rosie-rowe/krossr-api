import { Ng1StateDeclaration } from "@uirouter/angularjs";
import { Ng2StateDeclaration } from "@uirouter/angular";
import { HomeComponent } from "../Home/HomeComponent";

export class Routes {
    static getNg1Routes(): { [name: string]: Ng1StateDeclaration } {
        return {
            /** Password */
            'reset-invalid': {
                url: '/password/reset/invalid',
                params: {
                    invalid: true
                },
                template: (params) => `<forgot-password invalid="${params.invalid}"></forgot-password>`
            },
            'reset': {
                url: '/password/reset/:token',
                template: (params) => `<reset-password token="${params.token}"></reset-password>`
            },
            /** Levels */
            'create-level': {
                url: '/level/new',
                template: (params) => `<level mode="new">`
            },
            'level': {
                url: '/level/:levelId',
                template: (params) => {
                    return `<level level-id="${params.levelId}" mode="view">`
                }
            },
            'update-level': {
                url: '/level/:levelId/edit',
                template: (params) => `<level level-id="${params.levelId}" mode="edit">`
            }
        }
    }

    static getNg2Routes(): Ng2StateDeclaration[] {
        return [
            {
                name: 'home',
                url: '/',
                component: HomeComponent
            }
        ];
    }
}