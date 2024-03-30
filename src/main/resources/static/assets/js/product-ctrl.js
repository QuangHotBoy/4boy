// Tạo một module Angular
var app = angular.module('product-App', []);

app.controller("product-Ctrl", function ($scope, $http, $timeout) {
    $scope.products = [];
    $scope.form = {};

    $scope.initialize = function () {
        $http.get("/rest/types").then(resp => {
            $scope.types = resp.data;
		})
        $http.get("/rest/suppliers").then(resp => {
            $scope.suppliers = resp.data;
		})
        $http.get("/rest/products").then(resp => {
            $scope.products = resp.data;    
            console.log($scope.products)
            // Destroy existing DataTable instance if it exists
            if ($.fn.DataTable.isDataTable('#table1')) {
                $('#table1').DataTable().destroy();
            }

            // Initialize DataTable after data is loaded
            $timeout(function () {
                $('#table1').DataTable({
                    "language": {
                        "url": "/assets/json/vietnam.json"
                    }
                });
            });
        });
    }

    // Call the initialize function when the controller is instantiated
    $scope.initialize();
});