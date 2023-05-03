//VIEWS
let usersView = document.querySelector('#users-view');
let newRentView = document.querySelector('#add-rent-view')
let usersTbody = usersView.querySelector('tbody');
let editDeleteView = document.querySelector('#edit-delete-view');
let editDeleteTbody = editDeleteView.querySelector('tbody');
let editRentView = document.querySelector('#edit-rent-view');

//FORMS
let phoneSelect = document.querySelector('#phone-select');
let providerSelect = document.querySelector('#provider-select');
let inputId = document.querySelector('#id');
let inputUser = document.querySelector('#user');
let inputStartDate = document.querySelector('#startDate');
let inputEndDate = document.querySelector('#endDate');

let ephoneSelect = document.querySelector('#ephone-select');
let eproviderSelect = document.querySelector('#eprovider-select');
let einputId = document.querySelector('#eid');
let einputUser = document.querySelector('#euser');
let einputStartDate = document.querySelector('#estartDate');
let einputEndDate = document.querySelector('#eendDate');

//BUTTONS
let usersTableBtn = document.querySelector('#users-view-btn');
let newRentBtn = document.querySelector('#new-rent-view-btn');
let saveBtn = document.querySelector('#saveBtn');
let esaveBtn = document.querySelector('#esaveBtn');
let editDeleteBtn = document.querySelector('#edit-delete-btn');


//Listeners
usersTableBtn.addEventListener('click',displayUsersView);
newRentBtn.addEventListener('click',displayNewRentView);
saveBtn.addEventListener('click',saveNewRent);
editDeleteBtn.addEventListener('click',displayEditDeleteView);
esaveBtn.addEventListener('click',editRentAccount);

function editRentAccount(){
    let id = this.getAttribute('data-id');
    let currentUser = db.find(user=> user.id === id);
    currentUser.user = einputUser.value;
    currentUser.phone = ephoneSelect.value;
    currentUser.provider = eproviderSelect.value;
    currentUser.startDate = einputStartDate.value;
    currentUser.endDate = einputEndDate.value;
    createUsersTable();
    displayUsersView();
}

//Generise Id
function generateId(){
   let rand;
   let unique = false;
   while(!unique){
       unique = true;
       rand = Math.floor(Math.random()*10000);
       db.forEach(user=>{
        if (parseInt(user.id) === rand) {
            unique = false;
        }
       })
   }
   return rand.toString(); //whitout this toString() dont work
}

//Pick value from user and create table dinamic
function saveNewRent(){
    let newRent = {
         id: generateId(),//inputId.value,
         user: inputUser.value,
         phone: phoneSelect.value,
         provider: providerSelect.value,
         startDate: inputStartDate.value,
         endDate : inputEndDate.value
    
    }
    db.push(newRent);
    createUsersTable();
    displayUsersView();
    //inputId.value = "";
    inputUser.value = "";
    phoneSelect.value = "";
    providerSelect.value = "";
    inputStartDate.value = "";
    inputEndDate.value = "";
    
}

function displayUsersView(e){
    if (e) {
        e.preventDefault();
    }
    editRentView.style.display = "none";
    newRentView.style.display = "none";
    editDeleteView.style.display = "none";
    usersView.style.display = "block";
}

function displayNewRentView(e){
    e.preventDefault();
    createPhoneOptions();
    createProviderOptions();
    editRentView.style.display = "none";
    usersView.style.display = "none";
    editDeleteView.style.display = "none";
    newRentView.style.display = "block"; 
}

function displayEditDeleteView(e){
    if (e) {
        e.preventDefault();
    }
    createEditDeleteTable();
    editRentView.style.display = "none";
    newRentView.style.display = "none";
    usersView.style.display = "none";
    editDeleteView.style.display = "block";
}

function displayEditView(e){
    if (e) {
        e.preventDefault();
    }
    let id = this.getAttribute('data-id');
    esaveBtn.setAttribute('data-id',id);
    let currentUser = db.find(user=> user.id === id);
    fillEditForm(currentUser);

    newRentView.style.display = "none";
    editDeleteView.style.display = "none";
    usersView.style.display = "none";
    editRentView.style.display = "block";
}
function fillEditForm(currentUser){
     einputId.value = currentUser.id;
     einputUser.value = currentUser.user;
     createEditPhoneOptions(currentUser.phone);
     createEditProviderOptions(currentUser.provider);
     einputStartDate.value = currentUser.startDate;
     einputEndDate.value = currentUser.endDate;
}

//Table view with edit and delete button
function createEditDeleteTable(){
    let text = ``;
    db.forEach((user,index) =>{
        text+= `
        <tr>
            <td>${user.id}</td>
            <td>${user.user}</td>
            <td>${user.phone}</td>
            <td>${user.provider}</td>
            <td>${user.startDate}</td>
            <td>${user.endDate}</td>
            <td><button class="btn btn-warning btn-sm edit-btns" data-id="${user.id}">Edit</button>
                <button class="btn btn-danger btn-sm delete-btns" data-id="${user.id}">Del</button>
            </td>

        </tr>
        `.trim();
    })
    editDeleteTbody.innerHTML = text;
    let allDeleteBtns = document.querySelectorAll('.delete-btns'); //we can select only after code above
    let allEditBtns = document.querySelectorAll('.edit-btns');
    allDeleteBtns.forEach((btn,index)=>{
        btn.addEventListener('click',deleteUser);
        allEditBtns[index].addEventListener('click',displayEditView);
    })
}
//delete means to remove from our array, in this case db
function deleteUser(){
    let id = this.getAttribute("data-id");
    db = db.filter(user => user.id !== id);
    createUsersTable();
    displayUsersView();
}

//create phone options
function createPhoneOptions(){
    let text = ``;
    allPhones.forEach(phone=>{
        text+=`
        <option value="${phone}">${phone}</option>
        `.trim();
    })
        phoneSelect.innerHTML = text;
}
function createEditPhoneOptions(currentPhone){
    let text = ``;
    allPhones.forEach(phone=>{
        text+=`
        <option value="${phone}" ${(phone === currentPhone) ? "selected":""}>${phone}</option>
        `.trim();
    })
        ephoneSelect.innerHTML = text;
}

//create provider options
function createProviderOptions(){
    let text =``;
    allProviders.forEach(provider=>{
        text+=`
        <option value="${provider}">${provider}</option>
        `.trim();
    })
    providerSelect.innerHTML = text;
}

function createEditProviderOptions(currentProvider){
    let text =``;
    allProviders.forEach(provider=>{
        text+=`
        <option value="${provider}" ${(provider === currentProvider) ? "selected":""}>${provider}</option>
        `.trim();
    })
    eproviderSelect.innerHTML = text;
}


createUsersTable();
//this function create body on users table, 
function createUsersTable(){
    let text = ``;
    db.forEach(user =>{
        text+= `
        <tr>
            <td>${user.id}</td>
            <td>${user.user}</td>
            <td>${user.phone}</td>
            <td>${user.provider}</td>
            <td>${user.startDate}</td>
            <td>${user.endDate}</td>
        </tr>
        `.trim();
    })
    usersTbody.innerHTML = text;
}