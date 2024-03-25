// // Khởi tạo ứng dụng AngularJS
// var app = angular.module('myApp', []);

// // Định nghĩa controller và khởi tạo biến cho form data
// app.controller('myCtrl', function ($scope, $http) {
//     $scope.newItem = {}; // Khởi tạo biến lưu trữ dữ liệu form

//     // Hàm để làm trắng form
//     $scope.clearForm = function () {
//         $scope.newItem.id = '';
//         $scope.newItem.tenLoai = ''; // Gán giá trị rỗng cho trường tenLoai
//         $scope.newItem.moTa = ''; // Gán giá trị rỗng cho trường moTa
//     };
//     // Hàm thêm mới sản phẩm
//     $scope.addNew = function () {
//         // Gửi yêu cầu POST đến server Spring Boot để thêm mới dữ liệu
//         $http.post('/api/addNew', $scope.newItem)
//             .then(function (response) {
//                 // Xử lý kết quả trả về nếu cần
//                 console.log(response.data);
//                 // Sau khi thêm thành công, đóng modal
//                 $('#exampleModal').modal('hide');
//             }, function (error) {
//                 // Xử lý lỗi nếu có
//                 console.error('Error:', error);
//                 console.log($scope.addNew);
//             });
//     };






//     // Hàm cập nhật thông tin sản phẩm sau khi chỉnh sửa
//     $scope.updateItem = function () {
//         // Gửi yêu cầu PUT đến server Spring Boot để cập nhật dữ liệu sản phẩm
//         $http.put('/api/update/' + $scope.editItem.id, $scope.editItem)
//             .then(function (response) {
//                 // Xử lý kết quả trả về nếu cần
//                 console.log(response.data);
//                 // Đóng modal sau khi cập nhật thành công
//                 $('#exampleModal').modal('hide');
//             }, function (error) {
//                 // Xử lý lỗi nếu có
//                 console.error('Error:', error);
//             });
//     };

// });



// Khai báo ứng dụng AngularJS
var app = angular.module('myApp', []);

// Khai báo controller
app.controller('myCtrl', function ($scope, $http) {
    // Khởi tạo newItem object
    $scope.newItem = {
        tenLoai: '',
        moTa: ''
    };

    // Hàm thêm mới
    $scope.addNew = function () {
        // Kiểm tra dữ liệu đầu vào
        if (!$scope.newItem || !$scope.newItem.tenLoai || !$scope.newItem.moTa) {
            console.log('Dữ liệu không hợp lệ');
            return;
        }

        // Tạo một đối tượng mới chỉ chứa các trường tenLoai và moTa
        var data = {
            tenLoai: $scope.newItem.tenLoai,
            moTa: $scope.newItem.moTa
        };

        // Gửi request POST đến server để thêm mới
        $http.post('/api/addNewItem', data)
            .then(function (response) {
                // Xử lý response sau khi thêm mới thành công
                console.log('Thêm mới thành công:', response.data);
                // Clear form sau khi thêm mới thành công
                $scope.clearForm();
            })
            .catch(function (error) {
                // Xử lý error nếu có
                console.log('Error:', error);
            });
    };




    // Hàm sửa (fill dữ liệu vào form)
    $scope.edit = function (phanloai) {
        // Gán dữ liệu của phanloai vào $scope.newItem để điền vào các trường input
        $scope.newItem = {
            id: phanloai.id,
            tenLoai: phanloai.tenLoai,
            moTa: phanloai.moTa
        };
    };

    // Hàm làm mới form
    $scope.clearForm = function () {
        // Xóa dữ liệu trong newItem object
        $scope.newItem = {};
    };
});