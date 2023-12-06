// var username = document.querySelector("#username");
// var email = document.querySelector("#email");
// var password = document.querySelector("#password");
// var confirmPassword = document.querySelector("#confirm-password");
// var phone = document.querySelector("#phone");
// var address = document.querySelector("#address");
// var fullname = document.querySelector("#fullname");
// var select = document.querySelector("#select");
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

// function checkEmptyError(...listInput) {
//   let isEmptyError = false;
//   listInput.forEach((input) => {
//     input.value = input.value.trim();
//     if (input.value === "") {
//       isEmptyError = true;
//       showError(input, "Không được để trống!");
//     } else {
//       showSuccess(input);
//     }
//   });

//   return isEmptyError;
// }

// // Regex email
// function checkEmailError(input) {
//   const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
//   // Kiểm tra không để trống
//   if (input.value.trim() === "") {
//     showError(input, "Không được để trống");
//     return true;
//   }
//   // Kiểm tra đúng định dạng email
//   let isEmailError = !regexEmail.test(input.value);
//   if (isEmailError) {
//     showError(input, "Email không đúng định dạng");
//   } else {
//     showSuccess(input);
//   }

//   return isEmailError;
// }

// // Regex Phone
// function checkPhoneError(input) {
//   const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
//   if (input.value.trim() === "") {
//     showError(input, "Không được để trống");
//     return true;
//   }
//   let isPhoneError = !regexPhone.test(input.value);
//   if (isPhoneError) {
//     showError(input, "Số điện thoại không đúng định dạng VN");
//   } else {
//     showSuccess(input);
//   }
//   return isPhoneError;
// }

// // Password
// // Check length within the range [min, max]
// function checkLengthError(input, min, max) {
//   if (input.value.trim() === "") {
//     showError(input, "Không được để trống");
//     return true;
//   }

//   input.value = input.value.trim();
//   if (
//     input.value === "" ||
//     input.value.length < min ||
//     input.value.length > max
//   ) {
//     showError(input, `Phải có từ ${min} - ${max} ký tự`);
//     return true;
//   }

//   showSuccess(input);
//   return false;
// }

// // Confirm Password
// function checkMatchPasswordError(passwordInput, cfPasswordInput) {
//   if (passwordInput.value !== cfPasswordInput.value) {
//     showError(cfPasswordInput, "Mật khẩu không trùng khớp");
//     return true;
//   }
//   return false;
// }

// // Fullname
// function checkFullnameError(input) {
//   if (input.value.trim() === "") {
//     showError(input, "Không được để trống");
//     return true;
//   }

//   const words = input.value.split(" ");
//   for (const word of words) {
//     if (!/^[A-Z]/.test(word)) {
//       showError(input, "In hoa chữ cái đầu mỗi từ");
//       return true;
//     }
//   }

//   showSuccess(input);
//   return false;
// }

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   let isEmptyError = checkEmptyError(
//     username,
//     email,
//     password,
//     confirmPassword,
//     phone,
//     address,
//     fullname
//   );
//   let isEmailError = checkEmailError(email);
//   let isUsernameLengthError = checkLengthError(username, 2, 8);
//   let isPasswordLengthError = checkLengthError(password, 3, 10);
//   let isMatchError = checkMatchPasswordError(password, confirmPassword);
//   let isPhoneError = checkPhoneError(phone);
//   let isFullnameError = checkFullnameError(fullname);

//   if (
//     isEmptyError ||
//     isEmailError ||
//     isUsernameLengthError ||
//     isPasswordLengthError ||
//     isMatchError ||
//     isPhoneError ||
//     isFullnameError
//   ) {
//     Swal.fire({
//       position: "center",
//       icon: "error",
//       title: "Vui lòng kiểm tra lại!",
//       showConfirmButton: false,
//       timer: 1000,
//     });
//   } else {
//     var isUsernameTaken = false;
//     var isEmailTaken = false;
//     var isPhoneTaken = false;

//     for (var i = 0; i < localStorage.length; i++) {
//       var key = localStorage.key(i);
//       var userJSON = localStorage.getItem(key);
//       try {
//         var user = JSON.parse(userJSON);
//         if (user.username === username.value) {
//           isUsernameTaken = true;
//           showError(username, "Tên đăng nhập đã tồn tại");
//         }
//         if (user.email === email.value) {
//           isEmailTaken = true;
//           showError(email, "Email đã tồn tại");
//         }
//         if (user.phone === phone.value) {
//           isPhoneTaken = true;
//           showError(phone, "Số điện thoại đã tồn tại");
//         }
//       } catch (error) {
//         // Nếu không thể phân tích chuỗi JSON, bỏ qua nó và tiếp tục với mục tiếp theo.
//       }
//     }

//     if (isUsernameTaken || isEmailTaken || isPhoneTaken) {
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: "Đăng ký thất bại!",
//         showConfirmButton: false,
//         timer: 1000,
//       });
//     } else {
//       //======= Cai tren khong quan tam ==============

//       //============  SU LY API TAI DAY NHE ===========================

//       var user = {
//         username: username.value,
//         email: email.value,
//         password: password.value,
//         fullname: fullname.value,
//         phone: phone.value,
//         address: address.value,

//       };
//       var json = JSON.stringify(user);
//       localStorage.setItem(username.value, json);

//       Swal.fire({
//         position: "center",
//         icon: "success",
//         title: "Đăng ký thành công",
//         showConfirmButton: false,
//         timer: 1000,
//       });
//       setTimeout(() => {
//         window.location.href = "/login.html";
//       }, 600);
//     }
//   }
// });

//======== TÂY SIGNUP
const $a = document.querySelector.bind(document);
const userName = $a('#username');
const fullName = $a('#fullname');
const passWord = $a('#password');
const email = $a('#email');
const phone = $a('#phone');
const address = $a('#address');
const passWordAgain = $a('#confirm-password');
const form = $a('form');

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

function checkEmptyError(...listInput) {
  let isEmptyError = false;
  listInput.forEach((input) => {
    input.value = input.value.trim();
    if (input.value === '') {
      isEmptyError = true;
      showError(input, 'Không được để trống!');
    } else {
      showSuccess(input);
    }
  });

  return isEmptyError;
}

function checkEmailError(input) {
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (input.value.trim() === '') {
    showError(input, 'Không được để trống');
    return true;
  }
  let isEmailError = !regexEmail.test(input.value);
  if (isEmailError) {
    showError(input, 'Email không đúng định dạng');
  } else {
    showSuccess(input);
  }

  return isEmailError;
}

function checkPhoneError(input) {
  const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  if (input.value.trim() === '') {
    showError(input, 'Không được để trống');
    return true;
  }
  let isPhoneError = !regexPhone.test(input.value);
  if (isPhoneError) {
    showError(input, 'Số điện thoại không đúng định dạng VN');
  } else {
    showSuccess(input);
  }
  return isPhoneError;
}

function checkLengthError(input, min, max) {
  if (input.value.trim() === '') {
    showError(input, 'Không được để trống');
    return true;
  }

  input.value = input.value.trim();
  if (
    input.value === '' ||
    input.value.length < min ||
    input.value.length > max
  ) {
    showError(input, `Phải có từ ${min} - ${max} ký tự`);
    return true;
  }

  showSuccess(input);
  return false;
}

function checkMatchPasswordError(passwordInput, cfPasswordInput) {
  if (passwordInput.value !== cfPasswordInput.value) {
    showError(cfPasswordInput, 'Mật khẩu không trùng khớp');
    return true;
  }
  return false;
}

function checkFullnameError(input) {
  if (input.value.trim() === '') {
    showError(input, 'Không được để trống');
    return true;
  }

  const words = input.value.split(' ');
  for (const word of words) {
    if (!/^[A-Z]/.test(word)) {
      showError(input, 'In hoa chữ cái đầu mỗi từ');
      return true;
    }
  }

  showSuccess(input);
  return false;
}

function validateForm() {
  let isEmptyError = false;

  isEmptyError = checkEmptyError(
    userName,
    email,
    passWord,
    passWordAgain,
    phone,
    address,
    fullName
  );

  let isEmailError = checkEmailError(email);
  let isUsernameLengthError = checkLengthError(userName, 2, 8);
  let isPasswordLengthError = checkLengthError(passWord, 3, 10);
  let isMatchError = checkMatchPasswordError(passWord, passWordAgain);
  let isPhoneError = checkPhoneError(phone);
  let isFullnameError = checkFullnameError(fullName);

  if (
    isEmptyError ||
    isEmailError ||
    isUsernameLengthError ||
    isPasswordLengthError ||
    isMatchError ||
    isPhoneError ||
    isFullnameError
  ) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Vui lòng kiểm tra lại!',
      showConfirmButton: false,
      timer: 1000,
    });
    return false;
  }

  return true;
}
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (validateForm()) {
    // Kiểm tra tên đăng nhập đã tồn tại
    axios
      .get('https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/users')
      .then((response) => {
        const users = response.data;

        const isUsernameTaken = users.some(
          (user) => user.username === userName.value
        );
        const isEmailTaken = users.some((user) => user.email === email.value);
        const isPhoneTaken = users.some(
          (user) => user.phonenumber === phone.value
        );

        if (isUsernameTaken || isEmailTaken || isPhoneTaken) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Đăng ký thất bại. Vui lòng thử lại!',
            showConfirmButton: false,
            timer: 900,
          });
        }

        if (isUsernameTaken) {
          showError(userName, 'Tên đăng nhập đã tồn tại');
        }

        if (isEmailTaken) {
          showError(email, 'Email đã tồn tại');
        }

        if (isPhoneTaken) {
          showError(phone, 'Số điện thoại đã tồn tại');
        }

        // Nếu không tồn tại thông tin trùng lặp, tiến hành đăng ký
        if (!isUsernameTaken && !isEmailTaken && !isPhoneTaken) {
          // Thực hiện lưu dữ liệu trên Axios
          axios
            .post('https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/users', {
              username: userName.value,
              password: passWord.value,
              fullname: fullName.value,
              phonenumber: phone.value,
              address: address.value,
              email: email.value,
              type: 'User',
            })
            .then((response) => {
              console.log(response.data);

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đăng ký thành công',
                showConfirmButton: false,
                timer: 1500,
              });

              setTimeout(() => {
                window.location.href = '/login.html';
              }, 1500);
            })
            .catch((error) => {
              console.error('Đăng ký thất bại:', error);

              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Đăng ký thất bại. Vui lòng thử lại!',
                showConfirmButton: false,
                timer: 1500,
              });
            });

          // Lưu dữ liệu vào LocalStorage
          localStorage.setItem(
            userName.value,
            JSON.stringify({
              username: userName.value,
              password: passWord.value,
              fullname: fullName.value,
              phone: phone.value,
              address: address.value,
              email: email.value,
              type: 'User',
            })
          );
        }
      })
      .catch((error) => {
        console.error('Lỗi khi kiểm tra trùng lặp:', error);
      });
  }
});
