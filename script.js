// Weather API dynamics//

$(document).ready(function () {
    $("#search-btn").on("click", function () {
        var searchVal = $("#search-value").val()
        $("#search-value").val("")
        weatherSearch(searchVal)
        // dailyForecast(searchVal)
    })
    for (var i = 0; i < localStorage.length; i++) {
        var cityLocation = localStorage.getItem("city-location");
    }


    //var dateUpdate = function(data) {
    //var todaysDate = new Date(data.coord.dt * 1000);
    // $("#today").append(data + ":"+todaysDate.toDateString("en-US"));
    //})


    // Weather Search//

    function weatherSearch(searchValue) {

            $.ajax({
                type: "GET",
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=29e4875c9bed2b0310851289abe5a5e1&units=imperial",
                dataType: "json",
                    success: function (data) {
                $("#today").empty();
                console.log(data);
                var todaysDate = new Date(data.dt * 1000);
                $("#today").append(todaysDate.toDateString());
                var cardBody = $("<div>").addClass("card-body");
                var cityName = $("<h1>").addClass("card-title").text(data.name);
                // $("#today").append(cityName);
                var cityTemperature = $("<h1>").addClass("card-text").text(data.main.temp);
                // $("#today").append(cityTemperature);
                var cityHumidity = $("<h1>").addClass("card-text").text(data.main.humidity);
                // $("#today").append(cityHumidity);
                var cityWindspeed = $("<h1>").addClass("card-text").text(data.wind.speed);
                // $("#today").append(cityWindspeed);
                cardBody.append(cityName, cityTemperature, cityHumidity, cityWindspeed);
                $("#today").append(cardBody);


                // UV index //

                        $.ajax({
                            type: "GET",
                            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=29e4875c9bed2b0310851289abe5a5e1&units=imperial`,
                            dataType: "json",
                                success: function (data) {
                                console.log(data);
                                var uvIndex = $("<h7>" + "UV index:" + data.value + "</h7>").addClass("card-text");
                                cityTemperature.append(uvIndex);
                                
                                for (var i = 1; i < 6; i++) {
                                var dailyForecast = $(".dailyForecast");
                                console.log(dailyForecast);
                                var i = 1

                                    dailyForecast.each(function () {
                                        $(this).empty();
                                    var dailyTime = new Date(data.daily[i].dt * 1000);
                                    $(this).append(dailyTime.toDateString());
                                    var card = $("<div>").addClass("card");
                                    var cardBody = $("<div>").addClass("card-body");
                                    var cityName = $("<h3>").addClass("card-title").text(data.daily[i].name);
                                    // $(this).append(cityName);
                                    var cityTemperature = $("<p>").addClass("card-text").text(data.daily[i].temp.max);
                                    // $(this).append(cityTemperature);
                                    var cityHumidity = $("<p>").addClass("card-text").text(data.daily[i].humidity);
                                    // $(this).append(cityHumidity);
                                    var cityWindspeed = $("<p>").addClass("card-text").text(data.daily[i].wind_speed);
                                    // $(this).append(cityWindspeed);
                                    cardBody.append(cityName, cityTemperature, cityHumidity, cityWindspeed);
                                    card.append(cardBody);
                                    $(this).append(card);
                                    // $(this).append(cardBody);
                                    i++


                                    })
                                        localStorage.setItem(this, i);
                                        localStorage.clear();
                                }
                            }
                        })
                }
            });
    }
});