

getLocation();
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(show_response_based_position);

    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

function show_response_based_position(position) {
    /*x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; */
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

    $(function() {
        $.ajax({
          url: 'assets/php/yelp.php',
          data: {
            long: position.coords.longitude,
            latt: position.coords.latitude
          }, 
          success: function (response) {
            console.log(response)
            for (var i = 0; i < 7; i++) {
              
              var div1=$('<div>').addClass("col-2 pr-0");
              var div2=$('<div>').addClass("col-8");
              var div3=$('<div>').addClass("col-2");
              var result_img=$('<img>').addClass("checkInImage").attr("src",response.businesses[i].image_url);
              div1.append(result_img);

              var inf1=$('<span>').addClass("font-weight-bold").append('<br/>');
              var inf2=$('<span>').addClass("py-0").append('<br/>');
              var inf3=$('<span>');

              inf1.append(response.businesses[i].name);
              inf2.append(response.businesses[i].location.display_address[0]+" "+response.businesses[i].location.display_address[1]);
              inf3.text("Rating: ");
              inf3.append(response.businesses[i].rating);
              div2.append(inf1).append(inf2).append(inf3);

              var btn=$("<button>").addClass("btn btn-outline-secondary").text("Check in");

              div3.append(btn);

              $("#modalContent").append(div1).append(div2).append(div3);

            }

            


          },
          dataType: 'json'
        });
    });



}