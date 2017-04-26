'use strict';

(function () {
    var serviceFunction = function ($scope, $mdSidenav) {
        console.info('sddds');
        var dashboard = {
            name: 'null',
            widgets: []
        };
    };

    angular.module('dashboard', [])
        .controller('DashboardController', serviceFunction);
})();
