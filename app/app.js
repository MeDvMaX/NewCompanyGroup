'use strict';

(function () {
    var dependencies = [
        'ngMaterial',
        'ui.router',
        'dashboard',
        'gridster'
    ];

    var controllerLoginForm = function ($scope, $localStorage, $sessionStorage, $mdDialog, $state) {
        $scope.login = function (login, password) {
            if ($scope.user.login === $scope.user.pass) {
                $mdDialog.hide();
                $state.go('dashboard');
            }
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

    var controllerLoginRouter = function ($scope, $mdDialog) {
        $mdDialog.show({
            controller: controllerLoginForm,
            templateUrl: 'modules/login/view.html'
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    var configFunction = function ($mdThemingProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'modules/dashboard/dashboard.html',
                controller: 'DashboardController'
            })
            .state('login', {
                url: '/login',
                controller: controllerLoginRouter
            });

        $urlRouterProvider.otherwise('/login');
        $mdThemingProvider.theme('default')
            .primaryPalette('light-green', {
                'default': '500',
                'hue-1': '700',
                'hue-2': '800'
            })
            .accentPalette('light-green', {
                'default': 'A200'
            })
            .dark();
    };

    var controllerFunction = function ($scope, $mdDialog) {

    };

    angular.module('app', dependencies)
        .config(configFunction)
        .controller('appController', controllerFunction)
})();