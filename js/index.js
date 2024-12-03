
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')
var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var loginBtn = document.querySelectorAll("#login")
var signupBtn = document.querySelector("#signup")
var logoutBtn = document.querySelector('#logout')
var accountContainer = []

// loginBtn.addEventListener('click', signin)
// signupBtn.addEventListener('click', signup)    
// logoutBtn.addEventListener('click', logout)




if (localStorage.getItem('accountobj') == null) {
    accountContainer = []
} else {
    accountContainer = JSON.parse(localStorage.getItem('accountobj'))
}

if (localStorage.getItem('accountobj') !== null) {
    accountContainer = JSON.parse(localStorage.getItem('accountobj'))

}

var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = 'Welcome ' + username
}




function isSignupEmpty() {
    if (signupName.value == '' || signupEmail.value == '' || signupPassword == '') {
        return false
    }
    else {
        return true
    }

}

function existEmail() {
    for (var i = 0; i < accountContainer.length; i++) {
        if (accountContainer[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}

function signup() {
    var accountobj = {
        username: signupName.value,
        email: signupEmail.value,
        pass: signupPassword.value,
    }

    if (isSignupEmpty() == false) {
        document.getElementById('incorrect').innerHTML = 'All inputs is required'
        return false
    }

    if (accountContainer.length == 0) {
        accountContainer.push(accountobj)
        localStorage.setItem("accountobj", JSON.stringify(accountContainer))
        console.log(accountContainer)
        document.getElementById('success').innerHTML = 'Success'
        return true

    }
    if (existEmail() == false) {
        document.getElementById('success').innerHTML = ''
        document.getElementById('existEmail').innerHTML = 'email already exists'
    }

    else {
        accountContainer.push(accountobj)
        localStorage.setItem("accountobj", JSON.stringify(accountContainer))
        console.log(accountContainer)
        document.getElementById('success').innerHTML = 'Success'
        document.getElementById('existEmail').innerHTML = ''
    }

}


function isLoginEmpty() {
    if (signinEmail.value == '' && signinPassword.value == '') {
        return false
    }
}


function signin() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = 'All inputs is required'
        return false
    }
    var password = signinPassword.value
    var email = signinEmail.value
    for (var i = 0; i < accountContainer.length; i++) {
        if (accountContainer[i].email.toLowerCase() == email.toLowerCase() && accountContainer[i].pass.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', accountContainer[i].username)
            window.location.assign("../home.html")
        }
        else {
            document.getElementById('incorrect').innerHTML = 'incorrect email or password'
        }

    }
}


function logout() {
    localStorage.removeItem('sessionUsername')
    window.location.assign("../index.html")
}
