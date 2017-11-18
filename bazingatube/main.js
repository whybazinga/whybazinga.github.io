function onClientLoad() {
    gapi.client.setApiKey('AIzaSyCO0E_90cr2cmQVT3lL5vvbE-CcIXi2P5c');
    gapi.client.load('youtube', 'v3', function () {
        alert("2");
    });
}

function search() {
    // Use the JavaScript client library to create a search.list() API call.
    alert("search");
    let request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: searchQuery,
        maxResults: 3,
    });

    request.execute(function (response) {
        alert("onSearchResponse");
        showResponse(response);
    });
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