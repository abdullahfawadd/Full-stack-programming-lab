/**
 * Lab 8 — Quiz Game
 */
;(function ($) {
  'use strict';

  var QUESTIONS = [
    {
      question: 'Which jQuery method is used to attach an event handler to future elements?',
      options: ['.bind()', '.on() with delegation', '.live()', '.attach()'],
      answer: 1
    },
    {
      question: 'What does .stop(true, true) do in jQuery animations?',
      options: [
        'Pauses the current animation',
        'Clears the queue and jumps to end state',
        'Stops all animations on the page',
        'Resets the element to its original style'
      ],
      answer: 1
    },
    {
      question: 'Which method is best for inserting content at the end of matched elements?',
      options: ['.after()', '.prepend()', '.append()', '.insertBefore()'],
      answer: 2
    },
    {
      question: 'What is the purpose of event.preventDefault()?',
      options: [
        'Stops the event from bubbling up',
        'Prevents the default browser action',
        'Removes the event listener',
        'Cancels all pending events'
      ],
      answer: 1
    },
    {
      question: 'Which CSS property should be minimized to avoid layout thrashing?',
      options: ['color', 'opacity', 'width', 'transform'],
      answer: 2
    },
    {
      question: 'What does $.ajax() return?',
      options: ['A DOM element', 'A jqXHR (Promise-like) object', 'A string', 'An array'],
      answer: 1
    },
    {
      question: 'Which selector is the most performant in jQuery?',
      options: ['$(".parent .child")', '$("div > span")', '$("#myId")', '$("[data-name]")'],
      answer: 2
    },
    {
      question: 'What does ARIA stand for?',
      options: [
        'Accessible Rich Internet Applications',
        'Advanced Rendering Interface API',
        'Automated Resource Interaction Access',
        'Accessible Responsive Interface Architecture'
      ],
      answer: 0
    },
    {
      question: 'Which jQuery method creates a deep copy of matched elements?',
      options: ['.copy()', '.clone(true)', '.duplicate()', '.replicate()'],
      answer: 1
    },
    {
      question: 'What is the recommended minimum touch target size for accessibility?',
      options: ['24px', '32px', '44px', '56px'],
      answer: 2
    }
  ];

  var LETTERS = ['A', 'B', 'C', 'D'];

  var currentQuestion = 0;
  var score = 0;
  var selectedAnswer = null;
  var answered = false;
  var $root;

  function render() {
    $root = $('#lab8-root');
    $root.html('<div class="quiz" id="lab8-quiz"></div>');
    showQuestion();
  }

  function showQuestion() {
    var q = QUESTIONS[currentQuestion];
    var pct = Math.round((currentQuestion / QUESTIONS.length) * 100);

    var optionsHtml = q.options.map(function (opt, i) {
      return (
        '<button class="quiz-option" data-index="' + i + '">' +
          '<span class="quiz-option__marker">' + LETTERS[i] + '</span>' +
          '<span>' + LabUtils.escapeHtml(opt) + '</span>' +
        '</button>'
      );
    }).join('');

    var html =
      '<div class="quiz-progress">' +
        '<div class="quiz-progress__info">' +
          '<span class="quiz-progress__label">Question ' + (currentQuestion + 1) + ' of ' + QUESTIONS.length + '</span>' +
          '<span class="quiz-progress__label">' + score + ' correct</span>' +
        '</div>' +
        '<div class="progress"><div class="progress__bar" style="width: ' + pct + '%;"></div></div>' +
      '</div>' +
      '<div class="quiz-card">' +
        '<p class="quiz-question">' + LabUtils.escapeHtml(q.question) + '</p>' +
        '<div class="quiz-options" role="radiogroup" aria-label="Answer options">' + optionsHtml + '</div>' +
        '<div class="quiz-feedback" id="lab8-feedback"></div>' +
        '<div class="quiz-footer">' +
          '<button class="btn btn-primary" id="lab8-next" disabled>Next Question</button>' +
        '</div>' +
      '</div>';

    var $quiz = $('#lab8-quiz');
    $quiz.stop(true, true).fadeOut(150, function () {
      $quiz.html(html).fadeIn(200);
    });

    selectedAnswer = null;
    answered = false;
  }

  function showResults() {
    var pct = Math.round((score / QUESTIONS.length) * 100);
    var message;
    if (pct === 100) message = 'Perfect score! Outstanding knowledge.';
    else if (pct >= 80) message = 'Excellent work! Solid understanding.';
    else if (pct >= 60) message = 'Good effort. Room to grow.';
    else if (pct >= 40) message = 'Keep studying. You\'ll get there.';
    else message = 'Time for a review session.';

    var html =
      '<div class="quiz-card">' +
        '<div class="quiz-result">' +
          '<div class="quiz-result__score">' + score + '/' + QUESTIONS.length + '</div>' +
          '<p class="quiz-result__label">' + pct + '% correct</p>' +
          '<p class="quiz-result__message">' + message + '</p>' +
          '<div class="progress mb-6"><div class="progress__bar" style="width: ' + pct + '%;"></div></div>' +
          '<button class="btn btn-primary" id="lab8-restart">Try Again</button>' +
        '</div>' +
      '</div>';

    var $quiz = $('#lab8-quiz');
    $quiz.stop(true, true).fadeOut(150, function () {
      $quiz.html(html).fadeIn(250);
    });
  }

  function selectAnswer(index) {
    if (answered) return;
    answered = true;
    selectedAnswer = index;

    var q = QUESTIONS[currentQuestion];
    var isCorrect = index === q.answer;
    var $options = $root.find('.quiz-option');
    var $feedback = $('#lab8-feedback');

    // Disable all options visually
    $options.css('pointer-events', 'none');

    // Highlight selected
    $options.eq(index).addClass(isCorrect ? 'is-correct' : 'is-wrong');

    // Always show correct answer
    if (!isCorrect) {
      $options.eq(q.answer).addClass('is-correct');
    }

    if (isCorrect) {
      score++;
      $feedback.removeClass('incorrect').addClass('correct').text('Correct!').fadeIn(200);
    } else {
      $feedback.removeClass('correct').addClass('incorrect')
        .text('Incorrect. The answer is ' + LETTERS[q.answer] + ': ' + q.options[q.answer] + '.')
        .fadeIn(200);
    }

    $('#lab8-next').prop('disabled', false).focus();

    // Update label
    $root.find('.quiz-progress__label').last().text(score + ' correct');
  }

  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= QUESTIONS.length) {
      showResults();
    } else {
      showQuestion();
    }
  }

  function restart() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    answered = false;
    showQuestion();
  }

  function bindEvents() {
    $root.on('click', '.quiz-option', function () {
      selectAnswer(parseInt($(this).data('index'), 10));
    });

    $root.on('click', '#lab8-next', function () {
      nextQuestion();
    });

    $root.on('click', '#lab8-restart', function () {
      restart();
    });
  }

  window.LabModules.task8 = {
    init: function () {
      render();
      bindEvents();
    }
  };

})(jQuery);
