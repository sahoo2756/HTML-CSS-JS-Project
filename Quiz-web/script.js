const start_btn = document.getElementById("start-quiz");
const quiz_box  = document.querySelector(".quiz-box");
const quiz_box_h2 = quiz_box.querySelector("h2");
const options_box = document.getElementsByClassName("option-box");
const next_btn = document.getElementById("next-question");
const x_of_5_Question_text = document.getElementById("x of 5 Question");
const result = document.querySelector(".result");
const Again_Quiz = result.querySelector(".result-footer .Again-Quiz");
const exit =  result.querySelector(".result-footer .exit");

const right_answer_tag = result.querySelector(".right-ans");
const wrong_answer_tag = result.querySelector(".wrong-ans");
const percentage_answer_tag = result.querySelector(".percentage-ans");




var question_index = 0;

var right_answer = 0;
var wrong_answer = 0;

var  submit_ans = false; 




start_btn.onclick = ()=>{
    start_btn.classList.add("inactive");
    show_question(question_index);
    quiz_box.classList.remove("inactive");

}

next_btn.onclick= ()=> {
    if(submit_ans == false){
        alert("Please Submit Your Answer");
    } else {
        submit_ans = false;
        pointer_disabled(false);
        // this method for disabled red ans green back-ground color of answer
        remove_correct_wrong_class_from_option_box();
        change_question_count(question_index + 2);
    
        question_index++;
        if(question.length > question_index){
            show_question(question_index);
        } else if(question.length == question_index){
               quiz_box.classList.add("inactive"); 
               result.classList.remove("inactive");
               Show_Result();
    
        }

    } // else end
}

function change_question_count(number) {

    x_of_5_Question_text.innerHTML = number + " of 5 Question";
}

function Show_Result() {
    let  percentage = 100 / 5;
    percentage = right_answer * percentage; 
        right_answer_tag.innerHTML = right_answer;
        wrong_answer_tag.innerHTML = wrong_answer;
        percentage_answer_tag.innerHTML = percentage + "%";

}

let show_question = (question_index)=> { 
    let values_option = " ";

    values_option = question[question_index].Question;
    quiz_box_h2.innerHTML = values_option;

    for(let i = 0; i<question[question_index].options.length; i++) {
        values_option = question[question_index].options[i];
        options_box[i].innerHTML = values_option;
    }
}

// script for option-box class

for(let i=0; i<question[0].options.length; i++) {
    options_box[i].setAttribute("onclick" , "check_ans(this)");
}

let check_ans = (id)=>{
    submit_ans = true;
    pointer_disabled(true);
  
    let correct_ans = question[question_index].ans;
    if(correct_ans == id.innerHTML) {
        id.classList.add("back-green");
        right_answer++;
    } else {
        wrong_answer++;
        for(let i=0; i<4; i++) {
            if(options_box[i].innerHTML == correct_ans){
                options_box[i].classList.add("back-green");
                id.classList.add("back-red");
                break;
            }
        }
    } // else end

}
function remove_correct_wrong_class_from_option_box(){
    for(let i = 0; i<4; i++) {
        let short = options_box[i].classList;
        let no = short.contains("back-green") ? 0 : (short.contains("back-red") ? 1 : 2);
        
        if(no == 0){
            short.remove("back-green");
        } else if(no == 1) {
            short.remove("back-red");
        }
    }
}

function pointer_disabled(bool) {
    if(bool ===  true){
        for(let i=0; i<4; i++) {
            options_box[i].classList.add("pointer-inactive");
        }
    } else {
        for(let i=0; i<4; i++) {
            options_box[i].classList.remove("pointer-inactive");
        }
    }
}

// script for option-box class END


// Result 

Again_Quiz.onclick= ()=>{
    result.classList.add("inactive");
    question_index = 0;
    show_question(question_index)
    change_question_count(1);
    quiz_box.classList.remove("inactive");
    console.log(question_index)
    // location.reload()

}

exit.onclick = ()=>{
    location.reload()
}
