const storedUser = localStorage.getItem('credentials');
let isAdmin = false;

if(!storedUser){
    window.location.replace("login.html");
}else{
    const user = JSON.parse(storedUser);
    isAdmin = user.isAdmin === true;
    document.getElementById('names').innerHTML = user.username;
}
const container = document.querySelector('.container');
const removeBtn = document.querySelector('.removebox');
const addBox = document.querySelector('.addbox');

if(!isAdmin){
    if(addBox) addBox.style.display = 'none';
    if(removeBtn) removeBtn.style.display = 'none';
}
function saveBoxes(){
    const containers = document.querySelectorAll('.box');
    const savedboxes = [];
    containers.forEach(box =>{
        savedboxes.push(box.textContent);
    })
    localStorage.setItem('boxes', JSON.stringify(savedboxes));
}
function removeVisibility() {
    if(!isAdmin) return;
    const boxCount = document.querySelectorAll('.box').length;
    removeBtn.classList.toggle('hidden', boxCount <= 0); 
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

function addNewBox() {
    if(!isAdmin) return;
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = container.children.length + 1;
    container.appendChild(box);
    saveBoxes();
    removeVisibility();
}
function removeBox() {
    if(!isAdmin) return;
    if (container.children.length > 0) {
        container.removeChild(container.lastChild);
    }
    saveBoxes();
    removeVisibility();
}