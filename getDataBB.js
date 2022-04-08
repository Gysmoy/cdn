const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js";
document.head.appendChild(script);

$(function() {
  var questions = [];
  $('.multiple-answer-question [ng-model="assessmentQuestion.questionAttempt.question.questionText.rawText"]').each(function() {
      var question = {};
      question.question = $(this).text();
      question.selected = $(this).parents('.multiple-answer').find('.multiple-answer-answers').find('li.is-selected').find('label').find('p').text();
      question.answers = [];
      $(this).parents('.multiple-answer').find('.multiple-answer-answers').find('label').find('p').each(function() {
          var answer = $(this).text();
          question.answers.push(answer);
      });
      questions.push(question);
  })
  console.log(questions)
})
