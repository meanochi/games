
const sqrs1=document.querySelectorAll(".r1")
const sqrs2=document.querySelectorAll(".r2")
const sqrs3=document.querySelectorAll(".r3")
const sqrs4=document.querySelectorAll(".r4")
const hello = document.querySelector(".hello")
const scoreDiv=document.querySelector(".score")
const logOut = document.querySelector("#logOut")
const home = document.querySelector("#home")
const sqrs=[sqrs1,sqrs2,sqrs3,sqrs4]
console.log(sqrs);
let colors={0:"transparent",2:"#FF3366b2",4:"#FF6600b2",8:"#FFCC00b2",16:"#33FF33b2",32:"#00CCFFb2",64:"#9933FFb2",128:"#CC33FFb2",256:"#00FFCCb2",512:"#FF9900b2",1024:"#6600FFb2",2048:"#FF0000b2"}
let countSqrs=0
let score=0
let flag=true
userName = localStorage.getItem('loggedInUser')
hello.textContent = userName
home.addEventListener("click", ()=>{
    window.location.href=`../index.html?action=checkLoginStatus())`
})

logOut.addEventListener("click",(event)=>{
    event.preventDefault()
    localStorage.setItem('loggedInUser', '')
    window.location.href=`../index.html?action=checkLoginStatus())`
})
console.log(userName);
function twoOrFour(){
    const arr=[4,2,2,2,2,2,2,2,2,2]
    const index=Math.floor(Math.random()*10)
    return arr[index]
}

function changeColor(sqrs){
    console.log(colors);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(sqrs[i][j].textContent===''){
                sqrs[i][j].style.backgroundColor=colors[0]
            }
            else{
                sqrs[i][j].style.backgroundColor=colors[Number(sqrs[i][j].textContent)]
            }
        }
    }
}

function canMove(sqrs){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if(sqrs[i][j].textContent===sqrs[i][j+1].textContent)
                return true
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if(sqrs[j][i].textContent===sqrs[j][i+1].textContent)
                return true
        }
    }
    return false
}

function randomSqr(sqrs){
    const empty=[]
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(sqrs[i][j].textContent===''){
                empty.push(sqrs[i][j])
            }
        }
    }
    let num = Math.floor(Math.random() * empty.length)
    const place = empty[num]
    place.textContent = twoOrFour()
}

function start(sqrs) {
    countSqrs+=2
    randomSqr(sqrs)
    randomSqr(sqrs)
    changeColor(sqrs)
}

function IsGameOver(sqrs){
    const empty=[]
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(sqrs[i][j].textContent===''){
                empty.push(sqrs[i][j])
            }
        }
    }
    if(empty.length===0 && !canMove(sqrs)){
        user = JSON.parse(localStorage.getItem(userName))
        if(score>user["score"]){
            user["score"] = score
            localStorage.setItem(userName, JSON.stringify(user))
        }
         if(score>localStorage.getItem("high_score"))
            localStorage.setItem("high_score", score)
        alert("Game Over!!🤔 Your score is:"+score)
        //איפוס מחדש
        refresh(sqrs)
        return true
    }
    return false
}

function refresh(sqrs){
    score=0
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            sqrs[i][j].textContent=''
            sqrs[i][j].style.backgroundColor=colors[0]
        }
    }
    start(sqrs)
    scoreDiv.textContent="Score:0"
}

function winner(sqrs){
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(Number(sqrs[i][j].textContent)===2048){
                alert("You are the winner!!!!!!!!!!👍👍👍 Your score is:"+score+"\n"+"🎉🎉🎉🎉🎉🎉")
                return
            }
        }
    }
}


function fixRight(sqrs){
    countSqrs+=1
    for(let i=0;i<4;i++){
        let tmp=[]
        let k=0
        if(sqrs[i][0].textContent!==''){
            tmp[0]=sqrs[i][0].textContent
            k++
        }
        for(let j=1;j<4;j++){
            if (sqrs[i][j].textContent==='')
                continue
            if(sqrs[i][j].textContent===tmp[k-1]){
                tmp[k-1]*=2
                tmp[k]=-1
                score+=tmp[k-1]
                console.log(score);
            }
            else{
                tmp[k]=sqrs[i][j].textContent
            } 
            k++
        }
        let index=k-1
        for (let j=3;j>=0;j--){
            if(index<0){
                sqrs[i][j].textContent=''
            }
            else if(tmp[index]===-1){
                index--
                sqrs[i][j].textContent=tmp[index]
            }
            else{
                sqrs[i][j].textContent=tmp[index]
            }
            index--
        }
    }
}

function fixLeft(sqrs){
    countSqrs+=1
    for(let i=0;i<4;i++){
        let tmp=[]
        let k=0
        if(sqrs[i][0].textContent!==''){
            tmp[0]=sqrs[i][0].textContent
            k++
        }
        for(let j=1;j<4;j++){
            if (sqrs[i][j].textContent==='')
                continue
            if(Number(sqrs[i][j].textContent)===Number(tmp[k-1])){
                tmp[k-1]*=2
                tmp[k]=-1
                score+=tmp[k-1]
                console.log(score);
            }
            else{
                tmp[k]=sqrs[i][j].textContent
            } 
            k++
        }
        let index=0
        for (let j=0;j<4;j++){
            if(index>=k){
                sqrs[i][j].textContent=''
            }
            else if(tmp[index]===-1){
                index++
                sqrs[i][j].textContent=tmp[index]
            }
            else{
                sqrs[i][j].textContent=tmp[index]
            }
            index++
        }
    }
}

function fixUp(sqrs){
    countSqrs+=1
    for(let i=0;i<4;i++){
        let tmp=[]
        let k=0
        if(sqrs[0][i].textContent!==''){
            tmp[0]=sqrs[0][i].textContent
            k++
        }
        for(let j=1;j<4;j++){
            if (sqrs[j][i].textContent==='')
                continue
            if(sqrs[j][i].textContent===tmp[k-1]){
                tmp[k-1]*=2
                tmp[k]=-1
                score+=tmp[k-1]
                console.log(score);
            }
            else{
                tmp[k]=sqrs[j][i].textContent
            } 
            k++
        }
        let index=0
        for (let j=0;j<4;j++){
            if(index>=k){
                sqrs[j][i].textContent=''
            }
            else if(tmp[index]===-1){
                index++
                sqrs[j][i].textContent=tmp[index]
            }
            else{
                sqrs[j][i].textContent=tmp[index]
            }
            index++
        }
    }
}

function fixDown(sqrs) {
    for (let i = 0; i < 4; i++) { 
        let tmp = [];
        let k = 0;
        for (let j = 0; j < 4; j++) {
            if (sqrs[j][i].textContent !== '') {
                tmp[k] = Number(sqrs[j][i].textContent);
                k++;
            }
        }

        let newTmp = [];
        let newK = 0;
        for (let j = tmp.length - 1; j >= 0; j--) {
            if (newK > 0 && newTmp[newK - 1] === tmp[j]) {
                newTmp[newK - 1] *= 2;
                score += newTmp[newK - 1];
            } else {
                newTmp[newK] = tmp[j];
                newK++;
            }
        }
        newTmp.reverse();

        let index = newTmp.length - 1; 
        for (let j = 3; j >= 0; j--) { 
            if (index >= 0) {
                sqrs[j][i].textContent = newTmp[index];
                index--;
            } else {
                sqrs[j][i].textContent = ''; 
            }
        }
    }
}

let before=[]
function saveBefore(sqrs){
    before=[]
    for(let i=0;i<4;i++){
        before[i]=[]
        for(let j=0;j<4;j++){
            before[i][j]=sqrs[i][j].textContent
        }
    }
}

function hasChanged(sqrs){
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(sqrs[i][j].textContent!==before[i][j]){
                return true
            }
        }
    }
    return false
}

document.addEventListener('keydown', function(event) {
    saveBefore(sqrs)
    switch(event.key) {
      case "ArrowUp":
        fixUp(sqrs)
        break;
      case "ArrowDown":
        fixDown(sqrs)
        break;
      case "ArrowLeft":
        fixLeft(sqrs)
        break;
      case "ArrowRight":
        fixRight(sqrs)
        break;
    }

    winner(sqrs)
    const tmp=IsGameOver(sqrs)
    if(tmp===false){
        if (hasChanged(sqrs)) {
            randomSqr(sqrs);
        }
        changeColor(sqrs)
        scoreDiv.textContent="Score:"+score
    }
  });

start(sqrs)

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