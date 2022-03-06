var lat = '';
var lng = '';
var mapCenter;
var areas;

//https://medium.com/@limichelle21/integrating-google-maps-api-for-multiple-locations-a4329517977a
function initMap() {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': $('#smallmapaddress').text()
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            mapCenter = results[0].geometry.location;
            if (geocode != null && geocode.length > 0) {
                var map = new google.maps.Map(document.getElementById('gmMultiLocation'), {
                    zoom: 10,
                    center: mapCenter
                });

                var infowindow = new google.maps.InfoWindow({});

                var marker, count;

                for (var i = 0; i < geocode.length; i++) {
                    pos = geocode[i].map_coordinates;
                    element = geocode[i].lookup_title;
                    var coord = pos.split(",");
                    lat = coord[0];
                    lng = coord[1];
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(lat, lng),
                        map: map,
                        title: element
                    });

                    google.maps.event.addListener(marker, 'click', (function (marker) {
                        return function () {
                            infowindow.setContent(marker.title);
                            infowindow.open(map, marker);
                        }
                    })(marker));
                }
            }
            else {
                $("#gmMultiLocation").hide();
            }
        }
        else {
            $("#gmMultiLocation").hide();
        }
    });
}