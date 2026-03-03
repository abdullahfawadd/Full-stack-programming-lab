/**
 * Lab 4 — Tabbed Content with Smooth Scroll
 */
;(function ($) {
  'use strict';

  var TABS = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      title: 'Project Overview',
      content: '<p>This platform demonstrates eight interactive jQuery lab modules, each highlighting a core front-end concept. The architecture follows strict separation of concerns with modular CSS, semantic HTML, and namespaced JavaScript.</p>' +
        '<ul class="panel-features"><li>Lazy-initialized modules for fast initial load</li><li>Single-page navigation with smooth fade transitions</li><li>Responsive grid dashboard with card-based layout</li><li>Professional design system with CSS custom properties</li></ul>'
    },
    {
      id: 'architecture',
      label: 'Architecture',
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 3h-8l-2 4h12z"/></svg>',
      title: 'Technical Architecture',
      content: '<p>The codebase is organized into a flat module structure. Each lab lives in its own folder with dedicated HTML templates, scoped CSS, and an IIFE-wrapped JavaScript module.</p>' +
        '<ul class="panel-features"><li>jQuery selectors cached at module scope</li><li>Event delegation for dynamically created elements</li><li>Animation queue prevention with <code>.stop(true, true)</code></li><li>Modular IIFE pattern with <code>window.LabModules</code> registry</li></ul>'
    },
    {
      id: 'design',
      label: 'Design System',
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
      title: 'Visual Design System',
      content: '<p>The design follows a restrained, modern product aesthetic with a neutral palette, generous whitespace, and consistent radii. All design tokens are defined as CSS custom properties for easy theming.</p>' +
        '<ul class="panel-features"><li>WCAG AA color contrast across all text</li><li>Touch targets meet minimum 44px requirement</li><li>Visible, distinct focus states using primary color outline</li><li>Inter font with optimized weight loading (300–700)</li></ul>'
    },
    {
      id: 'responsive',
      label: 'Responsive',
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>',
      title: 'Responsive Strategy',
      content: '<p>The layout is mobile-first. The dashboard grid collapses from three columns on desktop, to two on tablet, to a single column on mobile.</p>' +
        '<ul class="panel-features"><li>Horizontal tab scrolling on narrow viewports</li><li>Typography and spacing scale gracefully</li><li>All controls maintain usable touch targets</li><li>Grid layout adapts to any screen size</li></ul>'
    },
    {
      id: 'a11y',
      label: 'Accessibility',
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>',
      title: 'Accessibility Features',
      content: '<p>Proper semantic HTML is used throughout — <code>&lt;button&gt;</code> for actions, <code>&lt;label&gt;</code> for form fields, ARIA roles for dynamic regions.</p>' +
        '<ul class="panel-features"><li>Full keyboard navigation (arrow keys, Escape, Tab)</li><li>Live regions announce dynamic content to screen readers</li><li>Focus management ensures logical tab order after transitions</li><li>ARIA attributes for tabs, panels, and interactive elements</li></ul>'
    }
  ];

  var $root;

  function render() {
    $root = $('#lab4-root');

    var navHtml = TABS.map(function (tab, i) {
      return '<button class="tabs__btn' + (i === 0 ? ' is-active' : '') + '" data-tab="' + tab.id + '" data-index="' + i + '" role="tab" aria-selected="' + (i === 0) + '" aria-controls="panel-' + tab.id + '">' +
        '<span class="tabs__btn-icon">' + tab.icon + '</span>' +
        '<span class="tabs__btn-label">' + tab.label + '</span>' +
      '</button>';
    }).join('');

    var panelsHtml = TABS.map(function (tab, i) {
      return '<div class="tabs__panel' + (i === 0 ? ' is-active' : '') + '" id="panel-' + tab.id + '" role="tabpanel" data-panel="' + tab.id + '">' +
        '<div class="panel-header"><h3>' + tab.title + '</h3><span class="panel-badge">' + (i + 1) + ' / ' + TABS.length + '</span></div>' +
        tab.content +
      '</div>';
    }).join('');

    $root.html(
      '<div class="tabs">' +
        '<div class="tabs__nav-wrap">' +
          '<nav class="tabs__nav" role="tablist" aria-label="Content tabs">' + navHtml + '</nav>' +
          '<div class="tabs__indicator" id="lab4-indicator"></div>' +
        '</div>' +
        '<div class="tabs__panels">' + panelsHtml + '</div>' +
        '<p class="tabs__hint">Use left/right arrow keys to navigate between tabs</p>' +
      '</div>'
    );

    // Position the indicator on init
    setTimeout(function () { positionIndicator($root.find('.tabs__btn.is-active')); }, 50);
  }

  function positionIndicator($btn) {
    if (!$btn.length) return;
    var $indicator = $('#lab4-indicator');
    var nav = $root.find('.tabs__nav')[0];
    var btnLeft = $btn[0].offsetLeft;
    var btnWidth = $btn[0].offsetWidth;
    $indicator.css({ left: btnLeft + 'px', width: btnWidth + 'px' });
  }

  function switchTab(tabId) {
    var $btns = $root.find('.tabs__btn');
    var $panels = $root.find('.tabs__panel');

    $btns.removeClass('is-active').attr('aria-selected', 'false');
    var $activeBtn = $btns.filter('[data-tab="' + tabId + '"]');
    $activeBtn.addClass('is-active').attr('aria-selected', 'true');

    // Move indicator
    positionIndicator($activeBtn);

    var $activePanel = $panels.filter('.is-active');
    var $targetPanel = $panels.filter('[data-panel="' + tabId + '"]');

    if ($activePanel.data('panel') === tabId) return;

    $activePanel.stop(true, true).fadeOut(150, function () {
      $(this).removeClass('is-active');
      $targetPanel.addClass('is-active').hide().fadeIn(200);
    });

    // Smooth scroll to panel area
    var offset = $root.find('.tabs__nav').offset().top - 80;
    $('html, body').stop(true, true).animate({ scrollTop: offset }, 300, 'swing');
  }

  function bindEvents() {
    $root.on('click', '.tabs__btn', function () {
      switchTab($(this).data('tab'));
    });

    // Keyboard: arrow keys between tabs
    $root.on('keydown', '.tabs__btn', function (e) {
      var $btns = $root.find('.tabs__btn');
      var idx = $btns.index(this);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        $btns.eq((idx + 1) % $btns.length).focus().trigger('click');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        $btns.eq((idx - 1 + $btns.length) % $btns.length).focus().trigger('click');
      }
    });
  }

  window.LabModules.task4 = {
    init: function () {
      render();
      bindEvents();
    }
  };

})(jQuery);
