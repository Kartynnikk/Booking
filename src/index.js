const inputFlightStartDate = document.getElementById("input-flight-startdate");
const inputFlightEndDate = document.getElementById("input-flight-enddate");
const inputHotelStartDate = document.getElementById("input-hotel-startdate");
const inputHotelEndDate = document.getElementById("input-hotel-enddate");
const inputCarStartDate = document.getElementById("input-car-startdate");
const inputCarEndDate = document.getElementById("input-car-enddate");
const flightSearchButton = document.getElementById("flight-button-search");
const flightClearButton = document.getElementById("flight-button-clear");
const hotelSearchButton = document.getElementById("hotel-button-search");
const hotelClearButton = document.getElementById("hotel-button-clear");
const carSearchButton = document.getElementById("car-button-search");
const carClearButton = document.getElementById("car-button-clear");
const inputFrom = document.getElementById("input-from");
const inputTo = document.getElementById("input-to");
const buttonHotelStars = document.getElementById("button-hotel-stars");
const hotelCountryMenu = document.getElementById("hotel-country-menu");
const buttonHotelCountryMenu = document.getElementById("button-hotel-country-menu");
const hotelCityMenu = document.getElementById("hotel-city-menu");
const buttonHotelCityMenu = document.getElementById("button-hotel-city-menu");
const carCountryMenu = document.getElementById("car-country-menu");
const buttonCarCountryMenu = document.getElementById("button-car-country-menu");
const carCityMenu = document.getElementById("car-city-menu");
const buttonCarCityMenu = document.getElementById("button-car-city-menu");

const currentDate = new Date();

const star1 = document.getElementById("star1");
const stars = document.querySelectorAll(".star");
const type = document.querySelectorAll(".type");

const business = document.getElementById("business");
const economy = document.getElementById("economy");

const buttonCarType = document.getElementById("button-car-type");

const formConteiner = document.querySelectorAll(".form-conteiner");

const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

const arrFlight = [];
const arrHotel = [];
const arrCar = [];

const fetchRequestCountry = () => {
  const url = "https://namaztimes.kz/ru/api/country?type=json";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      getCountryHotel(data);
      getCountryCar(data);
    })
    .catch(console.log("Uncorrect data"))
    .finally(console.log("Please check out your data"));
};
fetchRequestCountry();

const getCountryHotel = (data) => {
  for (let countryHotel of Object.entries(data)) {
    let dropdownItemHotel = document.createElement("a");
    dropdownItemHotel.className = "dropdown-item";
    dropdownItemHotel.innerHTML = countryHotel;

    let liItemHotel = document.createElement("li");

    hotelCountryMenu.appendChild(liItemHotel);
    liItemHotel.appendChild(dropdownItemHotel);

    dropdownItemHotel.addEventListener("click", () => {
      buttonHotelCountryMenu.innerHTML = countryHotel;
    });
  }
};

const fetchRequestCity = () => {
  const url = "https://namaztimes.kz/ru/api/cities?id=almaty&type=json";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      getCityHotel(data);
      getCityCar(data);
    })
    .catch(console.log("Uncorrect data"))
    .finally(console.log("Please check out your data"));
};

fetchRequestCity();

const getCityHotel = (data) => {
  for (let cityHotel of Object.entries(data)) {
    let dropdownItemHotel = document.createElement("a");
    dropdownItemHotel.className = "dropdown-item";
    dropdownItemHotel.innerHTML = cityHotel;

    let liItemHotel = document.createElement("li");

    hotelCityMenu.appendChild(liItemHotel);
    liItemHotel.appendChild(dropdownItemHotel);

    dropdownItemHotel.addEventListener("click", () => {
      buttonHotelCityMenu.innerHTML = cityHotel;
    });
  }
};

const getCountryCar = (data) => {
  for (let countryCar of Object.entries(data)) {
    let dropdownItemCar = document.createElement("a");
    dropdownItemCar.className = "dropdown-item";
    dropdownItemCar.innerHTML = countryCar;

    let liItemCar = document.createElement("li");

    carCountryMenu.appendChild(liItemCar);
    liItemCar.appendChild(dropdownItemCar);

    dropdownItemCar.addEventListener("click", () => {
      buttonCarCountryMenu.innerHTML = countryCar;
    });
  }
};

const getCityCar = (data) => {
  for (let cityCar of Object.entries(data)) {
    let dropdownItemCar = document.createElement("a");
    dropdownItemCar.className = "dropdown-item";
    dropdownItemCar.innerHTML = cityCar;

    let liItemCar = document.createElement("li");

    carCityMenu.appendChild(liItemCar);
    liItemCar.appendChild(dropdownItemCar);

    dropdownItemCar.addEventListener("click", () => {
      buttonCarCityMenu.innerHTML = cityCar;
    });
  }
};

const getFlightForm = () => {
  const flightData = {
    flightStartDate: "",
    flightEndDate: "",
    flightFrom: "",
    flightTo: "",
  };

  const flightStartDate = new Date(inputFlightStartDate.value);
  const flightStartDateInForm = flightStartDate.toLocaleDateString("en-US", options);

  flightData.flightStartDate = flightStartDateInForm;

  const flightEndDate = new Date(inputFlightEndDate.value);
  const flightEndDateInForm = flightEndDate.toLocaleDateString("en-US", options);

  flightData.flightEndDate = flightEndDateInForm;

  flightData.flightFrom = inputFrom.value;
  flightData.flightTo = inputTo.value;

  if (flightStartDate.getTime() <= currentDate.getTime() || flightEndDate.getTime() <= flightStartDate.getTime()) {
    buttonSearch.setAttribute("disabled", true);
  } else {
    buttonSearch.removeAttribute("disabled");
  }

  console.log(flightData);

  inputFrom.value;
  inputTo.value;

  arrFlight.push(flightData);

  localStorage.setItem("historyDataFlight", JSON.stringify(arrFlight));
};

flightClearButton.addEventListener("click", () => {
  inputFlightStartDate.value = "";
  inputFlightEndDate.value = "";
  inputFrom.value = "";
  inputTo.value = "";
});

const getHotelForm = () => {
  const hotelData = {
    hotelStartDate: "",
    hotelEndDate: "",
    starsAmount: "",
    hotelCountry: "",
    hotelCity: "",
  };

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const startAmount = star.getAttribute("value");
      hotelData.starsAmount = startAmount;
      buttonHotelStars.innerHTML = star.innerHTML;
    });
  });

  const hotelStartDate = new Date(inputHotelStartDate.value);
  const hotelStartDateInForm = hotelStartDate.toLocaleDateString("en-US", options);

  const hotelEndDate = new Date(inputHotelEndDate.value);
  const hotelEndDateInForm = hotelEndDate.toLocaleDateString("en-US", options);

  hotelData.hotelStartDate = hotelStartDateInForm;

  hotelData.hotelEndDate = hotelEndDateInForm;

  if (hotelStartDate.getTime() <= currentDate.getTime() || hotelEndDate.getTime() <= hotelStartDate.getTime()) {
    buttonSearch.setAttribute("disabled", true);
  } else {
    buttonSearch.removeAttribute("disabled");
  }

  buttonHotelStars.innerHTML;
  buttonHotelCountryMenu.innerHTML;
  buttonHotelCityMenu.innerHTML;

  hotelData.hotelCountry = buttonHotelCountryMenu.innerHTML;
  hotelData.hotelCity = buttonHotelCityMenu.innerHTML;

  arrHotel.push(hotelData);

  localStorage.setItem("historyDataHotel", JSON.stringify(arrHotel));
};

hotelClearButton.addEventListener("click", () => {
  inputHotelStartDate.value = "";
  inputHotelEndDate.value = "";
  buttonHotelStars.innerHTML = star1.innerHTML;
  buttonHotelCountryMenu.innerHTML = "";
  buttonHotelCityMenu.innerHTML = "";
});

const getCarForm = () => {
  const carData = {
    carStartDate: "",
    carEndDate: "",
    carType: "",
    carCountry: "",
    carCity: "",
  };

  type.forEach((tp) => {
    tp.addEventListener("click", () => {
      const type = tp.getAttribute("id");
      carData.carType = type;
      buttonCarType.innerHTML = tp.innerHTML;
    });
  });

  const carStartDate = new Date(inputCarStartDate.value);
  const carStartDateInForm = carStartDate.toLocaleDateString("en-US", options);

  carData.carStartDate = carStartDateInForm;

  const carEndDate = new Date(inputCarEndDate.value);
  const carEndDateInForm = carEndDate.toLocaleDateString("en-US", options);

  carData.carEndDate = carEndDateInForm;

  if (carStartDate.getTime() <= currentDate.getTime() || carEndDate.getTime() <= carStartDate.getTime()) {
    buttonSearch.setAttribute("disabled", true);
  } else {
    buttonSearch.removeAttribute("disabled");
  }

  buttonCarType.innerHTML;
  buttonCarCountryMenu.innerHTML;
  buttonCarCityMenu.innerHTML;

  carData.carCountry = buttonCarCountryMenu.innerHTML;
  carData.carCity = buttonCarCityMenu.innerHTML;

  arrCar.push(carData);

  localStorage.setItem("historyDataCar", JSON.stringify(arrCar));
};

carClearButton.addEventListener("click", () => {
  inputCarStartDate.value = "";
  inputCarEndDate.value = "";
  buttonCarType.innerHTML = "Business";
  buttonCarCountryMenu.innerHTML = "";
  buttonCarCityMenu.innerHTML = "";
});

const buttonSearch = document.getElementById("button-search");

const flightInput = document.getElementById("flight-input");
const hotelInput = document.getElementById("hotel-input");
const carInput = document.getElementById("car-input");

formConteiner.forEach((form) => {
  buttonSearch.addEventListener("click", () => {
    if (form == flightInput) {
      getFlightForm(form);
    }
    if (form == hotelInput) {
      getHotelForm(form);
    }
    if (form == carInput) {
      getCarForm(form);
    }
  });
});
