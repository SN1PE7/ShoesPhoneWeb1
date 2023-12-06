// Handle ProgressBar
let handleProgressBar = () => {
  let progress = document.querySelector(".progressbar");
  window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    let percent =
      (scrollY / (document.body.offsetHeight - window.innerHeight)) * 100;
    progress.style.width = `${percent}%`;
  });
};
window.addEventListener("load", handleProgressBar());
// End Handle ProgressBar



// get datas product in products.json
let products = null;
fetch("https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/capstonejs")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    showDetail();
  });

//find this product
let listCart = [];
// COkiie
function checkCart() {
  var cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("listCart="));
  if (cookieValue) {
    // Sử dụng toàn bộ cookieValue làm dữ liệu JSON
    listCart = JSON.parse(cookieValue.replace("listCart=", ""));
  }
}
checkCart();

function showDetail() {
  let detail = document.querySelector(".detail");
  let productID = new URLSearchParams(window.location.search).get("id");
  let addToCart = document.querySelector(
    ".detail .content .buttons .addToCart"
  );

  // Khai bao de show gio hang
  let cart = document.querySelector(".cartNav");
  let container = document.querySelector(".container");
  let containerHeader = document.querySelector(
    ".header .header__bottom .container"
  );
  let containerHeaderTop = document.querySelector(
    ".header .header__top .container"
  );
  let containerFooter = document.querySelector(".footer .container");
  let containerScdetail = document.querySelector(".scdetail .container");
  let containerScsimilar = document.querySelector(".scsimilar .container");
  //End Khai bao de show gio hang

  addToCart.addEventListener("click", function () {
    // Lấy id sản phẩm hiện tại từ tham số URL
    let productID = new URLSearchParams(window.location.search).get("id");

    // Kiểm tra nếu sản phẩm không tồn tại trong giỏ hàng, thì thêm vào
    if (!listCart[productID]) {
      let dataProduct = products.find((product) => product.id == productID);
      if (dataProduct) {
        listCart[productID] = dataProduct;
        listCart[productID].quantity = 1;
      }
    } else {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
      listCart[productID].quantity++;
    }

    //Click de show gio hang
    if (cart) {
      cart.style.right = "0";
      if (containerScdetail) {
        containerScdetail.style.transform = "translateX(-400px)";
      }
      if (containerScsimilar) {
        containerScsimilar.style.transform = "translateX(-400px)";
      }
      if (container) {
        container.style.transform = "translateX(-400px)";
      }
      if (containerHeader) {
        containerHeader.style.transform = "translateX(-400px)";
      }
      if (containerFooter) {
        containerFooter.style.transform = "translateX(-400px)";
      }
    } else {
      cart.style.right = "-100%";
      if (containerScdetail) {
        containerScdetail.style.transform = "translateX(0)";
      }
      if (containerScsimilar) {
        containerScsimilar.style.transform = "translateX(0)";
      }
      if (container) {
        container.style.transform = "translateX(0)";
      }
      if (containerHeader) {
        containerHeader.style.transform = "translateX(0)";
      }
      if (containerFooter) {
        containerFooter.style.transform = "translateX(0)";
      }
    }
    //========= End Click de show gio hang


    // Lưu giỏ hàng vào cookie
    let timeSave = "expries=Thu, 31 Dec 2025 23:59:59 UTC";
    document.cookie =
      "listCart=" + JSON.stringify(listCart) + "; " + timeSave + "; path=/";

    // Gọi hàm hiển thị giỏ hàng
    addCarttoHTML();
  });

  let thisProduct = products.filter((value) => {
    return value.id == productID;
  })[0];

  // if there is no product has id = productID
  // => return to home page
  if (!thisProduct) {
    window.location.href = "/";
  }
  // and if has, add data this product in html
  detail.querySelector(".image img").src = thisProduct.img;
  detail.querySelector(".name").innerText = thisProduct.name;
  detail.querySelector(".price").innerText = "$" + formatPrice(thisProduct.price);
  detail.querySelector(".description").innerText = thisProduct.desc;
  detail.querySelector(".frontCamera").innerText =
    "Camera trước: " + thisProduct.frontCamera;
  detail.querySelector(".backCamera").innerText =
    "Camera sau (Camera chính) : " + thisProduct.backCamera;
  detail.querySelector(".category").innerText =
    "CATEGORY SMARTPHONE: " + thisProduct.type;

  // add datas  products similar
  //show all products
  let listProduct = document.querySelector(".scproducts__list");
  products
    .filter((value) => value.id != productID)
    .forEach((product) => {
      let newProduct = document.createElement("a");
      newProduct.href = "/detail.html?id=" + product.id;
      newProduct.classList.add("item");
      newProduct.innerHTML = `
            <div class="img">
            <img src="${product.img}" alt="" />
            <div class="label">
              <span class="label__discount">-30%</span>
              <span class="label__tag">NEW</span>
            </div>
          </div>
          <div class="content">
            <span class="des">CATEGORY</span>
            <h3 class="title">${product.name}</h3>
            <div class="prices">
              <span class="prices__new">$${formatPrice(product.price)}</span>
              <span class="prices__old">$${formatPrice(formatOldPrice(product.price))}</span>
            </div>
            <div class="rating">
              <i class="fa-solid fa-star icon"></i>
              <i class="fa-solid fa-star icon"></i>
              <i class="fa-solid fa-star icon"></i>
              <i class="fa-solid fa-star icon"></i>
              <i class="fa-solid fa-star icon"></i>
            </div>
            <div class="btns">
              <div class="btns__icon">
                <i class="fa-regular fa-heart icon"></i>
              </div>
              <div class="btns__icon">
                <i class="fa-solid fa-arrow-right-arrow-left icon"></i>
              </div>
              <div class="btns__icon">
                <i class="fa-solid fa-eye icon"></i>
              </div>
            </div>
          </div>
          <div class="cart">
            <button class="cart__btn" onclick="addCart(${product.id}, event)">
              <i class="fa-solid fa-cart-shopping icon"></i>
              <span>ADD TO CART</span>
            </button>
          </div>
            `;
      listProduct.appendChild(newProduct);
    });
    handlePage();
  
}

function addCart($idProduct, event) {
  event.preventDefault();
  let productCopy = JSON.parse(JSON.stringify(products));
  //if this product is not in cart
  if (!listCart[$idProduct]) {
    let dataProduct = productCopy.filter(
      (product) => product.id == $idProduct
    )[0];
    //add data product in cart
    listCart[$idProduct] = dataProduct;
    listCart[$idProduct].quantity = 1;
  } else {
    //if this product is already in the cart
    // i just increased the quantity
    listCart[$idProduct].quantity++;
  }
  // i wiwll save datas cart in cookie
  // to save yhis datas cart when i turn of the computer
  let timeSave = "expries=Thu, 31 Dec 2025 23:59:59 UTC";
  document.cookie =
    "listCart=" + JSON.stringify(listCart) + "; " + timeSave + "; path=/";
  addCarttoHTML();
}

// Cai nay la them vao gio hang do!
function addCarttoHTML() {
  //clear data default;
  let listCartHTML = document.querySelector(".listCart");
  listCartHTML.innerHTML = "";

  let totalHTML = document.querySelector(".totalQuantity");
  let totalQuantity = 0;

  if (listCart) {
    listCart.forEach((product) => {
      if (product) {
        let newCart = document.createElement("div");
        newCart.classList.add("item");
        newCart.innerHTML = `
          <div class="img">
          <img src="${product.img}" alt="" />
        </div>
            <div class="content">
              <div class="name">${product.name}</div>
              <div class="price">$${formatPrice(product.price)} </div>
            </div>
            <div class="quantity">
              <button class="oper" onclick="changeQuantity(${product.id},'-')">-</button>
              <span class="value">${product.quantity}</span>
              <button class="oper" onclick="changeQuantity(${product.id},'+')">+</button>
            </div>`;
        listCartHTML.appendChild(newCart);
        totalQuantity = totalQuantity + product.quantity;
      }
    });
  }
  totalHTML.innerText = totalQuantity;
}
addCarttoHTML();

// Thay doi so luong khi click vao dau cong tru
function changeQuantity($idProduct, $type) {
  switch ($type) {
    case "+":
      listCart[$idProduct].quantity++;
      break;
    case "-":
      listCart[$idProduct].quantity--;
      if (listCart[$idProduct].quantity <= 0) {
        delete listCart[$idProduct];
      }
      break;
    default:
      break;
  }
  //save new cookie
  let timeSave = "expries=Thu, 31 Dec 2025 23:59:59 UTC";
  document.cookie =
    "listCart=" + JSON.stringify(listCart) + "; " + timeSave + "; path=/";
  //reload
  addCarttoHTML();
}

// Gio hang animation
let handleCartNav = () => {
  let iconCart = document.querySelector(".header__shop-item.--cart");
  let cart = document.querySelector(".cartNav");
  let close = document.querySelector(".cartNav .close");

  let container = document.querySelector(".container");
  let containerHeader = document.querySelector(
    ".header .header__bottom .container"
  );
  let containerHeaderTop = document.querySelector(
    ".header .header__top .container"
  );
  let containerFooter = document.querySelector(".footer .container");
  // detailpage
  let containerScdetail = document.querySelector(".scdetail .container");
  let containerScsimilar = document.querySelector(".scsimilar .container");

  if (cart.style.right != "-100%") {
    handleCartFirst();
  }
  function handleCartFirst() {
    cart.style.right = "-100%";
    if (containerScdetail) {
      containerScdetail.style.transform = "translateX(0)";
    }
    if (containerScsimilar) {
      containerScsimilar.style.transform = "translateX(0)";
    }
    if (container) {
      container.style.transform = "translateX(0)";
    }
    if (containerHeader) {
      containerHeader.style.transform = "translateX(0)";
    }
    if (containerFooter) {
      containerFooter.style.transform = "translateX(0)";
    }
  }
  
  iconCart.addEventListener("click", () => {
    if (cart.style.right == "-100%") {
      cart.style.right = "0";
      if (containerScdetail) {
        containerScdetail.style.transform = "translateX(-400px)";
      }
      if (containerScsimilar) {
        containerScsimilar.style.transform = "translateX(-400px)";
      }
      if (container) {
        container.style.transform = "translateX(-400px)";
      }
      if (containerHeader) {
        containerHeader.style.transform = "translateX(-400px)";
      }
      if (containerFooter) {
        containerFooter.style.transform = "translateX(-400px)";
      }
    } else {
      handleCartFirst();
    }
  });

  close.addEventListener("click", () => {
    handleCartFirst();
  });
};
handleCartNav();
// Xong gio hang

// Hienn thi logged
document.addEventListener("DOMContentLoaded", function () {
  var headerAdminText = document.querySelector(".header__admin-text");
  var headerAdminOut = document.querySelector(".header__admin-out");
  var loggedInUsername = localStorage.getItem("loggedInUser");

  headerAdminOut.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/index.html"; // Chuyển về trang index.html khi đăng xuất
    alert("Đăng xuất thành công"); // Thông báo đăng xuất thành công
  });

  if (loggedInUsername) {
    headerAdminText.textContent = "Xin chào, " + loggedInUsername;
    headerAdminOut.style.display = "block";
  } else {
    headerAdminOut.style.display = "none";
  }

});

//Ham fomat
function formatPrice(number) {
  return new Intl.NumberFormat('en-US').format(number);
}

 //scroll to top
 let backTop = () => {
  const backTop = document.querySelector(".btnScroll");
  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
};
backTop();

function formatOldPrice(number) {
  // Chuyển đổi chuỗi thành số và thực hiện phép cộng
  const result = Number(number) + 959;

  // Kiểm tra xem kết quả có phải là một số hợp lệ không
  if (isNaN(result)) {
    return "Không phải là một số hợp lệ";
  }

  return result;
}

let thisPage = 1;
let limit = 8;

function handlePage() {
  let list = document.querySelectorAll(".scproducts__list .item");
  // Hien thi so luong item da cai dat
  function loadItem() {
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    list.forEach((item, key) => {
      if (key >= beginGet && key <= endGet) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
    listPage();
  }
  loadItem();

  // Hien thi tong so trang
  function listPage() {
    let count = Math.ceil(list.length / limit);
    let listPageContainer = document.querySelector(".listPage");
    listPageContainer.innerHTML = "";

    // Nut prev
    if (thisPage > 1) {
      let prev = document.createElement("li");
      let icon = document.createElement("i");
      prev.classList.add("fa-solid", "fa-arrow-left");
      prev.appendChild(icon);
      prev.addEventListener("click", function () {
        changePage(thisPage - 1);
      });
      listPageContainer.appendChild(prev);
    }

    // Hien thi so nut
    for (let i = 1; i <= count; i++) {
      let newPage = createPageElement(i);
      listPageContainer.appendChild(newPage);
    }

    // Nut next
    if (thisPage < count) {
      let next = document.createElement("li");
      let icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-arrow-right");
      next.appendChild(icon);
      next.addEventListener("click", function () {
        changePage(thisPage + 1);
      });
      listPageContainer.appendChild(next);
    }
  }

  function createPageElement(i) {
    let newPage = document.createElement("li");
    newPage.innerText = i;
    if (i === thisPage) {
      newPage.classList.add("--is-active");
    }
    // Sử dụng hàm `changePage` để xử lý sự kiện click
    newPage.addEventListener("click", function () {
      changePage(i);
    });
    return newPage;
  }

  function changePage(i) {
    if (i >= 1 && i <= Math.ceil(list.length / limit)) {
      thisPage = i;
      loadItem();
    }
  }
}
handlePage();

