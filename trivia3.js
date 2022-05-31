let url = `https://opentdb.com/api.php?amount=10&category=11` 
let x = -1
let correctCount= 0
let totalCount = 0
let incorrectCount= 0
let finalScore = (correctCount/totalCount)

   
const xhr = new XMLHttpRequest()
    
    xhr.open('GET',url)

    xhr.send()

    xhr.onload =()=>{

        //Parse the data from the url 
        jsonData = JSON.parse(xhr.responseText)
        console.log("parsed",jsonData) 

         //This button checks if the answer is correct.
         submitButton=()=>{
            let selectedAnswer= document.getElementById('answerz').value
            //If you get answer correct
            if(selectedAnswer==correctAnswer){
                //Message 
                document.getElementById('result1').style.color = 'green'
                document.getElementById('result1').innerText= "You got the answer correct!"
                //Add to the score values
                correctCount++
                totalCount++
                //Show updated score
                document.getElementById('score1').innerText= `You have answered ${correctCount} out of ${totalCount} correct`
                document.getElementById('correctAnswer').innerHTML= ``
            }

            //if you get answer inccorrect 
            else{
                //Message
                document.getElementById('result1').style.color = 'red'
                document.getElementById('result1').innerText= "You got the answer wrong."
                document.getElementById('correctAnswer').innerHTML= ` The correct answer was ${correctAnswer}.`

                //add to score values
                incorrectCount++
                totalCount++
                //Show updated score
                document.getElementById('score1').innerText= `You have answered ${correctCount} out of ${totalCount} correct`
            }
            
    }
    //Once this button is click it goes to the next button 
    nextButton=()=> {
        //reset options so new answers dont keep adding to drop down list
       document.getElementById('answerz').options.length = 0;
        x = x +1
        //Make quiz 10 questions
        
        if (x<10){
                //Get question 
                question= jsonData.results[x].question
                document.getElementById('question').innerHTML=`${x+1}. ${question}`
        
                //Get correct Answer
                correctAnswer= jsonData.results[x].correct_answer
                correctArray=[]
                correctArray = correctAnswer.split(',')
        
                //get inccorect answer
                incorrectAnswers = `${jsonData.results[x].incorrect_answers}`
                incorrectArray= []
                incorrectArray = incorrectAnswers.split(',')
            
                //Put both correct and inccorrect answers in an array
                allAnswers= correctArray.concat(incorrectArray)
                
                //Randomize answers
                let shuffled = allAnswers.sort(() => Math.random() - 0.5)
                console.log(shuffled)

                //Reset answer result message
                document.getElementById('correctAnswer').innerHTML= ``
                document.getElementById('result1').innerHTML= ``
        
                //Turn answer choices into options
                    for (let i = 0; i < shuffled.length; i++) {
                    let option = document.createElement("option")
                    option.innerHTML= (shuffled[i])
                    option.value = (shuffled[i])
                    answerz = document.getElementById('answerz')
                    answerz.options.add(option)
                 }}
        //Quiz has hit 10 questions quiz which means it has ended
        else {
            //Quiz is over message
            document.getElementById('score1').innerHTML= `The quiz has ended. You got ${correctCount} out of ${totalCount} correct (%${(correctCount/totalCount*100)})`
            
            //Clear other messages
            document.getElementById('question').innerHTML= ``
            document.getElementById('correctAnswer').innerHTML= ``
            document.getElementById('result1').innerText= ``

            //Disable all buttons
            const button = document. querySelector('button')
             button.disabled = true
            }

     }
     //Restart the quiz will bring you to the begining and clear score
        restartButton=()=> {
           reload = location.reload();
}
//Start the quiz off with the first question without having to click next button 
nextButton()
}
