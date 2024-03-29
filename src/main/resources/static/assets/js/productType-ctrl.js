var app = angular.module('myApp', []);

app.controller("myCtrl", function ($scope, $http) {
    $scope.types = [];
    $scope.form = {};

    $scope.initialize = function () {
        $http.get("/rest/types").then(resp => {
            $scope.types = resp.data;

            console.log($scope.types);

            // // Kiểm tra xem DataTable đã được khởi tạo trên bảng chưa
            // if (!$.fn.dataTable.isDataTable('#table1')) {
            //     // Nếu chưa được khởi tạo, thì mới áp dụng DataTable
            //     $('#table1').DataTable();
            // }
        });
    }

    $scope.initialize();


   


    //xoa form
    $scope.reset = function () {
        $scope.form = {}
    }
    //hàm edit
    $scope.edit = function (id) {
        // Gửi yêu cầu GET đến API để lấy thông tin của mục có ID tương ứng
        $http.get('/rest/types/' + id)
            .then(function (response) {
                // Sao chép dữ liệu từ phản hồi vào biến form để điền vào form chỉnh sửa
                $scope.form = angular.copy(response.data);
                $('#exampleModal1').modal('show');
                console.log(id);
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có
                console.error('Error fetching item for editing:', error);
            });
    };

    // $scope.edit = function(item){
    // 	$scope.form = angular.copy(item);
    // 	$("exampleModal1").tab("show");
    // }

    //hàm thêm
    $scope.create = function () {
        // Kiểm tra dữ liệu trống
        // if (!$scope.form || !$scope.form.name || !$scope.form.description) {
        //     alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
        //     return;
        // }
    
        var item = angular.copy($scope.form);
        $http.post('/rest/types', item).then(resp => {
            if (!$scope.items) {
                $scope.items = [];
            }
            $scope.items.push(resp.data);
            $scope.reset();
            alert("Thêm mới sản phẩm thành công!");
            loadData();
        }).catch(error => {
            alert("Lỗi thêm mới sản phẩm!");
            console.log("Error", error);
        });
    }
    
    //hàm cập nhật
    $scope.update = function () {
        var item = angular.copy($scope.form);
        $http.put('/rest/types/' + item.id, item).then(resp => {
            // Kiểm tra nếu $scope.items chưa được khởi tạo, thì khởi tạo nó là một mảng trống
            if (!$scope.items) {
                $scope.items = [];
            }

            // Tìm và cập nhật mục đã được chỉnh sửa trong mảng $scope.items
            var index = $scope.items.findIndex(i => i.id === item.id);
            if (index !== -1) {
                $scope.items[index] = angular.copy(item);
            }

            $scope.reset();
            alert("Cập nhật sản phẩm thành công!");
            loadData();
        }).catch(error => {
            alert("Lỗi cập nhật sản phẩm!");
            console.log("Error", error);
        });
    }







    function loadData() {
        $http.get('/rest/types').then(resp => {
            $scope.items = resp.data;
            console.log("Dữ liệu đã được tải:", $scope.items);
        }).catch(error => {
            console.log("Error loading data", error);
        });
    }






});