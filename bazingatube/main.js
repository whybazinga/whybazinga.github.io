function showResponse(response) {
    console.log(response);
}

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyCO0E_90cr2cmQVT3lL5vvbE-CcIXi2P5c');
}

function search() {
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: searchQuery,
    });
    request.execute(onSearchResponse);
}

function onSearchResponse(response) {
    showResponse(response);
}


let video = document.getElementsByClassName("video")[0];

//===========================================================================


let input = document.getElementById("search-box");
let button = document.getElementsByClassName("button")[0];

let searchQuery = "";

function buttonClick() {
    searchQuery = input.value;
    search();
}

function inputClick() {
    input.style.width = "60%";
}

function buttonView() {
    if (input.value !== "") {
        button.style.opacity = "1";
        button.disabled = false;
    }
    else {
        button.style.opacity = "0.6";
        button.disabled = true;
    }
}

button.addEventListener("click", buttonClick);
input.addEventListener("click", inputClick);
input.addEventListener("input", buttonView);