function clearAllProducts() {
  // Xóa giỏ hàng từ localStorage
  localStorage.removeItem("listCart");

  // Xóa cookie giỏ hàng
  clearCartCookie();

  // Cập nhật giỏ hàng và giao diện
}

function clearCartCookie() {
    const pastDate = new Date(0).toUTCString();
    document.cookie = "listCart=; expires=" + pastDate + "; path=/"; }