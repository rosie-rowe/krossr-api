import ShellController from './ShellController';

'use strict';

/** Enable us to share an instance of levelCtrl between the header & the level */

export default function() {
    return {
        bindToController: true,
        controller: ShellController,
        controllerAs: ShellController.$controllerAs,
        transclude: true,
        template: `
          <krossr-header data-level="level" class="header-container"></krossr-header>
          <section id="main-section" class="content">
            <section resize class="playble-area container valign-outer">
              <ng-transclude></ng-transclude>
            </section>
          </section> 
        `
    }
}