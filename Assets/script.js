var cities = [];

var APIKey = "&appid=89e03da76afa1f1ca74f57becbb1ae3d";
var url = "https://api.openweathermap.org/data/2.5/weather?q="


function renderButtons() {
    $("#city-list").empty();

    // for (var i = cities.length;i <0; i--){
    for (var i = 0; i < cities.length; i++) {
        var eachCity = $("<button>");
        eachCity.attr("data-name", cities[i]);
        eachCity.text(cities[i]);
        $("#city-list").append(eachCity);
        $("#city-list").append($("<br>"));

        console.log(i);
    }
    console.log(cities);
}

function showWeather(){
    // var CurrentCity = cities[0];
    // var BJ = "bew,usa-OH";
    var queryURL = url+cities[0] +APIKey;
    console.log(cities[0]);
    var CurrentCityWeather = $("#current-weather-view");
    // CurrentCityWeather.empty();


    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){
        console.log(response)
      $(".wind").html("Wind Speed: "+(response.wind.speed*2.236).toFixed(1)+" MPH")
        console.log("AJAX is called")
        

    });

}




$("#search-city").on("click", function (event) {
    event.preventDefault();
    var cityName = $("#city-input").val();
    console.log(cityName);
    cities.unshift(cityName);

    renderButtons();

    showWeather();



})

renderButtons();

// showWeather();

    // function search(){
    //     var cityName = $("#city-input").val();
    //     console.log(cityName);
    //     cities.push(cityName);

    // }