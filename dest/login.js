// var username = document.querySelector("#username");
// var password = document.querySelector("#password");
// var form = document.querySelector("form");

// function showError(input, message) {
//   let parent = input.parentElement;
//   let small = parent.querySelector("small");
//   parent.classList.add("error");
//   small.innerText = message;
// }

// function showSuccess(input) {
//   let parent = input.parentElement;
//   let small = parent.querySelector("small");
//   parent.classList.remove("error");
//   small.innerText = "";
// }

// function isEmpty(value) {
//   return value.trim() === "";
// }

// function checkEmptyError(input) {
//   input.value = input.value.trim();
//   if (isEmpty(input.value)) {
//     showError(input, "Không được để trống!");
//     return true;
//   } else {
//     showSuccess(input);
//     return false;
//   }
// }

// // Password
// function checkLengthError(input, min, max) {
//   input.value = input.value.trim();
//   if (isEmpty(input.value) || input.value.length < min || input.value.length > max) {
//     showError(input, `Phải có từ ${min} - ${max} ký tự`);
//     return true;
//   }

//   showSuccess(input);
//   return false;
// }

// // Xy ly local stoge
// function performLogin(username, password) {
//     var user = localStorage.getItem(username);
  
//     if (username === "" || password === "") {
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: "Vui lòng không để trống",
//         showConfirmButton: false,
//         timer: 1000,
//       });
//     } else if (user == null) {
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: "Tài khoản không tồn tại",
//         showConfirmButton: false,
//         timer: 1000,
//       });
//     } else {
//       var data = JSON.parse(user);
//       if (password === data.password) {
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "Đăng nhập thành công",
//           showConfirmButton: false,
//           timer: 1000,
//         });
//         localStorage.setItem("loggedInUser", username);
//         setTimeout(function () {
//             window.location.href = "/checkout.html";
//           }, 600);
//       } else {
//         Swal.fire({
//           position: "center",
//           icon: "error",
//           title: "Mật khẩu đăng nhập không đúng!",
//           showConfirmButton: false,
//           timer: 1000,
//         });
//       }
//     }
//   }
  

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   let isEmptyError = checkEmptyError(username) || checkEmptyError(password);
//   let isUsernameLengthError = checkLengthError(username, 2, 8);
//   let isPasswordLengthError = checkLengthError(password, 3, 10);

//   if (isEmptyError || isUsernameLengthError || isPasswordLengthError) {
//     Swal.fire({
//       position: "center",
//       icon: "error",
//       title: "Vui lòng kiểm tra lại!",
//       showConfirmButton: false,
//       timer: 1000,
//     });
//   } else {
//     //=== Xu ly api tai day ===, xoa ham perdormLogin vi no luu vao localstore
//     performLogin(username.value, password.value);
   
//     // Reset giá trị trường username và password
//     username.value = "";
//     password.value = "";
//   }
// });

//============ TÂY LOGIN
const $a = document.querySelector.bind(document);
const usernameInput = $a('#username');
const passwordInput = $a('#password');
const form = document.querySelector('form');

function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector('small');
  parent.classList.add('error');
  small.innerText = message;
}

function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector('small');
  parent.classList.remove('error');
  small.innerText = '';
}

function isEmpty(value) {
  return value.trim() === '';
}

function checkEmptyError(input) {
  input.value = input.value.trim();
  if (isEmpty(input.value)) {
    showError(input, 'Không được để trống!');
    return true;
  } else {
    showSuccess(input);
    return false;
  }
}

function checkLengthError(input, min, max) {
  input.value = input.value.trim();
  if (
    isEmpty(input.value) ||
    input.value.length < min ||
    input.value.length > max
  ) {
    showError(input, `Phải có từ ${min} - ${max} ký tự`);
    return true;
  }

  showSuccess(input);
  return false;
}

function performLogin(username, password) {
  // Lấy danh sách người dùng từ API hoặc localStorage
  let promise = axios({
    url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/users',
    method: 'GET',
  });

  promise.then((data) => {
    let users = data.data;

    // Kiểm tra từng người dùng
    for (let i = 0; i < users.length; i++) {
      if (username === users[i].username) {
        if (password === users[i].password) {
          // Lưu thông tin đăng nhập vào localStorage
          let status = {
            statusLogin: true,
            userType: users[i].type,
          };
          localStorage.setItem('Login', JSON.stringify(status));
          localStorage.setItem('loggedInUser', username);
          localStorage.setItem('loggedIDUser', users[i].id);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đăng nhập thành công',
            showConfirmButton: false,
            timer: 1000,
          });
          window.location.href = '../index.html';

          // Kiểm tra loại tài khoản và chuyển hướng
          checkUserTypeAndRedirect(users[i].type);
          return;
        }
      }
    }

    // Nếu không tìm thấy người dùng hoặc mật khẩu không đúng
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Tài khoản hoặc mật khẩu không đúng',
      showConfirmButton: false,
      timer: 1000,
    });
  });
}
form.addEventListener('submit', function (e) {
  e.preventDefault();
  let isEmptyError =
    checkEmptyError(usernameInput) || checkEmptyError(passwordInput);
  let isUsernameLengthError = checkLengthError(usernameInput, 2, 8);
  let isPasswordLengthError = checkLengthError(passwordInput, 3, 10);
if (isEmptyError || isUsernameLengthError || isPasswordLengthError) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Vui lòng kiểm tra lại!',
      showConfirmButton: false,
      timer: 1000,
    });
  } else {
    // Gọi hàm thực hiện đăng nhập
    performLogin(usernameInput.value, passwordInput.value);

    // Reset giá trị trường username và password
    usernameInput.value = '';
    passwordInput.value = '';
  }
});
// kiem tra user hay admin
function checkUserTypeAndRedirect(userType) {
  if (userType === 'admin') {
    // Chuyển hướng tới trang admin
    window.location.href = '../AdminPort/index.html';
  } else if (userType === 'user') {
    // Chuyển hướng tới trang user
    window.location.href = '../index.html';
  } else {
    console.log('User type not recognized or not logged in.');
  }
}