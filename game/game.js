//////////////////////
//הערות:
//1 אם אין אפשרות לזוז לכיוון שלא יגרילvvvv
//2 אם הלוח מלא ויש להתקדם נתקעVVVV
//3 לא קולט שמנצחvvvv
//4 לשנות צבע לפי ערךvvvv
////////////////////////
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
let colors={0:"transparent",2:"lightgoldenrodyellow",4:"lightblue",8:"lightgray",16:"lightgreen",32:"lightpink",64:"lightsalmon",128:"lightblue",256:"lightseagreen",512:"lightslategray",1024:"lightcoral",2048:"goldenrod"}
let countSqrs=0
let score=0
let flag=true
userName = localStorage.getItem('loggedInUser')
hello.textContent = userName
home.addEventListener("click", ()=>{
    window.location.href=`../home/home.html?action=checkLoginStatus())`
})

logOut.addEventListener("click",(event)=>{
    event.preventDefault()
    localStorage.setItem('loggedInUser', '')
    window.location.href=`../home/home.html?action=checkLoginStatus())`
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
        start(sqrs)
    }
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

function fixDown(sqrs){
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
            }
            else{
                tmp[k]=sqrs[j][i].textContent
            } 
            k++
        }
        let index=k-1
        for (let j=3;j>=0;j--){
            if(k<0){
                sqrs[j][i].textContent=''
            }
            else if(tmp[index]===-1){
                index--
                sqrs[j][i].textContent=tmp[index]
            }
            else{
                sqrs[j][i].textContent=tmp[index]
            }
            index--
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
    IsGameOver(sqrs)
    if (hasChanged(sqrs)) {
        randomSqr(sqrs);
    }
    changeColor(sqrs)
    scoreDiv.textContent="Score:"+score
  });

start(sqrs)