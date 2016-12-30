'use strict';

(function () {
    var dependencies = [
        'ngMaterial',
        'ui.router'
    ];

    var controllerLoginRouter = function ($scope, $mdDialog) {
        $mdDialog.show({
            controller: controllerLoginForm,
            templateUrl: 'modules/login/view.htm'
        })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
    };

    var controllerLoginForm = function ($scope, $mdDialog, $state) {
        $scope.login = function () {
            if ($scope.user.login === $scope.user.pass) {
                $mdDialog.hide();
                $state.go('dashboard');
            } else {

            }
        }
    };

    var controllerDashboard = function ($scope, $mdDialog) {
        // TODO
    };

    var configFunction = function ($mdThemingProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    controller: controllerDashboard
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

        $scope.showAdvanced = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'modules/login/view.htm',
                targetEvent: ev,
                clickOutsideToClose: true,
            })
                    .then(function (answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function () {
                        $scope.status = 'You cancelled the dialog.';
                    });
        };
    }

    function DialogController($scope, $mdDialog) {
        $scope.user = {
            login: "",
            pass: ""
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }

    angular.module('app', dependencies)
            .config(configFunction)
            .controller('appController', controllerFunction)
})();