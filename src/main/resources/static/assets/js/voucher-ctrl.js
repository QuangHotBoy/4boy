var app = angular.module('voucherApp', []);
app.controller("voucher-ctrl", function($scope, $http){
    $scope.vouchers = [];
    $scope.form ={};

    $scope.initialize = function(){
        //load voucher
        $http.get("/rest/vouchers").then(resp =>{
            $scope.vouchers = resp.data;
            $scope.vouchers.forEach(voucher =>{
                voucher.createDate = new Date(voucher.createDate)
            })
        });
    }

    //khoi dau
    $scope.initialize();

    //xoa form
    $scope.reset = function () {
        $scope.form = {}
    }

    //hienthi len form
    $scope.edit = function(id) {
        $http.get(`/rest/productsType/${id}`) // Sử dụng id để xác định sản phẩm cần lấy
            .then(resp => {
                $scope.vouchers = resp.data; // Gán dữ liệu từ resp.data vào vouchers
                // Gán dữ liệu từ resp.data vào form
            })
            .catch(error => {
                console.log("Error", error);
                alert("Lỗi lấy dữ liệu mã giảm giá");
            });
    };

    //them mgg moi
    $scope.create = function () {
        var voucher = angular.copy($scope.form);
        $http.post('/rest/vouchers', voucher).then(resp => {
            // resp.data.createDate = new Date(resp.data.createDate)
            if (!$scope.vouchers) {
                $scope.vouchers = []; // Khởi tạo mảng nếu chưa tồn tại
            }
            $scope.vouchers.push(resp.data);
            $scope.reset();
            alert("Thêm mới sản phẩm thành công!");
            // Load lại dữ liệu sau khi thêm mới thành công
            loadData();
        }).catch(error => {
            alert("Lỗi thêm mới sản phẩm!");
            console.log("Error", error);
        });
    }

    //cap nhat mgg
    $scope.update = function(){
    }

    //xoa mgg
    $scope.delete = function (voucher) {
        if (confirm("Bạn muốn xóa sản phẩm này?")) {
            $http.delete(`/rest/vouchers/${voucher.id}`).then(resp => {
                var index = $scope.vouchers.findIndex(p => p.id == voucher.id);
                $scope.voucher.splice(index, 1);
                $scope.reset();
                alert("Xóa sản phẩm thành công!");
            }).catch(error => {
                alert("Lỗi xóa sản phẩm!");
                console.log("Error", error);
            })
        }
    }


}

)