const userName = document.getElementById('username')
const passCode = document.getElementById('passcode')

const credentials = {
    username: 'password',
    password: 'password'
}

let errorMessage;
let errorContainer = document.querySelector('.error')

function loginHandler(e) {
    e.preventDefault();

    if (
        (userName.value.trim() === credentials.username) &&
        (passCode.value.trim() === credentials.password)
    ) {
        window.localStorage.setItem("credentials", JSON.stringify(credentials));
        window.location.href = "index.html"
    } else {
        errorMessage = "invalid credentials";
        errorContainer.classList.remove('hidden')
        errorContainer.querySelector('#errorMessage').innerHTML = errorMessage
    }
}

function hideError() {
    errorContainer.classList.add('hidden')
}
