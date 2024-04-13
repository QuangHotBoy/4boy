var app = angular.module('orderPlaceDetaildApp', []);

app.controller("orderPlacedDetailCtrl", function($scope, $http , $timeout) {
    $scope.orderPlacesDetails = [];
    $scope.form = {};


    $scope.checkrole = function () {
        var account = JSON.parse(localStorage.getItem("account")) || [];
        var tenDangNhap = account[0].tenDangNhap;
        $http.get("/rest/findrole/" + tenDangNhap).then(resp => {
            $scope.role = [];
            $scope.role = resp.data;
            var quyen = $scope.role.quyen.id
            console.log(quyen);
            if (quyen === "CUST") {
                location.href = "/shop/home";
            }
        })
    }
    // Function to initialize the controller
    $scope.initialize = function () {

        // check role 
       $scope.checkrole();

        $http.get("/rest/orderPlacesDetail").then(resp => {
            $scope.orderPlacesDetails = resp.data;
            // $scope.orderPlaces.sort((a, b) => new Date(b.ngayDatHang) - new Date(a.ngayDatHang));
            console.log($scope.orderPlacesDetails);
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
    
});
