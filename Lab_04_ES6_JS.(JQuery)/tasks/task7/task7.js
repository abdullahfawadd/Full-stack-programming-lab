/**
 * Lab 7 — Drag-and-Drop Sortable List
 * Uses jQuery UI Sortable
 */
;(function ($) {
  'use strict';

  var ITEMS = [
    { id: 'item-a', text: 'Design system tokens and color palette' },
    { id: 'item-b', text: 'Component library architecture' },
    { id: 'item-c', text: 'Responsive layout grid system' },
    { id: 'item-d', text: 'Accessibility audit and ARIA labels' },
    { id: 'item-e', text: 'Animation and motion guidelines' },
    { id: 'item-f', text: 'API integration and data layer' },
    { id: 'item-g', text: 'Cross-browser testing and QA' },
    { id: 'item-h', text: 'Performance optimization pass' }
  ];

  var GRIP_ICON = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="5" cy="3" r="1.2" fill="currentColor"/><circle cx="11" cy="3" r="1.2" fill="currentColor"/><circle cx="5" cy="8" r="1.2" fill="currentColor"/><circle cx="11" cy="8" r="1.2" fill="currentColor"/><circle cx="5" cy="13" r="1.2" fill="currentColor"/><circle cx="11" cy="13" r="1.2" fill="currentColor"/></svg>';

  var $root;

  function render() {
    $root = $('#lab7-root');

    var listHtml = ITEMS.map(function (item, i) {
      return (
        '<div class="sortable-item" data-id="' + item.id + '">' +
          '<span class="drag-handle" aria-label="Drag to reorder">' + GRIP_ICON + '</span>' +
          '<span class="sortable-item__rank">' + (i + 1) + '</span>' +
          '<span class="sortable-item__text">' + LabUtils.escapeHtml(item.text) + '</span>' +
        '</div>'
      );
    }).join('');

    $root.html(
      '<div class="sortable-header">' +
        '<h3>Priority Order</h3>' +
        '<span class="badge">' + ITEMS.length + ' items</span>' +
      '</div>' +
      '<div class="sortable-list" id="lab7-sortable" role="list">' + listHtml + '</div>' +
      '<div class="order-readout" id="lab7-order" aria-live="polite">' +
        '<strong>Current order:</strong> ' + ITEMS.map(function (item) { return item.id; }).join(' → ') +
      '</div>'
    );
  }

  function updateRanks() {
    $('#lab7-sortable .sortable-item').each(function (i) {
      $(this).find('.sortable-item__rank').text(i + 1);
    });

    var order = $('#lab7-sortable .sortable-item').map(function () {
      return $(this).data('id');
    }).get();

    $('#lab7-order').html('<strong>Current order:</strong> ' + order.join(' → '));
  }

  function initSortable() {
    $('#lab7-sortable').sortable({
      handle: '.drag-handle',
      axis: 'y',
      tolerance: 'pointer',
      cursor: 'grabbing',
      placeholder: 'sortable-item ui-sortable-placeholder',
      forcePlaceholderSize: true,
      opacity: 0.92,
      revert: 120,
      update: function () {
        updateRanks();
      }
    }).disableSelection();
  }

  window.LabModules.task7 = {
    init: function () {
      render();
      initSortable();
    }
  };

})(jQuery);
