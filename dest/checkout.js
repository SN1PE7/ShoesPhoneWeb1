function saveCartToLocalStorage(cart) {
  localStorage.setItem('listCart', JSON.stringify(cart.filter(Boolean)));
}

function clearCartCookie() {
  const pastDate = new Date(0).toUTCString();
  document.cookie = 'listCart=; expires=' + pastDate + '; path=/';
}
let listCart = [];

function checkCart() {
  var cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('listCart='));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split('=')[1]);
    saveCartToLocalStorage(listCart);
  }
}
checkCart();

addCartToHTML();
var sum;
function addCartToHTML() {
  let listCartHTML = document.querySelector('.returnCart .list');
  listCartHTML.innerHTML = '';
  let totalQuantityHTML = document.querySelector('.totalQuantity');
  let totalPriceHTML = document.querySelector('.totalPrice');

  let totalQuantity = 0;
  let totalPrice = 0;

  if (listCart) {
    listCart.forEach((product) => {
      if (product) {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.setAttribute('data-id', product.id);
        newProduct.innerHTML = `
          <img src="${product.img}" alt="" />
          <div class="info">
            <div class="name">${product.name}</div>
            <div class="price">$${formatPrice(product.price)}</div>
          </div>
          <div class="changeQuantity">
            <button class="oper" onclick="changeQuantity(${
              product.id
            },'-')">-</button>
            <span class="value">${product.quantity}</span>
            <button class="oper" onclick="changeQuantity(${
              product.id
            },'+')">+</button>
          </div>
          <p class="returnPrice">$${formatPrice(
            product.price * product.quantity
          )}</p>
          <div class="btnDelete" onclick="changeDelete(${
            product.id
          })"><i class="fa-solid fa-trash"></i></div>
        `;
        listCartHTML.appendChild(newProduct);
        totalQuantity += product.quantity;
        totalPrice += product.price * product.quantity;
      }
    });
  }
  totalQuantityHTML.innerText = totalQuantity;
  totalPriceHTML.innerText = '$' + formatPrice(totalPrice);

  sum = totalPrice;
  console.log(sum); // Log sum after updating its value
}

//==>  Hàm thay đổi số lượng sản phẩm trong giỏ hàng
function changeQuantity($idProduct, $type) {
  switch ($type) {
    case '+':
      listCart[$idProduct].quantity++;
      break;
    case '-':
      if (listCart[$idProduct].quantity > 1) {
        listCart[$idProduct].quantity--;
      }
      break;
    default:
      break;
  }
  // Save new cookie
  let timeSave = 'expires=Thu, 31 Dec 2025 23:59:59 UTC';
  document.cookie =
    'listCart=' + JSON.stringify(listCart) + '; ' + timeSave + '; path=/';
  // Reload
  addCartToHTML();
}

//=============

function getCartFromLocalStorage() {
  const storedCart = localStorage.getItem('listCart');
  return storedCart ? JSON.parse(storedCart) : [];
}

function saveCartToLocalStorage(cart) {
  localStorage.setItem('listCart', JSON.stringify(cart));
}

listCart = getCartFromLocalStorage();

function changeDelete($idProduct) {
  const productToDelete = document.querySelector(`[data-id="${$idProduct}"]`);
  if (productToDelete && confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
    productToDelete.remove();
    delete listCart[$idProduct];
    saveCartToLocalStorage(listCart);
    // Cũng xóa sản phẩm khỏi cookie
    clearProductCookie($idProduct);
    addCartToHTML();
  }
}

function clearProductCookie(idProduct) {
  // Lấy giá trị cookie hiện tại
  var cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('listCart='));

  if (cookieValue) {
    let cookieCart = JSON.parse(cookieValue.split('=')[1]);
    // Xóa sản phẩm khỏi mảng theo id
    delete cookieCart[idProduct];
    // Lưu mảng mới vào cookie
    document.cookie = 'listCart=' + JSON.stringify(cookieCart) + '; path=/';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var headerAdminText = document.querySelector('.header__admin-text');
  var headerAdminOut = document.querySelector('.header__admin-out');
  var btnCheckout = document.querySelector('.btnCheckout');
  var loggedInUsername = localStorage.getItem('loggedInUser');

  //user nhan vao
  headerAdminOut.addEventListener('click', function () {
    if (confirm('Bạn có muốn đăng xuất không?')) {
      localStorage.removeItem('loggedInUser');
      alert('Đăng xuất thành công');
      // Clear all products in the cart
      clearAllProducts();
      // Redirect to the home page after logout
      window.location.href = '/index.html';
    }
  });

  // user hien thi
  if (loggedInUsername) {
    headerAdminText.textContent = 'Xin chào, ' + loggedInUsername;
    headerAdminOut.style.display = 'block';
  } else {
    headerAdminOut.style.display = 'none';
  }

  // nut checkout
  btnCheckout.addEventListener('click', async function (e) {
    if (!loggedInUsername) {
      e.preventDefault();
      alert('Bạn phải đăng nhập trước khi thanh toán');
      window.location.href = '/login.html';
    } else {
      // Lấy thông tin giỏ hàng từ localStorage
      const listCart = getCartFromLocalStorage();

      // Kiểm tra nếu listCart là null hoặc rỗng
      if (!listCart || listCart.length === 0) {
        e.preventDefault();
        alert(
          'Không có sản phẩm trong giỏ hàng. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.'
        );
        return;
      }
      //const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      //console.log(loggedInUser);
      let userInfo = {};
      // let promise = axios({
      //   url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/users/' + id,
      //   method: 'GET',
      // });
      // promise
      //   .then((result) => {
      //     const { data } = result;
      //     userInfo = data;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      let idUserLogged = localStorage.getItem('loggedIDUser');
      const { data } = await axios({
        url:
          'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/users/' +
          idUserLogged,
        method: 'GET',
      });
      userInfo = data;
      console.log(userInfo);
      //Start Ngay gio
      // Định dạng ngày
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const seconds = currentDate.getSeconds().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;

      // Tạo thông tin hóa đơn
      const bill = {
        customer: {
          username: userInfo.username,
          password: userInfo.password,
          fullname: userInfo.fullname,
          phone: userInfo.phonenumber,
          email: userInfo.email,
          address: userInfo.address,
        },
        date: formattedDate,
        id: generateProductId(), // Điều chỉnh id theo logic của bạn
        info: listCart,
        status: 0,
        totalprice: sum,
      };

      // Lưu thông tin hóa đơn vào localStorage
      saveBillToLocalStorage(bill);

      // Xóa giỏ hàng sau khi thanh toán
      localStorage.removeItem('listCart');

      // Cập nhật giao diện hiển thị giỏ hàng
      addDatatoHTML(billData);
      clearAllProducts();
      alert('Thanh toán thành công');
    }

    // scroll to top
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth', // Để có hiệu ứng cuộn mượt mà
    });
  });
});

function saveBillToLocalStorage(bill) {
  // Lấy danh sách hóa đơn từ localStorage (nếu có)
  const storedBills = localStorage.getItem('listBills') || '[]';
  const bills = JSON.parse(storedBills);
  // Thêm hóa đơn mới vào danh sách
  //Danh sach bill
  bills.push(bill);
  console.log('bills', bills);
  console.log('bill', bill);

  // Lưu lại danh sách hóa đơn vào localStorage
  localStorage.setItem('listBills', JSON.stringify(bills));
  billData = bills;
}

var billData = JSON.parse(localStorage.getItem('listBills'));
//console.log(billData);
addDatatoHTML(billData);
function addDatatoHTML(billData) {
  // remove data default in html
  let listBillHTML = document.querySelector('.scbill__list');
  listBillHTML.innerHTML = '';

  // Kiểm tra và hiển thị thông báo nếu giỏ hàng rỗng

  if (billData != null) {
    var loggedInUsername = localStorage.getItem('loggedInUser');
    const loggedInUser = localStorage.getItem('loggedInUser');
    billData.reverse().forEach((item) => {
      if (item.customer.username === loggedInUser) {
        let newItem = document.createElement('div');
        newItem.classList.add('scbill__list-item');

        // Lấy tên và số lượng từ mảng info (nếu có)
        const productNames = (item.info || [])
          .map((product) => {
            if (product != null) {
              const productNameWithQuantity = `${product.quantity} x ${product.name}`;
              return productNameWithQuantity;
            }
            return null;
          })
          .filter((name) => name !== null);

        console.log(productNames);
        newItem.innerHTML = `
        <p class="orderid">${item.id}</p>
          <p class="product">${productNames.join(' ,<br>')}</p>
          <p class="price">$${formatPrice(item.totalprice)}</p>
          <p class="date">${item.date}</p>
          <p class="status">${
            item.status == 0
              ? 'Đợi xử lý'
              : item.status == 1
              ? 'Đã xử lý'
              : 'Đã huỷ đơn'
          }</p>
        `;

        listBillHTML.appendChild(newItem);
      }
    });
  }
}

// Xoa tat ca san pham trong cookie
function clearAllProducts() {
  // Xóa giỏ hàng từ localStorage
  localStorage.removeItem('listCart');

  // Xóa cookie giỏ hàng
  clearCartCookie();

  // Cập nhật giỏ hàng và giao diện
  listCart = [];
  addCartToHTML();
}

// Xoa tat ca san pham
let btnClear = document.querySelector('.btnClear');
btnClear.addEventListener('click', () => {
  if (listCart.length === 0) {
    alert('Không có sản phẩm nào trong giỏ hàng để xóa!');
    return;
  }
  const confirmDelete = confirm('Bạn có muốn xóa tất cả sản phẩm không?');

  if (confirmDelete) {
    clearAllProducts();
    // alert("Đã xóa tất cả sản phẩm.");
  } else {
    // alert("Hủy bỏ xóa sản phẩm.");
  }
});

//========Hien thi tat cac thong tin trong cac o in put
// function renderLoggedInUserToForm() {
//   var loggedInUsername = localStorage.getItem('loggedInUser');
//   const loggedInUser = JSON.parse(localStorage.getItem(loggedInUsername));
//   console.log(loggedInUser);

//   if (loggedInUser) {
//     const fullNameInput = document.querySelector('#fullname');
//     console.log(fullNameInput);
//     const phoneNumberInput = document.querySelector('#phone');
//     const addressInput = document.querySelector('#adress');
//     const emailInput = document.querySelector('#email');

//     // Kiểm tra xem có tồn tại các phần tử input không
//     if (fullNameInput && phoneNumberInput && addressInput && emailInput) {
//       // Điền giá trị vào các input
//       fullNameInput.value = loggedInUser.username || '';
//       phoneNumberInput.value = loggedInUser.phone || '';
//       addressInput.value = loggedInUser.address || '';
//       emailInput.value = loggedInUser.email || '';
//     }
//   }
// }
let $a = document.querySelector.bind(document);
const getValueInput = () => {
  let fullName = $a('#fullname').value;
  let phoneNumber = $a('#phone').value;
  let address = $a('#address').value;
  let email = $a('#email').value;
  return {
    fullName: fullName,
    phoneNumber: phoneNumber,
    address: address,
    email: email,
  };
};

const fullNameInput = $a('#fullname');
const phoneNumberInput = $a('#phone');
const addressInput = $a('#adress');
const emailInput = $a('#email');
let idUserLogged = localStorage.getItem('loggedIDUser');
const getDataInfo = (id) => {
  let promise = axios({
    url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/users/' + id,
    method: 'GET',
  });
  promise
    .then((result) => {
      fullNameInput.value = result.data.fullname;
      phoneNumberInput.value = result.data.phonenumber;
      addressInput.value = result.data.address;
      emailInput.value = result.data.email;
    })
    .catch((error) => {
      console.log(error);
    });
};
// Gọi hàm để render thông tin khi DOM đã tải hoàn toàn
document.addEventListener('DOMContentLoaded', () => {
  getDataInfo(idUserLogged);
  hanldeEmptyCart();
});

function formatPrice(number) {
  return new Intl.NumberFormat('en-US').format(number);
}

//Hien thi
function hanldeEmptyCart() {
  var listCart = getCartFromLocalStorage(); // Đảm bảo bạn có hàm getCartFromLocalStorage đã được định nghĩa

  var emptyCartMessage = document.querySelector('.checkoutLayout__none');

  if (!listCart || Object.keys(listCart).length === 0) {
    // Nếu giỏ hàng rỗng
    if (!emptyCartMessage) {
      // Nếu thông báo không tồn tại, thêm vào
      emptyCartMessage = document.createElement('div');
      emptyCartMessage.classList.add('checkoutLayout__none');
      emptyCartMessage.innerText = 'Không có sản phẩm nào trong giỏ hàng.';
      document.querySelector('.scbill__list').appendChild(emptyCartMessage);
    }
  } else {
    // Nếu giỏ hàng không rỗng
    if (emptyCartMessage) {
      // Nếu thông báo tồn tại, loại bỏ nó
      emptyCartMessage.remove();
    }
  }
}
hanldeEmptyCart();

//Render RandomID
let currentProductIds = [];
function generateProductId() {
  let isUnique = false;
  let newProductId = '';
  // Duyệt qua các ID hiện tại để đảm bảo ID mới là duy nhất
  while (!isUnique) {
    const randomDigits = Math.floor(100000 + Math.random() * 900000); // Tạo số ngẫu nhiên 6 chữ số
    newProductId = 'HD' + randomDigits;
    // Kiểm tra xem ID mới có tồn tại trong danh sách ID hiện tại không
    isUnique = !currentProductIds.includes(newProductId);
  }
  // Thêm ID mới vào danh sách ID hiện tại
  currentProductIds.push(newProductId);
  return newProductId;
}
