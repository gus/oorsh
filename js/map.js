function buildSchoolHouseMarker(schoolHouse) {
  return new google.maps.Marker({
      "position": new google.maps.LatLng(schoolHouse.latitude, schoolHouse.longitude),
      "animation": google.maps.Animation.DROP,
      "title": (schoolHouse.township + ": " + schoolHouse.name)
  });
  //google.maps.event.addListener(marker, 'click', toggleBounce);
}

function setupLocations(map) {
  for (var i=0,n=schoolHouses.length; i<n; i++) {
    var schoolHouse = schoolHouses[i],
        marker = buildSchoolHouseMarker(schoolHouse);
    marker.setMap(map);
    schoolHouse.marker = marker;
  }
}

function filterSchoolHousesByTownship(name) {
  for (var i=0, n=schoolHouses.length; i<n; i++) {
    var schoolHouse = schoolHouses[i];
    schoolHouse.marker.setVisible(schoolHouse.township == name);
  }
}

function setupTownshipFilter(map) {
  var $townshipList = $("#townships");
  for (var i=0, n=townships.length; i<n; i++) {
    var $li = $(document.createElement("li"));
    $li.text(townships[i]).data("name", townships[i]);
    $li.click(function () {
      filterSchoolHousesByTownship($(this).data("name"));
    });
    $townshipList.append($li);
  }
}

function initializeMap() {
  var latlng = new google.maps.LatLng(40.105912, -84.558334);
  var mapOptions = {
    zoom: 11,
    center: latlng,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP //TERRAIN, ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  setupLocations(map);
  setupTownshipFilter(map);
}

function loadMapsApi() {
  var apiKey = "AIzaSyCIe6cSxwDvY6gWuJ0qI9I0C0O1Tsu_wpc",
      dockScript = document.body.getElementsByTagName("script")[0],
      script = document.createElement("script");
  script.src = "http://maps.googleapis.com/maps/api/js?key=" + apiKey + "&sensor=false&callback=initializeMap";
  script.type = "text/javascript";
  dockScript.parentNode.insertBefore(script, dockScript);
}

// Main

$(loadMapsApi);

