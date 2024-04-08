var app = angular.module("myApp", []);

app.controller("QRController", function ($scope) {
  $scope.bank = {
    id: "BIDV",
    no: "0344436724",
    amount: "100000",
    desp: "Thanh toán đơn hàng",
    name: "LUONG VAN QUOC",
  };

  
  $scope.checkLogin = function () {
    var account = localStorage.getItem("account") || null;
console.log(2);
    if (account === null) {
        location.href = "/shop/login"; 
    } else {
        location.href = "/shop/auth/index"; 
    }
}

// đăng xuất
$scope.logout = function () {
    $scope.addToCart();
    localStorage.removeItem("account");
    location.href = "/shop/home";
}
  console.log($scope.bank);

//   let QRCode = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-compact2.png?amount=${MY_BANK.AMOUNT}`;

//   const qr_code = document.getElementById("#vietqr-code");
});
