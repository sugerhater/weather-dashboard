var cities = ["Columbus"];

var APIKey = "&appid=89e03da76afa1f1ca74f57becbb1ae3d";
var url = "https://api.openweathermap.org/data/2.5/weather?q="

function renderButtons() {
    $("#city-list").empty();
    // for (var i = cities.length;i <0; i--){
    for (var i = 0; i < cities.length; i++) {
        var eachCity = $("<button>");
        eachCity.attr("data-name", cities[i]);
        eachCity.text(cities[i]);
        eachCity.addClass("btn btn-secondary")
        $("#city-list").append(eachCity);
        $("#city-list").append($("<br>"));

        console.log(i);
    }
    console.log(cities);
}

function showWeather() {
    var queryURL = url + cities[0] + APIKey;
    console.log(cities[0]);
    var CurrentCityWeather = $("#current-weather-view");
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var highTemp = (response.main.temp_max * 9 / 5 - 459.67).toFixed(1);
        var lowTemp = (response.main.temp_min * 9/5 - 459.67).toFixed(1);
        $(".city").html('<h1>' + response.name + '</h1>');
        $(".temp").html('Temperature: ' + highTemp + 'F / ' + lowTemp +'F')
        $(".wind").html("Wind Speed: " + (response.wind.speed * 2.236).toFixed(1) + " MPH")
        $(".humidity").html("Humidity: " + response.main.humidity + "%");
        
        console.log("AJAX is called")
        
        
    });
    
}


$("#search-city").on("click", function (event) {
    event.preventDefault();
    var cityName = $("#city-input").val();
    var queryURL = url + cityName + APIKey;
    
    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(response){
        cityName = response.name;
        if (cities.indexOf(cityName)== -1){
            cities.unshift(cityName);
        }
        console.log(cities);
        renderButtons();
        showWeather();

    })







})

renderButtons();
showWeather();
// showWeather();

    // function search(){
    //     var cityName = $("#city-input").val();
    //     console.log(cityName);
    //     cities.push(cityName);

    // }