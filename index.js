(function() {
let state = {questions: [
  {question: "What did Stan Lee appear as in Guardians of the Galaxy Vol. 2?", answer: 'Man in spacesuit', option1: 'Ice cream man', option2: 'Man standing on street', option3: 'Singer', option4: 'Man in spacesuit'}, 
  {question: "What was the role of Stan Lee’s cameo in Spider-Man: Homecoming?", answer: 'Annoyed neighbor', option1: 'Store clerk', option2: 'Annoyed neighbor', option3: 'Farmer', option4: 'Race car driver'},
  {question: "What was Stan Lee's cameo in Doctor Strange?", answer: 'Bus passenger', option1: 'Bus passenger', option2: 'Comic book author', option3: 'Detective', option4: 'Traveling salesman'}, 
  {question: "Who did Stan Lee show up as in X-Men: Apocalypse?", answer: 'Terrified citizen', option1: 'Man talking to woman', option2: 'Terrified citizen', option3: 'Video store owner', option4: 'Jewelry store salesman'}, 
  {question: "What did Stan Lee appear as in Captain America: Civil War?", answer: 'FedEx delivery driver', option1: 'Train conductor' , option2: 'Man in hospital', option3: 'Man walking down the street', option4: 'FedEx delivery driver'}, 
  {question: "What did Stan Lee appear as in Thor?", answer: 'Pick-up truck driver', option1: 'Pick-up truck driver', option2: 'Collector of random things', option3: 'Rock band drummer', option4: 'Dog walker'},
  {question: "What was Stan Lee's cameo in Avengers: Age of Ultron?", answer: 'War veteran', option1: 'Dance party DJ', option2: 'High school principal', option3: 'War veteran', option4: 'Man on TV being interviewed'},
  {question: "What did Stan Lee appear as in Captain America: The Winter Soldier?", answer: 'Security Guard', option1: 'Man giving advice', option2: 'Helpful citizen', option3: 'Man talking to his wife', option4: 'Security Guard'},
  {question: "What was Stan Lee's cameo in Ant-Man?", answer: 'Bartender', option1: 'Janitor', option2: 'Man in the audience', option3: 'Bartender', option4: 'Bus driver'},
  {question: "What was Stan Lee's cameo in Iron Man 3?", answer: 'Beauty Pageant Judge', option1: 'Beauty Pageant Judge', option2: 'Rocket driver', option3: 'Man driving down the street', option4: 'Man listening to music'},
], questionNumber: 0, correct: 0,  incorrect: 0};


function handleStartButton() {
  $('#js-start-button').on('click', function(event){
    event.preventDefault();
    $('.quizStart').hide(); 
    $('.quiz').show();
    $('.quiz').html(renderQuizHeader() + renderQuizScore() + renderQuizForm());
  });
}


function renderQuizHeader() {
  return `
    <div class="quiz-header">
      <h2>Cameo Quiz</h2>
      <h3>Question ${state.questionNumber + 1} out of ${state.questions.length}</h3>
    </div>
    `;
  }


function renderQuizScore() {
  if (state.correct === 0 && state.incorrect === 0) {
    return `
    <div class="score">
      <p></p>
    </div>
      `;
  } else if (state.correct + state.incorrect === state.questions.length) { 
    state.correct = 0;
    state.incorrect = 0;
    state.questionNumber = 0;
  } else {
    return `
    <div class="score">
      <p>${state.correct} correct / ${state.incorrect} incorrect </p>
    </div>
      `;
  }
}

function renderQuizForm() {
      return `
        <div class="quiz-background">
        <div class="quizFeedback section"></div>   
        <form role="form" class="quiz-questions section" method="get">            
          <fieldset>
            <span id="error"></span>
            <legend>${state.questions[state.questionNumber].question}</legend>
              <p>
                <input type="radio" name="answers" value="${state.questions[state.questionNumber].option1}" id="option1">
                <label for="option1">${state.questions[state.questionNumber].option1}</label>
              </p>
              <p>
                <input type="radio" name="answers" value="${state.questions[state.questionNumber].option2}" id="option2">
                <label for="option2">${state.questions[state.questionNumber].option2}</label>
              </p>
              <p>
                <input type="radio" name="answers" value="${state.questions[state.questionNumber].option3}" id="option3">
                <label for="option3">${state.questions[state.questionNumber].option3}</label>
              </p>
              <p>
                <input type="radio" name="answers" value="${state.questions[state.questionNumber].option4}" id="option4">
                <label for="option4">${state.questions[state.questionNumber].option4}</label>
              </p>
          </fieldset>
          <button name="submit" role="button" type="submit" class="submit-btn">SUBMIT</button>    
        </form>
        </div>
      `; 
    }

function renderQuizFeedback() {
let userAnswer = $(':radio[name=answers]:checked').val();
  if (userAnswer === `${state.questions[state.questionNumber].answer}`) {
    state.correct++;
    return `   
      <p class="correct">${state.questions[state.questionNumber].answer} is correct!<br> Nice work!</p>   
      <button name="next" role="button" type="submit" class="next-btn">NEXT</button>    
    `;

  } else if (userAnswer !== `${state.questions[state.questionNumber].answer}`) {
    state.incorrect++
    return `
      <p class="incorrect">That was not it. The correct answer is:<br> ${state.questions[state.questionNumber].answer}</p>
      <button name="next" role="button" type="submit" class="next-btn">NEXT</button>   
    `;
  }
}



function handleSubmitButton() {
    $('.quiz').on('click', '.submit-btn', function(event){
    event.preventDefault();    
    if (!$(':radio[name=answers]:checked').val()) {
      $('#error').html(`<p>Sorry, you must select an answer</p>`);
    } else {
      $('#error').hide();
      $('.quiz-questions').hide();
      $('.quizFeedback').html(renderQuizFeedback());
    }
  });
}

function handleNextQuestion() {
  $('.quiz').on('click', '.next-btn', function(event){
    event.preventDefault();
    if (state.questionNumber + 1 === state.questions.length) {
      $('.quizFeedback').hide();
      $('.quiz').hide();
      $('.quizEnd').html(renderEndPage());
    } else {
      $('.quizFeedback').hide();
      $('.quiz-questions').show();
      state.questionNumber++;
      $('.quiz').html(renderQuizHeader() + renderQuizScore() + renderQuizForm());
  }
  });
}


function renderEndPage() {
  return `    
    <header role="banner" class="banner">
        <h1>- THE END -</h1>
    </header>
      <h3>Thanks for testing out your Stan Lee spotting skills!<br> You had ${state.correct} correct out of ${state.questions.length}!</h3>
      <button role="button" name="try-again" id="js-startover-btn" type="submit">Try Again</button>
    `;
}


function handleTryAgainButton() {
  $('.quizEnd').on('click', '#js-startover-btn', function(event){
    event.preventDefault();
    state.questionNumber = 0;
    state.correct = 0; 
    state.incorrect = 0;
    $('.quizEnd').hide();
    $('.quizStart').show();
  });
} 


function handleQuizApp() {
  handleStartButton();
  handleSubmitButton();  
  handleNextQuestion();
  handleTryAgainButton();
}

$(handleQuizApp);

})();