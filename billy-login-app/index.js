const storedUser = localStorage.getItem('credentials');
let isAdmin = false;

if(!storedUser){
    window.location.replace("login.html");
}else{
    const user = JSON.parse(storedUser);
    isAdmin = user.isAdmin;
    document.getElementById('names').innerHTML = user.username;
}
const container = document.getElementById('container');
const removeBtn = document.getElementById('removeBtn');
const addBox = document.getElementById('addBox');

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
        boxCounter = Math.max(boxCounter,parseInt(boxText));
        const box = document.createElement('div');
        box.classList.add('box', 'bg-gray-800', 'text-white', 'p-6', 'rounded-xl', 'shadow-lg', 'text-center', 'text-2xl', 'font-bold');
        box.textContent = boxText;
        box.addEventListener('click',()=>{
        box.remove()
        saveBoxes();
        removeVisibility();
    })
        container.appendChild(box);
    });
    removeVisibility();
}
function getNextNumber(){
    const existingNumbers = Array.from(document.querySelectorAll('.box')).map(box => parseInt(box.textContent));
   if(existingNumbers.length === 0) return 1
   if(existingNumbers.length >= 9) return null
   const max = Math.max(...existingNumbers)
   if(max < 9) return max + 1
   for(let i = 1; i <= 9; i++) {
        if(!existingNumbers.includes(i)) {
            return i
        }
    }
   
}
function addNewBox() {
    if(container.children.length >=9) return;
    if(!isAdmin) return;
    const box = document.createElement('div');
    box.classList.add('box', 'bg-gray-800', 'text-white', 'p-6', 'rounded-xl', 'shadow-lg', 'text-center', 'text-2xl', 'font-bold' );
    const num = getNextNumber();
    if(num === null) return;
    box.textContent = num;
    box.addEventListener('click',()=>{
        box.remove()
        saveBoxes();
        removeVisibility();
    })
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
reloadBoxes();