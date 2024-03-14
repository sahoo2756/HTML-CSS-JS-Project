const h3 = document.querySelector("h3");
const button = document.querySelector("button");


let getColor = ()=>{
    let hexCode = Math.floor(Math.random() * 16777215);
    hexCode = '#' + hexCode.toString(16);
    
    h3.innerHTML = hexCode;
    document.body.style.backgroundColor = hexCode;

}

button.addEventListener('click' , getColor);
getColor();
