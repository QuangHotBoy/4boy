

// Tạo một module Angular
var app = angular.module('supplier-App', []);

app.controller("supplier-Ctrl", function ($scope, $http) {
    $scope.suppliers = [];
    $scope.form = {};

    $scope.initialize = function () {
        $http.get("/rest/suppliers").then(resp => {
            $scope.suppliers = resp.data;

            console.log($scope.suppliers);

            // // Kiểm tra xem DataTable đã được khởi tạo trên bảng chưa
            // if (!$.fn.dataTable.isDataTable('#table1')) {
            //     // Nếu chưa được khởi tạo, thì mới áp dụng DataTable
            //     $('#table1').DataTable();
            // }
        });
    }

    $scope.initialize();


   


    //xoa form
    $scope.reset = function () {
        $scope.form = {}
    }
    //hình
    $scope.imageChanged = function(files){
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/images', data, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
        }).then(resp => {
			$scope.form.image = resp.data.name;
		}).catch(error => {
			alert("Lỗi upload hình ảnh");
			console.log("Error", error);
		})
	}
});
