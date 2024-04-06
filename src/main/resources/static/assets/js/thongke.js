var app = angular.module('myApp', []);
app.controller("thongkeCtrl", function ($scope, $http, $timeout) {
    $scope.thongkes = [];
    $scope.toptonkho = [];
    $scope.top10 = [];
    $scope.thongke = [];
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

            var colorsUsed = [];

            $scope.thongkes.forEach(function (thongke) {
                labels.push(thongke.TenSach);
                data.push(thongke.TongSoLuongDaBan);
                var randomColor = getRandomColor(colorsUsed);
                backgroundColor.push(randomColor);
                borderColor.push(randomColor);
                colorsUsed.push(randomColor);
            });

            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
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
                    // Cấu hình thêm nếu bạn muốn
                }
            });

            // Cấu hình kích thước biểu đồ
            ctx.canvas.width = 400;
            ctx.canvas.height = 400;
        });
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
                console.log($scope.toptonkho);

                // // Initialize DataTable
                // angular.element(document).ready(function () {
                //     $('#table1').DataTable({
                //         "language": {
                //             "url": "/assets/json/vietnam.json"
                //         }
                //     });
                // });
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });
        $http.get("/rest/topByTinhTrang/top10")
            .then(function (response) {
                $scope.top10 = response.data.map(function (item) {
                    return {
                        maSanPham: item[0],
                        tenSach: item[1],
                        soLuongSachTonKho: item[2],
                        loaiSach: item[3]
                    };
                });

                // Lấy dữ liệu từ $scope.top10 để vẽ biểu đồ
                var labels = [];
                var data = [];
                var backgroundColors = []; // Mảng chứa màu cho từng cột

                $scope.top10.forEach(function (item) {
                    labels.push(item.tenSach);
                    data.push(item.soLuongSachTonKho);

                    // Tạo màu ngẫu nhiên cho mỗi cột
                    var randomColor = 'rgba(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', 0.6)';
                    backgroundColors.push(randomColor);
                });

                // Vẽ biểu đồ cột
                var ctx = document.getElementById('bar-chart').getContext('2d');
                var chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Tồn kho nhiều nhất',
                            data: data,
                            backgroundColor: backgroundColors, // Sử dụng mảng màu đã tạo
                            borderColor: 'rgba(54, 162, 235, 1)',
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
                // Đặt kích thước của canvas
                document.getElementById('bar-chart').style.width = '400px';
                document.getElementById('bar-chart').style.height = '300px';
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });
        /////// thống kê doanh thu
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
    $scope.getRevenue = function () {
        var startDate = $scope.startDate.toISOString().split('T')[0]; // Chuyển đổi startDate thành chuỗi định dạng ISO
        var endDate = $scope.endDate.toISOString().split('T')[0]; // Chuyển đổi endDate thành chuỗi định dạng ISO

        $http.get("/rest/topByTinhTrang/doanhthu?startDate=" + startDate + "&endDate=" + endDate)
            .then(function (response) {
                $scope.totalRevenue = response.data;
                $scope.displayedRevenue = $scope.totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'VND' });
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });
    };






    $scope.initialize();

});