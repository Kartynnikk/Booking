const historyDataFlight = localStorage.getItem("historyDataFlight");
const historyDataHotel = localStorage.getItem("historyDataHotel");
const historyDataCar = localStorage.getItem("historyDataCar");

const historyValueFlight = JSON.parse(historyDataFlight);
const historyValueHotel = JSON.parse(historyDataHotel);
const historyValueCar = JSON.parse(historyDataCar);

window.addEventListener("load", () => {
  historyValueFlight.forEach((element) => {
    let conteinerHistory = document.createElement("div");
    conteinerHistory.className = "conteiner-history";

    const planeImage = document.createElement("i");
    planeImage.className = "fa fa-plane";

    let text = document.createElement("div");
    text.className = "text";
    text.innerHTML = Object.values(element);
    console.log(text.innerHTML);

    let cross = document.createElement("div");
    cross.className = "cross";
    document.body.appendChild(conteinerHistory);
    conteinerHistory.appendChild(planeImage);
    conteinerHistory.appendChild(text);
    conteinerHistory.appendChild(cross);

    cross.addEventListener("click", () => {
      conteinerHistory.remove();
    });
  });

  historyValueHotel.forEach((element) => {
    let conteinerHistory = document.createElement("div");
    conteinerHistory.className = "conteiner-history";

    const bedImage = document.createElement("i");
    bedImage.className = "fa fa-bed";

    let text = document.createElement("div");
    text.className = "text";
    text.innerHTML = Object.values(element);
    console.log(text.innerHTML);

    let cross = document.createElement("div");
    cross.className = "cross";
    document.body.appendChild(conteinerHistory);
    conteinerHistory.appendChild(bedImage);
    conteinerHistory.appendChild(text);
    conteinerHistory.appendChild(cross);

    cross.addEventListener("click", () => {
      conteinerHistory.remove();
    });
  });

  historyValueCar.forEach((element) => {
    let conteinerHistory = document.createElement("div");
    conteinerHistory.className = "conteiner-history";

    const carImage = document.createElement("i");
    carImage.className = "fa fa-car";

    let text = document.createElement("div");
    text.className = "text";
    text.innerHTML = Object.values(element);
    console.log(text.innerHTML);

    let cross = document.createElement("div");
    cross.className = "cross";
    document.body.appendChild(conteinerHistory);
    conteinerHistory.appendChild(carImage);
    conteinerHistory.appendChild(text);
    conteinerHistory.appendChild(cross);

    cross.addEventListener("click", () => {
      conteinerHistory.remove();
    });
  });
});
