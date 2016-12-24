'use strict';

(function () {
    var dependencies = [
        'ngMaterial',
        'ui.router'
    ];

    var configFunction = function ($mdThemingProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('dashboard', {})
                .state('login', {
                    url: '/login',
                    templateUrl: 'modules/login/view.htm', 
                    data: {
                      'noLogin': true
                    }
                });

        $urlRouterProvider.otherwise('/login');
        $mdThemingProvider.theme('default')
                .primaryPalette('green', {
                    'default': '500',
                    'hue-1': '700',
                    'hue-2': '800'
                })
                .accentPalette('green', {
                    'default': 'A200'
                });
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