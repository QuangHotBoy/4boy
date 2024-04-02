var app = angular.module('loginApp', []);

app.controller("loginCtrl", function ($scope, $http, $window) {

    // đăng nhập
    $scope.login = {
        tenDangNhap: '', matKhau: '',
    }
    $scope.accounts = []

    // đăng ký

    $scope.register = {
        tenDangNhap: '', matKhau: '', hoTen: '', email: '', nhapLaiMatKhau: ''
    }



    $scope.login = function () {
        var account = JSON.parse(localStorage.getItem("buynow")) || [];
        $http.get('/rest/login').then(resp => {
            $scope.accounts = resp.data;
            var check = false;
            for (var i = 0; i < $scope.accounts.length; i++) {
                var a = $scope.accounts[i];
                if ($scope.login.tenDangNhap === a.tenDangNhap) {
                    if ($scope.login.matKhau === a.matKhau) {
                        location.href = "/shop/home";
                        account.push($scope.accounts[i]);
                        localStorage.setItem("account", JSON.stringify(account));
                        check = true;
                        break;
                    } else {
                        check = false;
                        console.log($scope.accounts[i])
                    }
                } else {
                    check = false;
                    console.log($scope.login.tenDangNhap)
                }
            }
            if (!check) {
                alert("Tài khoản hoặc mật khẩu không đúng");
            }
        }).catch(error => {
            alert("Loi")
        })
    };

    // $scope.register = function () {
    //     var account = angular.copy($scope.register);
    //     console.log(account);
    //     $http.post('/rest/register', account).then(resp => {
    //         if (!account === null) {
    //             $scope.accounts.push(account);

    //         } else {
    //             alert("Khong duoc de trong");
    //         }
    //     }).catch(error => {
    //         console.log("Error", error)
    //     })
    // }


    // $scope.dangky = {
    //     get quyenTaiKhoan() {
    //       return { tenDangNhap: "annv143" };
    //     },
    //     hoTen: $scope.inforcus.name,
    //     get diaChiNhanHang() {
    //       return { id: 1 };
    //     },
    //     soDienThoai: $scope.inforcus.phone,
    //     mail: $scope.inforcus.mail,
    //     ngayDatHang: new Date(),
    //     tongTien: $scope.subpayment,
    //     get maGiamGia() {
    //       return { id: "HUBERT" };
    //     },
    //     ghiChu: "",
    //     get trangThai_donDatHang() {
    //       return { id: 8 };
    //     },
    //     get phuongThucThanhToan() {
    //       return { id: 2 };
    //     },
    //     get chiTietDonDatHang() {
    //       return $buy.item.map((item) => {
    //         return {
    //           sanPham_donDatHang: { isbn: item.id },
    //           donGia: item.price,
    //           soLuong: item.quantity,
    //         };
    //       });
    //     },
    //     purchase() {
    //       var order = angular.copy(this);
    //       // Thực hiện đặt hàng
    //       $http
    //         .post("/rest/orders", order)
    //         .then((resp) => {
    //           alert("Đặt hàng thành công!");
    //           $buy.clear();
    
    //           console.log(order);
    //           location.href = "/shop/order/thank-for-order";
    //         })
    //         .catch((error) => {
    //           alert("Đặt hàng lỗi!");
    //           console.log(error);
    //         });
    //     },
    //   };



})