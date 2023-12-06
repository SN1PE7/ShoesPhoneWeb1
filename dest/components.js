// Schero
let handlehero = () => {
  let slider = document.querySelector(".schero__list");
  if (slider) {
    let flktySlider = new Flickity(slider, {
      // options
      cellAlign: "left",
      contain: true,
      draggable: ">1",
      wrapAround: true,
      prevNextButtons: false,
      autoPlay: 3000,
      selectedAttraction: 0.01,
      friction: 0.3,
      // pageDots: false,
      on: {
        ready: function () {
          console.log("Flickity is ready");
        },
        // change: function (index) {
        //   console.log("Slide changed to" + index);
        //   handleNumber(index);
        // },
      },
    });
  }
};
handlehero();

//handlePopup
let handlePopup = () => {
  let popup = document.querySelector(".popup");
  if (popup) {
    let videoArray = document.querySelectorAll(
      ".scevent .scevent__list .scevent__list-item"
    );
    let iframe = document.querySelector(
      ".popup .popup__video .popup__video-frame iframe"
    );
    let iconClose = document.querySelector(
      ".popup .popup__video .popup__video-frame .iconClose"
    );
    videoArray.forEach((item) => {
      item.addEventListener("click", () => {
        popup.classList.add("--is-active");
        let dataID = item.getAttribute("data-video");
        // console.log(dataID);
        iframe.setAttribute(
          "src",
          `https://www.youtube.com/embed/${dataID}?autoplay=1`
        );
      });
    });

    let hidePopup = () => {
      popup.classList.remove("--is-active");
      iframe.setAttribute("src", "");
    };
    iconClose.addEventListener("click", hidePopup);
    popup.addEventListener("click", hidePopup);
  }
};
handlePopup();
//end handlePopup

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

//scroll header
let scrollHeader = () => {
  const header = document.querySelector(".nav");
  const schero = document.querySelector(".schero");
  const arrayA = document.querySelector(".nav__list-item a");
  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    if (scroll >= schero.offsetHeight + header.offsetHeight) {
      header && header.classList.add("--is-active");
    } else {
      header && header.classList.remove("--is-active");
    }
  });
};
scrollHeader();
//end scroll header = ()

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

//Loading ........
// function handleLoading(percent) {
//   let progress = document.querySelector(".loading__inner-progress");
//   let textPercent = document.querySelector(".loading__percent");
//   progress.style.width = `${percent}%`;
//   textPercent.innerText = `${percent}%`;
// }

// function hideLoading() {
//   const loading = document.querySelector(".loading");
//   const body = document.querySelector("body");
//   loading.classList.add("--is-loaded");
//   body.classList.remove("--disable-scroll");
// }

// function initLoading() {
//   let loadedCount = 0;
//   let imgs = document.querySelectorAll("img").length;
//   let body = document.querySelector("body");

//   let imgLoad = imagesLoaded(body);

//   imgLoad.on("progress", (instance) => {
//     loadedCount++;
//     let percent = Math.floor((loadedCount / imgs) * 100);
//     handleLoading(percent);
//   });

//   imgLoad.on("always", (instance) => {
//     console.log("always");
//   });
//   imgLoad.on("done", (instance) => {
//     console.log("done");
//     hideLoading();
//     // handleCarousel();
//   });
//   imgLoad.on("fail", function (instance) {
//     console.log("fail");
//   });
// }
// initLoading();
//End Loading ........


let handleCartNav = () => {
  // CARTNAV
  let cart = document.querySelector(".cartNav");
  let iconCart = document.querySelector(".header__shop-item.--cart");
  let close = document.querySelector(".cartNav .close");

  let container = document.querySelector(".container");
  let containerHeader = document.querySelector(
    ".header .header__bottom .container"
  );
  let containerHeaderTop = document.querySelector(
    ".header .header__top .container"
  );
  let containerFooter = document.querySelector(".footer .container");
  let containerScproducts = document.querySelector(".scproducts .container");
  let containerScservice = document.querySelector(".scservice .container");
  let containerSchotdeal = document.querySelector(".schotdeal .container");
  let containerScevent = document.querySelector(".scevent .container");
  let containerScsign = document.querySelector(".scsign .container");

  // kiem tra truoc khi else
  if (cart.style.right != "-100%") {
    handleCartFirst();
  }
  function handleCartFirst() {
    cart.style.right = "-100%";
    if (containerScproducts) {
      containerScproducts.style.transform = "translateX(0)";
    }
    if (containerScservice) {
      containerScservice.style.transform = "translateX(0)";
    }
    if (container) {
      container.style.transform = "translateX(0)";
    }
    if (containerSchotdeal) {
      containerSchotdeal.style.transform = "translateX(0)";
    }
    if (containerScevent) {
      containerScevent.style.transform = "translateX(0)";
    }
    if (containerScsign) {
      containerScsign.style.transform = "translateX(0)";
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
      if (containerScproducts) {
        containerScproducts.style.transform = "translateX(-400px)";
      }
      if (containerScservice) {
        containerScservice.style.transform = "translateX(-400px)";
      }
      if (container) {
        container.style.transform = "translateX(-400px)";
      }
      if (containerSchotdeal) {
        containerSchotdeal.style.transform = "translateX(-400px)";
      }
      if (containerScevent) {
        containerScevent.style.transform = "translateX(-400px)";
      }
      if (containerScsign) {
        containerScsign.style.transform = "translateX(-400px)";
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
  // Đóng cửa sổ giỏ hàng
  close.addEventListener("click", () => {
    handleCartFirst();
  });
};
handleCartNav();
