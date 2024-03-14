const searchBox = document.querySelector('#searchBox');
const SearchBarSubmitBtn = document.querySelector('#searchBoxSubmitBtn')
const dictionary_Details = document.querySelector("#dict-details");
// const wordName = document.querySelector('#word');
// const verb = document.querySelector('#verb');
// const def = document.querySelector('#definitionBox #def');
// const moreDefBtn = document.querySelector('#definitionBox #moreDefBtn');
// const refWeb_aTag = document.querySelector('#More_From_Web_Link');

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
var def_index = 1;

SearchBarSubmitBtn.addEventListener('click', fetchDataFromAPI);

searchBox.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        SearchBarSubmitBtn.style.backgroundColor = '#783fc7'
        fetchDataFromAPI()

        setTimeout(()=>{
            SearchBarSubmitBtn.style.backgroundColor = '#a53fc7'

        } , 1000)

    }
    return;
});
var output;
let response;

async function fetchDataFromAPI() {
    if (searchBox.value === '') {
        alert('Enter a wordName');
        return;
    }
    try {

        dictionary_Details.innerHTML = '<h2 class="error">Fetching The Data .....</h2>'
        // dictionary_Details.innerHTML = '<img id="spinner" src="spinner.gif" alt="" srcset="">'
        def_index = 1;


        response = await fetch(url + searchBox.value);
        if (response.ok === false) {
            throw new Error('https error')
        }
        response = await response.json();
        showTheAPIContent(response);

        output = response;
    } catch (bug) {
        dictionary_Details.innerHTML = `<h2 class='error'>Couldn't Found <span class='border-bottom'>'${searchBox.value}'</span > Word</h2>`;
    }
}


function showTheAPIContent(response) {
    dictionary_Details.innerHTML = `
    <button id="audioBtn"><i class="ri-volume-up-line" id="audio"></i></button>       
    <h2 id="word">${response[0].word}</h2>
    <p id="verb">${response[0].meanings[0].partOfSpeech} ${response[0].phonetics[0].text}</p>
    <div id="definitionBox">
        <p id="def"><span style="color: #0145e4;">Definition :-</span> <br> ${response[0].meanings[0].definitions[0].definition}</p>
        <button id="moreDefBtn">More Def</button>
    </div>
            
    <a id="More_From_Web_Link" target="_blank" href='${response[0].sourceUrls[0]}'>More_From_Web_Link</a>
    `
    const moreDefBtn = document.querySelector('#moreDefBtn')
    const def = document.querySelector('#definitionBox #def');
    const audioItag = document.getElementById('audio');
    const audioItagParent = document.getElementById('audioBtn');

    moreDefBtn.addEventListener('click', function () {
        let totalDefLength = response[0].meanings[0].definitions.length;

        if (response === undefined) {
            alert("Please a enter a word in searchBox")
            return;
        } else if (def_index < totalDefLength && def_index >= 0) {
            def.innerHTML = `<span style="color: #0145e4;">Definition :-</span> <br> ${response[0].meanings[0].definitions[def_index].definition}`;
            def_index++;
        } else {
            alert('No Other Definition is available')
        }
    })

    // Play the eaudio
    audioItag.addEventListener('click', () => {

        let audioURL;
        response[0].phonetics.forEach(elem => {
            if (elem.audio !== '') {
                audioURL = elem.audio;
                return;
            }
        })
        const audio = document.createElement('audio');
        const source = document.createElement('source');
        source.src = audioURL;
        audio.appendChild(source)

        audio.play()
    })

}




