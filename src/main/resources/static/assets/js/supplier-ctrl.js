// var app = angular.module('supplier-App', []);

// app.controller("supplierCtrl", function ($scope, $http) {
//     $scope.suppliers = [];
//     $scope.form = {};

//     $scope.load = function () {
//         $http.get("/rest/suppliers").then(resp => {
//             $scope.suppliers = resp.data;
//             console.log($scope.suppliers);
//         });
//     }

//     $scope.load();
// });
// Tạo một service có tên là NhaCungCapService

// Tạo một module Angular
var app = angular.module('supplier-App', []);

// Định nghĩa service và controller trong cùng một tệp
app.service('NhaCungCapService', function($http) {
    this.getNhaCungCaps = function() {
        return $http.get('/rest/suppliers')
                    .then(function(response) {
                        return response.data;
                    });
    };
});

app.controller('NhaCungCapController', function($scope, NhaCungCapService) {
    $scope.nhacungcaps = [];

    $scope.loadNhaCungCaps = function() {
        NhaCungCapService.getNhaCungCaps().then(function(data) {
            $scope.nhacungcaps = data;
        });
    };

    // Gọi hàm loadNhaCungCaps để lấy dữ liệu khi controller được khởi tạo
    $scope.loadNhaCungCaps();
});
