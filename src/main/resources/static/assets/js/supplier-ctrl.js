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
            alert("Lỗi upload hình ảnh");
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
        var item = angular.copy($scope.form);
        $http.post('/rest/suppliers', item).then(resp => {
            if (!$scope.suppliers) {
                $scope.suppliers = [];
            }
            $scope.suppliers.push(resp.data);
            $scope.reset();
            alert("Thêm mới nhà xuất bản thành công!");
            $scope.initialize(); // Load lại danh sách sau khi thêm thành công
            location.reload();
        }).catch(error => {
            alert("Lỗi thêm mới nhà xuất bản!");
            console.log("Error", error);
        });
    }
    //hàm cập nhật
    $scope.update = function () {
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
            alert("Cập nhật nhà xuất bản thành công!");
            location.reload();
        }).catch(error => {
            alert("Lỗi nhà xuất bản!");
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

});
