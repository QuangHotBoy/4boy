function incrementQuantity() {
    var quantityInput = $("#quantity");
    var currentValue = parseInt(quantityInput.val());
    var maxQuantity = parseInt(quantityInput.attr("max"));

    console.log(maxQuantity);

    if (currentValue + 1 > maxQuantity) {
        // Swal.fire({
        //     title: 'Knotrea Thông báo!',
        //     text: 'Số lượng sản phẩm đã đạt giới hạn!',
        //     icon: 'warning',
        //     timer: 1000, // Thời gian đóng SweetAlert sau 1 giây (1000 milliseconds)
        //     showConfirmButton: false, // Ẩn nút xác nhận
        // });
        alert("Số lượng đạt tối đa!");
    } else {
        quantityInput.val(currentValue + 1);
    }
}

function decrementQuantity() {
    var quantityInput = $("#quantity");
    var newValue = parseInt(quantityInput.val()) - 1;
    quantityInput.val(newValue >= 1 ? newValue : 1);
}

$(document).ready(function () {
  // Xử lý sự kiện khi người dùng nhấn vào nút "Thêm vào giỏ hàng"
  $(".btn-outline-warning.add-to-cart").click(function () {
    // Lấy thông tin sản phẩm từ phần tử cha của nút được nhấn
    var productContainer = $(this).closest(".product-container"); // Thay đổi lựa chọn để chọn phần tử chứa thông tin sản phẩm
    var productName = productContainer.find(".product-name").text(); // Thay đổi để lấy tên sách từ thẻ h4
    var productImage = productContainer.find("img").attr("src"); // Thay đổi để lấy đường dẫn ảnh từ thẻ img
    var productPrice;

    // Kiểm tra xem sản phẩm có giảm giá hay không
    if (productContainer.find(".text-warning").length > 0) {
      // Nếu có giảm giá, lấy giá sau khi giảm giá
      productPrice = productContainer
        .find(".text-warning")
        .first()
        .text()
        .replace(" đ", "")
        .replace(".", "");
    } else {
      // Nếu không có giảm giá, lấy giá ban đầu
      productPrice = productContainer
        .find(".text-warning")
        .text()
        .replace(" đ", "")
        .replace(".", "");
    }

    var quantity = parseInt(productContainer.find("#quantity").val()); // Lấy số lượng sản phẩm từ input

    // Tạo đối tượng sản phẩm
    var product = {
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: quantity,
    };

    addToCart(product); // Gọi hàm addToCart với thông tin sản phẩm

    console.log(product);

    // Hiển thị thông báo cho người dùng
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
  });

  $(".text-bg-warning.buynow").click(function () {
    // Lấy thông tin sản phẩm từ phần tử cha của nút được nhấn
    var productContainer = $(this).closest(".product-container"); // Thay đổi lựa chọn để chọn phần tử chứa thông tin sản phẩm
    var productName = productContainer.find(".product-name").text(); // Thay đổi để lấy tên sách từ thẻ h4
    var productImage = productContainer.find("img").attr("src"); // Thay đổi để lấy đường dẫn ảnh từ thẻ img
    var productPrice;

    // Kiểm tra xem sản phẩm có giảm giá hay không
    if (productContainer.find(".text-warning").length > 0) {
      // Nếu có giảm giá, lấy giá sau khi giảm giá
      productPrice = productContainer
        .find(".text-warning")
        .first()
        .text()
        .replace(" đ", "")
        .replace(".", "");
    } else {
      // Nếu không có giảm giá, lấy giá ban đầu
      productPrice = productContainer
        .find(".text-warning")
        .text()
        .replace(" đ", "")
        .replace(".", "");
    }

    var quantity = parseInt(productContainer.find("#quantity").val()); // Lấy số lượng sản phẩm từ input

    // Tạo đối tượng sản phẩm
    var product = {
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: quantity,
    };

    // Lấy danh sách sản phẩm từ LocalStorage (nếu có)
    var cart = JSON.parse(localStorage.getItem("buynow")) || [];

    // Thêm sản phẩm vào giỏ hàng
    cart.push(product);

    // Lưu lại danh sách sản phẩm vào LocalStorage
    localStorage.setItem("buynow", JSON.stringify(cart));
  });

  function addToCart(productId) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var found = false;

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    $.each(cart, function (index, item) {
      if (item.id === parseInt(productId.id)) {
        item.quantity++; // Tăng số lượng nếu sản phẩm đã tồn tại
        found = true;
        return false; // Dừng vòng lặp khi tìm thấy sản phẩm
      }
    });

    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào
    if (!found) {
      var newItem = {
        id: productId.id,
        name: productId.name,
        image: productId.image,
        price: productId.price,
        quantity: productId.quantity,
      };

      console.log(newItem.pquantity);
      cart.push(newItem);
    }

    // Lưu lại giỏ hàng vào Local Storage
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
