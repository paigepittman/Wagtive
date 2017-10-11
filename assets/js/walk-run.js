  // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      var marker
      var path = "";
      var pointArrary = [];

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:34.052235, lng:-118.243683},
          zoom: 9
        });
        infoWindow = new google.maps.InfoWindow;

        function setMarkerPosition(marker, position) {
          marker.setPosition(
              new google.maps.LatLng(
                  position.coords.latitude,
                  position.coords.longitude)
          );
        };
        function showLocation(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            pointArrary.push(latitude,longitude);
            for (var i = 0; i < pointArrary.length; i++) {
              if (i === 0) 
                path = latitude,longitude+"|";
              
              else if (i === pointArrary.length -1 )
                path += latitude,longitude;
              else 
                path += latitude,longitude+"|";

            };
            console.log(path);

            // alert("Latitude : " + latitude + " Longitude: " + longitude);
            setMarkerPosition(marker,position);
            console.log(latitude);
            console.log(longitude);
         };
         
         function errorHandler(err) {
            if(err.code == 1) {
               alert("Error: Access is denied!");
            }
            
            else if( err.code == 2) {
               alert("Error: Position is unavailable!");
            }
         };

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };  
            map.setCenter(pos);
            map.setZoom(14);
            var options = {
              enableHighAccuracy: true,
              timeout:5000,
              maximumAge:0
            };
            marker = new google.maps.Marker({
              position: pos,
              map: map,
              icon: "./assets/images/paw.png"
            });
            watchID = navigator.geolocation.watchPosition(showLocation, errorHandler, options);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

