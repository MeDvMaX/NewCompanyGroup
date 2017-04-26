'use strict';
(function () {
    var serviceFunction = function ($scope) {
        console.info('sddds');
        var dashboard = {
            name: 'null',
            widgets: []
        };
        $scope.toggleLeft = function () {
            alert('sddd');
        }
    };

    angular.module('dashboard')
        .controller('DashboardController', serviceFunction);
})();
