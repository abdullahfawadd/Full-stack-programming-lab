/**
 * Lab 6 — API Data Fetcher
 */
;(function ($) {
  'use strict';

  var API_URL = 'https://jsonplaceholder.typicode.com/posts';
  var PAGE_SIZE = 6;
  var page = 1;
  var isLoading = false;
  var allLoaded = false;
  var $root, $list, $loadBtn, $loader;

  function render() {
    $root = $('#lab6-root');
    $root.html(
      '<div class="fetch-header">' +
        '<h3>Recent Posts</h3>' +
        '<button class="btn btn-secondary btn-sm" id="lab6-refresh" aria-label="Refresh posts">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.65 2.35A7.96 7.96 0 008 0C3.58 0 0 3.58 0 8s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 018 14 6 6 0 118 2c1.66 0 3.14.69 4.22 1.78L9 7h7V0l-2.35 2.35z" fill="currentColor" transform="scale(0.85) translate(1,1)"/></svg>' +
          ' Refresh' +
        '</button>' +
      '</div>' +
      '<div class="data-list" id="lab6-list" role="feed" aria-label="Posts list"></div>' +
      '<div class="loading-indicator" id="lab6-loader" style="display:none;">' +
        '<span class="spinner"></span> Loading posts&hellip;' +
      '</div>' +
      '<div class="empty-state" id="lab6-empty" style="display:none;">' +
        '<div class="empty-state__icon"><svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="currentColor" stroke-width="1.6"/><path d="M20 12v4M20 24v4M12 20h4M24 20h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></div>' +
        '<p class="empty-state__text">No posts loaded yet.</p>' +
      '</div>' +
      '<div class="msg msg-error mt-4" id="lab6-error" style="display:none;" role="alert">' +
        'Failed to load posts. Please check your connection and try again.' +
      '</div>' +
      '<div class="load-more-row">' +
        '<button class="btn btn-secondary" id="lab6-load-more">Load More</button>' +
      '</div>'
    );

    $list = $('#lab6-list');
    $loadBtn = $('#lab6-load-more');
    $loader = $('#lab6-loader');
  }

  function renderCards(posts) {
    var html = posts.map(function (post) {
      return (
        '<article class="data-card" style="display:none;">' +
          '<h4 class="data-card__title">' + LabUtils.escapeHtml(post.title) + '</h4>' +
          '<p class="data-card__body">' + LabUtils.escapeHtml(post.body) + '</p>' +
          '<div class="data-card__meta">' +
            '<span class="badge">Post #' + post.id + '</span>' +
            '<span class="badge">User ' + post.userId + '</span>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    var $newCards = $(html);
    $list.append($newCards);
    $newCards.each(function (i) {
      var $card = $(this);
      setTimeout(function () {
        $card.fadeIn(200);
      }, i * 60);
    });
  }

  function fetchPosts() {
    if (isLoading || allLoaded) return;
    isLoading = true;

    $loadBtn.prop('disabled', true).text('Loading…');
    $loader.show();
    $('#lab6-error').hide();
    $('#lab6-empty').hide();

    $.ajax({
      url: API_URL,
      method: 'GET',
      data: {
        _start: (page - 1) * PAGE_SIZE,
        _limit: PAGE_SIZE
      },
      dataType: 'json',
      timeout: 10000
    })
    .done(function (data) {
      if (data.length === 0 || page * PAGE_SIZE >= 100) {
        allLoaded = true;
        $loadBtn.text('All Posts Loaded').prop('disabled', true);
      } else {
        page++;
        $loadBtn.text('Load More').prop('disabled', false);
      }

      if (data.length > 0) {
        renderCards(data);
      } else if ($list.children().length === 0) {
        $('#lab6-empty').show();
      }
    })
    .fail(function () {
      $('#lab6-error').fadeIn(200);
      $loadBtn.text('Retry').prop('disabled', false);
    })
    .always(function () {
      isLoading = false;
      $loader.hide();
    });
  }

  function resetAndFetch() {
    page = 1;
    allLoaded = false;
    isLoading = false;
    $list.empty();
    fetchPosts();
  }

  function bindEvents() {
    $root.on('click', '#lab6-load-more', fetchPosts);
    $root.on('click', '#lab6-refresh', resetAndFetch);
  }

  window.LabModules.task6 = {
    init: function () {
      render();
      bindEvents();
      fetchPosts();
    }
  };

})(jQuery);
