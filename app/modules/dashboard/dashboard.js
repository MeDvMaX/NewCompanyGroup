'use strict';

(function () {
    var serviceFunction = function ($scope, $mdSidenav) {
        console.info('sddds');
        $scope.gridsterOptions = {
            columns: 2,
            margins: [8, 8],
            rowHeight: 385,
            colWidth: 'auto',
            pushing: true,
            swapping: true,
            floating: true,
            mobileBreakPoint: 650,
            minColumns: 1,
            minRows: 1,
            maxRows: 100,
            defaultSizeX: 1,
            defaultSizeY: 1,
            draggable: {
                handle: '.box-header'
            }
        };
        $scope.dashboards =
                {
                    id: '1',
                    name: 'Home',
                    widgets: [{
                        col: 0,
                        row: 0,
                        sizeY: 1,
                        sizeX: 1,
                        name: "Widget 1",
                        items: [
                            'sddsdsd',
                            'sddssssd',
                            'sdsdsdsd'
                        ]
                    }, {
                        col: 2,
                        row: 1,
                        sizeY: 1,
                        sizeX: 1,
                        name: "Widget 2"
                    }]
                };
        $scope.clear = function () {
            $scope.dashboard.widgets = [];
        };

        $scope.addWidget = function () {
            $scope.dashboard.widgets.push({
                name: "New Widget",
                sizeX: 1,
                sizeY: 1
            });
        };
    };


    angular.module('dashboard', ['gridster'])
        .controller('DashboardController', serviceFunction)
        .controller('CustomWidgetCtrl', ['$scope', '$modal',
            function ($scope, $modal) {

                $scope.remove = function (widget) {
                    $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
                };

                $scope.openSettings = function (widget) {
                    $modal.open({
                        scope: $scope,
                        templateUrl: 'demo/dashboard/widget_settings.html',
                        controller: 'WidgetSettingsCtrl',
                        resolve: {
                            widget: function () {
                                return widget;
                            }
                        }
                    });
                };

            }
        ])
})();
