var app = angular.module('loginApp', []);

app.controller("loginCtrl", function ($scope, $http, $window) {

    // đăng nhập
    $scope.login = {
        tenDangNhap: '', matKhau: '',
    }
    $scope.accounts = [];
    $scope.diachi = [];

    // đăng ký 
    $scope.register = function () {
        var item = angular.copy($scope.form);
        var tenDangNhap = document.getElementById("tenDangNhap").value;
        var matKhau = document.getElementById("matKhau").value;
        var nhapLaiMatKhau = document.getElementById("nhapLaiMatKhau").value;
        var hoTen = document.getElementById("hoTen").value;
        var email = document.getElementById("email").value;
        if (tenDangNhap === "" || hoTen === "" || matKhau === "" || nhapLaiMatKhau === "" || hoTen === "" || email === "") {
            //thông báo
            iziToast.error({
                title: 'Thông báo',
                message: 'Không được để trống !',
                position: 'topRight'
            });
        } else {
            if (!kiemTraMatKhau(matKhau)) {
                //thông báo
                iziToast.error({
                    title: 'Thông báo',
                    message: 'Mật Khẩu phải 8 kí tự, ít nhất một chữ hoa, số, kí tự !',
                    position: 'topRight'
                });
            } else {
                if (matKhau != nhapLaiMatKhau) {
                    //thông báo
                    iziToast.error({
                        title: 'Thông báo',
                        message: 'Xác nhận mật khẩu không trùng !',
                        position: 'topRight'
                    });
                } else {
                    $http.post("/rest/register", item).then(function (resp) {
                        $scope.accounts.push(item);
                        // thông báo
                        iziToast.info({
                            title: 'Thông báo',
                            message: 'Thêm tài khoản thành công !',
                            position: 'topRight'
                        });
                        // Chờ 3 giây trước khi thực hiện reload
                        setTimeout(function () {
                            location.reload();
                        }, 1500)
                        location.href = "/shop/login";
                    }).catch(error => {
                        console.log("Error", error);
                    })
                }
            }

        }



    }

    // Hàm kiểm tra mật khẩu
    function kiemTraMatKhau(matKhau) {
        // Kiểm tra độ dài của mật khẩu
        if (matKhau.length < 8) {
            return false;
        }

        // Kiểm tra xem mật khẩu có chứa ít nhất một ký tự số không
        if (!/\d/.test(matKhau)) {
            return false;
        }

        // Kiểm tra xem mật khẩu có chứa ít nhất một ký tự chữ cái viết thường không
        if (!/[a-z]/.test(matKhau)) {
            return false;
        }

        // Kiểm tra xem mật khẩu có chứa ít nhất một ký tự chữ cái viết hoa không
        if (!/[A-Z]/.test(matKhau)) {
            return false;
        }

        // Kiểm tra xem mật khẩu có chứa ít nhất một ký tự đặc biệt không
        if (!/[^a-zA-Z0-9]/.test(matKhau)) {
            return false;
        }

        // Nếu mật khẩu thoả mãn tất cả các điều kiện, trả về true
        return true;
    }

    $scope.login = function () {
        localStorage.removeItem("account");
        var account = JSON.parse(localStorage.getItem("account")) || [];
        var username = $scope.login.tenDangNhap
        var pass = $scope.login.matKhau
        $http.get('/rest/login').then(resp => {
            $scope.accounts = resp.data;
            var check = true;
            if (username == null || pass == null) {
                // thông báo
                iziToast.warning({
                    title: 'Thông báo',
                    message: 'Thất bại !',
                    position: 'topRight'
                });
            } else {
                for (var i = 0; i < $scope.accounts.users.length; i++) {
                    var a = $scope.accounts.users[i];
                    if ($scope.login.tenDangNhap === a.tenDangNhap) {
                        if ($scope.login.matKhau === a.matKhau) {
                            if (a.active === false) {
                                iziToast.info({
                                    title: 'Thông báo',
                                    message: 'Tài khoản ngưng hoạt động !',
                                    position: 'topRight'
                                });
                            } else {
                                $scope.cart(a.tenDangNhap);

                                location.href = "/shop/home";
                                account.push($scope.accounts.users[i]);
                                for (var i = 0; i < $scope.accounts.address.length; i++) {
                                    var b = $scope.accounts.address[i];
                                    if (b.taiKhoan_diaChi.tenDangNhap === a.tenDangNhap && b.macDinh === true) {
                                        account.push($scope.accounts.address[i]);
                                    }
                                }
                                localStorage.setItem("account", JSON.stringify(account));
                                break;
                            }
                        } else {
                            check = false;
                        }
                    } else {
                        check = false;
                    }
                }
                if (!check) {
                    iziToast.warning({
                        title: 'Thông báo',
                        message: 'Sai tên đăng nhập hoặc mật khẩu !',
                        position: 'topRight'
                    });
                }
            }
        }).catch(error => {
            console.log("Error", error)
        })
    };

    $scope.checkLogin = function () {
        var account = localStorage.getItem("account") || null;
        console.log(account);
        console.log(2);
        // if (account === null) {
        //     location.href = "/shop/login";
        // } else {
        //     location.href = "/shop/auth/index";
        // }
    }

    $scope.isUserLoggedIn = function () {
        var account = localStorage.getItem("account");
        return !!account; // Trả về true nếu có giá trị trong localStorage.getItem("account")
    };

    // đăng xuất
    $scope.logout = function () {
        $scope.addToCart();
        localStorage.removeItem("account");
        location.href = "/shop/home";
    }

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

    $scope.addToCart = function () {
        // Đăng xuất lưu lại cart từ localStorage vào database
        var carts = JSON.parse(localStorage.getItem("cart")) || [];

        $scope.cart = [];

        for (let i = 0; i < carts.length; i++) {
            if (carts[i].user === $scope.info_user[0].tenDangNhap) {
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
                    removeFromLocalStorage(productsToRemove);
                }).catch((error) => {
                    ;
                })
            }
        }

        $scope.addCart.add();
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

    //gọi form cập nhập thông tin tài khoản
    $scope.editinfomation = function (tenDangNhap) {
        $http.get("/rest/account/editmember/" + tenDangNhap).then(resp => {
            $scope.form_info = resp.data;
            $scope.form.ngaySinh = new Date($scope.form.ngaySinh);
            // Hiển thị modal chỉnh sửa
            $('#editinfo').modal('show');
        }).catch(error => {
            console.log("Error", error)
        })
    }

    // kiểm tra ngày sinh
    function kiemTraNgayHopLe(ngaySinh) {
        // Lấy ngày hiện tại
        var ngayHienTai = new Date();
        var namHienTai = ngayHienTai.getFullYear();
        var thangHienTai = ngayHienTai.getMonth() + 1;
        var ngayHienTai = ngayHienTai.getDate();

        // Chuyển đổi ngày sinh từ chuỗi ISO 8601 thành đối tượng Date
        var ngaySinhDate = new Date(ngaySinh);

        // Lấy thông tin ngày, tháng, năm từ ngày sinh
        var ngay = ngaySinhDate.getDate();
        var thang = ngaySinhDate.getMonth() + 1;
        var nam = ngaySinhDate.getFullYear();

        // Kiểm tra xem ngày sinh có phải là ngày hiện tại không
        if (nam == namHienTai && thang == thangHienTai && ngay == ngayHienTai) {
            return false; // Ngày sinh là ngày hiện tại
        }

        // Kiểm tra xem ngày sinh có lớn hơn ngày hiện tại không
        if (nam > namHienTai || (nam == namHienTai && thang > thangHienTai) || (nam == namHienTai && thang == thangHienTai && ngay >= ngayHienTai)) {
            return false; // Ngày sinh là tương lai
        }

        // Kiểm tra xem ngày sinh có đủ 18 tuổi không
        var tuoi18 = new Date(namHienTai - 18, thangHienTai - 1, ngayHienTai);
        if (ngaySinhDate > tuoi18) {
            return false; // Người dùng không đủ 18 tuổi
        }

        return true; // Ngày hợp lệ
    }

    // cập nhập thông tin tài khoản
    $scope.updateinfo = function () {
        $scope.form_info.ngaySinh = new Date($scope.birthday).toISOString();
        var item = angular.copy($scope.form_info);
        var hoTen = item.hoTen;
        var sdt = item.sdt;
        if (hoTen.trim() == "" || sdt.trim() == "") {
            //    thông báo
            iziToast.error({
                title: 'Thông báo',
                message: 'Không được để trống  !',
                position: 'topRight'
            });
        } else {
            if (!kiemTraNgayHopLe(item.ngaySinh)) {
                //    thông báo
                iziToast.error({
                    title: 'Thông báo',
                    message: 'Ngày nhập vào không thể là ngày hiện tại và phải đủ 18 tuổi !',
                    position: 'topRight'
                });
            } else {
                $http.put("/rest/account/update/" + $scope.info_user[0].tenDangNhap, item).then(resp => {
                    var index = $scope.accounts.findIndex(item => item.tenDangNhap === $scope.form_info.tenDangNhap);
                    $scope.accounts[index] = resp.data;
                    // Cập nhật lại thông tin tài khoản trong localStorage
                    var account = JSON.parse(localStorage.getItem("account")) || [];
                    account = account.map(acc => {
                        if (acc.tenDangNhap === $scope.form_info.tenDangNhap) {
                            return resp.data;
                        }
                        return acc;
                    });
                    // thông báo
                    iziToast.info({
                        title: 'Thông báo',
                        message: 'Cập nhập thông tin tài khoản thành công !',
                        position: 'topRight'
                    });
                    localStorage.setItem("account", JSON.stringify(account));
                    // Chờ 3 giây trước khi thực hiện reload
                    setTimeout(function () {
                        location.reload();
                    }, 1500)
                    console.log("Success", resp);
                }).catch(error => {
                    console.log("Error", error)
                });
            }
        }
    }

    // gọi form cập nhập mật khẩu
    $scope.editpass = function (tenDangNhap) {
        $http.get("/rest/account/editmember/" + tenDangNhap).then(resp => {
            $scope.form_info = resp.data;
            // Hiển thị modal chỉnh sửa
            $('#editpass').modal('show');
        }).catch(error => {
            console.log("Error", error)
        })
    }

    //cập nhập mật khẩu
    $scope.updatepass = function () {
        var matkhauhientai = $scope.form_pass.matKhau;
        var matkhaumoi = $scope.form_pass.pass1;
        var xnmk = $scope.form_pass.pass2;
        var tendangnhap = $scope.info_user[0].tenDangNhap
        if (matkhauhientai == null) {
            //    thông báo
            iziToast.warning({
                title: 'Thông báo',
                message: 'Mật khẩu trống !',
                position: 'topRight'
            });
        } else {
            if (matkhauhientai != $scope.info_user[0].matKhau) {
                //    thông báo
                iziToast.warning({
                    title: 'Thông báo',
                    message: 'Sai mật khẩu !',
                    position: 'topRight'
                });
            }
            if (matkhaumoi != xnmk) {
                //    thông báo
                iziToast.warning({
                    title: 'Thông báo',
                    message: 'Mật khẩu nhập lại không đúng !',
                    position: 'topRight'
                });
            } else {
                $http.put("/rest/account/updatepass/" + tendangnhap, null, { params: { pass1: matkhaumoi } }).then(resp => {
                    var index = $scope.accounts.findIndex(item => $scope.form_pass.tenDangNhap === $scope.info_user[0].tenDangNhap);
                    $scope.accounts[index] = resp.data;

                    // Cập nhật lại thông tin tài khoản trong localStorage
                    var account = JSON.parse(localStorage.getItem("account")) || [];
                    account = account.map(acc => {
                        if (acc.tenDangNhap === $scope.form_info.tenDangNhap) {
                            return resp.data;
                        }
                        return acc;
                    });
                    localStorage.setItem("account", JSON.stringify(account));
                    // load lại trang
                    location.reload();
                    console.log("Success", resp);
                }).catch(error => {
                    console.log("Error", error)
                })
            }

        }
    }

    // gọi form cập nhập địa chỉ mặc định
    $scope.edittrueAddress = function (id) {
        $http.get("/rest/getaddress/" + id).then(resp => {
            $scope.form_addressTrue = []
            $scope.form_addressTrue = resp.data;
            console.log($scope.form_addressTrue)
            // Hiển thị modal chỉnh sửa
            $('#edittrueAddress').modal('show');
        }).catch(error => {
            console.log("Error", error)
        })
    }

    // gọi form cập nhập các địa chỉ thường
    $scope.editfalseAddress = function (id) {
        $http.get("/rest/getaddress/" + id).then(resp => {
            $scope.form_addressfase = resp.data;
            console.log($scope.form_address)
            // Hiển thị modal chỉnh sửa
            $('#editfalseAddress').modal('show');
        }).catch(error => {
            console.log("Error", error)
        })
    }

    // cập nhập địa chỉ mặc định
    $scope.updateTrueAddress = function () {
        var item = angular.copy($scope.form_addressTrue)

        var ten = item.hoTen;
        var sdt = item.sdt;
        var dc = item.diaChi;
        if (ten.trim() == "" || sdt.trim() == "" || dc.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Không được để trống !',
                position: 'topRight'
            });
        } else {
            $http.put("/rest/address/updateTrue/" + item.id, item).then(resp => {
                var index = $scope.diachi.findIndex(item => item.tenDangNhap === $scope.form_addressTrue.tenDangNhap);
                $scope.diachi[index] = resp.data;
                // Cập nhật lại thông tin tài khoản trong localStorage
                var accounts = JSON.parse(localStorage.getItem("account")) || [];
                var updatedAccounts = accounts.map(acc => {
                    if (acc.tenDangNhap === $scope.info_user.tenDangNhap) {
                        acc.diaChi = resp.data.diaChi;
                    }
                    return acc;
                });
                localStorage.setItem("account", JSON.stringify(updatedAccounts));
                iziToast.info({
                    title: 'Thông báo',
                    message: 'Cập nhập địa chỉ thành công !',
                    position: 'topRight'
                });

                // Chờ 3 giây trước khi thực hiện reload
                setTimeout(function () {
                    location.reload();
                }, 1500)
                console.log("Success", resp);
            }).catch(error => {
                console.log("Error", error)
            })
        }
    }

    // cập nhập địa chỉ thường
    $scope.updateFalseAddress = function () {
        var item = angular.copy($scope.form_addressfase)
        var ten = item.hoTen;
        var sdt = item.sdt;
        var dc = item.diaChi;
        if (ten.trim() == "" || sdt.trim() == "" || dc.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Không được để trống !',
                position: 'topRight'
            });
        } else {
            $http.put("/rest/address/updateFalse/" + item.id, item).then(resp => {
                var index = $scope.diachi.findIndex(item => item.tenDangNhap === $scope.form_addressfase.tenDangNhap);
                $scope.diachi[index] = resp.data;

                // Cập nhật lại thông tin tài khoản trong localStorage
                var accounts = JSON.parse(localStorage.getItem("account")) || [];
                var updatedAccounts = accounts.map(acc => {
                    if (acc.tenDangNhap === $scope.info_user.tenDangNhap) {
                        acc.diaChi = resp.data.diaChi;
                    }
                    return acc;
                });
                localStorage.setItem("account", JSON.stringify(updatedAccounts));
                iziToast.info({
                    title: 'Thông báo',
                    message: 'Cập nhập địa chỉ thành công !',
                    position: 'topRight'
                });

                // Chờ 3 giây trước khi thực hiện reload
                setTimeout(function () {
                    location.reload();
                }, 1500)
                console.log("Success", resp);
            }).catch(error => {
                console.log("Error", error)
            })
        }
    }

    // thêm địa chỉ
    $scope.addAddress = function () {
        var item = angular.copy($scope.form_address)
        var tenDangNhap = $scope.info_user[0].tenDangNhap;
        var ten = item.hoTen;
        var sdt = item.sdt;
        var dc = item.diaChi;
        if (ten.trim() == "" || sdt.trim() == "" || dc.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Không được để trống !',
                position: 'topRight'
            });
        } else {
            $http.post("/rest/address/add/" + $scope.info_user[0].tenDangNhap, item).then(resp => {
                $scope.diachi.push(item);
                // Cập nhật lại thông tin tài khoản trong localStorage
                var accounts = JSON.parse(localStorage.getItem("account")) || [];
                var updatedAccounts = accounts.map(acc => {
                    if (acc.tenDangNhap === $scope.info_user.tenDangNhap) {
                        acc.diaChi = resp.data.diaChi;
                    }
                    return acc;
                });
                localStorage.setItem("account", JSON.stringify(updatedAccounts));
                iziToast.info({
                    title: 'Thông báo',
                    message: 'Thêm địa chỉ thành công !',
                    position: 'topRight'
                });

                // Chờ 3 giây trước khi thực hiện reload
                setTimeout(function () {
                    location.reload();
                }, 1500)
                console.log("Success", resp);
            })
        }
    }

    $scope.delete = function (id) {
        var id = id;
        $http.delete("/rest/address/delete/" + id).then(resp => {
            var index = $scope.diachi.findIndex(item => item.id == id);
            $scope.diachi.splice(index, 1);

            // Load lại trang
            location.reload();
            console.log("Success", resp);
        })
    }

    $scope.cart = function (user_id) {
        // Hàm chuyển đổi từ mảng con sang đối tượng
        function arrayToObject(arr) {
            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                var key = arr[i][0];
                var value = arr[i][1];
                obj[key] = value;
            }
            return obj;
        }

        $http.get("/rest/cart/" + user_id).then(function (resp) {
            var cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []; // Lấy giỏ hàng từ localStorage, nếu không có thì tạo một mảng mới

            var data = resp.data;
            // Lặp qua các phần tử trong resp.data và chuyển đổi thành đối tượng
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var convertedData = arrayToObject(data[key]);
                    // Kiểm tra xem mục đã tồn tại trong giỏ hàng chưa (theo user và id)
                    var exists = false;
                    for (var i = 0; i < cart.length; i++) {
                        if (cart[i].user === convertedData.user && parseInt(cart[i].id) === parseInt(convertedData.id)) {
                            exists = true;
                            break;
                        }
                    }
                    // Nếu mục chưa tồn tại trong giỏ hàng, thêm vào
                    if (!exists) {
                        cart.push(convertedData); // Thêm đối tượng vào mảng giỏ hàng
                    }
                }
            }
            console.log(cart);

            localStorage.setItem("cart", JSON.stringify(cart)); // Lưu giỏ hàng vào localStorage
        });
    }

    var aaa = JSON.parse(localStorage.getItem("account")) || null;
    if (aaa != null) {
        $scope.get_addressTrue();
        $scope.get_addressFalse();
        $scope.get_invoice();

    }
})
