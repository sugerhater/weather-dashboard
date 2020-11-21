var cities = [];

function renderButtons() {
    $("#city-list").empty();

    // for (var i = cities.length;i <0; i--){
    for (var i = 0; i < cities.length; i++) {
        var eachCity = $("<button>");
        eachCity.attr("data-name", cities[i]);
        eachCity.text(cities[i]);
        $("#city-list").prepend(eachCity);
        $("#city-list").prepend($("<br>"));

        console.log(i);
    }
    console.log(cities);
}






$("#search-city").on("click", function (event) {
    event.preventDefault();
    var cityName = $("#city-input").val();
    console.log(cityName);
    cities.push(cityName);

    renderButtons();



})

renderButtons();


    // function search(){
    //     var cityName = $("#city-input").val();
    //     console.log(cityName);
    //     cities.push(cityName);

    // }