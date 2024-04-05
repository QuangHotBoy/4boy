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
        localStorage.removeItem("account");
        var account = JSON.parse(localStorage.getItem("account")) || [];
        $http.get('/rest/login').then(resp => {
            $scope.accounts = resp.data;
            var check = false;
            for (var i = 0; i < $scope.accounts.users.length; i++) {
                var a = $scope.accounts.users[i];
                if ($scope.login.tenDangNhap === a.tenDangNhap) {
                    if ($scope.login.matKhau === a.matKhau) {
                        location.href = "/shop/home";
                        account.push($scope.accounts.users[i]);
                        for (var i = 0; i < $scope.accounts.address.length; i++) {
                            var b = $scope.accounts.address[i];
                            if (b.taiKhoan_diaChi.tenDangNhap === a.tenDangNhap && b.macDinh === true) {
                                account.push($scope.accounts.address[i]);
                            }
                        }
                        localStorage.setItem("account", JSON.stringify(account));
                        check = true;
                        break;
                    } else {
                        check = false;
                    }
                } else {
                    check = false;
                }
            }
            if (!check) {
                alert("Tài khoản hoặc mật khẩu không đúng");
            }
        }).catch(error => {
            alert("Loi")
        })
    };

    //lay ra thong tin sau khi dang nhap
    $scope.info_user = JSON.parse(localStorage.getItem("account")) || null;

    if ($scope.info_user !== null) {
        //  dịnh dạng ngày
        $scope.birthday = new Date($scope.info_user[0].ngaySinh);

        //infomation.form
        $scope.form = JSON.parse(localStorage.getItem("account")) || null;

        $scope.get_invoice = function () {
            var tenDangNhap = $scope.info_user[0].tenDangNhap;
            $http.get("/rest/auth/invoice/" + tenDangNhap).then(resp => {
                $scope.invoices = [];
                $scope.invoices = resp.data;
            }).catch(error => {
                console.log("Error", error)
            })
        };

        $scope.get_invoice();

    }

    // Đăng xuất lưu lại cart từ localStorage vào database
    var carts = JSON.parse(localStorage.getItem("cart")) || [];

    $scope.cart = [];

    for (let i = 0; i < carts.length; i++) {
        if (carts[i].user === user_id) {
            $scope.cart.push(carts[i]);
        }
    }

    // Xác định các sản phẩm cần xóa khỏi localStorage
    var productsToRemove = $scope.cart.map(function (product) {
        return product.id; // Giả sử id là thuộc tính duy nhất định danh sản phẩm
    });

    function removeFromLocalStorage(productsToRemove) {
        var carts = JSON.parse(localStorage.getItem("cart")) || [];

        // Loại bỏ các sản phẩm đã xác định khỏi mảng carts
        carts = carts.filter(function (product) {
            return !productsToRemove.includes(product.id);
        });

        // Lưu mảng đã cập nhật vào localStorage
        localStorage.setItem("cart", JSON.stringify(carts));
    }

    $scope.addCart = {
        get taiKhoan_gioHang() {
            return { tenDangNhap: $scope.info_user[0].tenDangNhap };
        },
        get gioHang() {
            return $scope.cart.map((item) => {
                return {
                    sanPham_gioHang: { isbn: item.id },
                    soLuong: item.quantity
                }
            });
        },
        add() {
            var cart = angular.copy(this);
            $http.post("/rest/add-cart", cart).then((resp) => {
            }).catch((error) => {
                ;
            })
        }
    }


    console.log($scope.birthday); 
     // lấy đơn đặt hàng của tài khỏan
     $scope.get_invoice = function () {
        var tenDangNhap = $scope.info_user[0].tenDangNhap;
        $http.get("/rest/auth/invoice/" + tenDangNhap).then(resp => {
            $scope.invoices = [];
            $scope.invoices = resp.data;
        }).catch(error => {
            console.log("Error", error)
        })
    };

    //lấy địa chỉ mặc định của tài khoản
    $scope.get_addressTrue = function () {
        var tenDangNhap = $scope.info_user[0].tenDangNhap;
        $http.get("/rest/auth/getTrueAddress/" + tenDangNhap).then(resp => {
            $scope.address = resp.data;
            // console.log($scope.address)
        }).catch(error => {
            console.log("Error", error);
        })
    }

    //lấy địa chỉ  của tài khoản
    $scope.get_addressFalse = function () {
        var tenDangNhap = $scope.info_user[0].tenDangNhap;
        $http.get("/rest/auth/getFalseAddress/" + tenDangNhap).then(resp => {
            $scope.addresss = [];
            $scope.addresss = resp.data;
            // console.log($scope.addresss)
        }).catch(error => {
            console.log("Error", error);
        })
    }


    $scope.editinfomation = function(tenDangNhap){
		$http.get("/rest/account/editmember/"+tenDangNhap).then(resp=>{
			$scope.form_info = resp.data; 
			$scope.form.ngaySinh = new Date($scope.form.ngaySinh);
			  // Hiển thị modal chỉnh sửa
			  $('#editinfo').modal('show');
		}).catch(error=>{
			console.log("Error",error)
		})
	}

    $scope.editpass = function(tenDangNhap){
		$http.get("/rest/account/editmember/"+tenDangNhap).then(resp=>{ 
			  // Hiển thị modal chỉnh sửa
			  $('#editpass').modal('show');
		}).catch(error=>{
			console.log("Error",error)
		})
	}


 

    $scope.get_addressTrue();
    $scope.get_addressFalse();
    $scope.get_invoice();

})