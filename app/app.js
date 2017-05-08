'use strict';

(function () {
    var dependencies = [
        'ngMaterial',
        'ui.router',
        'dashboard',
        'gridster'
    ];

    var controllerLoginForm = function ($scope, $mdDialog, $state) {
        $scope.login = function () {
            if ($scope.user.login === $scope.user.pass) {
                $mdDialog.hide();
                $state.go('dashboard');
            }
            // else {
            //
            // }
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