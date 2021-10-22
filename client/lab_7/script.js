/* eslint-disable */

async function dataHandler(){

    const request = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const zipcode = await request.json();
    const ACCESSTOKEN = 'pk.eyJ1IjoidG9iaTI5NCIsImEiOiJja3V0dmw4Z3gxNjVsMndxOWlyaWs4cjY3In0.IT8zj90dPIJmZ2uc-78qXw';
    const mymap = L.map('mapid').setView([38.989, -76.93], 12);
   
    mapInit();

         //Leaflet Map
         function mapInit(){
            L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${ACCESSTOKEN}`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
            }).addTo(mymap);
        }

    function findMatches(wordToMatch, zipcode){
        return zipcode.filter(place => {

            const regex = new RegExp(wordToMatch, 'gi');
            return place.zip.match(regex);
        })
    }

    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    searchInput.addEventListener('input', (evt) => { 

        if(!evt.target.value){
            suggestions.innerHTML = '';
        } else {
            displayMatches(evt, mymap);
        }
        }); 

    function numberWithCommas(x){
         return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
     }

        const markers = [];
    
        function displayMatches(event){
            marker = markers[0];
        
            markers.forEach( marker => {
                marker.remove();
            })
           const matchArray = findMatches(event.target.value, zipcode).slice(0,5);
           
            matchArray.forEach((p) => {
                if(p.hasOwnProperty(`geocoded_column_1`)) {
                    const point = p.geocoded_column_1;
                    const latlong = point.coordinates;
                    const marker = latlong.reverse();
                    markers.push(L.marker(marker).addTo(mymap));
                    
                    console.log(marker)
                }
            })

            const html = matchArray.map(place => {
                return `
                <ul>
                <li><div class = "name">${place.name}</div>
                <div class = "address">${place.address_line_1}</div></li>                
                </ul>
                <br>
                `;
            
            }).join('');
            suggestions.innerHTML = html;
        }
     
    }
    window.onload = dataHandler;

