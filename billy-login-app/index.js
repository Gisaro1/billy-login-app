const container = document.querySelector('.container');
const removeBtn = document.querySelector('.removebox');

function saveBoxes(){
    const containers = document.querySelectorAll('.box');
    const savedboxes = [];
    containers.forEach(box =>{
        savedboxes.push(box.textContent);
    })
    localStorage.setItem('boxes', JSON.stringify(savedboxes));
}

function reloadBoxes(){
    const allSaved = localStorage.getItem('boxes');
    if(!allSaved) return;
    const savedboxes = JSON.parse(allSaved);
    const allboxesExist = container.querySelectorAll('.box');
    allboxesExist.forEach(box => box.remove());
    savedboxes.forEach(boxText => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.textContent = boxText;
        container.appendChild(box);
    });
    removeVisibility();
}

function removeVisibility() {
    const boxCount = document.querySelectorAll('.box').length;
    if (boxCount > 0) {
        removeBtn.classList.remove('hidden');
    } else {
        removeBtn.classList.add('hidden');
    }
}
function addBox() {
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = container.children.length + 1;
    container.appendChild(box);
    saveBoxes();
    removeVisibility();
}
function removeBox() {
    if (container.children.length > 0) {
        container.removeChild(container.lastChild);
    }
    saveBoxes();
    removeVisibility();
}
const reload = localStorage.getItem('credentials');

if (!reload) {
    window.location.replace("login.html");
} else {
    const credentialsFromLocalStorage = JSON.parse(reload);
    const names = document.getElementById('names');
    const userNam = credentialsFromLocalStorage.username;
    names.innerHTML = userNam;
    reloadBoxes();
}