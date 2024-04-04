// Tạo một module Angular
var app = angular.module('supplier-App', []);

app.controller("supplier-Ctrl", function ($scope, $http, $timeout) {
    $scope.suppliers = [];
    $scope.form = {};

    $scope.initialize = function () {
        $http.get("/rest/suppliers").then(resp => {
            $scope.suppliers = resp.data;

            // Destroy existing DataTable instance if it exists
            if ($.fn.DataTable.isDataTable('#table1')) {
                $('#table1').DataTable().destroy();
            }

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

    // Call the initialize function when the controller is instantiated
    $scope.initialize();
    // Xử lý khi người dùng thay đổi hình ảnh
    $scope.imageChanged = function (files) {
        var data = new FormData();
        data.append('file', files[0]);
        $http.post('/rest/upload/products', data, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(resp => {
            $scope.form.hinhAnh = resp.data.name;
        }).catch(error => {
           
            console.log("Error", error);
        })
    }

    //hàm edit
    $scope.edit = function (id) {
        // Gửi yêu cầu GET đến API để lấy thông tin của mục có ID tương ứng
        $http.get('/rest/suppliers/' + id)
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

    // Hàm thêm nhà xuất bản
    $scope.create = function () {
        // Validate form
        if (!validateForm()) {
            return; // Stop execution if form is not valid
        }
        var item = angular.copy($scope.form);
        $http.post('/rest/suppliers', item).then(resp => {
            if (!$scope.suppliers) {
                $scope.suppliers = [];
            }
            $scope.suppliers.push(resp.data);
            $scope.reset();
            iziToast.info({
                title: 'Thông báo',
                message: 'Thêm mới nhà xuất bản thành công!',
                position: 'topRight'
            });

            

            // Chờ 3 giây trước khi thực hiện reload
            setTimeout(function () {
                location.reload();
            }, 2000);

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

        $http.put('/rest/suppliers/' + item.id, item).then(resp => {
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
                message: 'Cập nhật nhà xuất bản thành công!',
                position: 'topRight'
            });
            // Chờ 3 giây trước khi thực hiện reload
            setTimeout(function () {
                location.reload();
            }, 2000);




        }).catch(error => {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Lỗi cập nhật !!',
                position: 'topRight'
            });
            console.log("Error", error);
        });
    }

    // Hàm reset form
    $scope.reset = function () {
        // Xóa tất cả dữ liệu trong form
        $scope.form = {};

        // Reset image preview
        document.getElementById('imgPreview').src = '';

        // Reset selected file input
        var input = document.getElementById('image');
        input.value = ''; // Reset input value
        input.type = ''; // Reset input type
        input.type = 'file'; // Restore input type

        // Reset ng-src
        $scope.form.hinhAnh = ''; // hoặc $scope.form.hinhAnh = 'đường_dẫn_mặc_định'; tùy vào bạn muốn
    };



    function loadData() {
        $http.get('/rest/suppliers').then(resp => {
            $scope.items = resp.data;
            console.log("Dữ liệu đã được tải:", $scope.items);
        }).catch(error => {
            console.log("Error loading data", error);
        });
    }

    function validateForm() {
        var tenNhaXuatBan = document.getElementById("tenNhaXuatBan").value;
        var moTa = document.getElementById("moTa").value;
        var hinhAnhInput = document.getElementById("image");
        // Kiểm tra xem các trường có trống không
        if (tenNhaXuatBan.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập tên nhà xuất bản.',
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
        // Kiểm tra xem người dùng đã chọn hình ảnh hay chưa
        if (hinhAnhInput.files.length === 0) {
            document.getElementById("imageError").style.display = "block";
            return false;
        }

        // Kiểm tra xem tenLoai có trùng không
        if (isTennxbTrung(tenNhaXuatBan)) {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Tên nhà xuất bảng đã tồn tại!!',
                position: 'topRight'
            });
            return false;
        }

        return true;
    }
    //
    function validateForm1() {
        var tenNhaXuatBan = document.getElementById("tenNhaXuatBan").value;
        var moTa = document.getElementById("moTa").value;
        var hinhAnhInput = document.getElementById("image");
        // Kiểm tra xem các trường có trống không
        if (tenNhaXuatBan.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập tên nhà xuất bản.',
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
    function isTennxbTrung(tenNhaXuatBan) {
        // Lặp qua danh sách các loại sách đã tải từ server
        for (var i = 0; i < $scope.suppliers.length; i++) {
            if ($scope.suppliers[i].tenNhaXuatBan === tenNhaXuatBan) {
                return true; // Nếu trùng, trả về true
            }
        }
        return false; // Nếu không trùng, trả về false
    }
    //


});
