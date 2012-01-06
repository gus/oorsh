oorsh = {
  maps: {
    images: {},
    selectedSchoolHouse: undefined
  }
};

function buildSchoolHouseMarker(schoolHouse) {
  return new google.maps.Marker({
      "position": new google.maps.LatLng(schoolHouse.latitude, schoolHouse.longitude),
      "animation": google.maps.Animation.DROP,
      "flat": true,
      "icon": oorsh.maps.images.RedMarker,
      "title": (schoolHouse.township + ": " + schoolHouse.name)
  });
}

function bindSchoolHouseClick(schoolHouse, map) {
  google.maps.event.addListener(schoolHouse.marker, 'click', function (ev) {
    var $details = $("#details").show();
    $details.find("h2").text(schoolHouse.township + ": " + schoolHouse.name);
    var maxWidth = $(window).width() - $details.width();
    if ($("html.boxshadow").length == 0) { maxWidth = maxWidth - 1; }
    $("#map_canvas").width(maxWidth);
    google.maps.event.trigger(map, 'resize');
    map.setCenter(ev.latLng);
    schoolHouse.marker.setIcon(oorsh.maps.images.BlueMarker);
    if (oorsh.maps.selectedSchoolHouse) {
      oorsh.maps.selectedSchoolHouse.marker.setIcon(oorsh.maps.images.RedMarker);
    }
    oorsh.maps.selectedSchoolHouse = schoolHouse;
  });
}

function setupLocations(map) {
  for (var i=0,n=schoolHouses.length; i<n; i++) {
    var schoolHouse = schoolHouses[i],
        marker = buildSchoolHouseMarker(schoolHouse);
    marker.setMap(map);
    schoolHouse.marker = marker;
    bindSchoolHouseClick(schoolHouse, map);
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
  oorsh.maps.images.RedMarker = new google.maps.MarkerImage("http://maps.gstatic.com/mapfiles/ms/micons/red-dot.png");
  oorsh.maps.images.BlueMarker = new google.maps.MarkerImage("http://maps.gstatic.com/mapfiles/ms/micons/blue-dot.png");
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

