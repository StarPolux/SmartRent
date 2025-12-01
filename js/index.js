
var loginModal = document.getElementById("loginModal");
var registerModal = document.getElementById("registerModal");
var successLoginModal = document.getElementById("successLoginModal");
var successRegisterModal = document.getElementById("successRegisterModal");
var btnLogin = document.querySelector(".btn-login");
var btnPrimary = document.querySelector(".btn-primary");
var closeLogin = document.querySelector(".close");
var closeRegister = document.querySelector(".close-register");

btnLogin.onclick = function() {
    loginModal.style.display = "block";
}

if (btnPrimary) {
    btnPrimary.onclick = function() {
        loginModal.style.display = "block";
    }
}

closeLogin.onclick = function() {
    loginModal.style.display = "none";
}

closeRegister.onclick = function() {
    registerModal.style.display = "none";
}

document.querySelector(".register-link a").onclick = function(e) {
    e.preventDefault();
    loginModal.style.display = "none";
    registerModal.style.display = "block";
}

document.querySelector("#loginModal form").onsubmit = function(e) {
    e.preventDefault();
    loginModal.style.display = "none";
    successLoginModal.style.display = "block";
}

document.getElementById("registerForm").onsubmit = function(e) {
    e.preventDefault();
    registerModal.style.display = "none";
    successRegisterModal.style.display = "block";
}

function closeSuccessLogin() {
    successLoginModal.style.display = "none";
    var userType = document.querySelector('input[name="userType"]:checked');
    var basePath = window.location.pathname.includes('/templates/') ? '../' : '';
    if (userType && userType.value === "arrendador") {
        window.location.href = basePath + "pages/arrendador/inicio.html";
    } else {
        window.location.href = basePath + "pages/arrendatario/inicio.html";
    }
}

function closeSuccessRegister() {
    successRegisterModal.style.display = "none";
    var userType = document.querySelector('#registerForm input[name="userTypeRegister"]:checked');
    var basePath = window.location.pathname.includes('/templates/') ? '../' : '';
    if (userType && userType.value === "arrendador") {
        window.location.href = basePath + "pages/arrendador/inicio.html";
    } else {
        window.location.href = basePath + "pages/arrendatario/inicio.html";
    }
}

window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target == registerModal) {
        registerModal.style.display = "none";
    }
    if (event.target == successLoginModal) {
        successLoginModal.style.display = "none";
    }
    if (event.target == successRegisterModal) {
        successRegisterModal.style.display = "none";
    }
}
