const input = document.querySelector('input');
const calculateBtn = Array.from(document.querySelectorAll('.calculateBtn'));
const equalBtn = document.querySelector('#equalBtn');
const acBtn = document.querySelector('#btnGroup div:nth-child(1) #ACbtn')
const delBtn = document.querySelector('#btnGroup div:nth-child(1) #DELbtn')

console.log(delBtn);

calculateBtn.forEach((key) => {
    key.addEventListener('click' , doCalculation)
})

function doCalculation(event) {
    const clickBtn = event.target;
    const clickBtnText = clickBtn.textContent;;
    if(clickBtnText !== '=' && clickBtnText !== 'AC' && clickBtnText !== 'DEL' && clickBtnText !== '%' ){
        input.value += clickBtnText;
    }

}

equalBtn.addEventListener('click' , () => {
    if(input.value === '') {
        alert('No calculation found.......');
        return;
    }
    input.value = eval(input.value);    
})

// AC :- All CLear 
acBtn.addEventListener('click', () => {input.value = ''});

// DEL :- Move backward 1 step
delBtn.addEventListener('click' , () => {
    const str = input.value;
    input.value = str.substring(0 , str.length - 1);
    console.log(str.length);
    return;
})

