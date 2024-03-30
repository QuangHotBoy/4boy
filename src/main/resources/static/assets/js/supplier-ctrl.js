// Tạo một module Angular
var app = angular.module('supplier-App', []);

app.controller("supplier-Ctrl", function ($scope, $http) {
    $scope.suppliers = [];
    $scope.form = {};

    $scope.initialize = function () {
        $http.get("/rest/suppliers").then(resp => {
            $scope.suppliers = resp.data;
        });
    }

    $scope.initialize();

    // Xử lý khi người dùng thay đổi hình ảnh
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
    


    // Hàm thêm nhà xuất bản
    $scope.create = function () {
        var item = angular.copy($scope.form);
        $http.post('/rest/suppliers', item).then(resp => {
            if (!$scope.suppliers) {
                $scope.suppliers = [];
            }
            $scope.suppliers.push(resp.data);
            $scope.reset();
            alert("Thêm mới nhà xuất bản thành công!");
            $scope.initialize(); // Load lại danh sách sau khi thêm thành công
        }).catch(error => {
            alert("Lỗi thêm mới nhà xuất bản!");
            console.log("Error", error);
        });
    }
    

    // Hàm reset form
    $scope.reset = function () {
        $scope.form = {};
    }

});
