var app = angular.module('forgotApp', []);

app.controller("forgotCtrl", function ($scope, $http, $window, $timeout) {

    $scope.form = {
        tenDangNhap: '', // Thêm trường tenDangNhap vào form
        email: '' // Thêm trường email vào form
    };
    $scope.accounts = [];
    // đăng ký
    $scope.kiemtratendangnhapMessage = ""; // Khởi tạo biến thông báo
   
    $scope.updatepass1 = {
        tenDangNhap: '',
        matKhau: '',
        xacnhanmatkhau: ''
    };
    // $scope.editpass = function (tenDangNhap) {
    //     $http.get("/rest/account/editmember/" + tenDangNhap).then(resp => {
    //         $scope.form_info = resp.data;
    //         // Hiển thị modal chỉnh sửa
    //         $('#editpass').modal('show');
    //     }).catch(error => {
    //         console.log("Error", error);
    //     });
    // };
    
    // $scope.updatepass = function () {
    //     var matkhaumoi = $scope.form_info.pass1;
    //     var xacnhanmatkhau = $scope.form_info.pass2;
    //     var tendangnhap = $scope.info_user[0].tenDangNhap;
    //     console.log(tenDangNhap);
    
    //     // Kiểm tra xác nhận mật khẩu
    //     if (matkhaumoi !== xacnhanmatkhau) {
    //         iziToast.warning({
    //             title: 'Thông báo',
    //             message: 'Mật khẩu nhập lại không đúng!',
    //             position: 'topRight'
    //         });
    //         return; // Dừng hàm nếu xác nhận mật khẩu không đúng
    //     }
    
    //     // Dữ liệu cần gửi
    //     var data = {
    //         pass1: matkhaumoi,
    //         pass2: xacnhanmatkhau,
    //         tenDangNhap: tendangnhap // Pass the username along with the request
    //     };
    
    //     // Gửi yêu cầu PUT
    //     $http.put("/rest/account/updatepass/" + tendangnhap, null, { params: data }).then(resp => {
    //         // Cập nhật dữ liệu trong scope và localStorage
    //         var index = $scope.accounts.findIndex(item => item.tenDangNhap === $scope.info_user[0].tenDangNhap);
    //         $scope.accounts[index] = resp.data;
    
    //         var account = JSON.parse(localStorage.getItem("account")) || [];
    //         account = account.map(acc => {
    //             if (acc.tenDangNhap === $scope.form_info.tenDangNhap) {
    //                 return resp.data;
    //             }
    //             return acc;
    //         });
    //         localStorage.setItem("account", JSON.stringify(account));
    
    //         // Tải lại trang sau khi cập nhật mật khẩu thành công
    //         location.reload();
    //         console.log("Success", resp);
    //     }).catch(error => {
    //         console.log("Error", error);
    //     });
    // };
    
    

    function blff(){
        var tenDangNhap = document.getElementById("tenDangNhap").value;
        var email = document.getElementById("email").value;
        if (tenDangNhap.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập tên đăng nhập.',
                position: 'topRight'
            });
            return false;
        }
        if (email.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập email.',
                position: 'topRight'
            });
            return false;
        }
        return true;
    }

    $scope.kiemtratendangnhap = function() {
        if (!blff()) {
            // Nếu form không hợp lệ, không tiến hành thêm mới
            return;
        }
        if (!$scope.form.tendangnhap) {
            // Nếu tên đăng nhập không tồn tại, hiển thị thông báo
            $scope.kiemtratendangnhapMessage = "Vui lòng nhập tên đăng nhập";
        } else {
            // Nếu tên đăng nhập hợp lệ, reset thông báo
            $scope.kiemtratendangnhapMessage = "cdcf";
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
