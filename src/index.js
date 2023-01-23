const inputFlightStartDate = document.getElementById("input-flight-startdate");
const inputFlightEndDate = document.getElementById("input-flight-enddate");
const inputHotelStartDate = document.getElementById("input-hotel-startdate");
const inputHotelEndDate = document.getElementById("input-hotel-enddate");
const inputCarStartDate = document.getElementById("input-car-startdate");
const inputCarEndDate = document.getElementById("input-car-enddate");
const flightClearButton = document.getElementById("flight-button-clear");
const hotelClearButton = document.getElementById("hotel-button-clear");
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
const buttonSearchFlights = document.getElementById("button-search-flights");
const buttonSearchHotels = document.getElementById("button-search-hotels");
const buttonSearchCars = document.getElementById("button-search-cars");

const star1 = document.getElementById("star1");
const stars = document.querySelectorAll(".star");
const type = document.querySelectorAll(".type");

const buttonCarType = document.getElementById("button-car-type");

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

const setReusableFunction = (startDateInput, endDateInput, dataObject, array, localStorageName) => {
  const startDate = new Date(startDateInput.value);
  const startDateInForm = startDate.toLocaleDateString("en-US", options);

  const endDate = new Date(endDateInput.value);
  const endDateInForm = endDate.toLocaleDateString("en-US", options);

  dataObject.startDate = startDateInForm;
  dataObject.endDate = endDateInForm;

  if (startDate.getTime() <= new Date().getTime() || endDate.getTime() <= startDate.getTime()) {
    alert("Please select...");
  } else {
    array.push(dataObject);

    localStorage.setItem(localStorageName, JSON.stringify(array));
  }
};

const getFlightForm = () => {
  const flightData = {
    startDate: "",
    endDate: "",
    flightFrom: "",
    flightTo: "",
  };

  flightData.flightFrom = inputFrom.value;
  flightData.flightTo = inputTo.value;

  setReusableFunction(inputFlightStartDate, inputFlightEndDate, flightData, arrFlight, "historyDataFlight");
};

flightClearButton.addEventListener("click", () => {
  inputFlightStartDate.value = "";
  inputFlightEndDate.value = "";
  inputFrom.value = "";
  inputTo.value = "";
});

const getHotelForm = () => {
  const hotelData = {
    startDate: "",
    endDate: "",
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

  hotelData.hotelCountry = buttonHotelCountryMenu.innerHTML;
  hotelData.hotelCity = buttonHotelCityMenu.innerHTML;

  setReusableFunction(inputHotelStartDate, inputHotelEndDate, hotelData, arrHotel, "historyDataHotel");
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
    startDate: "",
    endDate: "",
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

  carData.carCountry = buttonCarCountryMenu.innerHTML;
  carData.carCity = buttonCarCityMenu.innerHTML;

  setReusableFunction(inputCarStartDate, inputCarEndDate, carData, arrCar, "historyDataCar");
};

carClearButton.addEventListener("click", () => {
  inputCarStartDate.value = "";
  inputCarEndDate.value = "";
  buttonCarType.innerHTML = "Business";
  buttonCarCountryMenu.innerHTML = "";
  buttonCarCityMenu.innerHTML = "";
});

buttonSearchFlights.addEventListener("click", getFlightForm);
buttonSearchHotels.addEventListener("click", getHotelForm);
buttonSearchCars.addEventListener("click", getCarForm);
