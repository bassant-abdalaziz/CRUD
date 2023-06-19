let userNameInput = document.getElementById("userName");
let userEmailInput = document.getElementById("email");
let userMobileInput = document.getElementById("mobile");
let userPasswordInput = document.getElementById("password");
let myButton = document.getElementById("btn");
let searchBar = document.getElementById("search");
myButton.addEventListener("click", adduser);

let mood = 'add';
let temp;

//Create User
let dataUser;
if (localStorage.user != null) {
    dataUser = JSON.parse(localStorage.getItem('user'))
}
else {
    dataUser = [];
}

function adduser() {

    if (userNameInput.value == "" || userEmailInput.value == " " || userMobileInput.value == "" || userPasswordInput.value == "") {
        alert("Please Fill Inputs")
    }

    else {
        let newUser = {
            userName: userNameInput.value.toLowerCase(),
            userEmail: userEmailInput.value,
            userMobile: userMobileInput.value,
            userPassword: userPasswordInput.value
        }
        if (mood === 'add') {
            dataUser.push(newUser)
        }
        else {
            dataUser[temp] = newUser
            mood = 'add'
            myButton.innerHTML = 'add user';
        }

        localStorage.setItem('user', JSON.stringify(dataUser))
        console.log(dataUser);
        clearForm()
        displayUser()
    }
}

//Clear Data
function clearForm() {
    userNameInput.value = "";
    userEmailInput.value = "";
    userMobileInput.value = "";
    userPasswordInput.value = "";
}


// Display User Data
function displayUser() {
    let tableData = '';
    for (let i = 0; i < dataUser.length; i++) {
        tableData += `<tr>

        <td>${i + 1}</td>
        <td>${dataUser[i].userName}</td >
        <td> ${dataUser[i].userEmail}  </td>
        <td>  ${dataUser[i].userMobile} </td>
        <td> ${dataUser[i].userPassword}  </td>
        
        <td><button onclick="updateUser(${i})" class="btn btn-outline-warning">update</button></td>
        <td><button onclick="deleteUser(${i})" class="btn btn-outline-danger">delete</button></td>

        <tr>`
    }
    document.getElementById("tableBody").innerHTML = tableData;

    //Create Button Delete All Users
    let btnDeleteAll = document.getElementById("deleteAll");
    if (dataUser.length > 0) {
        btnDeleteAll.innerHTML = `
        <button onclick="deleteAll()" class="btn btn-danger">delete all </button>
        `
    }
    else {
        btnDeleteAll.innerHTML = '';
    }
}

displayUser()


//Delete User
function deleteUser(i) {
    dataUser.splice(i, 1);
    localStorage.user = JSON.stringify(dataUser);
    displayUser()
}

//Delete All Users
function deleteAll() {
    localStorage.clear()
    dataUser.splice(0)
    displayUser()
}


//Update User
function updateUser(i) {
    userNameInput.value = dataUser[i].userName
    userEmailInput.value = dataUser[i].userEmail
    userMobileInput.value = dataUser[i].userMobile
    userPasswordInput.value = dataUser[i].userPassword

    myButton.innerHTML = 'update';
    mood = 'update';
    temp = i;

    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

//Search
searchBar.addEventListener("input", searchData)
function searchData() {
    let value = searchBar.value.toLowerCase();
    console.log(value);

    let tableData = '';
    for (let i = 0; i < dataUser.length; i++) {

        if (dataUser[i].userName.includes(value)) {
            // console.log(i);

            tableData += `<tr>

            <td>${i + 1}</td>
            <td>${dataUser[i].userName}</td >
            <td> ${dataUser[i].userEmail}  </td>
            <td>  ${dataUser[i].userMobile} </td>
            <td> ${dataUser[i].userPassword}  </td>

            <td><button onclick="updateUser(${i})" class="btn btn-outline-warning">update</button></td>
            <td><button onclick="deleteUser(${i})" class="btn btn-outline-danger">delete</button></td>

            <tr>`

        }
        document.getElementById("tableBody").innerHTML = tableData;
    }
}
