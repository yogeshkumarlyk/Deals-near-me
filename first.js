mapboxgl.accessToken = 'pk.eyJ1IjoieW9nZXNoa3VtYXIxODA5IiwiYSI6ImNrdGw4M3dqeTF0MHQyb3BlZ25hOGJoeG4ifQ.rwjAgh-KdMBGs4ho8JrvNA';

const map = new mapboxgl.Map({
  container: 'map',
  //style: 'mapbox://styles/mapbox/light-v10',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [80.25064098465614, 13.170449799999997],
  zoom: 10,
});

// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true                    // When active the map will receive updates to the device's location as it changes.
    },
    trackUserLocation: true,

    showUserHeading: true                         // Draw an arrow next to the location dot to indicate which direction the device is heading.
    })
)

const nav=new mapboxgl.NavigationControl()         // adding the directions for the two random points.
map.addControl(nav)
 
var directions = new MapboxDirections({
    accessToken: 'pk.eyJ1IjoieW9nZXNoa3VtYXIxODA5IiwiYSI6ImNrdGw4M3dqeTF0MHQyb3BlZ25hOGJoeG4ifQ.rwjAgh-KdMBGs4ho8JrvNA'
});
map.addControl(directions,"top-left")


function getdistance(lat1, lon1, lat2, lon2) {              //get distance function for calculating the distance between two coordinates.
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		return dist;
	}
}


                  
