let tourCards = document.querySelector(".main");
let tourPackages = document.querySelector(".main_tour-packages");
let homePageSlider = document.querySelector(".homepage_slider-second-part");
let loginBtn = document.querySelector(".login");
let signUpBtn = document.querySelector(".sign_up-button");
let loginBox = document.querySelector(".login_box");
let signUpBox = document.querySelector(".register-box");
let loginLink = document.querySelector(".login_link");
let signUpLink = document.querySelector(".signup_link");
let closebtn = document.querySelectorAll(".close_icon");
let forgotPass = document.querySelector(".forgot_password");
let forgotBox = document.querySelector(".forgot_password-box");
let backToLogin = document.querySelector(".back_login");
let navMenu= document.querySelector(".menu_ul")
let menuIcon= document.querySelector(".fa-bars")
let allTours;
let searchParams;
//search hisse
document.addEventListener("DOMContentLoaded", function () {
  const tour_select = document.querySelector(".tour_select");
  const number_select = document.querySelector(".number_select");
  const time_select = document.querySelector(".time_select");
  const transport_select = document.querySelector(".transport_select");
  const searchButton = document.querySelector(".search_button-tour");
  fetch("http://localhost:3000/tours")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((tour) => {
        const option_tour = document.createElement("option");
        const option_number = document.createElement("option");
        const option_time = document.createElement("option");
        const option_transport = document.createElement("option");
        option_tour.value = tour.id;
        option_number.value = tour.id;
        option_time.value = tour.id;
        option_transport.value = tour.id;

        option_tour.textContent = tour.tour_name;
        option_number.textContent = tour.people_number;
        option_time.textContent = tour.tour_time;
        option_transport.textContent = tour.transportation;
        tour_select.appendChild(option_tour);
        number_select.appendChild(option_number);
        time_select.appendChild(option_time);
        transport_select.appendChild(option_transport);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    let tour_selected = tour_select.options[tour_select.selectedIndex];
    let number_selected = number_select.options[number_select.selectedIndex];
    let time_selected = time_select.options[time_select.selectedIndex];
    let transport_selected =
      transport_select.options[transport_select.selectedIndex];
    let queryParams = "";
    if (tour_selected.value) {
      queryParams += `??tour_name=${encodeURIComponent(
        tour_selected.textContent
      )}`;
    }
    if (number_selected.value) {
      queryParams += `&people_number=${encodeURIComponent(
        number_selected.textContent
      )}`;
    }
    if (time_selected.value) {
      queryParams += `&tour_time=${encodeURIComponent(
        time_selected.textContent
      )}`;
    }
    if (transport_selected.value) {
      queryParams += `&transportation=${encodeURIComponent(
        transport_selected.textContent
      )}`;
    }
    if (queryParams !== "") {
      queryParams = queryParams.substring(1);
    }
    console.log(queryParams);
    window.location.href = `searchResult.html${queryParams}`;
  });
});
//search result hisse
document.addEventListener("DOMContentLoaded", function () {
  function getSearchParams() {
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }

  searchParams = getSearchParams();
  console.log(searchParams);
});
//turlar get
fetch("http://localhost:3000/tours")
  .then((res) => res.json())
  .then((tours) => {
    allTours = tours;
    createTourCard(tours);
  });
function createTourCard(tours) {
  function navigateToTourPackageDetail(tourId) {
    window.location.href = `tourPackageDetail.html?id=${tourId}`;
  }
  function navigateToPurchase(tourId) {
    window.location.href = `purсhase.html?id=${tourId}`;
  }
  tours.forEach((tour) => {
    if (
      tourCards &&
      searchParams.tour_name === tour.tour_name &&
      searchParams.transportation === tour.transportation &&
      searchParams.tour_time === tour.tour_time &&
      searchParams.people_number === tour.people_number
    ) {
      tourCards.innerHTML += `
<div class="tour_photo-information">
 <img src="${tour.tour_img}" alt="" class="tour_photo" > 
<div class="tour_information">
    <p class="tour_name">${tour.tour_name}</p>
    <div class="tour_information-details">
        <div class="details">
            <p class="detail tour_date"><img src="./assets/images/system-uicons_calendar-month.svg" alt=""> Date: <span>${tour.tour_date}</span></p>
            <p class="detail tour_time"><img src="./assets/images/Group.svg" alt="">Time: <span>${tour.tour_time}</span></p>
            <p class="detail number_people"><img src="./assets/images/Vector.svg" alt="">Number of group: <span>${tour.people_number}</span></p>
            <p class="detail type_transportation"><img src="./assets/images/Vector (1).svg" alt="">Transportation: <span>${tour.transportation}</span></p>
        </div>
        <div class="details">
            <p class="detail tour_duartion"><img src="./assets/images/Layer 2.svg" alt="">  Duartion:<span>${tour.duartion}</span></p>
            <p class="detail guide_service"><img src="./assets/images/icon_guide.svg" alt="">Guide service: <span>${tour.guide_service}</span></p>
            <p class="detail tour_language"><img src="./assets/images/icon_language.svg" alt="">Language: <span>${tour.language}</span></p>
            <p class="detail entry_fees"><img src="./assets/images/icon_ticket.svg" alt="">Entry Fees: <span>${tour.entry_fees}</span></p>
        </div>
        <div class="price_book">
            <p class="price">from <b>${tour.tour_price}</b></p>
            <button class="view_tour">View tour</button>
            <button class="book_now" key="${tour.id}" onclick="navigateToPurchase('${tour.id}')">Book Now</button>
        </div>
    </div>
</div>
</div>`;
    } else if (tourPackages) {
      tourPackages.innerHTML += `
    <div class="tour_package" key="${tour.id}" onclick="navigateToTourPackageDetail('${tour.id}')">
                <img src="${tour.tour_img}" alt="" class="tour_package-img">
            <p class="tour_package-name">${tour.tour_name}</p>
            <p class="tour_package-price">from <span>${tour.tour_price}</span></p>
            <div class="tour_package-date-person">
                <p class="tour_package-date"><img src="/assets/images/Layer 1223 (2).svg" alt=""> ${tour.tour_date}</p>
                <p class="tour_package-person"><img src="./assets/images/Layer 12(1).svg" alt="">${tour.people_number}</p>
            </div>
            <p class="tour_package-information">${tour.tour_information}</p>
            <p class="read_more">Read More <img src="./assets/images/Layer 122 (3).svg" alt=""></p>
            </div>
    `;
    } else if (homePageSlider) {
      homePageSlider.innerHTML += ` <div class="slider_tour-package" id="${tour.id}" >
    <img src="${tour.tour_img}" alt="" class="tour_package-img">
<p class="tour_package-name">${tour.tour_name}</p>
<p class="tour_package-price">from <span> ${tour.tour_price}</span></p>
<div class="tour_package-date-person">
    <p class="tour_package-date"><img src="/assets/images/Layer 1223 (2).svg" alt="">${tour.tour_date}</p>
    <p class="tour_package-person"><img src="./assets/images/Layer 12(1).svg" alt="">${tour.people_number}</p>
</div>
<p class="tour_package-information">${tour.tour_information}</p>
<p class="read_more">Read More <img src="./assets/images/Layer 122 (3).svg" alt=""></p>
</div>`;
    }

    document.querySelectorAll(".tour_package").forEach((tourPackage) => {
      tourPackage.addEventListener("click", function () {
        const tourId = tourPackage.getAttribute("key");
        navigateToTourPackageDetail(tourId);
      });
    });
    document.querySelectorAll(".book_now").forEach((tourPackage) => {
      tourPackage.addEventListener("click", function () {
        const tourId = tourPackage.getAttribute("key");
        navigateToPurchase(tourId);
      });
    });
  });
}
homePageSlider.addEventListener("click", (event) => {
  const tourId = event.target.closest(".slider_tour-package").id;
  if (tourId) {
    window.location.href = `/tourPackageDetail.html?id=${tourId}`;
  }
});

const App = {
  // Function to toggle active class on elements
  toggleActive: function(activeElement, inactiveElement) {
    activeElement.classList.add("active");
    inactiveElement.classList.remove("active");
  },

  // Function to handle close button click
  handleClose: function(loginBox, signUpBox) {
    if (loginBox.classList.contains("active")) {
      loginBox.classList.remove("active");
    } else if (signUpBox.classList.contains("active")) {
      signUpBox.classList.remove("active");
    }
  },

  // Function to initialize event listeners
  initListeners: function() {
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        this.toggleActive(loginBox, signUpBox);
      });
    }

    if (signUpBtn) {
      signUpBtn.addEventListener("click", () => {
        this.toggleActive(signUpBox, loginBox);
      });
    }

    if (loginLink) {
      loginLink.addEventListener("click", () => {
        this.toggleActive(loginBox, signUpBox);
      });
    }

    if (signUpLink) {
      signUpLink.addEventListener("click", () => {
        this.toggleActive(signUpBox, loginBox);
      });
    }

    closebtn.forEach((close) => {
      close.addEventListener("click", () => {
        this.handleClose(loginBox, signUpBox);
      });
    });

    if (forgotPass) {
      forgotPass.addEventListener("click", () => {
        forgotBox.classList.toggle("active");
        loginBox.classList.remove("active");
      });
    }

    if (backToLogin) {
      backToLogin.addEventListener("click", () => {
        forgotBox.classList.remove("active");
        loginBox.classList.toggle("active");
      });
    }
  }
};
if (menuIcon) {
  menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// Initialize the application
App.initListeners();

