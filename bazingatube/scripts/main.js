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
        order: 'viewCount',
        pageToken: nextPage,
    });
    request.execute(onSearchResponse);
}

let savedResponse;

function onSearchResponse(response) {
    savedResponse = response;
    loadNewPage();
}

//===========================================================================

let results = document.getElementById('result-window');

function removeVideos() {
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
}

let videosPerPage = 3;
let nextPage;

let k = 40;

function loadNewPage() {
    nextPage = savedResponse.nextPageToken;
    let newPage = document.createElement('div');
    newPage.className = 'page';
    newPage.style.background = 'rgb(' + k + ',' + k + ',' + k + ')';
    k = (k + 40) % 255;
    newPage.style.width = videosPerPage * (4 * 0.8 * results.clientHeight / 5 + 30);
    results.style.width = results.clientWidth + parseInt(newPage.style.width);
    for (let i = 0; i < videosPerPage; i++) {
        newPage.appendChild(makeVideoStructure(i));
    }
    results.appendChild(newPage);
    let pageRes = document.getElementsByClassName('page');
    resizeVideos(pageRes[pageRes.length - 1]);
}

function resizeVideos(videos) {
    for (let i = 0; i < videos.length; i++) {
        videos[i].style.width = 4 * videos[i].clientHeight / 5 + 'px';
    }
}

let input = document.getElementById('search-box');
let button = document.getElementsByClassName('button')[0];
let searchQuery = '';

function buttonClick() {
    if (searchQuery !== input.value) {
        searchQuery = input.value;
        removeVideos();
        for (let i = 0; i < 3; i++) {
            search();
        }
    }
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

window.onresize = function () { resizeVideos(document.getElementsByClassName('video')); };

//================================================================================
function makeVideoStructure(index) {
    let video = document.createElement('div');
    video.className = 'video';
    let title = document.createElement('a');
    title.className = 'video-title';
    title.innerHTML = savedResponse.items[index].snippet.title;
    title.href = 'https://www.youtube.com/watch?v=' + savedResponse.items[index].id.videoId;
    title.target = '_blank';

    let image = document.createElement('div');
    image.className = 'video-image';
    image.style['background-image'] = 'url(' + savedResponse.items[index].snippet.thumbnails.medium.url + ')';
    let pubInfo = document.createElement('div');
    pubInfo.className = 'video-public-info';
    let author = document.createElement('a');
    author.className = 'video-author';
    author.innerHTML = savedResponse.items[index].snippet.channelTitle;
    author.href = 'https://www.youtube.com/channel/' + savedResponse.items[index].snippet.channelId;
    author.target = '_blank';

    let date = document.createElement('p');
    date.className = 'video-date';
    temp = new Date(Date.parse(savedResponse.items[index].snippet.publishedAt.toString().replace(/ *\(.*\)/, "")));
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

    video.style.width = results.clientWidth * 0.2;

    return video;
}

