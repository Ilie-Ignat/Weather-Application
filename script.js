async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const response = await fetch("sample.json");
  const data = await response.json();
  const weather = data.find(
    (item) => item.cityName.toLowerCase() === city.toLowerCase()
  );
  if (weather) {
    localStorage.setItem("weatherData", JSON.stringify(weather));
    updateWeather();
    document.getElementById("error").innerHTML = "";
  } else {
    document.getElementById("error").innerHTML = "City not found";
  }
}

function updateWeather() {
  const weather = JSON.parse(localStorage.getItem("weatherData"));

  if (weather) {
    const tempValue = document.getElementById("temperature");
    if (tempValue) {
      tempValue.innerText = weather.temperatureCelsius + "°C";
      const rect = document.getElementById("thermRect");
      const circle = document.getElementById("thermCirc");
      if (weather.temperatureCelsius > 20) {
        rect.setAttribute("fill", "yellow");
        circle.setAttribute("fill", "yellow");
      }
    }

    const humidityValue = document.getElementById("humidity");
    if (humidityValue) {
      humidityValue.innerText = weather.humidity * 100 + "%";
      const drop = document.getElementById("waterDrop");
      if (weather.humidity * 100 >= 40 && weather.humidity * 100 <= 70) {
        drop.setAttribute("fill", "rgb(0,0,255)");
      } else if (weather.humidity * 100 > 7) {
        drop.setAttribute("fill", "rgb(0,0,139)");
      }
    }

    const uvValue = document.getElementById("uvIndex");
    if (uvValue) {
      uvValue.innerText = weather.uvIndex;
      const sun = document.getElementById("sun");
      if (weather.uvIndex >= 4 && weather.uvIndex <= 7) {
        sun.setAttribute("fill", "rgb(255, 255, 0)");
      } else if (weather.uvIndex > 7) {
        sun.setAttribute("fill", "rgb(255, 122, 0)");
      }
    }

    const windValue = document.getElementById("windSpeed");
    if (windValue) {
      windValue.innerText = weather.windSpeed;
      const wind = document.getElementById("gust");
      if (
        parseInt(weather.windSpeed) >= 5 &&
        parseInt(weather.windSpeed) <= 20
      ) {
        wind.setAttribute("fill", "rgb(255, 255, 0)");
      } else if (parseInt(weather.windSpeed) > 20) {
        wind.setAttribute("fill", "rgb(255, 122, 0)");
      }
    }
  }
}

function toggleTemp() {
  const temp = document.getElementById("temperature");
  let tempValue = parseFloat(temp.innerText);
  if (temp.innerText.includes("°C")) {
    temp.innerText = ((tempValue * 9) / 5 + 32).toFixed(0) + "°F";
    document.getElementById("toggle").innerText = "See in °C";
  } else {
    temp.innerText = (((tempValue - 32) * 5) / 9).toFixed(0) + "°C";
    document.getElementById("toggle").innerText = "See in °F";
  }
}
