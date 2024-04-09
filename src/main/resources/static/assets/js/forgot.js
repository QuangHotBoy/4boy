var app = angular.module('forgotApp', []);

app.controller("forgotCtrl", function ($scope, $http, $window, $timeout) {

    $scope.form = {
        tenDangNhap: '', // Thêm trường tenDangNhap vào form
        email: '' // Thêm trường email vào form
    };
    $scope.kiemtratendangnhapMessage = ""; // Khởi tạo biến thông báo
   
    $scope.register = {
        tenDangNhap: '', matKhau: '', nhapLaiMatKhau: ''
    }
    $scope.registerNewPassword = function () {
        $http.post('/rest/login', $scope.register)
            .then(function (response) {
                // Handle success
                alert("Mật khẩu mới đã được đăng ký thành công!");
                // Redirect or perform any other actions as needed
            })
            .catch(function (error) {
                // Handle error
                alert("Có lỗi xảy ra khi đăng ký mật khẩu mới: " + error.data.message);
            });
    };

    $scope.kiemtratendangnhap = function() {
        if (!$scope.form.tendangnhap) { // Kiểm tra xem tên đăng nhập có tồn tại không
            $scope.kiemtratendangnhapMessage = "<<<  Vui lòng nhập tên đăng nhập  >>>";
        } else {
            $scope.kiemtratendangnhapMessage = ""; // Reset thông báo nếu                tên đăng nhập hợp lệ
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
    $scope.codeInput = ['', '', '', '', '', ''];

    $scope.focusNext = function(event, index) {
        // Kiểm tra nếu ký tự nhập vào là số và chỉ cho phép nhập một ký tự
        if (event.keyCode >= 48 && event.keyCode <= 57 && $scope.codeInput[index].length === 1) {
            // Chuyển focus sang ô kế tiếp
            var nextIndex = index + 1;
            if (nextIndex < $scope.codeInput.length) {
                $timeout(function() {
                    var nextInput = document.querySelector('.code-input:nth-child(' + (index + 2) + ')');
                    nextInput.focus();
                });
            }
        }
    };

    $scope.verifyCode = function() {
        var code = $scope.codeInput.join('');
        
        // Lấy giá trị email từ input ẩn
        var email = $scope.email;
        var tendangnhap = $scope.tenDangNhap;
    
        // Ensure maxacnhan is not empty before sending the request
        if (code.trim() === '') {
            console.error('Maxacnhan is empty');
            return;
        }
    
        // Create an object to hold the data to be sent
        var postData = {
            maxacnhan: code,
            email: email,
            tendangnhap: tendangnhap // Assuming tendangnhap is also needed
        };
    
        // Send POST request with data
        $http.post('/kiemtrama', postData)
            .then(function(response) {
                // Xử lý phản hồi từ máy chủ sau khi kiểm tra mã xác nhận
                // Ví dụ: chuyển hướng hoặc hiển thị thông báo
                console.log(response.data);
            })
            .catch(function(error) {
                // Xử lý lỗi nếu có
                console.error('Error:', error);
            });
    };
    
    
    
    
    
});
