//VIEWS
let usersView = document.querySelector('#users-view');
let newRentView = document.querySelector('#add-rent-view')
let usersTbody = usersView.querySelector('tbody');

//BUTTONS
let usersTableBtn = document.querySelector('#users-view-btn');
let newRentBtn = document.querySelector('#new-rent-view-btn');
let saveBtn = document.querySelector('#saveBtn');

//INPUT
let newUsersId = document.querySelector('#id');
let newUserUser = document.querySelector('#user');
let newUserPhone = document.querySelector('#phone');
let newUserProvider = document.querySelector('#provider');
let newUserStartDate = document.querySelector('#startDate');
let newUserEndDate = document.querySelector('#endDate');

//Listeners
usersTableBtn.addEventListener('click',displayUsersView);
newRentBtn.addEventListener('click',displayNewRentView);
saveBtn.addEventListener('click',createNewTable);

//Pick value from user and create table dinamic
function createNewTable(){
    let obj = {
         id: newUsersId.value,
         user: newUserUser.value,
         phone: newUserPhone.value,
         provider: newUserProvider.value,
         startDate: newUserStartDate.value,
         endDate : newUserEndDate.value
    
    }
    db.push(obj);
    createUsersTable();
    displayUsersView();

    newUsersId.value = "";
    newUserUser.value = "";
    newUserPhone.value = "";
    newUserProvider.value = "";
    newUserStartDate.value = "";
    newUserEndDate.value = "";
    
}

function displayUsersView(e){
    if (e) {
        e.preventDefault();
    }
    newRentView.style.display = "none";
    usersView.style.display = "block"
}

function displayNewRentView(e){
    e.preventDefault();
    usersView.style.display = "none";
    newRentView.style.display = "block"; 
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