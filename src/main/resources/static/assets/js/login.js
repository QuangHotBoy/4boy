var app = angular.module('loginApp', []);

app.controller("loginCtrl", function ($scope, $http, $window) {

    $scope.form = {};

    $scope.reset = function () {
        var tenDangNhap = $scope.form.tenDangNhap;
        var matKhau = $scope.form.matKhau;
    
        // Gửi yêu cầu GET để nhận dữ liệu từ REST API
        $http.get('/rest/login?tenDangNhap=' + tenDangNhap + '&matKhau=' + matKhau)
            .then(function (response) {
                var data = response.data;
                // So sánh tên đăng nhập và mật khẩu nhập vào với dữ liệu từ REST API
                if (data !== null) {
                    // Nếu có dữ liệu trả về, đăng nhập thành công
                    console.log("Đăng nhập thành công!");
                    // Chuyển hướng đến trang thành công
                    $window.location.href = '/shop/home';
                } else {
                    // Nếu không có dữ liệu trả về, đăng nhập không thành công
                    console.log("Đăng nhập không thành công!");
                }
            }, function (error) {
                // Xử lý lỗi khi gửi yêu cầu GET
                console.error('Lỗi:', error);
            });
    };
    
    


    $scope.edit = function (productId) {
        $http.get('/rest/productsType')
            .then(resp => {
                $scope.items = resp.data;
                // Gán dữ liệu từ items vào form
                $scope.form = $scope.items[0]; // Ví dụ: Lấy dữ liệu từ phần tử đầu tiên của items
            })
            .catch(error => {
                console.log("Error", error);
                alert("Lỗi lấy dữ liệu sản phẩm!");
            });
    };

})