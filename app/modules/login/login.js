'use strict';

(function () {
    var serviceFunction = function ($scope, $localStorage, $sessionStorage, $mdDialog, $state) {
        $scope.login = function (login, password) {
        	if ($localStorage[login]) {
        		if ($localStorage[login].password === password) {
        			$sessionStorage.login = login;
	        		$mdDialog.hide();
	                $state.go('dashboard');
	            } else {
	            	$scope.loginStatus = "wrong-pass";
	            }
        	} else {
        		$sessionStorage.login = login;
        		$localStorage[login] = login;
        		$localStorage[login].password = password;
        		$localStorage[login].dashboards = [{
                id: 0,
                name: 'Dashboard_1',
                widgets: [{
                    col: 0,
                    row: 0,
                    sizeY: 1,
                    sizeX: 1,
                    name: "Widget 1",
                    items: []
            	},];
        		$mdDialog.hide();
	            $state.go('dashboard');
        	}
        };
    };

    angular.module('app', 'ngStorage')
        .service('loginService', serviceFunction);
})();
