const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value;  //Get user entered data
    if(userData.trim() != 0){       //If user value aren't only spaces
        addBtn.classList.add("active");    //Activate the button
    } else{
        addBtn.classList.remove("active");    //Inactivate the button
    }
} 

showTasks();  //Calling showTasks function

//User click on button "+"
addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");     //Getting localstorage access
    if (getLocalStorage == null){
        listArr = [];           //Create blank array
    } else{
        listArr = JSON.parse(getLocalStorage); //Transforming JSON string into JS object
    }
    listArr.push(userData);          //Push user data
    localStorage.setItem("New Todo", JSON.stringify(listArr));    //Transforming JS object into JSON string
    showTasks();  //Calling showTasks function
    addBtn.classList.remove("active");    //Inactivate the button
}

// Function to add task list inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");     //Getting localstorage access
    if (getLocalStorage == null){
        listArr = [];           //Create blank array
    } else{
        listArr = JSON.parse(getLocalStorage); //Transforming JSON string into JS object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;    //Passing the length value in pendingNumb
    if(listArr.length > 0){
        deleteAllBtn.classList.add("active");
    } else{
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick= "deleteTask(${index});" ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;    //Adding new li tag inside ul tag
    inputBox.value = "";      //Once task added leave the input field blank
}

//Delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);   //delete or remove particular indexed li
    //After remove the li again update the localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArr));  
    showTasks();  //Calling showTasks function
}

//Delete all tasks function
deleteAllBtn.onclick = () => {
    listArr = [];   //Empty the arr
    //After delete all tasks again update the localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArr));  
    showTasks();  //Calling showTasks function
    
}
