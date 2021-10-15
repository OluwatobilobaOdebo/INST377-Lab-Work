/* eslint-disable */

async function windowsAction(){

    const request = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');

    const cities = await request.json();

    function findMatches(wordToMatch, cities){
        return cities.filter(place => {

            const regex = new RegExp(wordToMatch, 'gi');
            return place.city.match(regex);
        })
    }

    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', (evt) => { 

        if(!evt.target.value){
            suggestions.innerHTML = '';
        } else {
            displayMatches(evt);
        }
        }); 

        function numberWithCommas(x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        function displayMatches(event){
            const matchArray = findMatches(event.target.value, cities);
            const html = matchArray.map(place => {
                return `
                <ul>
                <li><div class = "name">${place.name}</div></li>
                <div class = "category">${place.category}</div>
                <div class = "address">${place.address_line_1}</div>
                <div class = "city">${place.city}</div>
                <div class = "zip">${place.zip}</div>
                </ul>
                <br>,
                `;
            }).join('');
            suggestions.innerHTML = html;
        }

        console.log(data);
    }

    window.onload = windowsAction;