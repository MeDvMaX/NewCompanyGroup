'use strict';

(function () {
    var dialogController = function ($scope, $mdDialog, $http) {
        var toQueryFormatDate = function (date) {
                var formatNubmer = function (num) {
                    if (num < 10) {
                        return '0' + num;
                    } else {
                        return '' + num;
                    }
                };

                return formatNubmer(date.getDate()) + '/' + formatNubmer(1+date.getMonth()) + '/' + date.getFullYear();
            },
            selectUrl = function (query) {
                switch (query.id) {
                    case 1 || 2:
                        query.url.replace('startDate', toQueryFormatDate($scope.startDate));
                    case 2:
                        query.url.replace('endDate', toQueryFormatDate($scope.endDate));
                        query.url.replace('quotation', toQueryFormatDate($scope.quotation));
                        break;
                }
            }
        $scope.query = null;
        $scope.states = [
                {
                    displayName: 'Currency quotations for the date',
                    url: 'http://www.cbr.ru/scripts/XML_daily_eng.asp?date_req=startDate',
                    id: 1
                },
                {
                    displayName: 'Quotation dynamics',
                    url: 'www.cbr.ru/scripts/XML_dynamic.asp?date_req1=startDate&date_req2=endDate&VAL_NM_RQ=quotation',
                    id: 2
                }
            ];
        $scope.display = {
            startDate: false,
            endDate: false,
            quotation: false
        };

        $scope.$watch('state', function(newValue, oldValue) {
            switch (newValue && newValue.id) {
                case 1:
                    $scope.query = newValue;
                    $scope.display = {
                        startDate: true,
                        endDate: false,
                        quotation: false
                    };
                    break;
                case 2:
                    $scope.create('http://www.cbr.ru/scripts/XML_val.asp?d=0');
                    $scope.query = newValue;
                    $scope.display = {
                        startDate: true,
                        endDate: true,
                        quotation: true
                    };
                    break;
            }
        });

        $scope.create = function (url) {
            var query = url ? url : selectUrl($scope.query);

            $http({
                method: 'GET',
                url: 'http://localhost:9000/responseRouter',
                params: {
                    url: query
                }
            })
                .then(function (response) {
                    debugger;
                    if (url) {
                        $scope.quotations = [];
                        response.data.Valuta.Item.forEach(function(element, index) {
                            debugger;
                            $scope.quotations.push({
                                displayName: element.engName,
                                id: element.$.ID
                            });
                        });
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
