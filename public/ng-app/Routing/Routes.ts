import { Ng1StateDeclaration } from "@uirouter/angularjs";

export class Routes {
    private static levelTemplateUrl = 'modules/levels/level/index.html';

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
                templateUrl: this.levelTemplateUrl,
                params: {
                    mode: 'new'
                }
            },
            'level': {
                url: '/level/:levelId',
                templateUrl: this.levelTemplateUrl,
                params: {
                    mode: 'view'
                }
            },
            'update-level': {
                url: '/level/:levelId/edit',
                templateUrl: this.levelTemplateUrl,
                params: {
                    mode: 'edit'
                }
            }
        }
    }
}