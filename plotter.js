
List=[];
var locationlat;
var locationlng;
var locat = navigator.geolocation.getCurrentPosition (
    function(position){
      //console.log(position.coords.latitude,position.coords.longitude);
      locationlng = position.coords.longitude;
      locationlat = position.coords.latitude;
    }   
  );
//console.log([locationlng, locationlat]);
var locdata;     
let xhr = new XMLHttpRequest();
xhr.open("GET","/data.json")
xhr.send();
 
xhr.onload = () =>{
    console.log(xhr);                                   // if status == 200 and readystate == 4
    //console.log(xhr.response)                         // the response data from the web server comes as text and strings
    locdata = JSON.parse(xhr.responseText).Stores;      //this method makes the response data from string to javascript object
    console.log(locdata)
    }

function getStoresLocation() {
    if(List!==null){          
        for(let point of List){                          //this makes sure that when we change the category the other markers get removed
          point.remove();
        }
    }
       
  let radius = document.getElementById('radius').value;
  let selected = document.getElementById('category').value;
  //console.log(radius);
  //console.log(selected);
  //console.log(locationlat);
  //console.log(locationlng);
  if(locdata) {
      for(const {coordinates,title,discount,category} of locdata) {
          //console.log(coordinates.lat,coordinates.long);
          //console.log(locationlat,locationlng);
          let distance = getdistance(locationlat, locationlng, coordinates.long, coordinates.lat)
          let dist = Math.round(distance);
          //console.log(distance);
          //console.log(dist);
          if (dist <= radius && selected == category) {
              console.log(selected)
              // create a HTML element for each feature
              const el = document.createElement('div');                         //creating a div element for the markers and adding the class name
              el.className = 'marker';
                      
              new mapboxgl.Marker(el).setLngLat([coordinates.lat, coordinates.long])     // make a marker for each coordinates of the shop and add to the map
              .setPopup( new mapboxgl.Popup({ offset: 25 })                              // add popups
              .setHTML(`<h3>${title}</h3><p>${category}</p><p>${discount}</p>`)
              )
              .addTo(map);
              List.push(el);
                              
              } 
                  
          }
      }
  }
    
    
    
    

    

    
    
