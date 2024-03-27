var app = angular.module('myApp', []);


// Khai báo controller
app.controller("myCtrl", function ($scope, $http) {
    $scope.items = [];
    $scope.form = {};

    // Hàm reset để xóa dữ liệu trong form
    $scope.reset = function () {
        $scope.form = {}; // Xóa dữ liệu trong biến form
    };

    // Hàm để lấy dữ liệu từ cơ sở dữ liệu
    $scope.initialize = function () {
        $http.get("/rest/productsType")
            .then(resp => {
                $scope.items = resp.data;
                // Không gọi hàm reset ở đây nếu bạn không cần thiết
            })
            .catch(error => {
                console.log("Error fetching data:", error);
            });
    };

    // Hàm reset để thực hiện các tác vụ cần thiết
    $scope.reset = function () {
        // Các tác vụ reset cần thực hiện
        $scope.form = {};
    }
    //hàm edit
    $scope.edit = function (id) {
        // Gửi yêu cầu GET đến API để lấy thông tin của mục có ID tương ứng
        $http.get('/rest/productsType/' + id)
            .then(function (response) {
                // Sao chép dữ liệu từ phản hồi vào biến form để điền vào form chỉnh sửa
                $scope.form = angular.copy(response.data);
                console.log(id);
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có
                console.error('Error fetching item for editing:', error);
            });
    };



    //hàm thêm
    $scope.create = function () {
        var item = angular.copy($scope.form);
        $http.post('/rest/productsType', item).then(resp => {
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
    $scope.form = {}; // Initialize $scope.form as an empty object
    $scope.update = function () {
        if (!$scope.form || !$scope.form.id) {
            alert("Invalid form data. Cannot update product.");
            return;
        }

        var item = angular.copy($scope.form);
        $http.put('/rest/productsType/${item.id}', item)
            .then(resp => {
                var index = $scope.items.findIndex(p => p.id === item.id);
                if (index !== -1) {
                    $scope.items[index].tenLoai = item.tenLoai;
                    $scope.items[index].moTa = item.moTa;
                    alert("Cập nhật sản phẩm thành công!");
                } else {
                    alert("Không tìm thấy sản phẩm cần cập nhật trong danh sách!");
                }
            })
            .catch(error => {
                console.log("Error", error);
                alert("Lỗi cập nhật sản phẩm!");
            });
    };





    function loadData() {
        $http.get('/rest/productsType').then(resp => {
            $scope.items = resp.data;
            console.log("Dữ liệu đã được tải:", $scope.items);
        }).catch(error => {
            console.log("Error loading data", error);
        });
    }






    // Gọi hàm initialize khi controller được khởi tạo
    $scope.initialize();
});












// // Khai báo ứng dụng AngularJS
// var app = angular.module('myApp', []);

// // Khai báo controller
// app.controller("myCtrl", function ($scope, $http) {
//     // Hàm để lấy dữ liệu từ cơ sở dữ liệu
//     $scope.initialize = function () {
//         $http.get("/rest/productsType").then(resp => {
//             $scope.items = resp.data;
//         })

//         $scope.reset();
//     }





//     $scope.reset = function () {
//         $scope.form = {};
//     }

//     $scope.edit = function (id) {
//         $http.get("/rest/productsType/" + id)
//             .then(resp => {
//                 $scope.form = resp.data;
//                 $('#exampleModal1').modal('show');
//             })
//             .catch(error => {
//                 console.log("Error loading item data for editing", error);
//                 // Xử lý lỗi nếu cần thiết
//             });
//     }


//     $scope.create = function () {
//         var item = angular.copy($scope.form);
//         $http.post('/rest/productsType', item).then(resp => {
//             if (!$scope.items) {
//                 $scope.items = [];
//             }
//             $scope.items.push(resp.data);
//             $scope.reset();
//             alert("Thêm mới sản phẩm thành công!");
//             loadData();
//         }).catch(error => {
//             alert("Lỗi thêm mới sản phẩm!");
//             console.log("Error", error);
//         });
//     }

//     // function loadData() {
//     //     $http.get('/rest/productsType').then(resp => {
//     //         $scope.items = resp.data;
//     //         console.log("Dữ liệu đã được tải:", $scope.items);
//     //     }).catch(error => {
//     //         console.log("Error loading data", error);
//     //     });
//     // }

//     $scope.update = function () {
//         var item = angular.copy($scope.form);
//         $http.put(`/rest/productsType/${item.id}`, item)
//             .then(resp => {
//                 var index = $scope.items.findIndex(p => p.id === item.id);
//                 if (index !== -1) {
//                     $scope.items[index].tenLoai = item.tenLoai;
//                     $scope.items[index].moTa = item.moTa;
//                     alert("Cập nhật sản phẩm thành công!");
//                 } else {
//                     alert("Không tìm thấy sản phẩm cần cập nhật trong danh sách!");
//                 }
//             })
//             .catch(error => {
//                 console.log("Error", error);
//                 alert("Lỗi cập nhật sản phẩm!");
//             });
//     };

//     $scope.delete = function (item) {
//         if (confirm("Bạn muốn xóa sản phẩm này?")) {
//             $http.delete(`/rest/products/${item.id}`).then(resp => {
//                 var index = $scope.items.findIndex(p => p.id == item.id);
//                 $scope.items.splice(index, 1);
//                 $scope.reset();
//                 alert("Xóa sản phẩm thành công!");
//             }).catch(error => {
//                 alert("Lỗi xóa sản phẩm!");
//                 console.log("Error", error);
//             })
//         }
//     }

//     $scope.imageChanged = function (files) {
//         var data = new FormData();
//         data.append('file', files[0]);
//         $http.post('/rest/upload/images', data, {
//             transformRequest: angular.identity,
//             headers: {
//                 'Content-Type': undefined
//             }
//         }).then(resp => {
//             $scope.form.image = resp.data.name;
//         }).catch(error => {
//             alert("Lỗi upload hình ảnh");
//             console.log("Error", error);
//         })
//     }

//     $scope.initialize();


// });