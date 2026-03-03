/**
 * Lab 3 — Interactive Form Validation
 */
;(function ($) {
  'use strict';

  var $root;

  var ICON_VALID = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="#16a34a" stroke-width="1.4"/><path d="M6 9l2 2 4-4" stroke="#16a34a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_ERROR = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="#dc2626" stroke-width="1.4"/><path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="#dc2626" stroke-width="1.4" stroke-linecap="round"/></svg>';

  var validators = {
    name: function (val) {
      if (!val) return 'Name is required.';
      if (val.length < 2) return 'Name must be at least 2 characters.';
      if (val.length > 60) return 'Name must be under 60 characters.';
      return null;
    },
    email: function (val) {
      if (!val) return 'Email is required.';
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(val)) return 'Please enter a valid email address.';
      return null;
    },
    password: function (val) {
      if (!val) return 'Password is required.';
      if (val.length < 8) return 'Password must be at least 8 characters.';
      return null;
    }
  };

  function getPasswordStrength(val) {
    if (!val) return { level: 0, label: '' };
    var score = 0;
    if (val.length >= 8) score++;
    if (val.length >= 12) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    if (score <= 2) return { level: 1, label: 'Weak' };
    if (score <= 3) return { level: 2, label: 'Fair' };
    return { level: 3, label: 'Strong' };
  }

  function render() {
    $root = $('#lab3-root');
    $root.html(
      '<div class="form-card">' +
        '<div class="form-card__header">' +
          '<h3 class="form-card__title">Create Account</h3>' +
          '<p class="form-card__subtitle">Fill in the fields below to register. All fields are required.</p>' +
        '</div>' +

        '<form class="validation-form" id="lab3-form" novalidate>' +

          '<div class="form-group field-wrapper">' +
            '<div class="form-label-row">' +
              '<label class="form-label" for="lab3-name">Full Name</label>' +
              '<span class="form-char-count" id="lab3-name-count">0 / 60</span>' +
            '</div>' +
            '<input class="form-input" id="lab3-name" name="name" type="text" placeholder="M Abdullah" autocomplete="name" maxlength="60">' +
            '<span class="field-icon" id="lab3-name-icon"></span>' +
            '<p class="form-error" id="lab3-name-error" role="alert"></p>' +
          '</div>' +

          '<div class="form-group field-wrapper">' +
            '<label class="form-label" for="lab3-email">Email Address</label>' +
            '<input class="form-input" id="lab3-email" name="email" type="email" placeholder="abdullah@example.com" autocomplete="email">' +
            '<span class="field-icon" id="lab3-email-icon"></span>' +
            '<p class="form-error" id="lab3-email-error" role="alert"></p>' +
          '</div>' +

          '<div class="form-group field-wrapper">' +
            '<label class="form-label" for="lab3-password">Password</label>' +
            '<div class="password-input-wrap">' +
              '<input class="form-input" id="lab3-password" name="password" type="password" placeholder="At least 8 characters" autocomplete="new-password">' +
              '<button type="button" class="password-toggle" id="lab3-pw-toggle" aria-label="Toggle password visibility">' +
                '<svg class="pw-eye-open" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>' +
                '<svg class="pw-eye-closed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>' +
              '</button>' +
            '</div>' +
            '<span class="field-icon" id="lab3-password-icon"></span>' +
            '<p class="form-error" id="lab3-password-error" role="alert"></p>' +
            '<div class="password-strength" id="lab3-strength">' +
              '<div class="password-strength__bar" id="str-1"></div>' +
              '<div class="password-strength__bar" id="str-2"></div>' +
              '<div class="password-strength__bar" id="str-3"></div>' +
            '</div>' +
            '<div class="strength-meta">' +
              '<p class="strength-label" id="lab3-strength-label"></p>' +
              '<ul class="password-rules" id="lab3-pw-rules">' +
                '<li data-rule="length">8+ characters</li>' +
                '<li data-rule="upper">Uppercase letter</li>' +
                '<li data-rule="number">Number</li>' +
                '<li data-rule="special">Special character</li>' +
              '</ul>' +
            '</div>' +
          '</div>' +

          '<div class="form-actions">' +
            '<button type="submit" class="btn btn-primary" id="lab3-submit">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>' +
              '<span>Create Account</span>' +
            '</button>' +
          '</div>' +
        '</form>' +
      '</div>' +

      '<div class="msg msg-success success-message mt-6" id="lab3-success" role="status">' +
        '<svg width="22" height="22" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.4"/><path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '<div class="success-body"><strong>Account created successfully!</strong><br>Welcome aboard, Abdullah.</div>' +
      '</div>'
    );
  }

  function validateField(name) {
    var $input = $('#lab3-' + name);
    var $error = $('#lab3-' + name + '-error');
    var $icon = $('#lab3-' + name + '-icon');
    var val = $.trim($input.val());
    var msg = validators[name](val);

    if (msg) {
      $input.removeClass('is-valid').addClass('is-error');
      $error.text(msg).addClass('show').hide().fadeIn(150);
      $icon.html(ICON_ERROR).addClass('show');
      return false;
    } else {
      $input.removeClass('is-error').addClass('is-valid');
      $error.removeClass('show').text('');
      $icon.html(ICON_VALID).addClass('show');
      return true;
    }
  }

  function updateStrength() {
    var val = $('#lab3-password').val();
    var s = getPasswordStrength(val);
    var bars = ['str-1', 'str-2', 'str-3'];
    var classes = ['weak', 'medium', 'strong'];

    bars.forEach(function (id, i) {
      var $bar = $('#' + id);
      $bar.removeClass('weak medium strong');
      if (i < s.level) {
        $bar.addClass(classes[Math.min(s.level - 1, 2)]);
      }
    });

    $('#lab3-strength-label').text(s.label);
  }

  function updatePasswordRules() {
    var val = $('#lab3-password').val() || '';
    var rules = {
      length: val.length >= 8,
      upper: /[A-Z]/.test(val),
      number: /[0-9]/.test(val),
      special: /[^A-Za-z0-9]/.test(val)
    };
    $('#lab3-pw-rules li').each(function () {
      var key = $(this).data('rule');
      $(this).toggleClass('is-met', !!rules[key]);
    });
  }

  function bindEvents() {
    $root.on('blur', '#lab3-name, #lab3-email, #lab3-password', function () {
      var name = $(this).attr('name');
      validateField(name);
    });

    // Real-time validation on input (after first blur)
    $root.on('input', '#lab3-name, #lab3-email, #lab3-password', function () {
      var $el = $(this);
      if ($el.hasClass('is-error') || $el.hasClass('is-valid')) {
        validateField($el.attr('name'));
      }
    });

    $root.on('input', '#lab3-password', function () {
      updateStrength();
      updatePasswordRules();
    });

    // Character counter for name
    $root.on('input', '#lab3-name', function () {
      var len = $(this).val().length;
      $('#lab3-name-count').text(len + ' / 60');
    });

    // Password visibility toggle
    $root.on('click', '#lab3-pw-toggle', function () {
      var $pw = $('#lab3-password');
      var isHidden = $pw.attr('type') === 'password';
      $pw.attr('type', isHidden ? 'text' : 'password');
      $(this).find('.pw-eye-open').toggle(!isHidden);
      $(this).find('.pw-eye-closed').toggle(isHidden);
    });

    $root.on('submit', '#lab3-form', function (e) {
      e.preventDefault();

      var nameOk = validateField('name');
      var emailOk = validateField('email');
      var passOk = validateField('password');

      if (nameOk && emailOk && passOk) {
        var $btn = $('#lab3-submit');
        $btn.prop('disabled', true).find('span').text('Creating...');
        setTimeout(function () {
          $('.form-card').fadeOut(250, function () {
            $('#lab3-success').fadeIn(300);
          });
        }, 600);
      } else {
        // Focus first invalid field
        $root.find('.is-error').first().focus();
      }
    });
  }

  window.LabModules.task3 = {
    init: function () {
      render();
      bindEvents();
    }
  };

})(jQuery);
