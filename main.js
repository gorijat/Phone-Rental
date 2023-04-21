//VIEWS
let usersView = document.querySelector('#users-view');
let newRentView = document.querySelector('#add-rent-view')
let usersTbody = usersView.querySelector('tbody');

//BUTTONS
let usersTableBtn = document.querySelector('#users-view-btn');
let newRentBtn = document.querySelector('#new-rent-view-btn');

//Listeners
usersTableBtn.addEventListener('click',displayUsersView);
newRentBtn.addEventListener('click',displayNewRentView);

function displayUsersView(e){
    e.preventDefault();
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