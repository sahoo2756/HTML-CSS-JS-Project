// searchBox includes the input filed along with a btn;
const searchBox = document.querySelector('.searchBox');

// input1 represents searchBox inpput feild.
const input1 = document.querySelector('.input1');

// searchBox_AddBtn is specifically to 'Add' button element.
const searchBox_AddBtn = document.querySelector('.addBtn');

// taskBox is the mainContainer of all task which is included at run-time.
const taskBox = document.querySelector('.taskBox');

// clearAllBtn represents all the data user want to delete.
const clearAllBtn = document.querySelector('.clearAllBtn');

// pop_up_box is the mainContainer of pop-up window for clarifying the user want to delete or not 
const pop_up_box = document.querySelector('.pop-up-box');

// popUpBoxYesBtn is for 'Yes' button
const popUpBoxYesBtn = document.querySelector('.popUpBoxYesBtn');

// popUpBoxNOBtn is for 'No' button
const popUpBoxNoBtn = document.querySelector('.popUpBoxNoBtn');

// editBtns will updated continuously in adding , delting the workBox element.  
let editBtns = undefined;

// delBtns will updated continuously in adding , delting the workBox element.  
let delBtns = undefined;




// default code will run at the time page XMLHttpRequestUpload.apply.call.
if(checkLocalStorageIsEmptyOrNot() === true) {
    taskBox.innerHTML = '<h1>No Data Is Available<h1>'
    taskBox.classList.add('class_For_No_Data_Found');
}

// this function makes a single workListBox
function create_single_workListBox(work_msg) {
    const div = document.createElement('div');
    // workListBox contains css properties for 'single workList'.
    div.setAttribute('class', 'workListBox');

    div.innerHTML = `
        <h3 class="taksName">${work_msg}</h3>
        <div class="boxBtns">
            <button class="editBtn">Edit</button>
            <button class="delBtn">Delete</button>
        </div>
    `
    return div;
}

// function for get all the editBtns and delBtns from 'webPage' with Array Format in 'Global Variable'....
function reStore_EditBtns_And_DelBtns_From_Document_At_Dynamically() {
    // editBtns and delBtns is an global variable
    editBtns = Array.from(document.querySelectorAll('.editBtn'));
    delBtns = Array.from(document.querySelectorAll('.delBtn'));

    // function calling for restore the delBtns and editBtns....
    add_Again_eventListener_to_all_DelBtns();
    add_Again_eventListener_to_all_taskBox_EditBtns();

}

// adding eventListener to all delBtns.....
function add_Again_eventListener_to_all_DelBtns() {
    delBtns.forEach(delBtn => {
        delBtn.addEventListener('click', delTheData);
    })

}

// adding eventListener to all editBtns.....
function add_Again_eventListener_to_all_taskBox_EditBtns() {
    editBtns.forEach(editBtn => {
        editBtn.addEventListener('click', editTheData)
    })
}

// Default function run only once at the time of page reload for 'Extracting the data from LocalStorage and push into TaskBox Container'.
(function storeTheDefault_dataFrom_localStorage() {

    // If the data available 1st if method will execute for avoiding the 'Data Not Found msg'.  
    if (localStorage.length > 0) {
        taskBox.innerHTML = ''
        // class_For_No_Data_Found contains some css properties fro 'Data Not Found msg'
        if (taskBox.classList.contains('class_For_No_Data_Found')) {
            taskBox.classList.remove('class_For_No_Data_Found');
        }
    }
    // this is compulsory loop for 'Extracting the data from localStorage and push into taskBox'.
    for (let index = 0; index < localStorage.length; index++) {
        // key stores the UI data , hence we not need the value  
        let key = localStorage.key(index)

        const div = create_single_workListBox(key);
        // it will add a new Child of the bottom side.
        taskBox.appendChild(div);
    }

    // Restore the editBtns[] and delBtns[]
    reStore_EditBtns_And_DelBtns_From_Document_At_Dynamically();

})();


// if user click enter button on input feild then below code will execute......
input1.addEventListener('keypress', (event) => {

    if (event.code === 'Enter') {
        let tempBtn = searchBox.querySelector('button');
        if (tempBtn.textContent === 'Add') {
            storeDataIntoLocalStorage()
        } else if (tempBtn.textContent === 'Edit') {
            console.log('write the code at enter at edit btn');
        } else {
            alert('error occur at keypress event');
        }
    }
    return;
});


// when searBox Add_btn will click then storeDataIntoLocalStorage will run.
searchBox_AddBtn.addEventListener('click', storeDataIntoLocalStorage);

// storeDataIntoLocalStorage function for addBtn...
function storeDataIntoLocalStorage(event) {

    if (input1.value === '') {
        alert('Please Enter a item Name');
        return;
    }
    // though a new value will going to added that's why for removing 'could not found msg' below if statement will run if it is true.......
    if (localStorage.length == 0) {
        taskBox.innerHTML = ''
        // below if statement is for safety concern
        if (taskBox.classList.contains('class_For_No_Data_Found')) {
            taskBox.classList.remove('class_For_No_Data_Found');
        }
    }

    // localStorage.length is the value which current length & value indexing is started from 0 .
    localStorage.setItem(input1.value, localStorage.length);

    // function calling for push the new data into taskBox as a lastElement.
    pushThe_new_element_into_taskBox(input1.value);

    // Refresh the input feild for fcusing adding a new data.
    input1.value = '';
    input1.focus()

    // store in editBtns[] and delBtns[]
    reStore_EditBtns_And_DelBtns_From_Document_At_Dynamically();

    /*
         <div class="workListBox">
                <h3 class="taksName">1</h3>
                <div class="boxBtns">
                    <button class="editBtn">Edit</button>
                    <button class="delBtn">Delete</button>
                </div>
            </div>
    */

}

// function for 'push' the newly created workListBox element.
function pushThe_new_element_into_taskBox(work_msg) {
    const div = create_single_workListBox(work_msg);
    taskBox.appendChild(div);
}


// function for deleting a div elemnt
let currentClick_DelBox = undefined;
function delTheData(event) {
    // event.target returns the current click delBtn element
    currentClick_DelBox = event.target;
    // below code is wriiten for show pop-up-box for delete 'conformation'.....
    if (pop_up_box.classList.contains('inactive')) {
        pop_up_box.classList.remove('inactive');
        input1.value = ''

        // Documentation :- It may possiable before clicking on delete on edit btn has been clicked. If it is true , then some problem may occur these are :-  single div (.workListBox) will be deleted easily  but changes in input feild and edit btn in place of add btn (in searchbox) these are not be changes if we simple delete the button. That's why we are taking 1 step to check if edit has been clicked or not.
        let boolean = check_If_WorkListEditBtn_Is_Clicked_Or_Not();
        if(boolean === true) {
             // below code is used to correct the inputfeild and searchBox btn if 'workList div' Edit button  is clicked and at that same time delete has been clicked.
            input1.value = '';
            input1.classList.remove('placeHolder-green-color');

            // below code is for replace searhBox Edit btn with searchBox Add btn.
            let tempButton = searchBox.querySelector('.searBoxBtnClass');
            searchBox.replaceChild(searchBox_AddBtn , tempButton);
        }

    } else {
        alert('some error occur in delTheData()');
    }

}

// below function is used to check workList edit button is clicked or not.
function check_If_WorkListEditBtn_Is_Clicked_Or_Not() {
    // '.searBoxBtnClass' is a common class which will attach with Add and Edit button in searchBox. That's why it is an efficient way to get the searchBox button , It doesn't matter it is an Add or Eidt btn.
    let tempBtn = searchBox.querySelector('.searBoxBtnClass');

    // If input1 Element contain this 'placeHolder-green-color' class then it is 100% sure that edit btn has been clicked.
    let booleanOne = input1.classList.contains('placeHolder-green-color');

    // edit-Btn is special class which is attach with Edit btn not with Add btn in 'SearchBox'...
    let booleanTwo = tempBtn.classList.contains('edit-Btn');

    // If both booleanOne & booleanTwo are 'true' , it means editBtn has been clicked for editing Data.  

    return (booleanOne === true) && (booleanTwo === true)
}

// event will be listen when pop-up-box yes btn is clicked
popUpBoxYesBtn.addEventListener('click', (event) => {
    // .inactive class contains css property is display:none;
    pop_up_box.classList.add('inactive');

    // currentClick_DelBox contains current clicked delet btn like <button class="delBtn">Delete</button>
    if (currentClick_DelBox === undefined) {
        alert('error occur in popBoxYesBtn.addEventListener()');
        return;
    }

    try{
        // taskBox is the container of all workList
        // currentClick_DelBox.parentNode.parentNode;  <div class="workListBox" >.....</div>
        taskBox.removeChild(currentClick_DelBox.parentNode.parentNode)
        reStore_EditBtns_And_DelBtns_From_Document_At_Dynamically()
       
        // key is string....
        let key = (currentClick_DelBox.parentElement.parentElement).querySelector('.taksName').textContent;
        localStorage.removeItem(key);
                                                     
    } catch(error) {
        console.warn('error occur at popUpBoxYesBtn.addEventListener() catch block')
        alert('error occur at popUpBoxYesBtn.addEventListener() catch block')
    }
   
})

// event will be listen when pop-up-box No btn is clicked
popUpBoxNoBtn.addEventListener('click', (event) => {
    if(pop_up_box.classList.contains('active')){
        pop_up_box.classList.add('inactive');
    } else {
        console.warn('pop-up-box does not contain any inactive class ===> msg from popUpBoxNoBtn.addEventListener()');
    }
});

// clearAllBtn for delete all the from localStorage as well as from UI
clearAllBtn.addEventListener('click', () => {
    if (localStorage.length === 0) {
        alert('No Data Is Available');
        return;
    }
    localStorage.clear();
    if(checkLocalStorageIsEmptyOrNot() === true) {
        taskBox.innerHTML = '<h1>No Data Is Available<h1>'
        taskBox.classList.add('class_For_No_Data_Found');
    }
    editBtns = null;
    delBtns = null;
});

// function will check localStorage is empty or not.
function checkLocalStorageIsEmptyOrNot() {
    if (localStorage.length === 0) {
        return true;
    } else {
        return false;
    }
}

// function for when user want to edit the data.
function editTheData(workList_EditBtn_Event) {
    // workList_EditBtn_Event.target; # <button>edit</button>
    // parentOfTextNode ; #  <div class="workListBox">.....</div>
    const parentOfTextNode = workList_EditBtn_Event.target.parentNode.parentNode;

    // textNode = <h3 class="taksName">text</h3>
    const textNode = parentOfTextNode.querySelector('.taksName');

    //below code for input1 feild decoration.
    input1.setAttribute('placeholder', 'Enter The new Item Name');
    input1.focus();
    input1.classList.add('placeHolder-green-color');


    const  newSearchBox_EditBtn_Element = replaceSearchBox_AddBtn_to_EditBtn();
    const newWorkListBox_CancelBtn = replace_WorkListBox_EditBtn_to_CancelBtn(); 
   

    // This will run when a user click on 'editSubmit searhBox button' for upload the new data.
    newSearchBox_EditBtn_Element.addEventListener('click', () => {
        if (input1.value === '') {
            alert('Please Enter a new Item Name');
            return;
        }
        textNode.textContent = input1.value;
        input1.value = '';
        input1.classList.remove('placeHolder-green-color');
        searchBox.replaceChild(searchBox_AddBtn, newSearchBox_EditBtn_Element);
        // newWorkListBox_CancelBtn.parentElement;  <div class="boxBtns">....</div>
        newWorkListBox_CancelBtn.parentElement.replaceChild(workList_EditBtn_Event.target, newWorkListBox_CancelBtn)

        return;
    })

    newWorkListBox_CancelBtn.addEventListener('click', () => {
        // input1.blur() is a function which helps to remove the focus() on input feild
        input1.blur();
        input1.value = '';
        input1.classList.remove('placeHolder-green-color');

        // newWorkListBox_CancelBtn.parentElement;  <div class="boxBtns">....</div>
        newWorkListBox_CancelBtn.parentElement.replaceChild(workList_EditBtn_Event.target, newWorkListBox_CancelBtn);
        // replaceChild(new btn , exiting btn);
        searchBox.replaceChild(searchBox_AddBtn, newSearchBox_EditBtn_Element);
    })
}

function  replaceSearchBox_AddBtn_to_EditBtn() {
    const newSearchBox_EditBtn_Element = create_NewSearchBox_EditBtn();
    // searchBox contains a input feild and a button....
    searchBox.replaceChild(newSearchBox_EditBtn_Element, searchBox_AddBtn);

    return newSearchBox_EditBtn_Element;
}
function create_NewSearchBox_EditBtn() {
    const newSearchBox_EditBtn_Element = document.createElement('button');
    newSearchBox_EditBtn_Element.innerHTML = 'Edit';
    newSearchBox_EditBtn_Element.setAttribute('class', 'searBoxBtnClass edit-Btn');

    return newSearchBox_EditBtn_Element;
}

function replace_WorkListBox_EditBtn_to_CancelBtn() {
    const newWorkListBox_CancelBtn = create_NewWorkListBox_CancelBtn();
    // workList_EditBtn_Event.target.parentNode ;  <div class="boxBtns">....</div>
    workList_EditBtn_Event.target.parentNode.replaceChild(newWorkListBox_CancelBtn, workList_EditBtn_Event.target);

    return newWorkListBox_CancelBtn;
}
function create_NewWorkListBox_CancelBtn() {
    const newWorkListBox_CancelBtn = document.createElement('button');
    newWorkListBox_CancelBtn.innerHTML = 'Cancel';
    newWorkListBox_CancelBtn.style.color = 'blue';

    return newWorkListBox_CancelBtn;
}
