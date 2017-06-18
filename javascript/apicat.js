$(document).ready(function() {
        var config = {
        apiKey: "AIzaSyCj_AZGEOgcPxJj6-qlIAjeE7o_uIGpoxY",
        authDomain: "pawsandlook-c56d5.firebaseapp.com",
        databaseURL: "https://pawsandlook-c56d5.firebaseio.com",
        projectId: "pawsandlook-c56d5",
        storageBucket: "pawsandlook-c56d5.appspot.com",
        messagingSenderId: "555976363149"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    var map;
    var mapURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    var locationID = "";
    var mapAddress = "";
    var globalLat;
    var globalLng;
    var key = "&key=F411ff9725d287d4138503a0c95030a6"
    var AnimURL = "http://api.petfinder.com/pet.find?format=json"
    var animLocLat;
    var animnLocLong;
    var zip = "";
    var catDogSelect = "dog";
    var catDogAnim = "";
    var ageSelect = "";
    var ageID = "";
    var sexSelect = "";
    var sexID = "";
    var breedSelect = "";
    var breedID = "";
    var sizeSelect = "";
    var sizeID = "";
    var respAbrev = "";
    var addr = "";
    var city = "";
    var state = "";
    var zipID = "";
    var loop = false;
    $('#map').hide();
    // $('#view-map').hide();
    // console.log(google);
    
        DisplayAnimal();
        
        Geolocator();
        // map = new google.maps.Map(document.getElementById('map'), {
  //         center: {lat: parseInt(globalLat), lng: parseInt(globalLng)}, //lat: 41.4931, lng: -81.6790
  //         zoom: 11,
  //         scrollwheel: false
  //         });
        
    $('#negative, #positive').on('click', function() {
        DisplayAnimal();
        // $('#view-map').show();
        
    })
    $('#view-map').on('click', function() {
        MakeMap();
        $('#map').show();
    })
    
                $(".buttonHeart").on("click", function() {
            event.preventDefault();
            
            //var zipInput = $("#zip").val();
            var userZip = '&location=' + zip;
            var pfApiUrl = "http://api.petfinder.com/pet.find?format=json&key=f411ff9725d287d4138503a0c95030a6&count=1&output=basic"
            var queryURL = pfApiUrl + userZip;
            console.log(queryURL);
            $.ajax({
                url: queryURL,
                dataType: "jsonp",
                method: "GET"
            }).done(function(response) {
                console.log(response);
                var petInfo = {
                animal: response.petfinder.pets.pet.animal.$t,
                //breed: response.petfinder.pets.pet.breeds.breed.$t,
                sex: response.petfinder.pets.pet.sex.$t,
                name: response.petfinder.pets.pet.name.$t,
                age: response.petfinder.pets.pet.age.$t,
                //city: response.petfinder.pets.pet.contact.city.$t,
                //state: response.petfinder.pets.pet.contact.state.$t,
                //zip: response.petfinder.pets.pet.contact.zip.$t,
                //phone: response.petfinder.pets.pet.contact.phone.$t,
                //email: response.petfinder.pets.pet.contact.email.$t,
                photo: response.petfinder.pets.pet.media.photos.photo[2].$t
                }
                    database.ref().push(petInfo);   
            });
                });
    //------------Functions---------------------
    //Function to run geolocator
    function Geolocator() {
         infoWindow = new google.maps.InfoWindow;
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            globalLat = pos.lat;
            globalLng = pos.lng;
            //making markers. should turn into a function
            var markerOptions = {
                position: new google.maps.LatLng(pos.lat, pos.lng)
                };
                var marker = new google.maps.Marker(markerOptions);
                marker.setMap(map);
            // console.log("pos.long&lat: " + pos.lat + ", " + pos.lng);
            
        
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            // infoWindow.open(map);
            // map.setCenter(pos);
        ReverseGeoLocator();
        // console.log("ZIP1: " + zip);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
        // console.log("begin reverse geolocator")
            }
     //Function to Make the Map
     function MakeMap() {
        // map = new google.maps.Map(document.getElementById('map'), {
      //     center: {lat: parseInt(globalLat), lng: parseInt(globalLng)}, //lat: 41.4931, lng: -81.6790
      //     zoom: 11,
      //     scrollwheel: false
      //     });
        // console.log(mapURL);
        var mapURLloc = mapURL + mapAddress;
        mapURLloc = mapURLloc.replace(/ /g, "+");
        // console.log("mapURL: " + mapURLloc);
        $.ajax({
            url: mapURLloc,
            method: "GET"
        }).done(function(response) {
            // console.log(response);
            var responseLoc = response.results[0].geometry.location;
            animLocLat = responseLoc.lat;
            animnLocLong = responseLoc.lng;
            // console.log("lat&long: " + reanimLocLat + ", " + animnLocLong);
            MarkerMaker(animLocLat, animnLocLong);
            // console.log('to marker maker data: ' + globalLat + globalLng);
            MarkerMaker(globalLat, globalLng);
            
        });
        
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.4931, lng: -81.6790}, //lat: 41.4931, lng: -81.6790
          zoom: 11,
          scrollwheel: false
        });
        infoWindow = new google.maps.InfoWindow;
     }
     function MarkerMaker(lats, longs) {
        var markerOptions = {
                position: new google.maps.LatLng(lats, longs)
                };
                var marker = new google.maps.Marker(markerOptions);
                marker.setMap(map);
            // console.log("marker maker long&lat: " + lats + ", " + longs);
     }
     function DisplayAnimal() {
// variables for user input and petfinder api output
    // console.log("ZIP2: " + zip);
    randZipArray = makeZipArray(44143);
    var randomZip = randZipArray[Math.floor(Math.random()*24 + 0)]
    var locationQuery = "&location=" + randomZip;
    console.log("Randomized zip locationQuery: " + locationQuery)
    // var locationID = "";
    // var locLat = 0;
    // var locLong = 0;
    catDogSelect = "dog";
    catDogAnim = "";
    ageSelect = "";
    ageID = "";
    sexSelect = "";
    sexID = "";
    breedSelect = "";
    breedID = "";
    sizeSelect = "";
    sizeID = "";
    respAbrev = "";
    addr = "";
    city = "";
    state = "";
    zipID = "";
    loop = false;
        
    var queryURL = AnimURL + key + locationQuery + "&animal="  + catDogSelect + "&age=" + ageSelect + "&sex=" + sexSelect + "&breed=" + breedSelect + "&size=" + sizeSelect;
    queryURL = queryURL.replace(" ", "+");
        console.log("while Loop outside function");
        AnimalAJAX(queryURL);
    
    // while (!loop) {
//      $.ajax({
//          url: queryURL,
//          dataType: "jsonp",
//          method: "GET"
//      }).done(function(response) {
//          var index = Math.floor((Math.random() * 24) + 0);
//          // console.log("random index: " + index);
//          if (response.petfinder.pets == undefined) {
//              return;
//          }
//          // console.log(response);           
// // getting animal location
//          respAbrev = response.petfinder.pets.pet;
//          console.log(respAbrev);
//          addr = respAbrev[index].contact.address1.$t;
//          city = respAbrev[index].contact.city.$t;
//          state = respAbrev[index].contact.state.$t;
//          zipID = respAbrev[index].contact.zip.$t;
// // format animal location into standard format
//          locationID = addr + ", " + city + ", "  + state + " " + zipID;
//          mapAddress = locationID;
//          // console.log("locationID check undf: " + locationID);
//          if (locationID.indexOf('undefined') == 0) {
//          locationID = locationID.replace(/undefined, /g, "");
//          }
//          // locationID = locationID.replace('"', " "); 
//          var nameID = respAbrev[index].name.$t;
//          displayAnimHTML(nameID);            
//          // console.log("locationID: " + locationID);
//          displayAnimHTML(locationID);
//          ageID = respAbrev[index].age.$t;
//          // console.log(ageID);
//          displayAnimHTML(ageID);
//          catDogAnim = respAbrev[index].animal.$t;
//          // console.log(catDogAnim);
//          displayAnimHTML(catDogAnim);
//          sexID = respAbrev[index].sex.$t;
//          displayAnimHTML(sexID);
//          var phoneID = respAbrev[index].contact.phone.$t;
//          displayAnimHTML(phoneID);
//          var emailID = respAbrev[index].contact.email.$t;
//          displayAnimHTML(emailID);
//          if (Array.isArray(respAbrev[index].breeds.breed)) {
//              breedID = respAbrev[index].breeds.breed[0].$t + "/ " + respAbrev[index].breeds.breed[1].$t + " mix";
                    
//          } else
//           { breedID = respAbrev[index].breeds.breed.$t };
//          displayAnimHTML(breedID);
//          // console.log("breedID: " + breedID);            
//          sizeID = respAbrev[index].size.$t;
//          displayAnimHTML(sizeID);
//          var photo = respAbrev[index].media.photos.photo[2].$t;
//          // console.log(photo);
//          $('#picture').attr('src', photo);// corey change here
//          $('#map').show();
//      })
//      loop = true;
//  }
        
     }
     function displayAnimHTML(feature) {
            $('.text').append('<br>' + feature);
        }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
    
      function ReverseGeoLocator(){
        // console.log("globalLat within reverse geolocator: " + globalLat);
        // console.log("globalLng within reverse geolocator: " + globalLng);
        // reverse geolocation
            var revGeolocQuery = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + globalLat + "," + globalLng;
            revGeolocQuery = revGeolocQuery + "&sensor=true";
          // mapURLzip = mapURLzip.replace(/ /g, "+");
          $.ajax({
            url: revGeolocQuery,
            method: "GET"
            }).done(function(response) {
            var searchKey = "postal_code";
            var zipcodeObject = null;
            for( var i = 0; i < response.results[0].address_components.length; i++ ){
                var thisAddressObject = response.results[0].address_components[i];
                var addressTypes = thisAddressObject.types;
                var search = addressTypes.indexOf(searchKey);
                if( search > -1 ){
                    zipcodeObject = thisAddressObject;
                    // console.log("ZIP CODE OBJECT: " + JSON.stringify(zipcodeObject.short_name));
                    zip = zipcodeObject.short_name;
                    // console.log("ZIP3: " + zip);
                    break;
                }
            }
            
            if( zipcodeObject !== null ){
                // console.log(zipcodeObject);
            }
        });
            
      }
      function makeZipArray(number) {
        number = parseInt(number);
        var posIterator = number + 13;
        var negIterator = number - 13;
        var Ziparray = [];
        for (var i = number; i < posIterator; i++) {
            Ziparray.push(i);
        }
        for (var i = number - 1; i > negIterator; i--) {
            Ziparray.push(i);
        }
        Ziparray.map(String);
                    // console.log(Ziparray);
        return Ziparray;
      }
      function AnimalAJAX(queryURL) {
            $.ajax({
            url: queryURL,
            dataType: "jsonp",
            method: "GET"
        }).done(function(response) {
            console.log("while loop")
            var index = Math.floor((Math.random() * 24) + 0);
            // console.log("random index: " + index);
            if (response.petfinder.pets == undefined) {
                randomZip = randZipArray[Math.floor(Math.random()*24 + 0)]
                locationQuery = "&location=" + randomZip;
                queryURL = AnimURL + key + locationQuery + "&animal="  + catDogSelect + "&age=" + ageSelect + "&sex=" + sexSelect + "&breed=" + breedSelect + "&size=" + sizeSelect;
                queryURL = queryURL.replace(" ", "+");
                return AnimalAJAX(queryURL);
            } 
            loop = true;
            
            // console.log(response);           
// getting animal location
            respAbrev = response.petfinder.pets.pet;
            console.log(respAbrev);
            addr = respAbrev[index].contact.address1.$t;
            city = respAbrev[index].contact.city.$t;
            state = respAbrev[index].contact.state.$t;
            zipID = respAbrev[index].contact.zip.$t;
// format animal location into standard format
            locationID = addr + ", " + city + ", "  + state + " " + zipID;
            mapAddress = locationID;
            // console.log("locationID check undf: " + locationID);
            if (locationID.indexOf('undefined') == 0) {
            locationID = locationID.replace(/undefined, /g, "");
            }
            // locationID = locationID.replace('"', " "); 
            var nameID = respAbrev[index].name.$t;
            $('#petName').html(nameID);         
            // console.log("locationID: " + locationID);
            displayAnimHTML(locationID);
            ageID = respAbrev[index].age.$t;
            // console.log(ageID);
            displayAnimHTML(ageID);
            catDogAnim = respAbrev[index].animal.$t;
            // console.log(catDogAnim);
            displayAnimHTML(catDogAnim);
            sexID = respAbrev[index].sex.$t;
            displayAnimHTML(sexID);
            var phoneID = respAbrev[index].contact.phone.$t;
            displayAnimHTML(phoneID);
            var emailID = respAbrev[index].contact.email.$t;
            displayAnimHTML(emailID);
            if (Array.isArray(respAbrev[index].breeds.breed)) {
                breedID = respAbrev[index].breeds.breed[0].$t + "/ " + respAbrev[index].breeds.breed[1].$t + " mix";
                    
            } else
             { breedID = respAbrev[index].breeds.breed.$t };
            displayAnimHTML(breedID);
            // console.log("breedID: " + breedID);            
            sizeID = respAbrev[index].size.$t;
            displayAnimHTML(sizeID);
            var photo = respAbrev[index].media.photos.photo[2].$t;
            // console.log(photo);
            $('#dogimage').attr('src', photo);// corey change here
            // $('#map').show();
        })
        
    }
     
})