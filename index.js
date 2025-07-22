const register = document.querySelector(".reg")
const login = document.querySelector(".log")
const regiForm = document.querySelector(".register")
const loginForm = document.querySelector(".login")
const games = document.querySelector(".games")
const signUp = document.querySelector("#toReg")
const signIn = document.querySelector("#toSign")
const logOut = document.querySelector("#logOut")
const game = document.querySelector(".g2048")
const hello = document.querySelector(".hello")
const msg = document.querySelector(".msg")
const passmsg1 = document.querySelector(".passmsg1")
const passmsg2 = document.querySelector(".passmsg2")
const h1 = document.querySelector(".h1")
console.log(hello) 
let isIn = true
let name1 = ''
let score = 0
let userName = '' 
if(!localStorage.getItem("high_score")){
    localStorage.setItem("high_score",0)
}
function checkLoginStatus() {
    userName = localStorage.getItem('loggedInUser')
    if (userName) {
        hello.textContent = `Hello ${userName}!` 
        console.log(JSON.parse(localStorage.getItem(`${userName}`)));
        
        game.textContent = `Highest score:${localStorage.getItem("high_score")}\n Your score: ${JSON.parse(localStorage.getItem(`${userName}`))["score"]}`
        signIn.style.display = "none" 
        signUp.style.display = "none" 
        logOut.style.display = "inline-block"
        games.style.display = "flex"  
        regiForm.style.display = "none" 
        loginForm.style.display = "none" 
    } else {
        game.textContent = "Log in first"
        logOut.style.display = 'none'
        hello.textContent = "" 
        signIn.style.display = "inline-block"
        signUp.style.display = "inline-block" 
        games.style.display = "flex"
        regiForm.style.display = "none"
        loginForm.style.display = "none"
    }
}
function checkPass(pass){
    let digit = false
    let char = false
    if(pass.length < 6)
        return false
    console.log(pass.length) 
    for (let i = 0; i < pass.length; i++) {
        console.log(pass[i]) 
        console.log(isNaN(Number(pass[i]))) 
        console.log(!isNaN(Number(pass[i]))) 
        if(isNaN(Number(pass[i])))
            digit = true
        if(!isNaN(Number(pass[i])))
            char = true
        if(digit && char)
            return true
    }
    return false        
}
register.addEventListener("click",(event)=>{
    event.preventDefault()
    const f_name = document.querySelector("#f_name").value
    const phone = document.querySelector("#phone").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    regiForm.reset()
    if(localStorage.getItem(f_name))
        passmsg1.textContent = "There is a user with this name"
    else if (checkPass(password)){
        const user = {
            f_name: f_name,
            phone: phone, 
            email: email, 
            password: password, 
            score: 0, 
            tries: 0
        }
        localStorage.setItem(f_name, JSON.stringify(user))
        localStorage.setItem('loggedInUser', f_name)
        checkLoginStatus()
    }
    else{
        passmsg1.textContent = "Password must contain at least one letter and one digit, altogather: 6 chars"
        regiForm.style.display = 'flex'
        games.style.display = 'none'
        loginForm.style.display = 'none'
        password.value = ''
    }

})
console.log(name1) 

logOut.addEventListener("click",(event)=>{
    event.preventDefault()
    localStorage.setItem('loggedInUser', '')
    checkLoginStatus()
})

login.addEventListener("click",(event)=>{
    event.preventDefault()
    const f_name = document.querySelector("#f_name2").value
    const password = document.querySelector("#password2").value
    pass = JSON.parse(localStorage.getItem(f_name))
    loginForm.reset()
    if(!pass){
        loginForm.reset()
        passmsg2.textContent = "There is not a user in this name"
    }
    else if(password === pass["password"]){
        localStorage.setItem('loggedInUser', f_name) 
        checkLoginStatus()
    }
    else{
       let tries = pass["tries"]
       tries++
       if(tries === 3){
        loginForm.reset()
        passmsg2.textContent = "You tried too many times with wrong password. your user had blocked. please register"
        localStorage.removeItem(f_name)
       }
       else{
        pass["tries"] = tries
        localStorage.setItem(f_name, JSON.stringify(pass))
        passmsg2.textContent = `Password is not correct. you have ${3-tries} more tries`
    }
    }


})

signIn.addEventListener("click", ()=>{
    loginForm.style.display = 'flex'
    signUp.style.borderBottom = ''
    signIn.style.borderBottom = 'solid 2px'
    games.style.display = 'none'
    regiForm.style.display = 'none'
})

signUp.addEventListener("click", ()=>{
    signUp.style.borderBottom = 'solid 2px'
    signIn.style.borderBottom = ''
    regiForm.style.display = 'flex'
    games.style.display = 'none'
    loginForm.style.display = 'none'

})

game.addEventListener("click",()=>{
    userName = localStorage.getItem('loggedInUser') 
    if (userName) {
        window.location.href="./game/game.html?"
        game.style.backgroundColor = 'red'
    }
    else{
    loginForm.style.display = 'flex'
    games.style.display = 'none'
    regiForm.style.display = 'none'  
    }
})

checkLoginStatus() 
// הוספת האזנה לאירועי מגע עבור המובייל
const gameBoard = document.querySelector('.table'); // קבלת אלמנט לוח המשחק
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

// מאזין לרגע תחילת הנגיעה
gameBoard.addEventListener('touchstart', (event) => {
    // מונע מהדף לזוז בזמן הנגיעה
    event.preventDefault(); 
    // שומר את קואורדינטות ה-X וה-Y של נקודת ההתחלה
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}, { passive: false });

// מאזין לרגע סיום הנגיעה
gameBoard.addEventListener('touchend', (event) => {
    event.preventDefault();
    // שומר את קואורדינטות ה-X וה-Y של נקודת הסיום
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;

    // קורא לפונקציה שמחשבת את כיוון ההחלקה
    handleSwipe();
}, { passive: false });

function handleSwipe() {
    const deltaX = endX - startX; // הפרש התנועה בציר X
    const deltaY = endY - startY; // הפרש התנועה בציר Y
    const minSwipeDistance = 50; // מרחק החלקה מינימלי שייחשב כתנועה (מונע תזוזות מטפיחות קלות)

    // בודק אם התנועה האופקית גדולה מהאנכית
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > minSwipeDistance) {
            // החלקה ימינה
            console.log("Swipe Right");
            saveBefore(sqrs);
            fixRight(sqrs);
        } else if (deltaX < -minSwipeDistance) {
            // החלקה שמאלה
            console.log("Swipe Left");
            saveBefore(sqrs);
            fixLeft(sqrs);
        } else {
            return; // החלקה קצרה מדי, לא לעשות כלום
        }
    } 
    // אחרת, התנועה האנכית גדולה מהאופקית
    else {
        if (deltaY > minSwipeDistance) {
            // החלקה למטה
            console.log("Swipe Down");
            saveBefore(sqrs);
            fixDown(sqrs);
        } else if (deltaY < -minSwipeDistance) {
            // החלקה למעלה
            console.log("Swipe Up");
            saveBefore(sqrs);
            fixUp(sqrs);
        } else {
            return; // החלקה קצרה מדי, לא לעשות כלום
        }
    }

    // --- קוד שמשותף לכל התנועות ---
    // הקוד הזה מועתק מהפונקציה של המקלדת
    winner(sqrs);
    IsGameOver(sqrs);
    if (hasChanged(sqrs)) {
        randomSqr(sqrs);
    }
    changeColor(sqrs);
    scoreDiv.textContent = "Score:" + score;
}
