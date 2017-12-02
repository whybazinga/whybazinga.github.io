document.body.innerHTML = `
<div class="wrap">
<div id="head">
    <input type="search" id="search-box" placeholder="Search..">
    <button class="button" disabled></button>
</div>
<div id="result-window">
</div>
<div id="page-indicator">
</div>
</div>
`


function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyCO0E_90cr2cmQVT3lL5vvbE-CcIXi2P5c');
}

let responseRecievedFlag = true;

function search() {
    let request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: searchQuery,
        type: 'video',
        order: 'viewCount',
        pageToken: nextPage,
    });
    responseRecievedFlag = false;
    request.execute(function (response) {
        responseRecievedFlag = true;
        savedResponse = response;
        nextPage = savedResponse.nextPageToken;
        videosPerPage = savedResponse.pageInfo.resultsPerPage;
        currPageWidth = videosPerPage * (4 * 0.8 * results.clientHeight / 5 + 30);
        pages.push(loadNewPage());
    });
}

let savedResponse;



//===========================================================================

let results = document.getElementById('result-window');

let videosPerPage = 0;
let nextPage;
let pages = [];
let currPageWidth = 0;
let currVideoWidth = 0;


function loadNewPage() {
    let newPage = document.createElement('div');
    newPage.className = 'page';
    newPage.style.width = currPageWidth + 'px';
    for (let i = 0; i < videosPerPage; i++) {
        newPage.appendChild(makeVideoStructure(i));
    }
    return newPage;
}

function resizeAll() {
    resizeVideos(document.getElementsByClassName('video'));
    resizePages(document.getElementsByClassName('page'));
    resizeResults();
}

function resizeResults() {
    results.style.width = 2 * currPageWidth + Math.max(document.documentElement.clientWidth, currPageWidth) + 'px';
    results.style.left = -currentPage + "px";
    videosPerWindow = Math.floor(document.documentElement.clientWidth / (currVideoWidth + 30));
}

function resizePages(pages) {
    currPageWidth = videosPerPage * (currVideoWidth + 30);
    currX = currX === 0 ? 0 : -currPageWidth;
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.width = currPageWidth + 'px';
    }
}

function resizeVideos(videos) {
    currVideoWidth = 4 * 0.8 * results.clientHeight / 5;
    for (let i = 0; i < videos.length; i++) {
        videos[i].style.width = currVideoWidth + 'px';
    }
}

let input = document.getElementById('search-box');
let button = document.getElementsByClassName('button')[0];
let searchQuery = '';

input.onsearch = function () {
    if (input.value !== '') {
        buttonClick();
    }
}

let initFlag;

function buttonClick() {
    if (searchQuery !== input.value) {
        searchQuery = input.value;
        initializeBasics();
        loadMorePagesToArray();
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

window.onresize = resizeAll;

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

    return video;
}

let currX = 0;
let startX;
let videosPerWindow = Math.floor(document.documentElement.clientWidth / (currVideoWidth + 30));
let videosLeftToShow = 0;
let currentPage;

function initializeBasics() {
    results.ontouchstart = mouseDownFunc;
    results.ontouchend = mouseUpFunc;
    results.onmousedown = mouseDownFunc;
    results.onmouseup = mouseUpFunc;
    initFlag = true;
    nextPage = undefined;
    currentPage = 0;
    pages = [];
    results.innerHTML = '';
    pageIndicator.style.opacity = '1';
}

let pageIndicator = document.getElementById('page-indicator');

function mouseDownFunc(downEvent) {
    startX = downEvent.clientX || (downEvent.clientX === 0 ? 0 : downEvent['touches'][0]['clientX']);
    setTimeout(() => pageIndicator.style.transitionDelay = '3s', 0);
    pageIndicator.style.bottom = '40px';

}

function mouseUpFunc(upEvent) {
    setTimeout(() => pageIndicator.style.transitionDelay = '0s', 0);
    pageIndicator.style.bottom = '-20%';
    let deltaX = 0;
    deltaX = startX - (upEvent.clientX || (upEvent.clientX === 0 ? 0 : upEvent['changedTouches'][0]['clientX']));

    if (Math.abs(deltaX) > 200 && Math.abs(deltaX) < document.documentElement.clientWidth * 0.7) {
        if (deltaX > 0) {
            if (videosLeftToShow > 0) {
                currX -= Math.min(videosPerWindow, videosLeftToShow) * (currVideoWidth + 30);
                videosLeftToShow = Math.max(videosLeftToShow - videosPerWindow, 0);
            } else {
                changePage(1);
            }
        } else if (deltaX < 0) {
            if (videosLeftToShow + videosPerWindow < videosPerPage) {
                currX += Math.min(videosPerWindow, videosPerPage - videosPerWindow - videosLeftToShow) * (currVideoWidth + 30);
                videosLeftToShow = Math.min(videosPerPage - videosPerWindow, videosLeftToShow + videosPerWindow);
            } else {
                if (currentPage !== 0) {
                    changePage(-1);
                }
            }
        }
    }
    else if (Math.abs(deltaX) >= document.documentElement.clientWidth * 0.7) {
        if (deltaX > 0) {
            changePage(1);
        } else if (deltaX < 0) {
            if (currentPage !== 0) {
                changePage(-1);
            }
        }
    }
    results.childNodes[0].style.left = currX + 'px';
}

function changePage(index) {
    if (index === 'init') {
        results.appendChild(pages[0]);
    }
    else if (index === -1) {
        currentPage--;
        results.firstChild.style.left = document.documentElement.clientWidth + 'px';
        results.removeChild(results.lastChild);
        pages[currentPage].style.left = -currPageWidth + 'px';
        results.appendChild(pages[currentPage]);
    } else if (index === 1) {
        if (currentPage > pages.length - 5) {
            loadMorePagesToArray();
        }
        currentPage++;
        results.firstChild.style.left = -currPageWidth + 'px';
        results.removeChild(results.lastChild);
        pages[currentPage].style.left = document.documentElement.clientWidth + 'px';
        results.appendChild(pages[currentPage]);
    }
    pageIndicator.innerHTML = currentPage;
    resizeAll();
    currX = 0;
    videosLeftToShow = videosPerPage - videosPerWindow;
}

function loadMorePagesToArray() {
    let border = pages.length + 5;
    let filler = setInterval(function () {
        if (searchQuery !== '') {
            if (responseRecievedFlag) {
                search();
            }
            if (pages.length > border) {
                if (initFlag) {
                    changePage('init');
                    initFlag = false;
                }
                clearInterval(filler);
            }
        }
    }, 10);
}