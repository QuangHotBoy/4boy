var app = angular.module("admin-app", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/admin/product-type", {
            templateUrl: "/admin/product-types/product-type.html",
            controller: "productTypeCtrl" // Điều chỉnh tên controller để phù hợp với định nghĩa dưới đây
        })
        .otherwise({
            redirectTo: "/" // Chuyển hướng về URL gốc nếu URL được cung cấp không khớp với bất kỳ định tuyến nào
        });

});

app.controller("productTypeCtrl", function ($scope, $http) {
    // Định nghĩa logic của controller ở đây nếu cần
});
