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
        type: 'video',
    });
    request.execute(onSearchResponse);
}

let savedResponse;
function onSearchResponse(response) {
    savedResponse = response;
    showResponse(response);

    let results = document.getElementById('result-window');
    results.childNodes.forEach((child) => results.removeChild(child));
    results.appendChild(makeVideoStructure(0));
    results.appendChild(makeVideoStructure(1));
    results.appendChild(makeVideoStructure(2));
}

//===========================================================================


let input = document.getElementById('search-box');
let button = document.getElementsByClassName('button')[0];

let searchQuery = '';

function buttonClick() {
    searchQuery = input.value;
    search();
}

function inputClick() {
    input.style.width = '60%';
}

function buttonView() {
    if (input.value !== '') {
        button.style.opacity = '1';
        button.disabled = false;
    }
    else {
        button.style.opacity = '0.6';
        button.disabled = true;
    }
}

button.addEventListener('click', buttonClick);
input.addEventListener('click', inputClick);
input.addEventListener('input', buttonView);

function makeVideoStructure(index) {
    let video = document.createElement('div');
    video.className = 'video';
    let title = document.createElement('p');
    title.className = 'video-tittle';
    title.innerHTML = savedResponse.items[index].snippet.title;
    let image = document.createElement('div');
    image.className = 'video-image';
    image.style['background-image'] = 'url(' + savedResponse.items[index].snippet.thumbnails.high.url + ')';
    let pubInfo = document.createElement('div');
    pubInfo.className = 'video-public-info';
    let author = document.createElement('p');
    author.className = 'video-author';
    author.innerHTML = savedResponse.items[index].snippet.channelTitle;
    let date = document.createElement('p');
    date.className = 'video-date';
    let temp = new Date(Date.parse(savedResponse.items[index].snippet.publishedAt.toString().replace(/ *\(.*\)/, "")));
    date.innerHTML = temp.getDate().toString() + '.' + (temp.getMonth() + 1) + '.' + temp.getFullYear();
    let description = document.createElement('p');
    description.className = 'video-description';
    description.innerHTML = savedResponse.items[index].snippet.description;

    pubInfo.appendChild(author);
    pubInfo.appendChild(date);
    video.appendChild(title);
    video.appendChild(image);
    video.appendChild(pubInfo);
    video.appendChild(description);

    return video;
}

