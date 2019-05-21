var OWMurl="https://api.openweathermap.org/data/2.5/weather?APPID=1f1cbdded940419b5f6d6b2d5d33c057&units=metric&id=3333207"

var dayimg = "url('https://paulgcole.github.io/files/day.bmp')";
var nightimg = "url('https://paulgcole.github.io/files/night.bmp')";


var ms = 1000*60*5;

function GetWeather(){
	const Http = new XMLHttpRequest();
	Http.onreadystatechange=GotWeather;
	Http.open("GET", OWMurl);
	Http.send(null);
}

function GotWeather(Http){  
  if (Http.target.readyState!=4 || Http.target.status!=200 ){return};

  var w=JSON.parse(Http.target.responseText);
  document.getElementById("weather").innerHTML=`
     <img class="weathericon" src="https://openweathermap.org/img/w/${w.weather[0].icon}.png" />
     <span class="weatherdescription" title="${titleCase(w.weather[0].description)}">${titleCase(w.weather[0].main)}</span><br>
     Humidity: ${w.main.humidity}%<br>
     Cloud Cover: ${w.clouds.all}%<br>
     Wind: ${Math.floor(w.wind.speed+0.5)} mph <span class="weatherwinddir" style="-webkit-transform: rotate(${w.wind.deg}deg)">&#8595</span><br>
     Temp: ${Math.floor(w.main.temp+0.5)} &#176C <span class="weatherminmaxtemp">(${Math.floor(w.main.temp_min+0.5)} - ${Math.floor(w.main.temp_max+0.5)})</span><br> 
     Sunrise: ${timeConverter(w.sys.sunrise)} &nbsp; &nbsp; &nbsp; &nbsp; Sunset: ${timeConverter(w.sys.sunset)}<br>`; 
     
  document.getElementById("weatherimage").style.backgroundImage = (Date.now() > w.sys.sunset*1000) ? nightimage : dayimage;
};

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

function timeConverter(UNIX_timestamp){
  var t = new Date(UNIX_timestamp * 1000);
  t.setSeconds(t.getSeconds() + 30);
  var hour = t.getHours();  if(hour<10){hour='0' + hour};  
  var min = t.getMinutes(); if(min <10){min ='0' + min};  
  return hour + ':' + min;
}

GetWeather();
setInterval(GetWeather, ms)
