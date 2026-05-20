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


function saveBoxes(){
    const containers = [...document.querySelectorAll('.box')]
    .map(b => b.querySelector('span').textContent.trim());
    localStorage.setItem('boxes', JSON.stringify(containers));
}
function updateDeleteBtn(){
    if(!isAdmin) return;
    removeBtn.classList.toggle('hidden',document.querySelectorAll('.box').length === 0);
}

const deleteLog = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd"/>
</svg>`;

function createBox(text){
    const box = document.createElement('div');
    box.classList.add('box','bg-gray-800', 'text-white', 'p-6',
        'rounded-xl', 'shadow-lg', 'text-center', 'text-2xl', 'font-bold', 'relative');
        const label = document.createElement('span');
        label.textContent = text;
        box.appendChild(label);
        const btn = document.createElement('button');
        btn.innerHTML = deleteLog;
        btn.classList.add('absolute', 'top-2', 'right-2', 'text-red-400', 'hover:text-red-600', 'cursor-pointer')
        if (isAdmin) {
        btn.classList.add('text-red-400', 'hover:text-red-600');
        btn.addEventListener('click', () => {
            box.remove();
            saveBoxes();
            updateDeleteBtn();
        });
         } else {
        btn.classList.add('text-gray-500', 'cursor-not-allowed');
        btn.disabled = true;
         }

         box.appendChild(btn);
         return box;
}
function reloadBoxes(){
    const allSaved = localStorage.getItem('boxes');
    if(!allSaved) return;
    container.querySelectorAll('.box').forEach(b => b.remove());
    JSON.parse(allSaved).forEach(text => container.appendChild(createBox(text)));
    updateDeleteBtn();
}
function getNextNumber(){
const nums = [...document.querySelectorAll('.box')].map(b => parseInt(b.querySelector('span').textContent));
if(nums.length >= 9) return null;
const maxNum = parseInt(localStorage.getItem('maxNum') || '0');
if(maxNum < 9) return maxNum + 1;
for(let i = 1; i <=9;i++){
    if(!nums.includes(i)) return i;
}
return null;
}
function addNewBox() {
if(!isAdmin || container.querySelectorAll('.box').length >= 9) return;
const num = getNextNumber();
if(num === null) return;
const maxReached = parseInt(localStorage.getItem('maxNum') || '0');
 if (num > maxReached) localStorage.setItem('maxNum', String(num));
container.appendChild(createBox(String(num)));
saveBoxes();
updateDeleteBtn();
}

function deleteAll(){
    if(!isAdmin) return;
    if(!confirm('Are you sure you want to delete ALL boxes? This cannot be undone.')) return;
    container.querySelectorAll('.box').forEach(b => b.remove());
    localStorage.removeItem('maxNum');
    saveBoxes();
    updateDeleteBtn();
}

function logOut(){
    localStorage.removeItem('credentials');
    window.location.replace("login.html");
};

reloadBoxes();