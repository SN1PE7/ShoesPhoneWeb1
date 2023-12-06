let orders = [];
orders = getLocalStorage();
function renderOrder() {
  let content = '';
  let tableOrder = $a('#listOrder');

  for (let i = 0; i < orders.length; i++) {
    let listOrder = orders[i];

    // Kiểm tra nếu info không phải là null
    let filteredInfo = listOrder.info
      ? listOrder.info.filter((info) => info !== null)
      : [];

    // Sử dụng reduce trên mảng đã lọc
    let infoContent = filteredInfo.reduce(function (prev, product) {
      return (prev !== '' ? prev + ',' : '') + ' ' + product.name;
    }, '');

    let totalPrice = filteredInfo.reduce(function (prev, product) {
      return prev + +product.price * product.quantity;
    }, 0);

    content += `<tr>
        <td>${listOrder.id}</td>
        <td>${listOrder.customer.fullname}</td>
        <td>${infoContent}</td>
        <td>${totalPrice}</td>
        <td>${listOrder.date}</td>
        <td>${listOrder.customer.phone}</td>
        <td>${listOrder.customer.address}</td>
        <td>${listOrder.customer.email}</td>
        <td>${
          listOrder.status == 0
            ? 'Đợi xử lí'
            : listOrder.status == 1
            ? 'Đã xử lí'
            : 'Đã huỷ đơn'
        }</td>
        <td>
          <button id="deleteOrder" class="fa-solid fa-trash" idOrder="${
            listOrder.id
          }" ></button>
          <button id="confirmOrder" class="fa-solid fa-check" IdOrder="${
            listOrder.id
          }"></button>
        </td>
      </tr>`;
  }

  // Gán nội dung vào bảng
  tableOrder.innerHTML = content;
}

function getLocalStorage() {
  let dataString = localStorage.getItem('listBills');
  orders = JSON.parse(dataString) || [];
  return orders;
}

getLocalStorage();
renderOrder();
function deleteOrder(id) {
  Swal.fire({
    title: 'Bạn có chắc chắn muốn xoá không?',
    text: 'Hành động này không thể hoàn tác!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xoá',
    cancelButtonText: 'Hủy',
  }).then((result) => {
    if (result.isConfirmed) {
      index = orders.findIndex((item) => item.id === id);
      if (index !== -1) {
        orders.splice(index, 1);
        renderOrder();
      }
      localStorage.setItem('listBills', JSON.stringify(orders));
      NotiAlert('success', 'Đã xoá đơn hàng!', 1500);
    }
  });
}

$a('#listOrder').addEventListener('click', function (event) {
  // event.preventDefault();
  const id = event.target.id;
  const idOrder = event.target.getAttribute('idOrder');

  switch (id) {
    case 'deleteOrder':
      deleteOrder(idOrder);
      break;
    case 'confirmOrder':
      $a('#ModalNotify').style.display = 'block';
      getInfoOrder(idOrder);
      break;
  }
});

function getInfoOrder(id) {
  let index = orders.findIndex(function (order) {
    return order.id === id;
  });

  if (index !== -1) {
    const order = orders[index];
    const infoFilter = order.info.filter((item) => item);
    $a('#NotiName').textContent = order.customer.fullname;

    const productsText = infoFilter.reduce((prev, product) => {
      return `${prev !== '' ? `${prev}, ` : ''}${product.name}`;
    }, '');

    const totalPrice = infoFilter.reduce((prev, product) => {
      return prev + +product.price * product.quantity;
    }, 0);

    $a('#NotiPrice').textContent = `${totalPrice}`;
    $a('#NotiProduct').textContent = productsText;
    $a('#NotiPhone').textContent = order.customer.phone;
    $a('#NotiAddress').textContent = order.customer.address;
    $a('#NotiDate').textContent = order.date;
    $a('#NotiStatus').innerHTML = `<select name="" idOrder="${
      order.id
    }" id="selectStatus">
      <option value="0">Đợi xử lí</option>
      <option value="1" ${
        order.status === 1 ? 'selected' : ''
      }>Đã xử lí</option>
      <option value="2" ${
        order.status === 2 ? 'selected' : ''
      }>Đã huỷ đơn</option>
    </select>`;
  }
}

function updateStatus(id, valueStatus) {
  let orderByID = orders.findIndex(function (order) {
    return order.id === id;
  });

  if (orderByID != -1) {
    console.log(123);
    orders[orderByID].status = valueStatus;
    localStorage.setItem('listBills',JSON.stringify(orders))
    renderOrder(orders);
    // saveBillToLocalStorage();
  }
}
$a('#ModalNotify').addEventListener('change', (e) => {
  const id = e.target.getAttribute('idOrder');
  const valueSelect = e.target.value;
  updateStatus(id, valueSelect);
});
function NotiAlert(icon, title, timer) {
  Swal.fire({
    position: 'center',
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: timer,
  });
}
