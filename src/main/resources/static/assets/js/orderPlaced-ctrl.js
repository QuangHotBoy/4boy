var app = angular.module('orderPlacedApp', []);

app.controller("orderPlacedCtrl", function($scope, $http) {
    $scope.orderPlaces = [];
    $scope.form = {};

    // Function to initialize the controller
    $scope.initialize = function () {
        $http.get("/rest/orderPlaces").then(resp => {
            $scope.orderPlaces = resp.data;

            console.log($scope.orderPlaces);
            // Initialize DataTable after data is loaded

        });
    }

    $scope.initialize();

    // Function to reset the form
    $scope.reset = function() {
        $scope.form = {};
    };
});
