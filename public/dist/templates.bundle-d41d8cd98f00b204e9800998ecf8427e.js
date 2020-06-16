angular.module('templates-main', ['modules/core/confirmation/ConfirmationView.html', 'modules/core/header/HeaderView.html', 'modules/core/help/HelpView.html', 'modules/core/loadingAnimation/LoadingAnimationView.html', 'modules/core/pagination/PaginationView.html', 'modules/core/popupContent/PopupContentView.html', 'modules/core/views/index.client.view.html', 'modules/levels/game/GameView.html', 'modules/levels/level/index.html', 'modules/levels/level/LevelView.html', 'modules/levels/levelSelect/LevelSelectView.html', 'modules/levels/modeSelector/ModeSelectorView.html', 'modules/levels/tile/TileView.html', 'modules/users/editProfile/EditProfileView.html', 'modules/users/forgotPassword/ForgotPasswordView.html', 'modules/users/resetPassword/ResetPasswordView.html', 'modules/users/signIn/SignInView.html', 'modules/users/signUp/SignUpView.html']);

angular.module("modules/core/confirmation/ConfirmationView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/core/confirmation/ConfirmationView.html",
    "<popup-content>\n" +
    "    <h2>Are you sure?</h2>\n" +
    "    <button ng-click=\"confirmationCtrl.cancelAction()\">Cancel</button>\n" +
    "    <button ng-click=\"confirmationCtrl.submitAction();confirmationCtrl.confirmAction()\">{{ confirmationCtrl.submitText }}</button>\n" +
    "</popup-content>");
}]);

angular.module("modules/core/header/HeaderView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/core/header/HeaderView.html",
    "<nav role=\"navigation\">\n" +
    "	<ul ng-click=\"headerCtrl.openLevelSelect()\">\n" +
    "		<li>\n" +
    "			<i class=\"fa fa-bars\"></i>\n" +
    "			<div>Levels</div>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "\n" +
    "	<ul ng-click=\"headerCtrl.openEditProfile()\" ng-if=\"headerCtrl.Authentication.user\">\n" +
    "		<li>\n" +
    "			<i class=\"fa fa-user\"></i>\n" +
    "			<div>{{ headerCtrl.Authentication.user.username }}</div>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "\n" +
    "	<ul ng-click=\"headerCtrl.openSignUp()\" ng-if=\"!headerCtrl.Authentication.user\">\n" +
    "		<li>\n" +
    "			<i class=\"fa fa-user\"></i>\n" +
    "			<div>Sign Up</div>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "\n" +
    "	<ul ng-click=\"headerCtrl.openSignIn()\" ng-if=\"!headerCtrl.Authentication.user\">\n" +
    "		<li>\n" +
    "			<i class=\"fa fa-user\"></i>\n" +
    "			<div>Sign In</div>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "\n" +
    "	<ul ng-click=\"headerCtrl.openHelp()\">\n" +
    "		<li>\n" +
    "			<i class=\"fa fa-question\"></i>\n" +
    "			<div>Help</div>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</nav>");
}]);

angular.module("modules/core/help/HelpView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/core/help/HelpView.html",
    "<popup-content>\n" +
    "	<h2>How to Play</h2>\n" +
    "\n" +
    "	<div class=\"how-to-play\">\n" +
    "		Krossr is an HTML, CSS, and Javascript-based clone of the puzzle game Picross, made famous by Nintendo with Mario's Picross.<br />\n" +
    "		Also known as nonograms, the puzzles use numbers to tell the solver where to fill in tiles in order to form a picture.\n" +
    "	</div>\n" +
    "\n" +
    "	<button ng-click=\"helpCtrl.closeAction()\">OK, Got it</button>\n" +
    "</popup-content>");
}]);

angular.module("modules/core/loadingAnimation/LoadingAnimationView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/core/loadingAnimation/LoadingAnimationView.html",
    "<div class=\"loadingAnimation animate-hide\" ng-show=\"loadingAnimationCtrl.condition\">\n" +
    "    <div class=\"loadingAnimation-inner\">\n" +
    "        <span class=\"specialK\">K</div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/core/pagination/PaginationView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/core/pagination/PaginationView.html",
    "<div class=\"pagination\">\n" +
    "    <div class=\"prevPage\" ng-click=\"paginationCtrl.pageDown()\" ng-class=\"{'invisible': paginationCtrl.currentPage === 0}\">\n" +
    "        ◀\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"currentPage\">\n" +
    "        Page {{ paginationCtrl.currentPage + 1 }} of {{ paginationCtrl.totalPages }}\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"nextPage\" ng-click=\"paginationCtrl.pageUp()\" ng-class=\"{'invisible': paginationCtrl.currentPage + 1 === paginationCtrl.totalPages }\">\n" +
    "        ▶\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/core/popupContent/PopupContentView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/core/popupContent/PopupContentView.html",
    "<ng-transclude></ng-transclude>");
}]);

angular.module("modules/core/views/index.client.view.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/core/views/index.client.view.html",
    "<div class=\"main-viewport\">\n" +
    "    <loading-animation condition=\"true\"></loading-animation>\n" +
    "</div>");
}]);

angular.module("modules/levels/game/GameView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/levels/game/GameView.html",
    "<div class=\"outer game\" ng-style=\"{'padding': gameCtrl.margin}\">\n" +
    "	<div class=\"inner game\"\n" +
    "         ng-style=\"{ 'width': gameCtrl.gameSettings.width, 'height': gameCtrl.gameSettings.height }\"\n" +
    "         tabindex=\"1\">\n" +
    "         <tile game-matrix=\"gameCtrl.gameMatrix\" ng-repeat=\"i in gameCtrl.tiles\" editable='true' index=\"$index\" level=\"gameCtrl.level\" tiles=\"gameCtrl.tiles\"></tile> \n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("modules/levels/level/index.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/levels/level/index.html",
    "<level></level>");
}]);

angular.module("modules/levels/level/LevelView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/levels/level/LevelView.html",
    "<div class=\"viewLevel\">\n" +
    "    <div class=\"form-group\" ng-if=\"['edit', 'new'].indexOf(levelCtrl.level.currentView) > -1\">\n" +
    "        <h2>{{ levelCtrl.level.currentView }} level</h2>\n" +
    "\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"name\">Name</label>\n" +
    "            <input type=\"text\" data-ng-model=\"levelCtrl.level.name\" id=\"name\" placeholder=\"Name\" required>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"form-group\" ng-if=\"levelCtrl.level.currentView === 'new'\">\n" +
    "            <label for=\"size\">Size</label>\n" +
    "            <select convert-to-number ng-model=\"levelCtrl.options.size\" ng-change=\"levelCtrl.createNewLevel();\">\n" +
    "                <option value=\"25\">5x5</option>\n" +
    "                <option value=\"100\">10x10</option>\n" +
    "                <option value=\"225\">15x15</option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "\n" +
    "        <div>\n" +
    "            <button type=\"button\" ng-click=\"levelCtrl.confirmClear()\">Clear</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-if=\"levelCtrl.level.currentView === 'edit'\">\n" +
    "            <button ng-disabled=\"levelCtrl.error\" type=\"button\" ng-click=\"levelCtrl.confirmUpdate()\">\n" +
    "                <span ng-if=\"!levelCtrl.error\">Update</span>\n" +
    "                <span ng-if=\"levelCtrl.error\" ng-bind-html=\"levelCtrl.error\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-if=\"levelCtrl.level.currentView === 'new'\">\n" +
    "            <button ng-disabled=\"levelCtrl.error\" ng-click=\"levelCtrl.submitCreate()\">\n" +
    "                <span ng-if=\"!levelCtrl.error\">Submit</span>\n" +
    "                <span ng-if=\"levelCtrl.error\" data-ng-bind=\"levelCtrl.error\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div data-ng-if=\"levelCtrl.Authentication.user.id == levelCtrl.level.userId && levelCtrl.level.currentView === 'edit'\">\n" +
    "            <a data-ng-click=\"levelCtrl.confirmRemove();\">\n" +
    "                <button>  \n" +
    "                    Delete Level\n" +
    "                </button>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"rateLevel\" ng-if=\"levelCtrl.Authentication.user && levelCtrl.level && levelCtrl.level.currentView === 'view'\">\n" +
    "        Rate: <star-rating [rating]=\"levelCtrl.level.yourRating\" max=\"5\" (on-rating-selected)=\"levelCtrl.rate($event)\"></star-rating>\n" +
    "    </div>\n" +
    "\n" +
    "    <mode-selector ng-if=\"levelCtrl.level && levelCtrl.level.currentView === 'view'\"></mode-selector>\n" +
    "\n" +
    "    <div ng-keydown=\"levelCtrl.keydown($event)\" ng-keyup=\"levelCtrl.keyup($event)\" class=\"animate-hide gameContainer\" tabindex=\"0\" ng-show=\"levelCtrl.level.ready\">\n" +
    "        <div class=\"gameContainer-inner\">\n" +
    "            <div class=\"top row\">\n" +
    "                <number-grid\n" +
    "                    [game-matrix]=\"levelCtrl.gameMatrix['vertical']\"\n" +
    "                    [goal-matrix]=\"levelCtrl.goalMatrix['vertical']\"\n" +
    "                    ng-if=\"levelCtrl.level && levelCtrl.level.layout && levelCtrl.level.currentView === 'view'\"\n" +
    "                    orientation=\"vertical\"\n" +
    "                    class=\"top-grid\"\n" +
    "                    ng-style=\"{'padding-right': levelCtrl.margin}\"></number-grid>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"bottom row\">\n" +
    "                <game game-matrix=\"levelCtrl.gameMatrix\" goal-matrix=\"levelCtrl.goalMatrix\" level=\"levelCtrl.level\" tiles=\"levelCtrl.finalLayout.tiles\" ng-if=\"levelCtrl.finalLayout.tiles\"></game>\n" +
    "\n" +
    "                <number-grid\n" +
    "                    [game-matrix]=\"levelCtrl.gameMatrix['horizontal']\"\n" +
    "                    [goal-matrix]=\"levelCtrl.goalMatrix['horizontal']\"\n" +
    "                    ng-if=\"levelCtrl.level && levelCtrl.level.layout && levelCtrl.level.currentView === 'view'\"\n" +
    "                    orientation=\"horizontal\"\n" +
    "                    class=\"left-grid\"\n" +
    "                    ng-style=\"{'padding-top': levelCtrl.margin}\">\n" +
    "                </number-grid>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</section>");
}]);

angular.module("modules/levels/levelSelect/LevelSelectView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/levels/levelSelect/LevelSelectView.html",
    "<div class=\"listLevels\" data-ng-init=\"levelSelectCtrl.find(levelSelectCtrl.currentPage)\">\n" +
    "    <h2>\n" +
    "        Levels\n" +
    "        <span class=\"filterIcon\" ng-click=\"levelSelectCtrl.toggleShowFilter()\">\n" +
    "            <i class=\"fa fa-filter\"\n" +
    "                ng-class=\"{'active': levelSelectCtrl.showFilter}\"></i>\n" +
    "        </span>\n" +
    "        <span class=\"createIcon\" ng-if=\"levelSelectCtrl.Authentication.user\" ui-sref=\"create-level()\" ng-click=\"levelSelectCtrl.closeAction();\">\n" +
    "            <i class=\"fa fa-plus\"></i>\n" +
    "        </span>\n" +
    "    </h2>\n" +
    "    \n" +
    "    <div class=\"form-group\">\n" +
    "        <div class=\"form-group\" ng-show=\"levelSelectCtrl.showFilter\">\n" +
    "            <!-- These guys all get their own divs so they don't have the label and input on\n" +
    "                  different lines -->\n" +
    "            <div class=\"form-group\">\n" +
    "                <label>Size</label>\n" +
    "                <select ng-model=\"levelSelectCtrl.sizeRestriction\" ng-change=\"levelSelectCtrl.find(levelSelectCtrl.currentPage)\">\n" +
    "                    <option value=\"\" selected>All</option>\n" +
    "                    <option value=\"5\">5x5</option>\n" +
    "                    <option value=\"10\">10x10</option>\n" +
    "                    <option value=\"15\">15x15</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "                <label>Search</label>\n" +
    "                <input ng-model=\"levelSelectCtrl.searchText\" ng-model-options=\"{ debounce: 250 }\" ng-change=\"levelSelectCtrl.find(levelSelectCtrl.currentPage)\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "                <label>Sort by</label>\n" +
    "                <select ng-model=\"levelSelectCtrl.sortBy\" ng-change=\"levelSelectCtrl.find(levelSelectCtrl.currentPage)\">\n" +
    "                    <option value='\"createdAt\"'>Created Date</option>\n" +
    "                    <option value='name'>Name</option>\n" +
    "                    <option value='\"avgRating\"'>Ratings</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "                <label>Sort direction</label>\n" +
    "                <select ng-model=\"levelSelectCtrl.sortDirection\" ng-change=\"levelSelectCtrl.find(levelSelectCtrl.currentPage)\">\n" +
    "                    <option value=\"\">Asc</option>\n" +
    "                    <option value=\"DESC\">Desc</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"list-group\" ng-if=\"levelSelectCtrl.levels\">\n" +
    "        <div data-ng-repeat=\"level in levelSelectCtrl.levels track by $id(level)\" ng-class=\"{'odd': $index % 2 !== 0}\" class=\"list-group-item level\">\n" +
    "            <a class=\"playButton\" ui-sref=\"level({ levelId: level.id })\" ui-sref-opts=\"{ reload: true }\" ng-click=\"levelSelectCtrl.closeAction()\">\n" +
    "                <i class=\"fa fa-play\"></i>\n" +
    "            </a>\n" +
    "\n" +
    "            <div class=\"list-group-item-heading\" data-ng-bind=\"level.name\"></div>\n" +
    "\n" +
    "            <div class=\"username\" ng-click=\"levelSelectCtrl.setSearchText(level.user.username)\" data-ng-bind=\"'by ' + level.user.username\"></div>\n" +
    "\n" +
    "            <a class=\"editButton\" ui-sref=\"update-level({ levelId: level.id })\" ui-sref-opts=\"{ reload: true }\" ng-click=\"levelSelectCtrl.closeAction()\" ng-if=\"level && levelSelectCtrl.Authentication.user.id === level.userId\">\n" +
    "                <i class=\"fa fa-edit\"></i>\n" +
    "            </a>\n" +
    "\n" +
    "            <div class=\"size\" data-ng-bind=\"level.prettySize\" ng-click=\"levelSelectCtrl.setSizeRestriction(level.size)\"></div>\n" +
    "\n" +
    "            <div class=\"averageRating\">\n" +
    "                Avg:\n" +
    "                <span ng-if=\"::level.avgRating\">{{ ::level.avgRating | number: 2 }}</span>\n" +
    "                <span ng-if=\"::!level.avgRating\">n/a</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"alert alert-warning\" data-ng-show=\"levelSelectCtrl.levels.count === 0\">\n" +
    "    	No Levels yet!\n" +
    "\n" +
    "        <button ng-if=\"levelSelectCtrl.Authentication.user\" ng-click=\"levelSelectCtrl.createNewLevel();closeThisDialog();\">\n" +
    "            Create One\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <pagination ng-if=\"levelSelectCtrl.levels && levelSelectCtrl.levels.length > 0\" on-pagination=\"levelSelectCtrl.find(currentPage)\" current-page=\"levelSelectCtrl.currentPage\" total-pages=\"levelSelectCtrl.totalPages\"></pagination>\n" +
    "</div>");
}]);

angular.module("modules/levels/modeSelector/ModeSelectorView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/levels/modeSelector/ModeSelectorView.html",
    "Mode:\n" +
    "\n" +
    "<div class=\"mode\" ng-class=\"{ 'selected': modeSelectorCtrl.selectedMode === mode.name }\" ng-click=\"modeSelectorCtrl.selectMode(mode);\" ng-repeat=\"mode in modeSelectorCtrl.modes\">\n" +
    "    {{ mode.name }}\n" +
    "</div>");
}]);

angular.module("modules/levels/tile/TileView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/levels/tile/TileView.html",
    "<div \n" +
    "	class=\"square\"\n" +
    "	ng-class=\"{unselected: !tileCtrl.selected && !tileCtrl.marked && !tileCtrl.pending,\n" +
    "				selected: tileCtrl.selected,\n" +
    "				marked: tileCtrl.marked,\n" +
    "				pending: tileCtrl.pending }\"\n" +
    "	\n" +
    "	data-index=\"{{$index}}\"\n" +
    "	ng-style=\"{\n" +
    "		'font-size': tileCtrl.height,\n" +
    "		'width': tileCtrl.width,\n" +
    "		'height': tileCtrl.height,\n" +
    "		'line-height': tileCtrl.height,\n" +
    "		'border-right': tileCtrl.fillBorders('right', $index),\n" +
    "		'border-left': tileCtrl.fillBorders('left', $index),\n" +
    "		'border-top': tileCtrl.fillBorders('top', $index),\n" +
    "		'border-bottom': tileCtrl.fillBorders('bottom', $index)\n" +
    "	}\"\n" +
    "	>\n" +
    "</div>");
}]);

angular.module("modules/users/editProfile/EditProfileView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/users/editProfile/EditProfileView.html",
    "<popup-content>\n" +
    "	<form name=\"userForm\" data-ng-submit=\"editProfileCtrl.updateUserProfile(userForm.$valid)\" autocomplete=\"off\">\n" +
    "		<h2><label for=\"lastName\">Change your Email Address</h2>\n" +
    "		<div class=\"form-group\">\n" +
    "			<input type=\"email\" id=\"email\" name=\"email\" data-ng-model=\"editProfileCtrl.Authentication.user.email\" placeholder=\"Email\">\n" +
    "		</div>\n" +
    "		<div class=\"form-group\">\n" +
    "			<button ng-disabled=\"editProfileCtrl.error.username || editProfileCtrl.success.username\" type=\"submit\">\n" +
    "				<span ng-if=\"!editProfileCtrl.success.username\">Save Email Address</span>\n" +
    "				<span ng-if=\"editProfileCtrl.success.username\">Email Saved</span>\n" +
    "				<span ng-if=\"editProfileCtrl.error.username\" data-ng-bind=\"editProfileCtrl.error.username\"></span>\n" +
    "			</button>\n" +
    "		</div>\n" +
    "	</form>\n" +
    "	<h2>Change your password</h2>\n" +
    "	<form data-ng-submit=\"editProfileCtrl.changeUserPassword()\" autocomplete=\"off\">\n" +
    "		<div class=\"form-group\">\n" +
    "			<input type=\"password\" id=\"currentPassword\" name=\"currentPassword\" data-ng-model=\"editProfileCtrl.passwordDetails.currentPassword\" placeholder=\"Current Password\">\n" +
    "		</div>\n" +
    "		<div class=\"form-group\">\n" +
    "			<input type=\"password\" id=\"newPassword\" minlength=\"{{ editProfileCtrl.minPasswordLength }}\" name=\"newPassword\" data-ng-model=\"editProfileCtrl.passwordDetails.newPassword\" placeholder=\"New Password\">\n" +
    "		</div>\n" +
    "		<div class=\"form-group\">\n" +
    "			<input type=\"password\" id=\"verifyPassword\" minlength=\"{{ editProfileCtrl.minPasswordLength }}\" name=\"verifyPassword\" data-ng-model=\"editProfileCtrl.passwordDetails.verifyPassword\" placeholder=\"Verify Password\">\n" +
    "		</div>\n" +
    "		<div class=\"form-group\">\n" +
    "			<button ng-disabled=\"editProfileCtrl.error.password || editProfileCtrl.success.password\" type=\"submit\">\n" +
    "				<span ng-if=\"!editProfileCtrl.error.password && !editProfileCtrl.success.password\">Save Password</span>\n" +
    "				<span ng-if=\"!editProfileCtrl.error.password && editProfileCtrl.success.password\">Password Saved</span>\n" +
    "				<span ng-if=\"editProfileCtrl.error.password\" data-ng-bind=\"editProfileCtrl.error.password\"></span>\n" +
    "			</button>\n" +
    "		</div>\n" +
    "	</form>\n" +
    "	<button ng-click=\"editProfileCtrl.signout();\">Sign Out</button>\n" +
    "</popup-content>");
}]);

angular.module("modules/users/forgotPassword/ForgotPasswordView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/users/forgotPassword/ForgotPasswordView.html",
    "<popup-content>\n" +
    "    <h1>Forgot Password</h1>\n" +
    "    <p ng-if=\"forgotPasswordCtrl.invalid\">Your password reset token is invalid, please send a new password reset</p>\n" +
    "    <form data-ng-submit=\"forgotPasswordCtrl.askForPasswordReset()\" autocomplete=\"off\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"username\">Username</label>\n" +
    "            <input type=\"text\" id=\"username\" name=\"username\" data-ng-model=\"forgotPasswordCtrl.credentials.username\" placeholder=\"Username\">\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <button type=\"submit\">\n" +
    "                <span ng-if=\"!forgotPasswordCtrl.error && !forgotPasswordCtrl.success\">Submit</span>\n" +
    "                <span ng-if=\"forgotPasswordCtrl.success\">{{forgotPasswordCtrl.success}}</span>\n" +
    "                <span ng-if=\"forgotPasswordCtrl.error\">{{forgotPasswordCtrl.error}}</span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</popup-content>");
}]);

angular.module("modules/users/resetPassword/ResetPasswordView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/users/resetPassword/ResetPasswordView.html",
    "<popup-content>\n" +
    "    <h2>Reset your password</h2>\n" +
    "\n" +
    "    <form data-ng-submit=\"resetPasswordCtrl.resetUserPassword()\" autocomplete=\"off\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"newPassword\">New Password</label>\n" +
    "            <input type=\"password\" id=\"newPassword\" name=\"newPassword\" data-ng-model=\"resetPasswordCtrl.passwordDetails.newPassword\" placeholder=\"New Password\">\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"verifyPassword\">Verify Password</label>\n" +
    "            <input type=\"password\" id=\"verifyPassword\" name=\"verifyPassword\" data-ng-model=\"resetPasswordCtrl.passwordDetails.verifyPassword\" placeholder=\"Verify Password\">\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <button type=\"submit\">Update Password</button>\n" +
    "        </div>\n" +
    "        <div data-ng-show=\"resetPasswordCtrl.error\">\n" +
    "            <strong>{{resetPasswordCtrl.error}}</strong>\n" +
    "        </div>\n" +
    "        <div data-ng-show=\"resetPasswordCtrl.success\">\n" +
    "            <strong>{{resetPasswordCtrl.success}}</strong>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</popup-content>");
}]);

angular.module("modules/users/signIn/SignInView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/users/signIn/SignInView.html",
    "<popup-content>\n" +
    "	<h1>Sign In</h1>\n" +
    "\n" +
    "	<form data-ng-submit=\"signInCtrl.signin()\" autocomplete=\"off\">\n" +
    "		<div class=\"form-group\">\n" +
    "			<label for=\"username\">Username</label>\n" +
    "			<input type=\"text\" id=\"username\" name=\"username\" data-ng-model=\"signInCtrl.credentials.username\" placeholder=\"Username\">\n" +
    "		</div>\n" +
    "		<div class=\"form-group\">\n" +
    "			<label for=\"password\">Password</label>\n" +
    "			<input type=\"password\" id=\"password\" name=\"password\" data-ng-model=\"signInCtrl.credentials.password\" placeholder=\"Password\">\n" +
    "		</div>\n" +
    "		<div class=\"form-group\">\n" +
    "			<button ng-disabled=\"signInCtrl.error\" type=\"submit\">\n" +
    "				<span ng-if=\"!signInCtrl.error\">Sign in</span>\n" +
    "				<span ng-if=\"signInCtrl.error\" ng-bind=\"::signInCtrl.error\"></span>\n" +
    "			</button>\n" +
    "		</div>\n" +
    "		<div class=\"form-group\">\n" +
    "			<a ng-click=\"signInCtrl.openForgotPassword()\">Forgot your password?</a>\n" +
    "		</div>\n" +
    "	</form>\n" +
    "</popup-content>");
}]);

angular.module("modules/users/signUp/SignUpView.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("modules/users/signUp/SignUpView.html",
    "<popup-content>\n" +
    "	<h1>Sign Up</h1>\n" +
    "\n" +
    "	<form name=\"userForm\" ng-submit=\"signUpCtrl.signup()\" novalidate autocomplete=\"off\">\n" +
    "		<div class=\"form-group\">\n" +
    "			<label for=\"username\">Username</label> \n" +
    "			<input type=\"text\" id=\"username\" name=\"username\" data-ng-model=\"signUpCtrl.credentials.username\" placeholder=\"Username\">\n" +
    "			<div class=\"details\">Your username will be displayed on any puzzles you create. No restrictions.</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"form-group\">\n" +
    "			<label for=\"email\">Email</label> \n" +
    "			<input type=\"email\" id=\"email\" name=\"email\" data-ng-model=\"signUpCtrl.credentials.email\" placeholder=\"Email\">\n" +
    "			<div class=\"details\">Your email will only be used for password recovery</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"form-group\">\n" +
    "			<label for=\"password\">Password</label> \n" +
    "			<input type=\"password\" id=\"password\" minlength=\"{{ signUpCtrl.minPasswordLength }}\" name=\"password\" data-ng-model=\"signUpCtrl.credentials.password\" placeholder=\"Password\">\n" +
    "			<div class=\"details\">Your password must be at least 10 characters. Spaces allowed, no symbols required.</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"form-group\">\n" +
    "			<button ng-disabled=\"signUpCtrl.error\" type=\"button\" ng-click=\"signUpCtrl.signup()\">\n" +
    "				<span ng-if=\"!signUpCtrl.error\">Sign Up</span>\n" +
    "				<span ng-if=\"signUpCtrl.error\" ng-bind-html=\"signUpCtrl.error\"></span>\n" +
    "			</button>\n" +
    "		</div>\n" +
    "	</form>\n" +
    "</popup-content>");
}]);
