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
                templateUrl: 'modules/login/view.htm'
            });
        $urlRouterProvider.otherwise('/login');

        $mdThemingProvider.theme('default')
            .primaryPalette('red', {
                'default': '500',
                'hue-1': '700',
                'hue-2': '800'
            })
            .accentPalette('red', {
                'default': 'A200'
            });
    };

    var controllerFunction = function ($scope, $rootScope) {
        $scope.main = 'work';
    };

    angular.module('app', dependencies)
        .config(configFunction)
        .controller('appController', controllerFunction);
})();