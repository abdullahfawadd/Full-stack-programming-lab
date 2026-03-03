/**
 * jQuery Interactive Labs — Platform Core
 * Author: M Abdullah | Reg ID: 232052 | BSSE-VI-B
 * Handles dashboard rendering, SPA-style navigation, and shared utilities.
 */
;(function ($) {
  'use strict';

  /* ==========================================================
     Task Metadata
     ========================================================== */
  const TASKS = [
    {
      id: 1,
      title: 'Dynamic List Manager',
      desc: 'Add, remove, and manage list items with smooth slide animations, input validation, and defensive XSS handling.',
      icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 4h10M6 8h10M6 12h7M6 16h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
      tag: 'DOM Manipulation',
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'Animated Image Gallery',
      desc: 'Browse a curated image collection with crossfade transitions, keyboard navigation, dot indicators, and boundary looping.',
      icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="8" r="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M2 14l4-4 3 3 3-3 6 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      tag: 'Animations',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'Interactive Form Validation',
      desc: 'Real-time field validation with inline error feedback, password strength meter, accessible ARIA states, and form submission.',
      icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 10l3 3 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.5"/></svg>',
      tag: 'Forms & UX',
      level: 'Intermediate'
    },
    {
      id: 4,
      title: 'Tabbed Content Interface',
      desc: 'Navigate content panels with animated tab transitions, smooth scrolling, and full keyboard arrow-key support.',
      icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 7h16M6 4v3M10 4v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
      tag: 'Navigation',
      level: 'Beginner'
    },
    {
      id: 5,
      title: 'Chained Style Editor',
      desc: 'Apply multiple CSS properties via jQuery method chaining with live preview, color pickers, and style toggles.',
      icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 17l2.5-2.5M14 3l3 3-9 9-4 1 1-4 9-9z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      tag: 'jQuery Chaining',
      level: 'Intermediate'
    },
    {
      id: 6,
      title: 'API Data Fetcher',
      desc: 'Fetch, render, and paginate remote data from a REST API with loading states, error handling, and staggered animation.',
      icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v4M10 14v4M18 10h-4M6 10H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/></svg>',
      tag: 'AJAX & API',
      level: 'Advanced'
    },
    {
      id: 7,
      title: 'Drag-and-Drop Sortable',
      desc: 'Reorder priority items with drag handles, visual placeholder indicators, rank numbering, and live order tracking.',
      icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4h6M7 8h6M7 12h6M7 16h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 4v0M4 8v0M4 12v0M4 16v0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
      tag: 'jQuery UI',
      level: 'Advanced'
    },
    {
      id: 8,
      title: 'Knowledge Quiz',
      desc: 'Test your jQuery and accessibility knowledge with scored questions, progress tracking, and instant feedback.',
      icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8 7.5a2.5 2.5 0 013.5 2.3c0 1.2-1.5 1.5-1.5 2.7M10 15v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      tag: 'Interactive',
      level: 'Beginner'
    }
  ];

  /* ==========================================================
     Cached Selectors
     ========================================================== */
  const $app = $('#app');
  const $dashboard = $('#dashboard-view');
  const $taskGrid = $('#task-grid');
  const $taskViews = $('#task-views');

  /* ==========================================================
     State
     ========================================================== */
  let scrollPositionBeforeTask = 0;
  let currentTask = null;
  const initializedTasks = {};

  /* ==========================================================
     Render Dashboard Cards
     ========================================================== */
  function renderCards() {
    const fragment = document.createDocumentFragment();

    TASKS.forEach(function (task) {
      const card = document.createElement('article');
      card.className = 'task-card';
      card.setAttribute('role', 'region');
      card.setAttribute('aria-label', 'Lab ' + task.id + ': ' + task.title);
      card.innerHTML =
        '<div class="task-card__header">' +
          '<span class="task-card__icon" aria-hidden="true">' + task.icon + '</span>' +
          '<div class="task-card__meta">' +
            '<span class="task-card__number">Lab ' + task.id + '</span>' +
            '<span class="task-card__level task-card__level--' + task.level.toLowerCase() + '">' + task.level + '</span>' +
          '</div>' +
        '</div>' +
        '<h3 class="task-card__title">' + task.title + '</h3>' +
        '<p class="task-card__desc">' + task.desc + '</p>' +
        '<div class="task-card__footer">' +
          '<span class="task-card__tag">' + task.tag + '</span>' +
          '<button class="btn btn-primary btn-sm btn-open-task" data-task="' + task.id + '">' +
            'Open Lab' +
            '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="margin-left:4px"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</button>' +
        '</div>';
      fragment.appendChild(card);
    });

    $taskGrid[0].appendChild(fragment);
  }

  /* ==========================================================
     Navigation
     ========================================================== */
  function openTask(taskId) {
    if (currentTask === taskId) return;

    scrollPositionBeforeTask = $(window).scrollTop();
    currentTask = taskId;

    const $target = $('#task-' + taskId);

    $dashboard.stop(true, true).fadeOut(180, function () {
      $target.addClass('active').hide().fadeIn(220);
      window.scrollTo(0, 0);

      // Lazy-initialize lab module
      if (!initializedTasks[taskId] && window.LabModules && window.LabModules['task' + taskId]) {
        window.LabModules['task' + taskId].init();
        initializedTasks[taskId] = true;
      }
    });
  }

  function backToDashboard() {
    if (currentTask === null) return;

    const $active = $('#task-' + currentTask);
    currentTask = null;

    $active.stop(true, true).fadeOut(180, function () {
      $active.removeClass('active');
      $dashboard.addClass('active').hide().fadeIn(220, function () {
        $(window).scrollTop(scrollPositionBeforeTask);
      });
    });
  }

  /* ==========================================================
     Event Delegation
     ========================================================== */
  $app.on('click', '.btn-open-task', function (e) {
    e.preventDefault();
    const taskId = parseInt($(this).data('task'), 10);
    openTask(taskId);
  });

  $app.on('click', '.btn-back', function (e) {
    e.preventDefault();
    backToDashboard();
  });

  // Keyboard: Escape goes back
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && currentTask !== null) {
      backToDashboard();
    }
  });

  /* ==========================================================
     Shared Utilities (exposed globally for lab modules)
     ========================================================== */
  window.LabModules = window.LabModules || {};

  window.LabUtils = {
    /**
     * Debounce helper
     */
    debounce: function (fn, delay) {
      let timer;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    },

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml: function (str) {
      const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
      return String(str).replace(/[&<>"']/g, function (m) { return map[m]; });
    },

    /**
     * Generate a simple unique ID
     */
    uid: function () {
      return 'uid-' + Math.random().toString(36).substr(2, 9);
    }
  };

  /* ==========================================================
     Init
     ========================================================== */
  $(function () {
    renderCards();
  });

})(jQuery);
