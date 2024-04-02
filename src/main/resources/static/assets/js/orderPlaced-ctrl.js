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
    $scope.edit = function(maDonHang) {
        // Send a GET request to the API to fetch data for the specified ID
        $http.get('/rest/orderPlaces/' + maDonHang)
            .then(function(response) {
                // Copy the fetched data to $scope.form
                $scope.form = response.data;
                // Convert the ISO date string to a JavaScript Date object
                // Show the modal
                $('#exampleModal').modal('show');
                console.log(maDonHang);
            })
            .catch(function(error) {
                // Handle errors
                console.error('Error fetching data for editing:', error);
                // Optionally, you can initialize $scope.form here to avoid undefined errors
                $scope.form = {};
            });
    };
    $scope.update = function() {
        var orderPlace = angular.copy($scope.form);
        $http.put('/rest/orderPlaces/' + orderPlace.maDonHang, orderPlace)
            .then(resp => {
                // Initialize $scope.vouchers if not already initialized
                if (!$scope.orderPlaces) {
                    $scope.orderPlaces = [];
                }
    
                // Check if the voucher exists in $scope.vouchers before updating
                var index = $scope.orderPlaces.findIndex(i => i.maDonHang === orderPlace.maDonHang);
                if (index !== -1) {
                    $scope.orderPlaces[index] = angular.copy(orderPlace);
                }
    
                $scope.reset(); // Reset form
                alert("Cập nhật sản phẩm thành công!");
                // Optionally, reload data
                // loadData();
            })
            .catch(error => {
                alert("Lỗi cập nhật sản phẩm!");
                console.log("Error", error);
            });
    };    
});
