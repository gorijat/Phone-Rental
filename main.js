let textAreas = document.querySelectorAll('textarea');
let mainArea = document.querySelector('.main-area');
let currentPlayerName = '';
 let direction = ['start','end'];
 let flexBool = true;

textAreas.forEach(area => area.addEventListener('keyup',placeMessage));

function placeMessage(e){
if (e.key === "Enter") {
    let message = this.value;
    let playerName = this.id.split('-')[0];
    if (playerName !== currentPlayerName) {
        flexBool = !flexBool;
        currentPlayerName = playerName
    }

    mainArea.innerHTML += `
    <div class="row" style = "justify-content: ${direction[+flexBool]}">
        <div class="card">
        <p id="move">${playerName}</p>
        <p>${message}</p>
        </div>
    </div>
    `.trim();
    mainArea.scrollTop = mainArea.scrollHeight;
    this.value = "";
}
}