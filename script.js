
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener("click", () => {
  const APIKey = "c3d907d43c0513d746f30d93a3a8709f";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

    if(json.cod == '404'){
        cityHide.textContent = city;
        container.style.height = '450px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
    }

  
        container.style.height = '560px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');
        
    
    
   
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-details .humidity span");
      const wind = document.querySelector(".weather-details .wind span");
      
      if(cityHide.textContent == city){
        return;
      }
      else{
        cityHide.textContent = city;

        container.style.height = '560px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(() => {
            container.classList.remove('active');
        }, 2500)


        if (image) {
            switch (json.weather[0].main) {
              case "Clear":
                image.src = "/sunny.png";
                break;
               case "Rain":
                image.src = "/rainy.png";
                break;
    
              case "Snow":
                image.src = "/snow.png";
                break;
    
              case "Clouds":
                image.src = "/cloudy.png";
                break;
    
              case "Mist":
              case "Haze":
                image.src = "/windy.png";
                break;
    
              default:
                image.src = "/cloudy.png";
            }
    
         }
    
          if (temperature) {
            temperature.textContent = `${Math.round(json.main.temp)}°C`;
          }
    
          if (description) {
            description.innerHTML = json.weather[0].description;
          }
    
          if (humidity) {
           humidity.textContent = `${json.main.humidity}%`;
          }
    
          if (wind) {
            wind.textContent = `${Math.round(json.wind.speed)} m/s`;
          }


        }

});
});