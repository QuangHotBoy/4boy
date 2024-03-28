document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                  let lazyImage = entry.target;
                  lazyImage.src = lazyImage.dataset.src;
                  lazyImage.classList.remove("lazy");
                  lazyImageObserver.unobserve(lazyImage);
              }
          });
      });

      lazyImages.forEach(function(lazyImage) {
          lazyImageObserver.observe(lazyImage);
      });
  } else {
      // Fallback for browsers that don't support IntersectionObserver
      // Load all images immediately
      lazyImages.forEach(function(lazyImage) {
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
      });
  }
});

$(document).ready(function() {
    // Lấy danh sách sản phẩm từ localStorage
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Đếm số lượng sản phẩm trong giỏ hàng
    var cartCount = cart.reduce(function(total, product) {
        return total + product.quantity;
    }, 0);

    // Hiển thị số lượng sản phẩm lên website
    $('#cart-count').text(cartCount);
});