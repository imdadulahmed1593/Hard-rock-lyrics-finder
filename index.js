const baseUrl = 'https://api.lyrics.ovh/suggest/';

const searchBox = document.querySelector("#search-input");

document.querySelector('.search-btn').addEventListener('click', function () {
    const searchValue = searchBox.value;
    const url = `${baseUrl}${searchValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data));


});
searchBox.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        const searchValue = searchBox.value;
        const url = `${baseUrl}${searchValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data));
    }

})


function displayResult(data) {
    const display = document.querySelector(".display-result");
    console.log(data);
    display.innerHTML = '';

    for (let i = 0; i < 10; i++) {

        display.innerHTML +=
            `<div class="single-result row align-items-center my-3 p-3">
            <div class="img-result">
                <img class="px-3" src="${data.data[i].album.cover_small}" alt="album cover">
                <div>
                <h3 class="lyrics-name">${data.data[i].title}</h3>
                <p class="author lead">Album by <span>${data.data[i].artist.name}</span></p>
                </div>
            </div>
            <div class="text-md-right text-center">
                <button class="get-lyric-btn btn btn-success">Get Lyrics</button>
            </div>
        </div>`;
    }
    searchBox.value = '';

    const numOfLyricBtn = document.querySelectorAll('.get-lyric-btn').length;
    console.log(numOfLyricBtn)
    for (let i = 0; i < numOfLyricBtn; i++) {
        document.querySelectorAll('.get-lyric-btn')[i].addEventListener('click', function () {
            const title = data.data[i].title;
            const artist = data.data[i].artist.name;
            console.log(title, artist);
            fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const lyric = document.querySelector(".lyric");
                    const lyricsHeader = document.querySelector(".lyrics-header");
                    lyricsHeader.innerText = `${artist} - ${title}`;
                    if (data.lyrics) {
                        lyric.innerText = `${data.lyrics}`;
                    }
                    else {

                        lyric.innerText = `${data.error}`;
                        alert(`${data.error}`);
                    }
                });
        });
    }
}




