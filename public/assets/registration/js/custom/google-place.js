/**
 * Created by sagar on 27/2/15.
 */
// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initialize() {
    // Create the autocomplete object, restricting the search
    // to geographical location types.

    autocomplete = new google.maps.places.Autocomplete(
        /** @type {HTMLInputElement} */(document.getElementById('currentLocation')),
        { types: ['geocode'] });
    // When the user selects an address from the dropdown,
    // populate the address fields in the form.
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        fillInAddress();
    });
}

// [START region_fillform]
function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    /* Get Geo location */
    //console.log(place);

    /* Traverse Array To get City & Country*/
    console.log(place.address_components.length);
    for (var i = 0, l = place.address_components.length; i < l; i++) {
        var obj = place.address_components[i];
        //console.log(obj);
        if(obj.types[0]=='country')
        /* Country Name */
            $('#country').val(obj.long_name);
        if(obj.types[0]=='locality')
        /* City Name */
            $('#city').val(obj.long_name);

    }
    /* Get Geolocation */
    var addressGeoCode = place.geometry.location;

    var latlogAfterParse = [ ];
    for (var prop in addressGeoCode) {
        latlogAfterParse.push(addressGeoCode[prop]);
    }

    //getUserData(latlogAfterParse[0],latlogAfterParse[1]);


    //console.log('<span>Lat: <b>'+latlogAfterParse[0]+'</b></span>'+'<br><span>Long: <b>'+latlogAfterParse[1]+'</b></span>');
    $('#latitude').val(latlogAfterParse[0]);
    $('#longitude').val(latlogAfterParse[1]);
    $('#map-canvas').hide();
    initializeGoogleMap(addressGeoCode.k,addressGeoCode.D);

    //document.getElementById('addressGeoCode').innerHTML='<span>Lat: <b>'+addressGeoCode.k+'</b></span>'+'<br><span>Long: <b>'+addressGeoCode.B+'</b></span>';
    //alert(addressGeoCode);
    /*Get Geolocation end*/
//        for (var component in componentForm) {
//            document.getElementById(component).value = '';
//            document.getElementById(component).disabled = false;
//        }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
//        for (var i = 0; i < place.address_components.length; i++) {
//            var addressType = place.address_components[i].types[0];
//            if (componentForm[addressType]) {
//                var val = place.address_components[i][componentForm[addressType]];
//                document.getElementById(addressType).value = val;
//            }
//        }
}
// [END region_fillform]

// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = new google.maps.LatLng(
                position.coords.latitude, position.coords.longitude);
            autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
                geolocation));
        });
    }
}
// [END region_geolocation]


var map;
function initializeGoogleMap(lat,long) {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(lat,long)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}