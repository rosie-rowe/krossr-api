export class LevelsRoutes {
    static route($stateProvider: angular.ui.IStateProvider) {
        let levelTemplateUrl = 'modules/levels/level/index.html';
    
        $stateProvider
            .state('create-level', {
                url: '/level/new',
                templateUrl: levelTemplateUrl,
                params: {
                    mode: 'new'
                }
            })
            .state('level', {
                url: '/level/:levelId',
                templateUrl: levelTemplateUrl,
                params: {
                    mode: 'view'
                }
            })
            .state('update-level', {
                url: '/level/:levelId/edit',
                templateUrl: levelTemplateUrl,
                params: {
                    mode: 'edit'
                }
            });
    }
}