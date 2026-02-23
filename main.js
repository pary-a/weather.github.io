const input = document.getElementById("cityInput");
const btn = document.getElementById("searchBtn");
const result = document.getElementById("weatherResult");
const list = document.getElementById("cityList");

const API_KEY = "9dd038f3e5c71b3136b61d5f74628722";

// گرفتن اطلاعات ذخیره‌شده
let cities = JSON.parse(localStorage.getItem("cities")) || [];
let weathers = JSON.parse(localStorage.getItem("weather")) || [];

// نمایش شهرها و آب‌وهواهای قبلی
for (let i = 0; i < cities.length; i++) {
  const li = document.createElement("li");
  li.textContent = cities[i];
  list.appendChild(li);

  const div = document.createElement("div");
  div.className = "weather-card";
  div.innerHTML =
    "<h3>" +
    weathers[i].name +
    "</h3>" +
    "<p>🌡 " +
    weathers[i].main.temp +
    " °C</p>" +
    "<p>☁️ " +
    weathers[i].weather[0].description +
    "</p>";

  result.appendChild(div);
}

// کلیک روی دکمه
btn.onclick = function () {
  const city = input.value;
  if (city === "") return;

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      API_KEY
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // اگر شهر پیدا نشد
      if (data.cod === "404") {
        alert("شهر پیدا نشد!");
        return;
      }

      // کارت آب‌وهوا
      const div = document.createElement("div");
      div.className = "weather-card";
      div.innerHTML =
        "<h3>" +
        data.name +
        "</h3>" +
        "<p>🌡 " +
        data.main.temp +
        " °C</p>" +
        "<p>☁️ " +
        data.weather[0].description +
        "</p>";

      result.appendChild(div);

      // لیست شهرها
      const li = document.createElement("li");
      li.textContent = city;
      list.appendChild(li);

      // ذخیره در localStorage
      cities.push(city);
      weathers.push(data);

      localStorage.setItem("cities", JSON.stringify(cities));
      localStorage.setItem("weather", JSON.stringify(weathers));
    });

  input.value = "";
};
