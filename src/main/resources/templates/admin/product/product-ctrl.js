app.controller("product-ctrl",function($scope,$http){
    $scope.items = [];
    $scope.form = {};

    $scope.initialize = function(){ 
        //load dữ liệu data
        $http.get("admin/product").then(resp =>{
            $scope.items = resp.data;
            $scope.items.forEach(item =>{
                item.createDate = new Date(item.createDate)
            })
        });
        //load



    }












})