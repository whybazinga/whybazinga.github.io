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
        //if (nextPage !== savedResponse.nextPageToken) {
        nextPage = savedResponse.nextPageToken;
        videosPerPage = savedResponse.pageInfo.resultsPerPage;
        currPageWidth = videosPerPage * (4 * 0.8 * results.clientHeight / 5 + 30);
        pages.push(loadNewPage());
        //}
    });
}

let savedResponse;



//===========================================================================

let results = document.getElementById('result-window');

function removeVideos() {
    while (results.firstChild) {
        results.removeChild(results.firstChild);
        pages = [];
    }
}

let videosPerPage = 0;
let nextPage;
let k = 50;     //TODO: delete
let pages = [];
let currPageWidth = 0;
let currVideoWidth = 0;


function loadNewPage() {
    let newPage = document.createElement('div');
    newPage.className = 'page';
    newPage.style.background = 'rgb(0,0,' + k + ')';    //TODO: delete
    k = (k + 50) % 255;                                 //TODO: delete
    newPage.style.width = currPageWidth + 'px';
    results.style.width = results.clientWidth + currPageWidth + 'px';
    for (let i = 0; i < videosPerPage; i++) {
        newPage.appendChild(makeVideoStructure(i));
    }
    return newPage;
    //let pageRes = document.getElementsByClassName('page');
    //resizeVideos(pageRes[pageRes.length - 1].childNodes);
}

function resizeAll() {
    resizeVideos(document.getElementsByClassName('video'));
    resizePages(document.getElementsByClassName('page'));
    resizeResults();
}

function resizeResults() {
    results.style.width = pages.length * currPageWidth + 'px';
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
        removeVideos();
        loadMorePagesToArray();
        initFlag = true;
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
let currentPage = 0;


results.addEventListener("mousedown", function (downEvent) {
    startX = downEvent.clientX;
});

results.addEventListener("mousemove", function (moveEvent) {
    moveEvent.preventDefault();
});

results.addEventListener("mouseup", function (upEvent) {
    let deltaX = 0;
    deltaX = startX - upEvent.clientX;

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
                changePage(-1);
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
    results.style.transitionDuration = '1s';
    results.style.left = currX + 'px';
    setTimeout(() => results.style.transitionDuration = '0s', 1000);
});

function changePage(index) {
    if (index === 'init') {
        results.appendChild(pages[0]);
        results.appendChild(pages[1]);
        results.appendChild(pages[2]);
    }
    else if (index === -1) {
        if (currentPage > 0) {
            currentPage--;
            if (currentPage > 0) {
                results.removeChild(results.lastChild);
                results.insertBefore(pages[currentPage - 1], results.firstChild);
            }
            if (currentPage === 0) {
                currX = 0;
            } else {
                currX = -currPageWidth;
            }
        }
    } else if (index === 1) {
        if (currentPage > pages.length - 5) {
            loadMorePagesToArray();
        }
        currentPage++;
        if (currentPage > 1) {
            results.removeChild(results.firstChild);
            results.appendChild(pages[currentPage + 1]);
        }
        currX = -currPageWidth;
    }
    resizeAll();
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
                }
                initFlag = false;
                clearInterval(filler);
            }
        }
    }, 10);
}