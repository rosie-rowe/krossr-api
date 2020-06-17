/** Enable us to share an instance of levelCtrl between the header & the level */

export class ShellComponent implements angular.IComponentOptions {
    static $name = 'krossrShell';
    bindToController = true;
    controller = 'ShellController';
    controllerAs = 'shellCtrl';
    transclude = true;

    template = `
      <krossr-header></krossr-header>
      <section id="main-section" class="content" resize>
        <ng-transclude></ng-transclude>
      </section> 
    `;

    constructor() {}
}