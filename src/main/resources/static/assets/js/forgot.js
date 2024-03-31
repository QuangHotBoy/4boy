var app = angular.module('forgotApp', []);

app.controller("forgotCtrl", function ($scope, $http, $window) {

    $scope.form = {
        tenDangNhap: '', // Thêm trường tenDangNhap vào form
        email: '' // Thêm trường email vào form
    };
    $scope.kiemtratendangnhapMessage = ""; // Khởi tạo biến thông báo

    $scope.kiemtratendangnhap = function() {
        if (!$scope.form.tendangnhap) { // Kiểm tra xem tên đăng nhập có tồn tại không
            $scope.kiemtratendangnhapMessage = "<<<  Vui lòng nhập tên đăng nhập  >>>";
        } else {
            $scope.kiemtratendangnhapMessage = ""; // Reset thông báo nếu tên đăng nhập hợp lệ
        }
    };
    
    
    $scope.reset = function () {
        var tenDangNhap = $scope.form.tenDangNhap;
        var email = $scope.form.email; // Lấy giá trị email từ form
    
        // Gửi yêu cầu GET để nhận dữ liệu từ REST API
        $http.get('/rest/login?tenDangNhap=' + tenDangNhap + '&email=' + email)
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
                    console.log(data);
                }
            }, function (error) {
                // Xử lý lỗi khi gửi yêu cầu GET
                console.error('Lỗi:', error);
            });
    };

    $scope.edit = function () {
        $http.get('/rest/login')
            .then(resp => {
                $scope.items = resp.data;
                // Gán dữ liệu từ items vào form
                if ($scope.items.length > 0) {
                    $scope.form.tenDangNhap = $scope.items[0].tendangnhap;
                    $scope.form.email = $scope.items[0].email;
                }
            })
            .catch(error => {
                console.log("Error", error);
                alert("Lỗi lấy dữ liệu sản phẩm!");
            });
    };
    
   

});
