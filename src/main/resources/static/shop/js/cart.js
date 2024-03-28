$(document).ready(function() {
    // Xử lý sự kiện khi người dùng nhấn vào nút "Thêm vào giỏ hàng"
    $(".btn-outline-warning").click(function() {
        // Lấy thông tin sản phẩm từ phần tử cha của nút được nhấn
        var productContainer = $(this).closest(".card");
        var isbn = $(this).data("isbn");
        var productName = productContainer.find("h5").text();
        var productPrice = productContainer.find(".fw-bold").first().text().replace(' vnđ', '').replace('.', '');
        var productImage = productContainer.find("img").attr("src");
        var quantity = 1;

        // Tạo đối tượng sản phẩm
        var product = {
            id: isbn,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: quantity
        };

        // Lấy danh sách sản phẩm từ LocalStorage (nếu có)
        var cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Thêm sản phẩm vào giỏ hàng
        cart.push(product);

        // Lưu lại danh sách sản phẩm vào LocalStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Hiển thị thông báo cho người dùng
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
    });
});