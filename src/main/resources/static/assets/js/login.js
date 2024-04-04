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
                            if(b.taiKhoan_diaChi.tenDangNhap === a.tenDangNhap && b.macDinh === true){
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
 $scope.info_user =JSON.parse(localStorage.getItem("account")) || null;

//  dịnh dạng ngày
 $scope.birthday = new Date($scope.info_user[0].ngaySinh) ; 

 //infomation.form
 $scope.form = JSON.parse(localStorage.getItem("account")) || null;

 console.log($scope.birthday);
 // lấy đơn đặt hàng của tài khỏan
 $scope.get_invoice= function(){
     var tenDangNhap = $scope.info_user[0].tenDangNhap;
     $http.get("/rest/auth/invoice/"+tenDangNhap).then(resp=>{
        $scope.invoices =[];
        $scope.invoices = resp.data;
     }).catch(error=>{
        console.log("Error", error)
     })
 };






 
 $scope.get_invoice();

     



})