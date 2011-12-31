function listenTo(el, evname, fn) {
  var listener = el.addEventListener || el.attachEvent;
  listener.call(el, (el.addEventListener ? evname : "on" + evname), fn, false);
}

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
  var townshipList = document.getElementById("townships");
  for (var i=0, n=townships.length; i<n; i++) {
    var li = document.createElement("li");
    li.innerHTML = townships[i];
    li.setAttribute("data-name", townships[i]);
    listenTo(li, 'click', function () {
      filterSchoolHousesByTownship(this.getAttribute("data-name"));
    });
    townshipList.appendChild(li);
  }
}

function initializeMap() {
  var latlng = new google.maps.LatLng(40.105912, -84.558334);
  var myOptions = {
    zoom: 11,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP //TERRAIN, ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
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

// Model

var townships = [
  "Adams", "Allen", "Brown", "Butler", "Franklin", "Greenville", "Harrison",
  "Jackson", "Liberty", "Mississinawa", "Monroe", "Neave", "Patterson", "Richmond",
  "Twin", "Van Buren", "Wabash", "Washington", "Wayne", "York"
];
var schoolHouses = [];

// Adams township

schoolHouses.push({
  township: "Adams", name: "#1 Softspot", latitude: 40.159296, longitude: -84.440961
});

schoolHouses.push({
  township: "Adams", name: "#2", latitude: 40.130659, longitude: -84.449901
}); // Don't this this is here anymore

schoolHouses.push({
  township: "Adams", name: "#3 Pleasant Bend", latitude: 40.101169, longitude: -84.453975
}); // Don't this this is here anymore

schoolHouses.push({
  township: "Adams", name: "#4 Glendale", latitude: 40.110097, longitude: -84.543191
}); // Don't this this is here anymore

schoolHouses.push({
  township: "Adams", name: "#5 New Harrison", latitude: 40.112308, longitude: -84.518128
}); // Don't this this is here anymore

schoolHouses.push({
  township: "Adams", name: "#6 Pleasant Ridge", latitude: 40.136833, longitude: -84.546098 
}); // Don't this this is here anymore

schoolHouses.push({
  township: "Adams", name: "#7", latitude: 40.166517, longitude: -84.511345
}); // Don't this this is here anymore

schoolHouses.push({
  township: "Adams", name: "#8 Black Top", latitude: 40.102387, longitude: -84.507195
}); // Don't this this is here anymore

schoolHouses.push({
  township: "Adams", name: "#9", latitude: 40.157336, longitude: -84.479424
}); // Don't this this is here anymore

schoolHouses.push({
  township: "Adams", name: "#10 Progress Bend", latitude: 40.129611, longitude: -84.478458
}); // Don't this this is here anymore

schoolHouses.push({
  township: "Adams", name: "#11 Horatio", latitude: 40.151419, longitude: -84.525075
}); // Don't this this is here anymore

schoolHouses.push({
  township: "Adams", name: "#12", latitude: 40.137258, longitude: -84.504398
}); // Don't this this is here anymore

schoolHouses.push({
  township: "Adams", name: "#14", latitude: 40.094617, longitude: -84.4298
});

// Main

loadMapsApi();

