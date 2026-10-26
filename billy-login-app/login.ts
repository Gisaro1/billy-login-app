let userData: { username: string; password: string }[] = [];

fetch('users.json')
    .then(response => response.json())
    .then(data => {userData = data;})
    .catch(error => {console.error('Error loading user data:', error);});

const userName = document.getElementById('username') as HTMLInputElement | null
const passCode = document.getElementById('passcode') as HTMLInputElement | null
const errorContainer = document.getElementById('errorContainer');

function loginHandler(e: Event) {
    e.preventDefault();

   const enteredUsername = userName!.value.trim();
   const enteredPassword = passCode!.value.trim();

   const user = userData.find(user => user.username === enteredUsername && user.password === enteredPassword);

   if (user) {
       localStorage.setItem('credentials', JSON.stringify(user));
       window.location.replace("index.html");
   } else {
       errorContainer!.classList.remove('hidden');
       const errorSpan = errorContainer!.querySelector('#error-message');
        if(errorSpan) errorSpan.innerHTML = 'Invalid username or password. Please try again.';
   }
}

function hideError() {
    errorContainer!.classList.add('hidden')
}
