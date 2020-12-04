// Weather API dynamics//

$(document).ready(function () {
    $("#search-btn").on("click", function () {
        var searchVal = $("#search-value").val()
        $("#search-value").val("")
        weatherSearch(searchVal)
    })
    for (var i = 0; i < localStorage.length; i++) {
        var cityLocation = localStorage.getItem("city-location", "i");
    }

    //var dateUpdate = function(data) {
    //var todaysDate = new Date(data.coord.dt * 1000);
    // $("#today").append(data + ":"+todaysDate.toDateString("en-US"));
    //})


    // Weather Search//

    function weatherSearch(searchValue) {

        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=29e4875c9bed2b0310851289abe5a5e1&units=imperial",
            dataType: "json",
            success: function (data) {
                $("#today").empty();
                console.log(data);
                var todaysDate = new Date(data.dt * 1000);
                $("#today").append(todaysDate.toDateString());
                var cityName = $("<h1>").addClass("card-header").text(data.name);
                $("#today").append(cityName);
                var cityTemperature = $("<h1>").addClass("card-temperature").text(data.main.temp);
                $("#today").append(cityTemperature);
                var cityHumidity = $("<h1>").addClass("card-humidity").text(data.main.humidity);
                $("#today").append(cityHumidity);
                var cityWindspeed = $("<h1>").addClass("card-windspeed").text(data.wind.speed);
                $("#today").append(cityWindspeed);
              
                
            // UV index //

                var uvIndexlink = "https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid=29e4875c9bed2b0310851289abe5a5e1&units=imperial"
                $.ajax({
                    type: "GET",
                    url: "https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid=29e4875c9bed2b0310851289abe5a5e1&units=imperial",
                    dataType: "json",
                    success: function (data) {
                    console.log(data);
                    //var uvIndex = $("<h1>").addClass("card-index").text(data.coord.lat + "," + data.coord.lon);
                    //$("#today").append(uvIndex);
                    var uvIndex = $("<h1>").addClass("card-index").text(data.coord);
                    $("#today").append(uvIndex);
                    uvIndex.addClass("uvIndex");
                    cityTemperature.append(uvIndex);

                // Week Forecast//
function dailyForecast(searchValue){
                $.ajax({
                    type: "GET",
                    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=29e4875c9bed2b0310851289abe5a5e1&units=imperial",
                    dataType: "json",
                    success: function(data) {
                        console.log(data);
                    // Currently producing an array list of 40: 5 day forecast every three hours = 8 hours reporting. 
                    // of 40, every 8th occurence equals another day. Day 1= 8, Day 2= 16, Day 3= 24; Day 4= 32; Day 5= 40
                    var arrayDays = [8, 16, 24, 32, 40];
                    for (var i = 0; i < arrayDays.length; i++) {
                    var weeklyForecast = $(".weeklyForecast").addClass("card-body-weekly");
                    var dailyForecast = $(".dailyForecast").addClass("card-text");
                    dailyForecast.empty();
                    dailyForecast.forEach(function (i){
                        var dailyTime = new Date(data.list[i].dt * 1000);
                        $("#weeklyForecast").append(weeklyDate.toDateString());
                        var cityName = $("<h1>").addClass("card-header").text(data.name);
                        $("#weeklyForecast").append(cityName);
                        var cityTemperature = $("<h1>").addClass("card-temperature").text(data.main.temp);
                        $("#weeklyForecast").append(cityTemperature);
                        var cityHumidity = $("<h1>").addClass("card-humidity").text(data.main.humidity);
                        $("#weeklyForecast").append(cityHumidity);
                        var cityWindspeed = $("<h1>").addClass("card-windspeed").text(data.wind.speed);
                        $("#weeklyForecast").append(cityWindspeed);
                    
                    })
                }
                    }
                })

                    }
                }
                })

            }
        })
    }

});