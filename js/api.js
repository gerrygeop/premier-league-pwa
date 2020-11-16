const BASE_URL = 'https://api.football-data.org/v2/';
const API_KEY = '67d02d349ce8436489cc5d8167306137';
const loader = document.getElementById('preloader');

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
    .then(response => {
        if (response.status !== 200) {
            console.log(`Error: ${response.status}`);
            return Promise.reject(new Error(response.statusText));
        } else {
            return response;
        }
    })
    .then(response => response.json())
    .catch(error => console.log("FetchAPI Error: ", error));
};


const getStanding = () => {
    loader.innerHTML = preLoader;
    
    fetchAPI(`${BASE_URL}competitions/PL/standings`)
        .then(data => {
            showStanding(data);
            resolve(data);
        })
        .catch(error => console.log("Standings Error: ", error));
}


const getAllMatches = matchday => {
    loader.innerHTML = preLoader;

    fetchAPI(`${BASE_URL}competitions/PL/matches?matchday=${matchday}`)
        .then(data => {
            showMatches(data);
        })
        .catch(error => console.log(`getAllMatches Error: ${error}`))
}

const getMatchById = matchId => {
    loader.innerHTML = preLoader;

    fetchAPI(`${BASE_URL}matches/${matchId}`)
        .then(data => {
            showModals(data.match);
        })
        .catch(error => console.log("getMatchById Error: ", error))
}

const preLoader = `
    <div class="preloader-wrapper active">
        <div class="spinner-layer spinner-red-only">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div>
            <div class="gap-patch">
                <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
                <div class="circle"></div>
            </div>
        </div>
    </div>
`;