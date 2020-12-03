$(document).ready(function(){
    $("#search-btn").on("click", function() {
        var searchVal = $("#search-value").val()
        $("#search-value").val("")
        weatherSearch(searchVal)
    })
for (var i = 0; i < localStorage.length; i++) {
    var cityLocation = localStorage.getItem("city-location", "i");
}
    
//var timerUpdate = setInterval(function(data) {
    //var todaysDate = new Date(data * 1000);
           // $("#today").append(data + ":"+todaysDate.toDateString("en-US"));
//})

function weatherSearch(searchValue){

    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q="+searchValue+"&appid=29e4875c9bed2b0310851289abe5a5e1&units=imperial",
        dataType: "json",
        success: function(data){
            console.log(data);
            var cityName = $("<h1>").addClass("card-title").text(data.name);
            $("#today").append(cityName); 
            var cityTemperature = $("<h1>").addClass("card-temperature").text(data.main.temp);
            $("#today").append(cityTemperature);
            var cityHumidity = $("<h1>").addClass("card-humidity").text(data.main.humidity);
            $("#today").append(cityHumidity);
            var cityWindspeed = $("<h1>").addClass("card-windspeed").text(data.wind.speed);
            $("#today").append(cityWindspeed);









        }
    })
}
})