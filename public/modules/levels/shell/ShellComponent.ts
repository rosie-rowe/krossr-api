'use strict';

/** Enable us to share an instance of levelCtrl between the header & the level */

class ShellComponent implements angular.IComponentOptions {
    static $name = 'krossrShell';
    bindToController = true;
    controller = 'ShellController';
    controllerAs = 'shellCtrl';
    transclude = true;

    template = `
      <krossr-header data-level="level" class="header-container"></krossr-header>
      <section id="main-section" class="content">
        <section resize class="playble-area container valign-outer">
          <ng-transclude></ng-transclude>
        </section>
      </section> 
    `;

    constructor() {}
}

angular.module('levels').component(ShellComponent.$name, new ShellComponent());