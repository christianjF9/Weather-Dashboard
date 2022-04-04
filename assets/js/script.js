
weather = JSON.parse(localStorage.getItem("test"));
var searchHistory = [];


var GenerateWeatherInfo = function(response){
    var api = "https://api.openweathermap.org/data/2.5/onecall?lat="+response[0].lat+"&lon="+response[0].lon+"&appid=ec93ec889e22ec6a9e1c57a53cc4c613"
    var weather = fetch (api).then(function(response){
   response.json().then(function(data){ //console.log("inside",data)
        $(".day").each(function(index, el){
        console.log($(el));
        FillWeatherData($(el),data.daily[index]);    
        });
 //   localStorage.setItem("test",JSON.stringify(data));
    })
;})
} 
var  FillWeatherData = function(container, data){
    dataField =  container.children(".data");
    //console.log(weather);
    console.log(data.temp);
    console.log(dataField);
    dataField[0].textContent = new Date(data.dt*1000).toLocaleDateString("en-US");
    var cloudInfo = data.weather[0];
    console.log(data.weather[0])
    var cloudEl = container.children(".cloud");
    var cloudimg = "http://openweathermap.org/img/wn/"
    +cloudInfo.icon+"@2x.png";
    console.log(cloudEl);
    cloudEl.attr({
        src: cloudimg,
        alt: cloudInfo.description
});
    dataField[1].textContent = "Temp: " + data.temp.day;
    dataField[2].textContent = "wind: "+ data.wind_speed;
    dataField[3].textContent = " humidity: " + data.humidity;
}


var currentDay = $("#current-day");
//
//console.log(moment("/Date(1318781876)/").format());

var today = 
console.log(today)

//FillWeatherData(currentDay,weather.current);


var Search = function(event){
    event.preventDefault();

    search = searchHistory[searchHistory.length] = form.children("#search").val()
    currentDay.children()[0].textContent=search;
    localStorage.setItem(searchHistory,JSON.stringify(searchHistory));
    var entry = $("<button>").text(search);
    historyEl.prepend(entry);

    var geoApi = "http://api.openweathermap.org/geo/1.0/direct?q="+search+"&limit=1&appid=ec93ec889e22ec6a9e1c57a53cc4c613";
    var cordinates = fetch(geoApi).then(function(response){
        response.json().then(

            GenerateWeatherInfo);
    });
}

var form = $("form");
var historyEl = $("#history");
form.on("submit",Search);

//FillWeatherData(currentDay, weather.current);

              