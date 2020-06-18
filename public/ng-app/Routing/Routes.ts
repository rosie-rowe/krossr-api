import { Ng1StateDeclaration } from "@uirouter/angularjs";

export class Routes {
    static getNg1Routes(): { [name: string]: Ng1StateDeclaration } {
        return {
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
            }
        }
    }
}