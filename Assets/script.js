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
        var lowTemp = (response.main.temp_min * 9 / 5 - 459.67).toFixed(1);
        $(".city").html('<h1>' + response.name + " Today" + '</h1>');
        $(".temp").html('Temperature: ' + highTemp + 'F / ' + lowTemp + 'F')
        $(".wind").html("Wind Speed: " + (response.wind.speed * 2.236).toFixed(1) + " MPH")
        $(".humidity").html("Humidity: " + response.main.humidity + "%");

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var coordURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current" + APIKey;
        $.ajax({
            url: coordURL,
            method: "GET"
        }).then(function (response) {
            var icon0 = `<img src="https://openweathermap.org/img/w/${response.daily[0].weather[0].icon}.png" />`;

            $(".UV").html("UV Index: " + response.daily[0].uvi);

            $(".weather").append(icon0)


            var fiveDayView = $("#5-day");
            for (let i = 1; i < 6; i++) {

                var dayView = $('<div id = "' + i + '" > </div>');
                var day = moment().add(i, 'day').format("MM/DD/YYYY");
                var info = {
                    date: day,
                    icon: response.daily[i].weather[0].icon,
                    temp: (response.daily[i].temp.day * 9 / 5 - 459.67).toFixed(1),
                    humidity: response.daily[i].humidity
                };
                var iconURL = `<img src="https://openweathermap.org/img/w/${info.icon}.png" alt="${response.daily[i].weather[0].main}" />`;
                var card = $(`
                <div class="pl-3">
                <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;>
                    <div class="card-body">
                        <h5>${info.date}</h5>
                        <p>${iconURL}</p>
                        <p>Temp: ${info.temp} °F</p>
                        <p>Humidity: ${info.humidity}\%</p>
                    </div>
                </div>
            <div>
            `)
                fiveDayView.append(card);
            }


        })
    });

}


$("#search-city").on("click", function (event) {
    event.preventDefault();
    var cityName = $("#city-input").val();
    var queryURL = url + cityName + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        cityName = response.name;
        if (cities.indexOf(cityName) == -1) {
            cities.unshift(cityName);
        }
        console.log(cities);
        renderButtons();
        showWeather();

    })







})

renderButtons();
showWeather();
