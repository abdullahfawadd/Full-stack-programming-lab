/**
 * Lab 2 — Animated Image Gallery
 */
;(function ($) {
  'use strict';

  var IMAGES = [
    { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', caption: 'Mountain lake at dawn — Yosemite Valley' },
    { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', caption: 'Golden sunlight through alpine meadow' },
    { src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80', caption: 'Misty forest path in Pacific Northwest' },
    { src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80', caption: 'Rolling green hills under cloudy sky' },
    { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80', caption: 'Lakeside reflections at sunset' },
    { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80', caption: 'Fog rolling through coastal redwoods' }
  ];

  var current = 0;
  var animating = false;
  var autoplayTimer = null;
  var $root, $stage, $caption, $counter, $dots;

  function render() {
    $root = $('#lab2-root');

    var imagesHtml = IMAGES.map(function (img, i) {
      return '<img class="gallery__image' + (i === 0 ? ' is-active' : '') + '" src="' + img.src + '" alt="' + LabUtils.escapeHtml(img.caption) + '" loading="lazy">';
    }).join('');

    var dotsHtml = IMAGES.map(function (_, i) {
      return '<button class="gallery__dot' + (i === 0 ? ' is-active' : '') + '" data-index="' + i + '" aria-label="Go to image ' + (i + 1) + '"></button>';
    }).join('');

    $root.html(
      '<div class="gallery">' +
        '<div class="gallery__stage" role="img" aria-label="Image gallery">' +
          imagesHtml +
          '<div class="gallery__overlay-nav">' +
            '<button class="gallery__arrow gallery__arrow--left" id="lab2-prev-overlay" aria-label="Previous">' +
              '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 15L7 10l5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</button>' +
            '<button class="gallery__arrow gallery__arrow--right" id="lab2-next-overlay" aria-label="Next">' +
              '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 5l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
        '<p class="gallery__caption" aria-live="polite">' + IMAGES[0].caption + '</p>' +
        '<div class="gallery__controls">' +
          '<button class="btn btn-secondary btn-sm" id="lab2-prev" aria-label="Previous image">' +
            '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            ' Prev' +
          '</button>' +
          '<span class="gallery__counter" id="lab2-counter">1 / ' + IMAGES.length + '</span>' +
          '<button class="btn btn-secondary btn-sm" id="lab2-next" aria-label="Next image">' +
            'Next ' +
            '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</button>' +
          '<button class="btn btn-ghost btn-sm" id="lab2-autoplay" aria-label="Toggle autoplay" aria-pressed="false">' +
            '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 3l8 5-8 5V3z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="gallery__dots" id="lab2-dots">' + dotsHtml + '</div>' +
        '<p class="gallery__hint">Use arrow keys or click to navigate</p>' +
      '</div>'
    );

    $stage = $root.find('.gallery__stage');
    $caption = $root.find('.gallery__caption');
    $counter = $('#lab2-counter');
    $dots = $root.find('.gallery__dot');
  }

  function goTo(index) {
    if (animating || index === current) return;
    animating = true;

    var $currentImg = $stage.find('.gallery__image').eq(current);
    var $nextImg = $stage.find('.gallery__image').eq(index);

    $currentImg.stop(true, true).fadeOut(220, function () {
      $(this).removeClass('is-active');
    });

    $nextImg.stop(true, true).fadeIn(280, function () {
      $(this).addClass('is-active');
      animating = false;
    });

    current = index;
    $caption.text(IMAGES[current].caption);
    $counter.text((current + 1) + ' / ' + IMAGES.length);
    $dots.removeClass('is-active').eq(current).addClass('is-active');
  }

  function next() {
    goTo((current + 1) % IMAGES.length);
  }

  function prev() {
    goTo((current - 1 + IMAGES.length) % IMAGES.length);
  }

  function toggleAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
      $('#lab2-autoplay').removeClass('is-active').attr('aria-pressed', 'false');
    } else {
      autoplayTimer = setInterval(next, 3500);
      $('#lab2-autoplay').addClass('is-active').attr('aria-pressed', 'true');
    }
  }

  function bindEvents() {
    $root.on('click', '#lab2-next, #lab2-next-overlay', next);
    $root.on('click', '#lab2-prev, #lab2-prev-overlay', prev);
    $root.on('click', '.gallery__dot', function () {
      goTo(parseInt($(this).data('index'), 10));
    });
    $root.on('click', '#lab2-autoplay', toggleAutoplay);

    // Keyboard support
    $(document).on('keydown.lab2', function (e) {
      if (!$('#task-2').hasClass('active')) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  }

  window.LabModules.task2 = {
    init: function () {
      render();
      bindEvents();
    }
  };

})(jQuery);
