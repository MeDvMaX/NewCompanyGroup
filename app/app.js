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
                    component: 'login',
                    resolve: {
//                        login: function() {
//                                $mdDialog.show({
//                                  controller: DialogController,
//                                  templateUrl: 'modules/login/view.htm',
//                                  clickOutsideToClose:true,
//                                })
//                                .then(function(answer) {
//                                  $scope.status = 'You said the information was "' + answer + '".';
//                                }, function() {
//                                  $scope.status = 'You cancelled the dialog.';
//                                });
//                            }
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
    $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'modules/login/view.htm',
      targetEvent: ev,
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
    function DialogController($scope, $mdDialog) {
    $scope.user = {
            login: "",
            pass: ""
        };
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
  var serviceFunction = function(){
    this.showDialog = function() {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'modules/login/view.htm',
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
            .service('loginService', serviceFunction)
            .config(configFunction)
            .controller('appController', controllerFunction);
})();