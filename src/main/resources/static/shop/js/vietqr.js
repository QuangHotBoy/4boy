var app = angular.module("myApp", []);

app.controller("QRController", function ($scope) {
  $scope.bank = {
    id: "BIDV",
    no: "0344436724",
    amount: "100000",
    desp: "Thanh toán đơn hàng",
    name: "LUONG VAN QUOC",
  };

  

  console.log($scope.bank);

//   let QRCode = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-compact2.png?amount=${MY_BANK.AMOUNT}`;

//   const qr_code = document.getElementById("#vietqr-code");
});
