document.getElementById("buyNowBtn").addEventListener("click", function () {
    var isbn = document.getElementById("buyNowBtn").getAttribute("data-isbn");
    
    // Lấy giá trị số lượng từ input
    var quantity = document.getElementById("quantity").value;

    console.log(isbn);
    
    // Kiểm tra nếu ISBN và quantity không trống
    if (isbn && quantity) {
        // Tạo URL với các tham số ISBN và quantity
        var url = "/shop/buy-now?isbn=" + encodeURIComponent(isbn) + "&quantity=" + encodeURIComponent(quantity);
        
        // Redirect đến URL
        window.location.href = url;
    } else {
        // Nếu một hoặc cả hai trường trống, thông báo lỗi
        console.log("Please fill in both ISBN and Quantity fields.");
    }
});