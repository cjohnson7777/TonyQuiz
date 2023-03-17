const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-buttons')


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    })

}

function resetState(){
    nextButton.classList.add('hide')
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else{
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    nextButton.classList.remove('hide')
}


function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
    } else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')

}


const questions = [
    {
        question: 'Where did Tony Satrk graduate college?',
        answers: [
            {text: 'MIT', correct: true},
            {text: 'Harvard', correct: false}   
        ]
    },
    {
        question: 'What is the name of his daughter?',
        answers: [
            {text: 'Megan', correct: false},
            {text: 'Morgan', correct: true}
        ]
    },
    {
        question: 'What is his full name?',
        answers: [
            {text: 'Anthony Edward Stark', correct: true},
            {text: 'Tony Howard Stark', correct: false},
            {text: 'Tony Edwin Stark', correct: false},

        ]
    },
    {
        question: 'Take away the suit what who is Tony Stark?',
        answers: [
            {text: 'PlayBoy', correct: false},
            {text: 'Genuis,Billonaire, Playboy, Inventor', correct: false},
            {text: 'Genius, Billionare, Playboy, Philanthropist', correct: true},

        ]
    }



]