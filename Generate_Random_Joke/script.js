const jokeContainer = document.getElementById('jokeText');
const btn = document.getElementById('generateJokeBtn');
const macBackBtn = document.querySelector('#mainContainer #mac-back-btn');
const macForwardBtn = document.querySelector('#mainContainer #mac-forward-btn');
const macCurrentBtn = document.querySelector('#mainContainer #mac-current-btn');
const updateCurrentJoke = document.querySelector('#updateJokeCount #currentJokeDiv #updateCurrentJoke');
const updateTotalJoke = document.querySelector('#updateJokeCount #totalJokeDiv #updateTotalJoke');


const url = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,explicit';

// localStorage object stores all the jokes.
let localStorage = {};
let currentObjIndex = 1;
let forwardIndex = 1;
let backwardIndex = 1;

const getJoke = async () => {
    const respose = await fetch(url);
    const finalJsonData = await respose.json();

    
    jokeContainer.textContent = apiValue(finalJsonData);
    localStorage[currentObjIndex] = apiValue(finalJsonData);

    updateTotalJoke.textContent = currentObjIndex;
    updateCurrentJoke.textContent = currentObjIndex;

    console.log(currentObjIndex);
    currentObjIndex++;

}

function apiValue(finalJsonData) {
    return (finalJsonData.joke === undefined) ?  finalJsonData.setup : finalJsonData.joke; 
}


getJoke();

btn.addEventListener('click' , getJoke);


function gettingCurrentLocalStorageIndex() {
    for (const key in localStorage) {
          if(localStorage[key] === jokeContainer.textContent) {
             return Number(key);  // key as index
          }
    }
    return -1;
}


macBackBtn.addEventListener('click' , ()=> {
    const  key = gettingCurrentLocalStorageIndex();
      console.log('key ' , key);
      if(key <= 1) {
        alert('No Previous joke is available')
     } else {
        jokeContainer.textContent = localStorage[key-1];
        updateCurrentJoke.textContent = key - 1;
     }

})

macForwardBtn.addEventListener('click' , ()=>{
    const  key = gettingCurrentLocalStorageIndex();
    console.log(key , currentObjIndex ,  typeof key);
    // because allways currentObjIndex is higher+1 
    if(key < currentObjIndex) {
        alert('Please click on "Generate a Joke button"')
        return;
    }
    jokeContainer.textContent = localStorage[key + 1];
    updateCurrentJoke.textContent = key + 1;

})


macCurrentBtn.addEventListener('click' , ()=>{
    const value1 = jokeContainer.textContent;
    const value2 = localStorage[currentObjIndex - 1];

    if(value1 === value2) {
        alert('For more please click on the "Generate A Joke Button"')
        return;
    }

    jokeContainer.textContent = localStorage[currentObjIndex - 1]
    updateCurrentJoke.textContent = currentObjIndex -1;

})

