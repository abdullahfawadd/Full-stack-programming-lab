/**
 * HOTSPRING – Main JavaScript
 * Handles: navigation, form validation, animations, cart, payment, and interactive UI
 */
(function ($) {
  'use strict';

  /* ========================================
     1. AOS (Animate on Scroll) Initialization
     ======================================== */
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 60
  });

  /* ========================================
     2. Navbar Scroll Behavior
     ======================================== */
  var $navbar = $('#mainNav');
  function handleNavbarScroll() {
    if ($(window).scrollTop() > 50) {
      $navbar.addClass('scrolled');
    } else {
      $navbar.removeClass('scrolled');
    }
  }
  $(window).on('scroll', handleNavbarScroll);
  handleNavbarScroll();

  /* ========================================
     3. Back-to-Top Button
     ======================================== */
  var $backToTop = $('#backToTop');
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 400) {
      $backToTop.addClass('visible');
    } else {
      $backToTop.removeClass('visible');
    }
  });
  $backToTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  /* ========================================
     4. Toast Notification System
     ======================================== */
  function showToast(message, type) {
    type = type || 'success';
    var icons = {
      success: 'bi-check-circle-fill',
      error: 'bi-exclamation-triangle-fill',
      info: 'bi-info-circle-fill',
      warning: 'bi-exclamation-circle-fill'
    };
    var bgClass = {
      success: 'bg-success',
      error: 'bg-danger',
      info: 'bg-primary',
      warning: 'bg-warning text-dark'
    };
    var toastHTML =
      '<div class="toast align-items-center text-white ' + bgClass[type] + ' border-0 show" role="alert">' +
      '  <div class="d-flex">' +
      '    <div class="toast-body"><i class="bi ' + icons[type] + ' me-2"></i>' + $('<span>').text(message).html() + '</div>' +
      '    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>' +
      '  </div>' +
      '</div>';
    var $toast = $(toastHTML);
    $('#toastContainer').append($toast);
    setTimeout(function () {
      $toast.fadeOut(400, function () { $(this).remove(); });
    }, 4000);
  }

  /* ========================================
     5. Scroll-Triggered Animations
     ======================================== */
  function revealAnimatedElements() {
    $('.fade-up, .fade-left, .fade-right, .scale-in').each(function () {
      var el = this;
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        $(el).addClass('visible');
      }
    });
  }
  $(window).on('scroll', revealAnimatedElements);
  revealAnimatedElements();

  /* ========================================
     6. Counter Animation (About Page)
     ======================================== */
  var counterAnimated = false;
  function animateCounters() {
    if (counterAnimated) return;
    var $counters = $('.counter-number');
    if (!$counters.length) return;
    var $first = $counters.first();
    var rect = $first[0].getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      counterAnimated = true;
      $counters.each(function () {
        var $el = $(this);
        var target = parseInt($el.attr('data-target'), 10);
        if (isNaN(target)) return;
        var duration = 2000;
        var start = 0;
        var startTime = null;
        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          $el.text(Math.floor(eased * target));
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            $el.text(target);
          }
        }
        requestAnimationFrame(step);
      });
    }
  }
  $(window).on('scroll', animateCounters);
  animateCounters();

  /* ========================================
     7. Password Visibility Toggle
     ======================================== */
  $(document).on('click', '[data-toggle-password], .toggle-password', function () {
    var $btn = $(this);
    var targetId = $btn.attr('data-toggle-password') || $btn.data('target');
    var $input;
    if (targetId) {
      $input = $('#' + targetId);
    } else {
      $input = $btn.closest('.input-group, .position-relative').find('input[type="password"], input[type="text"]').first();
    }
    if (!$input.length) return;
    var isPassword = $input.attr('type') === 'password';
    $input.attr('type', isPassword ? 'text' : 'password');
    var $icon = $btn.find('i');
    if ($icon.length) {
      $icon.toggleClass('bi-eye bi-eye-slash');
    }
  });

  // Specific toggle for login page
  $('#toggleLoginPwd').on('click', function () {
    var $pwd = $(this).closest('.input-group, .position-relative').find('input');
    if (!$pwd.length) return;
    var isPwd = $pwd.attr('type') === 'password';
    $pwd.attr('type', isPwd ? 'text' : 'password');
    $(this).find('i').toggleClass('bi-eye bi-eye-slash');
  });

  /* ========================================
     8. Password Strength Meter
     ======================================== */
  function evaluatePasswordStrength(password) {
    var score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    return Math.min(score, 5);
  }

  function updateStrengthBar($bar, score) {
    var levels = [
      { width: '0%', color: '#e5e7eb', label: '' },
      { width: '20%', color: '#ef4444', label: 'Very Weak' },
      { width: '40%', color: '#f97316', label: 'Weak' },
      { width: '60%', color: '#eab308', label: 'Fair' },
      { width: '80%', color: '#22c55e', label: 'Strong' },
      { width: '100%', color: '#16a34a', label: 'Very Strong' }
    ];
    var level = levels[score] || levels[0];
    $bar.css({ width: level.width, backgroundColor: level.color });
    var $label = $bar.closest('.password-strength').find('.strength-label');
    if ($label.length) {
      $label.text(level.label);
    }
  }

  // Register page password strength
  $(document).on('input', '#registerPassword, #regPassword', function () {
    var score = evaluatePasswordStrength($(this).val());
    updateStrengthBar($('#passwordStrengthBar, #regPasswordStrengthBar'), score);
  });

  // Edit account page password strength
  $(document).on('input', '#newPassword', function () {
    var score = evaluatePasswordStrength($(this).val());
    updateStrengthBar($('#newPasswordStrengthBar'), score);
  });

  /* ========================================
     9. Form Validation Utilities
     ======================================== */
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    var stripped = phone.replace(/[\s\-\(\)\.]/g, '');
    return /^\+?[0-9]{7,15}$/.test(stripped);
  }

  function setFieldError($field, message) {
    $field.addClass('is-invalid').removeClass('is-valid');
    var $feedback = $field.siblings('.invalid-feedback');
    if ($feedback.length && message) {
      $feedback.text(message);
    }
  }

  function setFieldValid($field) {
    $field.addClass('is-valid').removeClass('is-invalid');
  }

  function clearFieldState($field) {
    $field.removeClass('is-valid is-invalid');
  }

  /* ========================================
     10. Login Form Validation
     ======================================== */
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    var valid = true;
    var $email = $(this).find('#loginEmail');
    var $password = $(this).find('#loginPassword');

    if (!$email.val().trim() || !validateEmail($email.val().trim())) {
      setFieldError($email, 'Please enter a valid email address.');
      valid = false;
    } else {
      setFieldValid($email);
    }

    if (!$password.val() || $password.val().length < 6) {
      setFieldError($password, 'Password must be at least 6 characters.');
      valid = false;
    } else {
      setFieldValid($password);
    }

    if (valid) {
      showToast('Login successful! Redirecting...', 'success');
      setTimeout(function () { window.location.href = 'my-account.html'; }, 1500);
    }
  });

  /* ========================================
     11. Register Form Validation
     ======================================== */
  $('#registerForm').on('submit', function (e) {
    e.preventDefault();
    var valid = true;
    var $form = $(this);

    // First Name
    var $fn = $form.find('#regFirstName, #firstName').first();
    if ($fn.length && !$fn.val().trim()) {
      setFieldError($fn, 'First name is required.');
      valid = false;
    } else if ($fn.length) {
      setFieldValid($fn);
    }

    // Last Name
    var $ln = $form.find('#regLastName, #lastName').first();
    if ($ln.length && !$ln.val().trim()) {
      setFieldError($ln, 'Last name is required.');
      valid = false;
    } else if ($ln.length) {
      setFieldValid($ln);
    }

    // Email
    var $email = $form.find('#regEmail, #registerEmail').first();
    if ($email.length && (!$email.val().trim() || !validateEmail($email.val().trim()))) {
      setFieldError($email, 'Please enter a valid email address.');
      valid = false;
    } else if ($email.length) {
      setFieldValid($email);
    }

    // Phone
    var $phone = $form.find('#regPhone, #registerPhone').first();
    if ($phone.length && $phone.val().trim() && !validatePhone($phone.val().trim())) {
      setFieldError($phone, 'Please enter a valid phone number.');
      valid = false;
    } else if ($phone.length && $phone.val().trim()) {
      setFieldValid($phone);
    }

    // Password
    var $pwd = $form.find('#regPassword, #registerPassword').first();
    if ($pwd.length && (!$pwd.val() || $pwd.val().length < 8)) {
      setFieldError($pwd, 'Password must be at least 8 characters.');
      valid = false;
    } else if ($pwd.length) {
      setFieldValid($pwd);
    }

    // Confirm Password
    var $cpwd = $form.find('#regConfirmPassword, #confirmPassword').first();
    if ($cpwd.length && $pwd.length && $cpwd.val() !== $pwd.val()) {
      setFieldError($cpwd, 'Passwords do not match.');
      valid = false;
    } else if ($cpwd.length && $cpwd.val()) {
      setFieldValid($cpwd);
    }

    // Terms checkbox
    var $terms = $form.find('#agreeTerms, #regTerms').first();
    if ($terms.length && !$terms.is(':checked')) {
      setFieldError($terms, 'You must agree to the terms.');
      valid = false;
    } else if ($terms.length) {
      setFieldValid($terms);
    }

    if (valid) {
      showToast('Registration successful! Redirecting to login...', 'success');
      setTimeout(function () { window.location.href = 'login.html'; }, 1500);
    }
  });

  /* ========================================
     12. Forgot Password Form
     ======================================== */
  $('#forgotPasswordForm').on('submit', function (e) {
    e.preventDefault();
    var $email = $(this).find('#forgotEmail');
    if (!$email.val().trim() || !validateEmail($email.val().trim())) {
      setFieldError($email, 'Please enter a valid email address.');
      return;
    }
    setFieldValid($email);
    $(this).closest('.auth-card').find('#forgotFormContent').addClass('d-none');
    $(this).closest('.auth-card').find('#forgotSuccess').removeClass('d-none');
    showToast('Reset link sent! Check your email.', 'success');
  });

  /* ========================================
     13. Contact Form Validation
     ======================================== */
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    var valid = true;
    var $form = $(this);

    var $name = $form.find('#contactName');
    if ($name.length && !$name.val().trim()) {
      setFieldError($name, 'Name is required.');
      valid = false;
    } else if ($name.length) {
      setFieldValid($name);
    }

    var $email = $form.find('#contactEmail');
    if ($email.length && !validateEmail($email.val().trim())) {
      setFieldError($email, 'Please enter a valid email.');
      valid = false;
    } else if ($email.length) {
      setFieldValid($email);
    }

    var $phone = $form.find('#contactPhone');
    if ($phone.length && $phone.val().trim() && !validatePhone($phone.val().trim())) {
      setFieldError($phone, 'Please enter a valid phone number.');
      valid = false;
    } else if ($phone.length && $phone.val().trim()) {
      setFieldValid($phone);
    }

    var $message = $form.find('#contactMessage');
    if ($message.length && !$message.val().trim()) {
      setFieldError($message, 'Message is required.');
      valid = false;
    } else if ($message.length) {
      setFieldValid($message);
    }

    var $consent = $form.find('#contactConsent');
    if ($consent.length && !$consent.is(':checked')) {
      setFieldError($consent, 'You must consent to data processing.');
      valid = false;
    } else if ($consent.length) {
      setFieldValid($consent);
    }

    if (valid) {
      showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
      $form[0].reset();
      $form.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
    }
  });

  /* ========================================
     14. Address Forms (Billing & Shipping)
     ======================================== */
  $('#billingAddressForm, #shippingAddressForm').on('submit', function (e) {
    e.preventDefault();
    var valid = true;
    var $form = $(this);

    $form.find('[required]').each(function () {
      var $field = $(this);
      if ($field.is('select')) {
        if (!$field.val()) {
          setFieldError($field, 'This field is required.');
          valid = false;
        } else {
          setFieldValid($field);
        }
      } else if (!$field.val().trim()) {
        setFieldError($field, 'This field is required.');
        valid = false;
      } else {
        setFieldValid($field);
      }
    });

    // ZIP validation
    var $zip = $form.find('[id*="Zip"], [id*="zip"]');
    if ($zip.length && $zip.val() && !/^[0-9]{5}$/.test($zip.val().trim())) {
      setFieldError($zip, 'Enter a valid 5-digit ZIP code.');
      valid = false;
    }

    // Email validation
    var $email = $form.find('[type="email"]');
    if ($email.length && $email.val() && !validateEmail($email.val().trim())) {
      setFieldError($email, 'Enter a valid email address.');
      valid = false;
    }

    if (valid) {
      showToast('Address saved successfully!', 'success');
    }
  });

  /* ========================================
     15. Edit Account / Change Password Form
     ======================================== */
  $('#editAccountForm').on('submit', function (e) {
    e.preventDefault();
    var valid = true;
    var $form = $(this);

    $form.find('[required]').each(function () {
      var $f = $(this);
      if (!$f.val().trim()) {
        setFieldError($f, 'This field is required.');
        valid = false;
      } else {
        setFieldValid($f);
      }
    });

    var $email = $form.find('[type="email"]');
    if ($email.length && $email.val() && !validateEmail($email.val().trim())) {
      setFieldError($email, 'Enter a valid email address.');
      valid = false;
    }

    if (valid) {
      showToast('Account details updated!', 'success');
    }
  });

  $('#changePasswordForm').on('submit', function (e) {
    e.preventDefault();
    var valid = true;
    var $current = $(this).find('#currentPassword');
    var $newPwd = $(this).find('#newPassword');
    var $confirm = $(this).find('#confirmNewPassword');

    if (!$current.val()) {
      setFieldError($current, 'Current password is required.');
      valid = false;
    } else {
      setFieldValid($current);
    }

    if (!$newPwd.val() || $newPwd.val().length < 8) {
      setFieldError($newPwd, 'New password must be at least 8 characters.');
      valid = false;
    } else {
      setFieldValid($newPwd);
    }

    if ($confirm.val() !== $newPwd.val()) {
      setFieldError($confirm, 'Passwords do not match.');
      valid = false;
    } else if ($confirm.val()) {
      setFieldValid($confirm);
    }

    if (valid) {
      showToast('Password changed successfully!', 'success');
      this.reset();
      $(this).find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
      updateStrengthBar($('#newPasswordStrengthBar'), 0);
    }
  });

  /* ========================================
     16. Payment Form Validation
     ======================================== */
  // Payment method switching
  $(document).on('change', 'input[name="paymentMethod"]', function () {
    var method = $(this).val();
    $('.payment-method').removeClass('active');
    $(this).closest('.payment-method').addClass('active');

    $('#creditCardFields, #paypalFields, #bankFields').addClass('d-none');
    if (method === 'credit-card') {
      $('#creditCardFields').removeClass('d-none');
    } else if (method === 'paypal') {
      $('#paypalFields').removeClass('d-none');
    } else if (method === 'bank-transfer') {
      $('#bankFields').removeClass('d-none');
    }
  });

  // Card number formatting
  $(document).on('input', '#cardNumber', function () {
    var val = $(this).val().replace(/\D/g, '').substring(0, 16);
    var formatted = val.replace(/(.{4})/g, '$1 ').trim();
    $(this).val(formatted);
  });

  // Payment form submission
  $('#paymentForm').on('submit', function (e) {
    e.preventDefault();
    var valid = true;
    var $form = $(this);

    // Validate shipping fields
    $form.find('#creditCardFields:visible [required], .dashboard-card [required]').each(function () {
      var $f = $(this);
      if ($f.is(':checkbox')) {
        if (!$f.is(':checked')) {
          setFieldError($f);
          valid = false;
        } else {
          setFieldValid($f);
        }
      } else if ($f.is('select')) {
        if (!$f.val()) {
          setFieldError($f);
          valid = false;
        } else {
          setFieldValid($f);
        }
      } else if (!$f.val().trim()) {
        setFieldError($f);
        valid = false;
      } else {
        setFieldValid($f);
      }
    });

    // Email validation
    var $email = $form.find('#shipEmail');
    if ($email.length && $email.val() && !validateEmail($email.val().trim())) {
      setFieldError($email, 'Enter a valid email address.');
      valid = false;
    }

    // ZIP validation
    var $zip = $form.find('#shipZip');
    if ($zip.length && $zip.val() && !/^[0-9]{5}$/.test($zip.val().trim())) {
      setFieldError($zip, 'Enter a valid ZIP code.');
      valid = false;
    }

    // Card number validation (only if card method selected)
    var method = $form.find('input[name="paymentMethod"]:checked').val();
    if (method === 'credit-card') {
      var $cardNum = $form.find('#cardNumber');
      var cardDigits = $cardNum.val().replace(/\s/g, '');
      if (cardDigits.length < 13 || cardDigits.length > 16) {
        setFieldError($cardNum, 'Enter a valid card number.');
        valid = false;
      }

      var $cvv = $form.find('#cardCvv');
      if ($cvv.val().length < 3) {
        setFieldError($cvv, 'Enter a valid CVV.');
        valid = false;
      }
    }

    // Terms agreement
    var $terms = $form.find('#agreeTerms');
    if ($terms.length && !$terms.is(':checked')) {
      setFieldError($terms);
      valid = false;
    }

    if (valid) {
      var $btn = $form.find('#placeOrderBtn');
      $btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Processing...');
      setTimeout(function () {
        showToast('Order placed successfully! Thank you for your purchase.', 'success');
        $btn.html('<i class="bi bi-check-circle me-2"></i>Order Confirmed!');
      }, 2000);
    }
  });

  /* ========================================
     17. Quantity Controls
     ======================================== */
  $(document).on('click', '.qty-minus', function () {
    var $input = $(this).siblings('.qty-input');
    var val = parseInt($input.val(), 10) || 1;
    if (val > 1) {
      $input.val(val - 1).trigger('change');
    }
  });

  $(document).on('click', '.qty-plus', function () {
    var $input = $(this).siblings('.qty-input');
    var val = parseInt($input.val(), 10) || 1;
    var max = parseInt($input.attr('max'), 10) || 99;
    if (val < max) {
      $input.val(val + 1).trigger('change');
    }
  });

  $(document).on('change', '.qty-input', function () {
    var val = parseInt($(this).val(), 10);
    var min = parseInt($(this).attr('min'), 10) || 1;
    var max = parseInt($(this).attr('max'), 10) || 99;
    if (isNaN(val) || val < min) $(this).val(min);
    if (val > max) $(this).val(max);
  });

  /* ========================================
     18. Shopping Cart Functionality
     ======================================== */
  function updateCartTotals() {
    var subtotal = 0;
    $('#cartBody tr').each(function () {
      var price = parseFloat($(this).attr('data-price')) || 0;
      var qty = parseInt($(this).find('.qty-input').val(), 10) || 1;
      var total = price * qty;
      $(this).find('.item-total').text('PKR ' + Math.round(total).toLocaleString('en-PK'));
      subtotal += total;
    });
    var tax = subtotal * 0.085;
    var grandTotal = subtotal + tax;
    $('#cartSubtotal').text('PKR ' + Math.round(subtotal).toLocaleString('en-PK'));
    $('#cartTax').text('PKR ' + Math.round(tax).toLocaleString('en-PK'));
    $('#cartTotal').text('PKR ' + Math.round(grandTotal).toLocaleString('en-PK'));
  }

  // Update on qty change
  $(document).on('change', '#cartBody .qty-input', updateCartTotals);
  $(document).on('click', '#cartBody .qty-minus, #cartBody .qty-plus', function () {
    setTimeout(updateCartTotals, 10);
  });

  // Remove item
  $(document).on('click', '.remove-item', function () {
    var $row = $(this).closest('tr');
    var name = $row.find('h6').text();
    $row.fadeOut(300, function () {
      $(this).remove();
      updateCartTotals();
      if ($('#cartBody tr').length === 0) {
        $('#cartBody').html(
          '<tr><td colspan="5" class="text-center py-5">' +
          '<i class="bi bi-cart-x display-4 text-muted mb-3 d-block"></i>' +
          '<h5 class="text-muted">Your cart is empty</h5>' +
          '<a href="../category.html" class="btn btn-primary-custom mt-3">Continue Shopping</a>' +
          '</td></tr>'
        );
      }
    });
    showToast(name + ' removed from cart.', 'info');
  });

  // Update cart button
  $('#updateCart').on('click', function () {
    updateCartTotals();
    showToast('Cart updated!', 'success');
  });

  // Apply coupon
  $('#applyCoupon').on('click', function () {
    var code = $('#couponCode').val().trim().toUpperCase();
    var $msg = $('#couponMessage');
    if (!code) {
      $msg.html('<small class="text-danger">Please enter a coupon code.</small>');
      return;
    }
    // Demo coupon codes
    var coupons = { 'HOTSPRING10': 0.10, 'SAVE20': 0.20, 'WELCOME': 0.05 };
    if (coupons[code]) {
      var discount = coupons[code];
      var subtotalText = $('#cartSubtotal').text().replace(/[^0-9.]/g, '');
      var subtotal = parseFloat(subtotalText) || 0;
      var discountAmt = subtotal * discount;
      $('#discountRow').css('display', 'flex').removeAttr('style');
      $('#discountAmount').text('-PKR ' + Math.round(discountAmt).toLocaleString('en-PK'));
      var tax = (subtotal - discountAmt) * 0.085;
      var newTotal = subtotal - discountAmt + tax;
      $('#cartTax').text('PKR ' + Math.round(tax).toLocaleString('en-PK'));
      $('#cartTotal').text('PKR ' + Math.round(newTotal).toLocaleString('en-PK'));
      $msg.html('<small class="text-success"><i class="bi bi-check-circle me-1"></i>Coupon applied! ' + (discount * 100) + '% off</small>');
      showToast('Coupon "' + code + '" applied!', 'success');
    } else {
      $msg.html('<small class="text-danger"><i class="bi bi-x-circle me-1"></i>Invalid coupon code.</small>');
    }
  });

  /* ========================================
     19. Product Gallery (Thumbnail Switching)
     ======================================== */
  $(document).on('click', '.product-thumb', function () {
    var newSrc = $(this).attr('data-img') || $(this).find('img').attr('src');
    if (newSrc) {
      var $mainImg = $(this).closest('.product-gallery, .col-lg-6, .col-md-6').find('.main-product-img, .product-main-img');
      if ($mainImg.length) {
        $mainImg.attr('src', newSrc);
      }
    }
    $(this).addClass('active').siblings().removeClass('active');
  });

  /* ========================================
     20. Product Color Selection
     ======================================== */
  $(document).on('click', '.color-option', function () {
    $(this).addClass('active').siblings().removeClass('active');
    var color = $(this).attr('data-color') || $(this).attr('title');
    var $label = $(this).closest('.product-colors, .color-selection').find('.selected-color');
    if ($label.length && color) {
      $label.text(color);
    }
  });

  /* ========================================
     21. Price Range Slider (Category Page)
     ======================================== */
  var $priceRange = $('#priceRange');
  if ($priceRange.length) {
    var $priceDisplay = $('#priceDisplay, .price-display');
    $priceRange.on('input', function () {
      var val = $(this).val();
      $priceDisplay.text('PKR 0 – PKR ' + parseInt(val, 10).toLocaleString());
    });
  }

  /* ========================================
     22. Newsletter Form
     ======================================== */
  $(document).on('submit', '#newsletterForm, .newsletter-form', function (e) {
    e.preventDefault();
    var $email = $(this).find('input[type="email"]');
    if (!$email.val().trim() || !validateEmail($email.val().trim())) {
      setFieldError($email, 'Please enter a valid email.');
      return;
    }
    setFieldValid($email);
    showToast('Thank you for subscribing!', 'success');
    $email.val('');
    setTimeout(function () { clearFieldState($email); }, 2000);
  });

  /* ========================================
     23. Smooth Scroll for Anchor Links
     ======================================== */
  $('a[href^="#"]').not('[data-bs-toggle]').on('click', function (e) {
    var target = $(this).attr('href');
    if (target && target !== '#' && $(target).length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $(target).offset().top - 80
      }, 600);
    }
  });

  /* ========================================
     24. Bootstrap Tooltips Initialization
     ======================================== */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function (el) {
    new bootstrap.Tooltip(el);
  });

  /* ========================================
     25. Real-time Field Validation (clear errors on input)
     ======================================== */
  $(document).on('input change', '.is-invalid', function () {
    clearFieldState($(this));
  });
  $(document).on('change', 'input[type="checkbox"].is-invalid', function () {
    clearFieldState($(this));
  });

  /* ========================================
     26. Mobile Nav Close on Link Click
     ======================================== */
  $('.navbar-nav .nav-link').on('click', function () {
    var $collapse = $('.navbar-collapse');
    if ($collapse.hasClass('show')) {
      $collapse.collapse('hide');
    }
  });

})(jQuery);
