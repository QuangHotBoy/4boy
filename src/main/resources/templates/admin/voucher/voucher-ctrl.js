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
    $scope.reset = function(){
    }

    //hienthi len form
    $scope.edit = function(voucher){
    }

    //them mgg moi
    $scope.create = function(){
    }

    //cap nhat mgg
    $scope.update = function(){
    }

    //xoa mgg
    $scope.delete = function(voucher){
    }


}

)