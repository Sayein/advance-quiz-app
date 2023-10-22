let qustionsElement=document.querySelector(".question");
let answerBtnContainer=document.querySelector(".ans-btn");
let answerBtn=document.querySelectorAll(".btn");
let nextBtn=document.querySelector(".nxt-btn");
let restartBtn=document.querySelector("#restart-btn");
let questionNumber=document.querySelector(".question-number");
let numberOfQuestion=document.querySelector(".question-counter");
let intro=document.querySelector('.intro-div');
let mainDiv=document.querySelector('.main');
let matchedTopic;
let codeSnippet=document.querySelector(".code-snippet");
let currentquestionindex=0;
let score=0;
let counter=0;
let url= new URLSearchParams(window.location.search);
let topic= url.get('topic');

fetch("https://vaulted-helix-belief.glitch.me/start")   
// fetch("http://127.0.0.1:5501/start")   
   .then((response)=>response.json())
   .then((data) => {
           main(data);        
   })
   .catch((err)=> console.log(err))

   function main(data){

    function displayQuestion(data){
        matchedTopic=data[topic];
        let cquestion=matchedTopic[currentquestionindex];
        let questionNo=currentquestionindex+1;
        qustionsElement.innerText=cquestion.question;
        if(!cquestion.hasOwnProperty('codesnippet')){
              codeSnippet.style.display='none';
        }
        else{
            codeSnippet.innerText=cquestion.codesnippet;
            codeSnippet.style.display='block';
        }
        questionNumber.innerText=questionNo+". ";
        numberOfQuestion.textContent=`${questionNo}/${matchedTopic.length}`;

        // looping through answers nodelist
        answerBtn.forEach((elem,i)=>{
            let canswer=matchedTopic[currentquestionindex].answers[i];
                elem.innerText=canswer.text;
                elem.setAttribute("data-click",`${canswer.correct}`);
                elem.addEventListener('click',highLightCorrectAnswer);          
                elem.classList.remove('correct', 'incorrect');
                elem.disabled=false;
            })
    
        if(questionNo == matchedTopic.length){
            nextBtn.textContent="Submit";
        }
        
        nextBtn.style.display = "none";
    }
    
    function addNextQuestion() {
            currentquestionindex++;
            if (currentquestionindex < matchedTopic.length) {
                displayQuestion(data);
           }
           else{
                showScore();
           }
        }
        
    nextBtn.addEventListener('click',()=>{
            if (currentquestionindex < matchedTopic.length) {
                 addNextQuestion();
            }    
        });
    
    // this code add the class to the clicked button to hightlight the color of the clicke button  
    // either right or wrong
    function highLightCorrectAnswer(e){
        let selectedBtn=e.target;
        if(selectedBtn.dataset.click=='true'){   
           score++;
           selectedBtn.classList.add('correct');
       }
       else{
           selectedBtn.classList.add('incorrect');    
       }
    
       // This code disables the rest of the buttons after one click 
       answerBtn.forEach((elem)=>{
           if(elem !== e.target){
               elem.disabled=true;
               elem.removeEventListener('click', highLightCorrectAnswer);
               }
           })
           nextBtn.style.display = "block";
     } 
    
     function showScore(){
        questionNumber.innerText="";
        qustionsElement.textContent=`Your score is: ${score}/${matchedTopic.length}`;
        numberOfQuestion.style.display="none";
        nextBtn.innerText='Restart';
        restartBtn.style.display="block";
        nextBtn.style.display="none";
        answerBtnContainer.style.display="none";
        codeSnippet.style.display='none';
    }

    displayQuestion(data);

}


