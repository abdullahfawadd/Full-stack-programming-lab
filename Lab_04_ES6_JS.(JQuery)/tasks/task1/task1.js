/**
 * Lab 1 — Dynamic List Manager
 */
;(function ($) {
  'use strict';

  var $root;

  function render() {
    $root = $('#lab1-root');
    $root.html(
      '<div class="list-header">' +
        '<div>' +
          '<h3>Item Collection</h3>' +
          '<p>Add items, manage your list, and see jQuery DOM manipulation in action.</p>' +
        '</div>' +
      '</div>' +
      '<div class="list-input-row">' +
        '<input class="form-input" id="lab1-input" type="text" placeholder="Type a new item and press Enter…" aria-label="New item text" maxlength="120">' +
        '<button class="btn btn-primary" id="lab1-add">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right:4px"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
          'Add' +
        '</button>' +
      '</div>' +
      '<div class="list-toolbar" id="lab1-toolbar" style="display:none;">' +
        '<span class="list-toolbar__info" id="lab1-count"></span>' +
        '<button class="btn btn-ghost btn-sm" id="lab1-clear">' +
          '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="margin-right:3px"><path d="M2 4h10M5 4V3a1 1 0 011-1h2a1 1 0 011 1v1M6 7v3M8 7v3M3 4l.7 7a1 1 0 001 .9h4.6a1 1 0 001-.9L11 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          'Clear All' +
        '</button>' +
      '</div>' +
      '<div class="item-list" id="lab1-list" role="list" aria-live="polite"></div>' +
      '<div class="empty-state" id="lab1-empty">' +
        '<div class="empty-state__icon"><svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="6" y="6" width="28" height="28" rx="6" stroke="currentColor" stroke-width="1.6"/><path d="M14 15h12M14 20h8M14 25h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></div>' +
        '<p class="empty-state__text">Your list is empty. Start by adding an item above.</p>' +
      '</div>'
    );
  }

  function updateCount() {
    var count = $('#lab1-list').children().length;
    $('#lab1-count').text(count + ' item' + (count !== 1 ? 's' : ''));
    $('#lab1-empty').toggle(count === 0);
    $('#lab1-toolbar').toggle(count > 0);
    // Re-index visible items
    $('#lab1-list .item-index').each(function (i) {
      $(this).text(i + 1);
    });
  }

  function addItem() {
    var $input = $('#lab1-input');
    var text = $.trim($input.val());

    if (!text) {
      $input.addClass('is-error').focus();
      setTimeout(function () { $input.removeClass('is-error'); }, 800);
      return;
    }

    var id = LabUtils.uid();
    var safeText = LabUtils.escapeHtml(text);
    var count = $('#lab1-list').children().length + 1;
    var $entry = $(
      '<div class="item-list__entry" role="listitem" data-id="' + id + '" style="display:none;">' +
        '<span class="item-index">' + count + '</span>' +
        '<span class="item-text">' + safeText + '</span>' +
        '<button class="btn-delete" aria-label="Remove item" data-delete="' + id + '">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>' +
        '</button>' +
      '</div>'
    );

    $('#lab1-list').append($entry);
    $entry.slideDown(200);
    $input.val('').focus();
    updateCount();
  }

  function removeItem(id) {
    var $entry = $('[data-id="' + id + '"]');
    $entry.stop(true, true).slideUp(180, function () {
      $(this).remove();
      updateCount();
    });
  }

  function bindEvents() {
    $root.on('click', '#lab1-add', function () {
      addItem();
    });

    $root.on('keydown', '#lab1-input', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        addItem();
      }
    });

    $root.on('click', '.btn-delete', function () {
      var id = $(this).data('delete');
      removeItem(id);
    });

    $root.on('click', '#lab1-clear', function () {
      $('#lab1-list .item-list__entry').stop(true, true).slideUp(150, function () {
        $(this).remove();
        updateCount();
      });
    });
  }

  window.LabModules.task1 = {
    init: function () {
      render();
      bindEvents();
      updateCount();
    }
  };

})(jQuery);
