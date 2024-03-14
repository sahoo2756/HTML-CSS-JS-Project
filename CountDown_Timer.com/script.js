const input_Text_Feild = document.getElementsByTagName("input");

let endDate = "17 May 2024 1:49 pm";
let end = new Date(endDate);



let fix_Clock = ()=>{
    let now = new Date();
    let diff = (end - now ) / 1000;

    if(diff < 0){
        clearInterval(clock_interval);
        return
    } 
    
    let days = Math.floor(diff / 3600 / 24);
    let hours = Math.floor((diff / 3600) % 24);
    let miniute = Math.floor(diff / 60 % 60);
    let second = Math.floor(diff  % 60);


    input_Text_Feild[0].value = days;
    input_Text_Feild[1].value = hours;
    input_Text_Feild[2].value = miniute;
    input_Text_Feild[3].value = second;

}

fix_Clock();


let clock_interval = setInterval(fix_Clock , 1000);


/*
    1 day = 24hours
    1 hours = 60min
    60min = 3600 sec
    1 min = 60 sec
*/