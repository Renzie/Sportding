var map;
var infoWindows = [];

$(function() {
    //$("#map")
});

function initMap() {
    var target = new google.maps.LatLng(51.192307, 3.213777);

    map = new google.maps.Map(document.getElementById("map"), {
        center: target,
        zoom: 12
    });

    google.maps.event.addListener(map, "click", function(event) {
        infoWindows.forEach(function(infoWindow) {
            infoWindow.close();
        });

    });

    $.ajax({
        method: "GET",
        url: "assets/json/sportinfrastructuur.json"
    }).then(function(result) {
        result.forEach(function(item) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(item.json_geometry.coordinates[1], item.json_geometry.coordinates[0]),
                map: map,
                title: item.sportinfrastructuur,
                animation: google.maps.Animation.DROP
            });


            var infowindow = new google.maps.InfoWindow({
                content: "<span style='font-size: 18px'>" + item.Sportinfrastructuur + "</span><p>" + item.Omschrijving + "</p>"
            });

            infoWindows.push(infowindow);

            marker.addListener("click", function () {
                infoWindows.forEach(function(infoWindow) {
                    infoWindow.close();
                });

                infowindow.open(map, marker);
            });
        });
    });
}
