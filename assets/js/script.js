
//weather = JSON.parse(localStorage.getItem("test"));
var searchHistory = [];
var currentDay = $("#current-day");
var form = $("form");
var historyEl = $("#history");

var GenerateWeatherInfo = function(response){
    var api = "https://api.openweathermap.org/data/2.5/onecall?lat="+response[0].lat+"&lon="+response[0].lon+"&appid=ec93ec889e22ec6a9e1c57a53cc4c613"
    var weather = fetch (api).then(function(response){
   response.json().then(function(data){ //console.log("inside",data)
    GenerateUv(data);
        $(".day").each(function(index, el){

        FillWeatherData($(el),data.daily[index]);    
        });
 //   localStorage.setItem("test",JSON.stringify(data));
    })
;})
} 
var  FillWeatherData = function(container, data){
    dataField =  container.children(".data");
    dataField[0].textContent = new Date(data.dt*1000).toLocaleDateString("en-US");
    var cloudInfo = data.weather[0];
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




//FillWeatherData(currentDay,weather.current);

var GenerateUv = function(weather){
    var uvi = weather.current.uvi;
    var uvEl = $("#uv");
    uvEl.text(uvi);
    console.log(uvi);
    if (uvi>=11)
        uvEl.css('background-color','purple');
    else if(uvi>=8)
        uvEl.css('background-color','red');
    else if(uvi>=6)
        uvEl.css('background-color','orange');
    else if(uvi>=3)
        uvEl.css('background-color','yellow');
    else
        uvEl.css('background-color','green');
}

var Search = function(search){
    currentDay.children()[0].textContent=search;
    var geoApi = "https://api.openweathermap.org/geo/1.0/direct?q="+search+"&limit=1&appid=ec93ec889e22ec6a9e1c57a53cc4c613";
    var cordinates = fetch(geoApi).then(function(response){
        response.json().then(GenerateWeatherInfo);
    });
}

var LoadHistory = function(){
    var history = localStorage.getItem("search history");
    console.log(history);
    history = JSON.parse(history);
    history.forEach(element => {
        CreateHistoryEntry(element);
    });
}

var CreateHistoryEntry = function(entry){
    var entry = $("<button>").text(search);
    entry.on("click",function(){
        Search(entry.text());
    });
    historyEl.prepend(entry);
}

form.on("submit",function(event){
    event.preventDefault();
    search = form.children("#search").val();
    CreateHistoryEntry(search);
    searchHistory[searchHistory.length] = search;   
    localStorage.setItem("search history",searchHistory);

    Search(search);
});

LoadHistory();

//FillWeatherData(currentDay, weather.current);

              