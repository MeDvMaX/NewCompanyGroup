'use strict';
(function(){
	var serviceFunction = function(){
	this.showDialog = function() {
    $mdDialog.show({
      templateUrl: 'view.htm',
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };
    }

	angular.module('app', dependencies)
            .service('loginService', serviceFunction);
})();
