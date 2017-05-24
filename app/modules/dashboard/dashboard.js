'use strict';

(function () {
    var dialogController = function ($scope, $mdDialog, $http) {
        $scope.date = new Date();

        $scope.create = function () {
            var date = $scope.date,
                queryDate = date.getMilliseconds(),
                query = 'http://www.cbr.ru/scripts/XML_daily_eng.asp?date_req=22/01/2007';

            $http({
                method: 'GET',
                // url: 'http://www.cbr.ru/scripts/XML_daily_eng.asp?date_req=' + queryDate,
                url: 'http://localhost:9000/hello',
                params: {
                    url: query
                //     what: text,
                //     point: $scope.paths.c1.latlngs.lng + ',' + $scope.paths.c1.latlngs.lat,
                //     radius: Math.floor($scope.paths.c1.radius),
                //     sort: 'distance',
                //     version: '1.3',
                //     key: 'ruczoy1743',
                }
            })
                .then(function (response) {
                    debugger;
                    if (response.data.response_code === '200') {
                        map.markers = new L.FeatureGroup();
                        for (var i = 0; i < response.data.result.length; i++) {
                            var latlng = [Number(response.data.result[i].lat), Number(response.data.result[i].lon)];
                            var marker = L.marker(latlng).bindPopup(L.popup.angular({
                                template: '<div ng-include="\'popup.html\'"></div>',
                                compileMessage: true,
                                minWidth: 200,
                                controller: ['$content', function ($content) {
                                }]
                            }).setContent({
                                'scope': response.data.result[i],
                            }));
                            map.markers.addLayer(marker);
                        }
                        map.addLayer(map.markers);
                    } else {
                        alert(response.data.error_message);
                    }
                }, function (response) {
                    alert(response.status);
                });
        };

        $scope.close = function () {
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
        .controller('DashboardController', serviceFunction);
})();
