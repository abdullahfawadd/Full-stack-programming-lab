/**
 * Lab 5 — Chained Style Editor
 * Demonstrates jQuery chaining extensively
 */
;(function ($) {
  'use strict';

  var DEFAULTS = {
    fontSize: 18,
    color: '#1f2937',
    bgColor: '#ffffff',
    letterSpacing: 0,
    borderRadius: 12,
    opacity: 100,
    bold: false,
    italic: false,
    underline: false,
    textAlign: 'center'
  };

  var $root;

  function render() {
    $root = $('#lab5-root');
    $root.html(
      '<div class="editor-layout">' +

        '<div class="editor-controls">' +
          '<div class="controls-header">' +
            '<p class="control-title">Typography Controls</p>' +
            '<span class="control-badge">jQuery Chaining</span>' +
          '</div>' +

          '<div class="form-group">' +
            '<label class="form-label" for="lab5-size">Font Size</label>' +
            '<div class="control-row">' +
              '<input type="range" id="lab5-size" min="12" max="48" value="' + DEFAULTS.fontSize + '" aria-label="Font size">' +
              '<span class="size-display" id="lab5-size-val">' + DEFAULTS.fontSize + 'px</span>' +
            '</div>' +
          '</div>' +

          '<div class="form-group">' +
            '<label class="form-label" for="lab5-spacing">Letter Spacing</label>' +
            '<div class="control-row">' +
              '<input type="range" id="lab5-spacing" min="-2" max="8" step="0.5" value="' + DEFAULTS.letterSpacing + '" aria-label="Letter spacing">' +
              '<span class="size-display" id="lab5-spacing-val">' + DEFAULTS.letterSpacing + 'px</span>' +
            '</div>' +
          '</div>' +

          '<div class="form-group">' +
            '<label class="form-label">Colors</label>' +
            '<div class="color-row">' +
              '<div class="color-field">' +
                '<input type="color" id="lab5-color" value="' + DEFAULTS.color + '" aria-label="Text color">' +
                '<span class="color-label">Text</span>' +
              '</div>' +
              '<div class="color-field">' +
                '<input type="color" id="lab5-bg" value="' + DEFAULTS.bgColor + '" aria-label="Background color">' +
                '<span class="color-label">Background</span>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="form-group">' +
            '<label class="form-label" for="lab5-radius">Border Radius</label>' +
            '<div class="control-row">' +
              '<input type="range" id="lab5-radius" min="0" max="40" value="' + DEFAULTS.borderRadius + '" aria-label="Border radius">' +
              '<span class="size-display" id="lab5-radius-val">' + DEFAULTS.borderRadius + 'px</span>' +
            '</div>' +
          '</div>' +

          '<div class="form-group">' +
            '<label class="form-label" for="lab5-opacity">Opacity</label>' +
            '<div class="control-row">' +
              '<input type="range" id="lab5-opacity" min="10" max="100" value="' + DEFAULTS.opacity + '" aria-label="Opacity">' +
              '<span class="size-display" id="lab5-opacity-val">' + DEFAULTS.opacity + '%</span>' +
            '</div>' +
          '</div>' +

          '<div class="form-group">' +
            '<label class="form-label">Style Toggles</label>' +
            '<div class="toggle-group">' +
              '<button class="toggle-btn" id="lab5-bold" aria-pressed="false" title="Bold"><strong>B</strong></button>' +
              '<button class="toggle-btn" id="lab5-italic" aria-pressed="false" title="Italic"><em>I</em></button>' +
              '<button class="toggle-btn" id="lab5-underline" aria-pressed="false" title="Underline"><span style="text-decoration:underline">U</span></button>' +
            '</div>' +
          '</div>' +

          '<div class="form-group">' +
            '<label class="form-label">Text Align</label>' +
            '<div class="toggle-group">' +
              '<button class="toggle-btn align-btn is-active" data-align="center" aria-label="Center align">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="18" y1="14" x2="6" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>' +
              '</button>' +
              '<button class="toggle-btn align-btn" data-align="left" aria-label="Left align">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="17" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>' +
              '</button>' +
              '<button class="toggle-btn align-btn" data-align="right" aria-label="Right align">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="7" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>' +
              '</button>' +
            '</div>' +
          '</div>' +

          '<div class="reset-row">' +
            '<button class="btn btn-secondary btn-sm" id="lab5-reset">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>' +
              ' Reset All' +
            '</button>' +
          '</div>' +
        '</div>' +

        '<div class="preview-section">' +
          '<div class="preview-panel" id="lab5-preview-panel">' +
            '<p class="preview-text" id="lab5-preview">The quick brown fox jumps over the lazy dog. Sphinx of black quartz, judge my vow.</p>' +
          '</div>' +
          '<div class="css-output" id="lab5-css-output">' +
            '<div class="css-output__header">' +
              '<span class="css-output__label">Generated CSS</span>' +
              '<button class="css-output__copy" id="lab5-copy" title="Copy CSS">Copy</button>' +
            '</div>' +
            '<pre class="css-output__code" id="lab5-css-code"></pre>' +
          '</div>' +
        '</div>' +

      '</div>'
    );
  }

  function applyStyles() {
    var size = $('#lab5-size').val();
    var color = $('#lab5-color').val();
    var bg = $('#lab5-bg').val();
    var isBold = $('#lab5-bold').hasClass('is-active');
    var isItalic = $('#lab5-italic').hasClass('is-active');

    // Demonstrating jQuery chaining
    $('#lab5-preview')
      .css('font-size', size + 'px')
      .css('color', color)
      .css('font-weight', isBold ? '700' : '400')
      .css('font-style', isItalic ? 'italic' : 'normal');

    $('#lab5-preview-panel').css('background-color', bg);

    // Update display values
    $('#lab5-size-val').text(size + 'px');
    $('#lab5-color-val').text(color);
    $('#lab5-bg-val').text(bg);
  }

  function resetStyles() {
    $('#lab5-size').val(DEFAULTS.fontSize);
    $('#lab5-color').val(DEFAULTS.color);
    $('#lab5-bg').val(DEFAULTS.bgColor);
    $('#lab5-bold').removeClass('is-active').attr('aria-pressed', 'false');
    $('#lab5-italic').removeClass('is-active').attr('aria-pressed', 'false');
    applyStyles();
  }

  function bindEvents() {
    $root.on('input', '#lab5-size, #lab5-color, #lab5-bg', applyStyles);

    $root.on('click', '#lab5-bold', function () {
      $(this).toggleClass('is-active');
      var pressed = $(this).hasClass('is-active');
      $(this).attr('aria-pressed', String(pressed));
      applyStyles();
    });

    $root.on('click', '#lab5-italic', function () {
      $(this).toggleClass('is-active');
      var pressed = $(this).hasClass('is-active');
      $(this).attr('aria-pressed', String(pressed));
      applyStyles();
    });

    $root.on('click', '#lab5-reset', resetStyles);
  }

  window.LabModules.task5 = {
    init: function () {
      render();
      bindEvents();
      applyStyles();
    }
  };

})(jQuery);
