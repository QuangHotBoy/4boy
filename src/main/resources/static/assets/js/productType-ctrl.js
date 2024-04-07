var app = angular.module('myApp', []);

app.controller("myCtrl", function ($scope, $http, $timeout) {
    $scope.types = [];
    $scope.form = {};

    $scope.initialize = function () {
        $http.get("/rest/types").then(resp => {
            $scope.types = resp.data;

            console.log($scope.types);
            // Initialize DataTable after data is loaded
            $timeout(function () {
                $('#table1').DataTable({
                    "language": {
                        "url": "/assets/json/vietnam.json"
                    }
                });
            });

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


    //hàm thêm
    $scope.create = function () {
        // Validate form
        if (!validateForm()) {
            return; // Stop execution if form is not valid
        }

        var item = angular.copy($scope.form);
        $http.post('/rest/types', item).then(resp => {
            if (!$scope.items) {
                $scope.items = [];
            }

            $scope.items.push(resp.data);
            $scope.reset();
            iziToast.info({
                title: 'Thông báo',
                message: 'Thêm mới loại sản phẩm thành công!',
                position: 'topRight'
            });
            // Chờ 3 giây trước khi thực hiện reload
            setTimeout(function () {
                location.reload();
            }, 1000);
        }).catch(error => {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Lỗi thêm mới !!',
                position: 'topRight'
            });
            console.log("Error", error);
        });
    }

    //hàm cập nhật
    $scope.update = function () {
         // Validate form
         if (!validateForm1()) {
            return; // Stop execution if form is not valid
        }
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
            iziToast.info({
                title: 'Thông báo',
                message: 'Cập nhật loại sách thành công!',
                position: 'topRight'
            });
            // Chờ 3 giây trước khi thực hiện reload
            setTimeout(function () {
                location.reload();
            }, 1000);
        }).catch(error => {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Lỗi cập nhật !!',
                position: 'topRight'
            });
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
    function validateForm() {
        var tenLoai = document.getElementById("tenLoai").value;
        var moTa = document.getElementById("moTa").value;

        // Kiểm tra xem các trường có trống không
        if (tenLoai.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập tên loại sách.',
                position: 'topRight'
            });
         
            return false;
        }

        if (moTa.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập mô tả.',
                position: 'topRight'
            });
            return false;
        }

        // Kiểm tra xem tenLoai có trùng không
        if (isTenLoaiTrung(tenLoai)) {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Tên loại sách đã tồn tại !!',
                position: 'topRight'
            });
            return false;
        }

        return true;
    }
    function validateForm1() {
        var tenLoai = document.getElementById("tenLoai").value;
        var moTa = document.getElementById("moTa").value;

        // Kiểm tra xem các trường có trống không
        if (tenLoai.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập tên loại sách.',
                position: 'topRight'
            });
         
            return false;
        }

        if (moTa.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập mô tả.',
                position: 'topRight'
            });
            return false;
        }

        

        return true;
    }
    //kiểm tra trùng tên
    function isTenLoaiTrung(tenLoai) {
        // Lặp qua danh sách các loại sách đã tải từ server
        for (var i = 0; i < $scope.types.length; i++) {
            if ($scope.types[i].tenLoai === tenLoai) {
                return true; // Nếu trùng, trả về true
            }
        }
        return false; // Nếu không trùng, trả về false
    }
    




});