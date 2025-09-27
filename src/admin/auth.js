function authenticate() {
    const btn = document.getElementById("auth-btn")
    const failedMsg = document.getElementById("submit-msg")
    failedMsg.style.display = "none"

    btn.textContent = "Authenticaing..."

    setTimeout(() => {
        const enteredPasswword = (document.getElementById("auth-password").value).trim()
        btn.textContent = "Submit"
        if (enteredPasswword === "dangalngbayan") {
            window.location.replace("dashboard.html")
        }
        else {
            const failedMsg = document.getElementById("submit-msg")
            failedMsg.textContent = "Login Failed: Incorrect Passcode"
            failedMsg.style.display = "block"
        }
    }, 1000)
    
    
}