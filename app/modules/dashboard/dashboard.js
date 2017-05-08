'use strict';

(function () {
    var dialogController = function ($scope, $mdDialog) {
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
    };

    var serviceFunction = function ($scope, $mdDialog) {
        $scope.dashboardId = 0;
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
        $scope.dashboards = [
            {
                id: 0,
                name: 'Dashboard_1',
                widgets: [{
                    col: 0,
                    row: 0,
                    sizeY: 1,
                    sizeX: 1,
                    name: "Widget 1",
                    items: [
                        'sddsdsd',
                        'sddssdsssd',
                        'sdsdsdsd'
                    ]
                }, {
                    col: 2,
                    row: 1,
                    sizeY: 1,
                    sizeX: 1,
                    name: "Widget 2"
                }]
            },
            {
                id: 1,
                name: 'Dashboard_2',
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
                    name: "Widget 2",
                    items: [
                        'sddssssd',
                        'sdsdsdsd'
                    ]
                }]
            },
            {
                id: 2,
                name: 'Dashboard_3',
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
            }
        ];

        $scope.changeDashboard = function (list) {
            $scope.dashboardId = list.dashboard.id;
        };

        $scope.clear = function () {
            $scope.dashboard.widgets = [];
        };

        $scope.addWidget = function (list) {
            $mdDialog.show({
                controller: dialogController,
                templateUrl: '/modules/widget/create/view.html'
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
            // $scope.dashboards[list.dashboard.id].widgets.push({
            //     name: "New Widget",
            //     sizeX: 1,
            //     sizeY: 1
            // });
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
