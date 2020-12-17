// Weather API dynamics//

$(document).ready(function () {
    $("#search-btn").on("click", function () {
        var searchVal = $("#search-value").val()
        $("#search-value").val("")
        weatherSearch(searchVal)
        // dailyForecast(searchVal)
    })
    // for (var i = 0; i < localStorage.length; i++) {
    var cityLocation = localStorage.getItem("city-location");
    // }
    //     var cityList = [];
    // function printcityList(){} create a loop for a button to print the cities from list

    //var dateUpdate = function(data) {
    //var todaysDate = new Date(data.coord.dt * 1000);
    // $("#today").append(data + ":"+todaysDate.toDateString("en-US"));
    //})

    var cityHistory = [];
    function makeRow(city){
        var listElement = $("<li>").text(city);
        $(".city-history").append(listElement);
    }
    // Weather Search//

    function weatherSearch(searchValue) {

        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=29e4875c9bed2b0310851289abe5a5e1&units=imperial",
            dataType: "json",
            success: function (data) {
                // if (cityHistory.indexOf(searchValue)=== -1){
                    cityHistory.push(searchValue)
                    window.localStorage.setItem("city-location" , JSON.stringify(cityHistory))
                // }
                makeRow(searchValue);
                console.log(cityHistory);
// localStorage.setItem("city-location", searchValue);
                $("#today").empty();
                console.log(data);
                var todaysDate = new Date(data.dt * 1000);
                $("#today").append(todaysDate.toDateString());
                var cardBody = $("<div>").addClass("card-body");
                var cityName = $("<h1>" + "City: " + data.name + "</h1>").addClass("card-title");
                // $("#today").append(cityName);
                var cityTemperature = $("<h1>" + "Temperature: " + data.main.temp + "</h1>").addClass("card-text");
                // $("#today").append(cityTemperature);
                var cityHumidity = $("<h1>" + "Humidity: " + data.main.humidity + "</h1>").addClass("card-text");
                // $("#today").append(cityHumidity);
                var cityWindspeed = $("<h1>" + "Wind Speed: " + data.wind.speed + "</h1>").addClass("card-text");
                // $("#today").append(cityWindspeed);
                cardBody.append(cityName, cityTemperature, cityHumidity, cityWindspeed);
                $("#today").append(cardBody);


                // Weather Icons//
                var iconimages
                $("#today").append(`<img width="100" height="100" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`).addClass(iconimages);
                console.log(data);


                // UV index //

                $.ajax({
                    type: "GET",
                    url: `https://api.openweathermap.org/data/2.5/uvi?appid=29e4875c9bed2b0310851289abe5a5e1&lat=${data.coord.lat}&lon=${data.coord.lon}`,
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        var uvIndex = $("<h2>" + "UV index:" + data.value + "</h2>").addClass("card-text");
                        $("#today").append(uvIndex);
                    }
                })

                $.ajax({
                    type: "GET",
                    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=29e4875c9bed2b0310851289abe5a5e1&units=imperial`,
                    dataType: 'json',
                    success: function (data) {

                        for (var i = 1; i < 6; i++) {
                            var dailyForecast = $(".dailyForecast");
                            console.log(dailyForecast);
                            var i = 1

                            dailyForecast.each(function () {
                                $(this).empty();
                                var dailyTime = new Date(data.daily[i].dt * 1000);
                                $(this).append(dailyTime.toDateString());
                                var card = $('<div style="margin: 0.5rem 0.5rem width: 100%;">').addClass("card");
                                var cardBody = $("<div>").addClass("card-body");
                                var cityName = $("<h3>").addClass("card-title").text(data.daily[i].name);
                                // $(this).append(cityName);
                                var cityTemperature = $("<p>" + "Temperature: " + data.daily[i].temp.max + "</p>").addClass("card-text");
                                // $(this).append(cityTemperature);
                                var cityHumidity = $("<p>" + "Humidity: " + data.daily[i].humidity + "</p>").addClass("card-text");
                                // $(this).append(cityHumidity);
                                var cityWindspeed = $("<p>" + "Wind Speed: " + data.daily[i].wind_speed + "</p>").addClass("card-text");
                                // $(this).append(cityWindspeed);
                                cardBody.append(cityName, cityTemperature, cityHumidity, cityWindspeed);
                                card.append(cardBody);
                                $(this).append(card);
                                // $(this).append(cardBody);
                                i++

                            })
                            
                            // localStorage.clear();
                        }
                    }
                })
            }
        })
    }
});