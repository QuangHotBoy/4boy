var app = angular.module('myApp', []);
app.filter('vnCurrency', function () {
    return function (input) {
        if (isNaN(input)) return input;
        return input.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
});
app.controller("thongkeCtrl", function ($scope, $http, $filter, $timeout) {
    $scope.thongkes = [];
    $scope.toptonkho = [];
    $scope.top10 = [];
    $scope.thongke = [];
    // $scope.displayedRevenue=[];
    function getRandomColor(colorsUsed) {
        var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        if (colorsUsed.includes(color)) {
            return getRandomColor(colorsUsed);
        } else {
            return color;
        }
    }

    $scope.initialize = function () {
        $http.get("/rest/topByTinhTrang/topByTinhTrang").then(resp => {
            $scope.thongkes = resp.data.map(function (item, index) {
                return {
                    TenSach: item[0],
                    TongSoLuongDaBan: item[1],
                    TongDoanhThu: item[2]
                };
            });
            console.log($scope.thongkes);

            var labels = [];
            var data = [];
            var backgroundColor = [];
            var borderColor = [];

            var colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#62B832", "#D4526E", "#EF5777", "#FFC542"];

            $scope.thongkes.forEach(function (thongke, index) {
                labels.push(thongke.TenSach);
                data.push(thongke.TongSoLuongDaBan);
                var colorIndex = index % colors.length; // lặp lại màu nếu hết màu trong mảng
                backgroundColor.push(colors[colorIndex]);
                borderColor.push(colors[colorIndex]);
            });

            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'pie', // Loại biểu đồ cột
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sản phẩm bán chạy',
                        data: data,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: 1
                    }]
                },
                options: {
                    legend: {
                        display: true, // Hiển thị chú thích
                        position: 'bottom' // Đặt vị trí chú thích ở dưới
                    }
                    // Cấu hình thêm nếu bạn muốn
                }
            });
            

            // Cấu hình kích thước biểu đồ
            ctx.canvas.width = 20;
            ctx.canvas.height = 20;
        });

        ///
        $scope.selectedLoaiSach = ''; // Khởi tạo biến chứa loại sách được chọn
        $scope.filteredToptonkho = []; // Khởi tạo mảng chứa dữ liệu được lọc

        $scope.filterByLoaiSach = function () {
            if ($scope.selectedLoaiSach === "") {
                // Nếu chọn "Tất cả", hiển thị tất cả các sản phẩm
                $scope.filteredToptonkho = $scope.toptonkho;
            } else {
                // Nếu có loại sách được chọn, lọc và hiển thị chỉ các sản phẩm có loại sách tương ứng
                $scope.filteredToptonkho = $scope.toptonkho.filter(function (sach) {
                    return sach.LoaiSach === $scope.selectedLoaiSach;
                });
            }
        };





        $http.get("/rest/topByTinhTrang/toptonkho")
            .then(function (response) {
                $scope.toptonkho = response.data.map(function (item) {
                    return {
                        Ma: item[0],
                        TenSach: item[1],
                        SoLuongTonKho: item[2],
                        LoaiSach: item[3]
                    };
                });

                // Lọc ra các giá trị LoaiSach duy nhất
                var uniqueLoaiSach = [...new Set($scope.toptonkho.map(item => item.LoaiSach))];

                // Gán dữ liệu cho combobox
                $scope.uniqueLoaiSach = uniqueLoaiSach;

                $scope.filteredToptonkho = $scope.toptonkho; // Khởi tạo dữ liệu được lọc với toàn bộ dữ liệu ban đầu
                console.log($scope.toptonkho);

                // Initialize DataTable
                angular.element(document).ready(function () {
                    $('#table1').DataTable({
                        "language": {
                            "url": "/assets/json/vietnam.json"
                        }
                    });
                });
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });


        // $http.get("/rest/topByTinhTrang/top10")
        //     .then(function (response) {
        //         $scope.top10 = response.data.map(function (item) {
        //             return {
        //                 maSanPham: item[0],
        //                 tenSach: item[1],
        //                 soLuongSachTonKho: item[2],
        //                 loaiSach: item[3]
        //             };
        //         });

        //         // Lấy dữ liệu từ $scope.top10 để vẽ biểu đồ
        //         var labels = [];
        //         var data = [];
        //         var backgroundColors = []; // Mảng chứa màu cho từng cột

        //         $scope.top10.forEach(function (item) {
        //             labels.push(item.tenSach);
        //             data.push(item.soLuongSachTonKho);

        //             // Tạo màu ngẫu nhiên cho mỗi cột
        //             var randomColor = 'rgba(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', 0.6)';
        //             backgroundColors.push(randomColor);
        //         });

        //         // Vẽ biểu đồ cột
        //         var ctx = document.getElementById('bar-chart').getContext('2d');
        //         var chart = new Chart(ctx, {
        //             type: 'bar',
        //             data: {
        //                 labels: labels,
        //                 datasets: [{
        //                     label: 'Tồn kho nhiều nhất',
        //                     data: data,
        //                     backgroundColor: backgroundColors, // Sử dụng mảng màu đã tạo
        //                     borderColor: 'rgba(54, 162, 235, 1)',
        //                     borderWidth: 1
        //                 }]
        //             },
        //             options: {
        //                 scales: {
        //                     yAxes: [{
        //                         ticks: {
        //                             beginAtZero: true
        //                         }
        //                     }]
        //                 }
        //             }
        //         });
        //         // Đặt kích thước của canvas
        //         document.getElementById('bar-chart').style.width = '400px';
        //         document.getElementById('bar-chart').style.height = '300px';
        //     })
        //     .catch(function (error) {
        //         console.error('Error fetching data:', error);
        //     });
        /////// thống kê doanh thu từng tháng
        $http.get("/rest/topByTinhTrang/thongke")
            .then(function (response) {
                var data = response.data.map(function (item) {
                    return {
                        thang: item[0],
                        doanhThu: item[1],
                        soLuongBan: item[2],
                    };
                });

                var labels = data.map(function (item) {
                    return item.thang;
                });

                var doanhThu = data.map(function (item) {
                    return item.doanhThu;
                });

                var soLuongBan = data.map(function (item) {
                    return item.soLuongBan;
                });

                var ctx = document.getElementById('line-chart').getContext('2d');
                var chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Doanh thu',
                            data: doanhThu,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }, {
                            label: 'Số lượng bán',
                            data: soLuongBan,
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });


    }
    // thống kê tính doanh thu
    $scope.getDoanhThuByDateRange = function () {
        // Chuyển đổi startDate và endDate sang định dạng dd-MM-yyyy
        var startDate = new Date($scope.startDate);
        var endDate = new Date($scope.endDate);

        var startDateFormatted = formatDate(startDate);
        var endDateFormatted = formatDate(endDate);

        // Gọi API từ backend để lấy doanh thu
        $http.get('/rest/topByTinhTrang/doanhthu', {
            params: {
                startDate: startDateFormatted,
                endDate: endDateFormatted
            }
        })
            .then(function (response) {
                // Xử lý kết quả trả về từ backend
                $scope.displayedRevenue = response.data;
            }, function (error) {
                // Xử lý lỗi nếu có
                console.error('Error fetching revenue:', error);
            });
    };

    // Hàm để định dạng lại ngày thành dd-MM-yyyy
    function formatDate(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    }









    $scope.initialize();

});