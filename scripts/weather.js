var _appID = "9513f48402f9da9678941402616b1e8a";

function APIRequest() {
    var city = (document.getElementsByName("city")[0]).value;
    if (city != '') {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://api.openweathermap.org/data/2.5/weather?q=" + city +
            "&units=imperial" + "&APPID=" + _appID);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                var display = show(data);

                document.getElementById("display").innerHTML = display;
            }
            else {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        };
        var xhr1 = new XMLHttpRequest();
        xhr1.open('GET', "http://api.openweathermap.org/data/2.5/forecast?q=" + city +',us'+
            "&units=imperial" + "&APPID=" + _appID);
		APIRequest5days(xhr1);

        xhr.send();
    }
    else {
        document.getElementById("display").innerHTML = "Enter City Name" + '<br>';
    }
}


function getLocation() {
    var x = document.getElementById("output");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    ApIRequestpoints(position.coords.latitude, position.coords.longitude);
}

function ApIRequestpoints(latitude, longitude) {
    var city = (document.getElementsByName("city")[0]).value;
    if (latitude != '' && longitude != "") {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude +
            "&lon=" + longitude + "&units=imperial" +"&APPID=" + _appID);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                var display = show(data);

                document.getElementById("display").innerHTML = display;
            }
            else {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        };
        var xhr1 = new XMLHttpRequest();
        xhr1.open('GET', "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + '&lon=' + longitude +
            "&units=imperial" + "&APPID=" + _appID);
        APIRequest5days(xhr1);

        xhr.send();
    }
    else {
        document.getElementById("display").innerHTML = "Enter City Name" + '<br>';
    }

}


function show(data) {
    return "<div><strong>City Name</strong>: " + data.name + "," + data.sys.country + "</div>" +
        "<div><strong>Temperature</strong>: " + data.main.temp + " F° " + " [" + data.main.temp_min + "°F ~ " + data.main.temp_max + "°F] " + "</div>" +
        "<div><strong>Descrpition</strong>: <img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>" + data.weather[0].description + "</div>" +
        "<div><strong>Weather</strong>: " + data.weather[0].main + "</div>" +
        "<div><strong>Humidity</strong>: " + data.main.humidity + " % " + "</div>" +
        "<div><strong>Wind</strong>: " + data.wind.speed + " mph " +","+ data.wind.deg + " degree " + "</div>" +
        "<div><strong>Cloud</strong>: " + data.clouds.all + " % " + "</div>" +
        "<div><strong>Pressure</strong>: " + data.main.pressure + " hPa " + "</div>";
}

function securityCompareTwoString(str1, str2){
	if(str1.length != str2.length){
		return false;
	}
	for(i=0; i< str1.length; i++){
		if(str1.charAt(i) != str2.charAt(i)){
			return false;
		}
	}
	return true;
}

function APIRequest5days(xhr) {
	xhr.onload = function(){
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText);
                var time = [];
                var tempature = [];
                for (i = 0; i < 24; i++) {
                    time[i] = convertAPM(data.list[i].dt_txt.substring(11, 13));
                    tempature[i] = data.list[i].main.temp;
                }
                const CHART = document.getElementById("lineChart");
                let lineChart = new Chart(CHART, {
                    type: 'line',
                    data: {
                        labels: time,
                        datasets: [{
                            fill: false,
                            label: "Weather Forecast",
                            backgroundColor: 'rgb(255,128,0)',
                            borderColor: 'rgb(255,128,0)',
                            
                            data: tempature,
                            pointRadius: 1,
                        }],
                    },
                    options: {
                        scaleFontColor: 'red',
                        responsive: true,
                        legend: {
                            labels: {
                                fontSize: 25,
                                fontColor: '#ffaf30',
                            }
                        },
                        tooltips: {
                            mode: 'single',
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    fontSize: 10,
                                    fontColor: "#ea0000",
                                },
                            }],
                            yAxes: [{
                                gridLines: {
                                    
                                },
                                ticks: {
                                    fontSize: 15,
                                    fontColor: "#ea0000",
                                }
                            }],
                        }
                    }
                });
            }
	};
	xhr.send();
}

function convertAPM(apm) {
    if (apm == '00') {
        return '12 A';
    }
    if (apm.substring(0, 1) == '0') {
        return apm.substring(1, 2) + ' A';
    }
    else {
        var time = parseInt(apm);
        switch (time) {
            case 12: return time + ' P';
            default: return (time - 12) + ' P';
        }
    }
}

