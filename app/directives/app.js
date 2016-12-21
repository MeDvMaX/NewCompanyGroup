'use strict';

angular.module('app', ['ngMaterial'])
    .directive("tree", function () {
        return {
            restrict: "E",
            scope: {rootNode: '=', option: '=options'},
            template: `
                <div ng-include="options.html"></div>
                <ul ng-show="options.isExpanded" class="{{class}}" ng-repeat="item in options.getChild(rootNode)">
                    <tree options="option" root-node="item"></tree>
                </ul>`,
            controller: function ($scope) {
                var obj = angular.extend({}, $scope.option.scope, $scope);
                angular.extend($scope, obj);
                $scope.options = angular.extend({}, $scope.option);
                if ($scope.speed && $scope.speed === "slow" || $scope.speed === "middle" || $scope.speed === "fast") {
                    $scope.class = 'animate-repeat ' + $scope.speed;
                } else {
                    $scope.class = 'animate-repeat slow';
                }
            },
        }
    });
