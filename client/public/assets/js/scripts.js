// Close alert when clicked
const flashes = document.querySelectorAll('.flash__close');
for (let i = 0; i < flashes.length; i++) {
  flashes[i].addEventListener('click', function() {
    // Add fade class
    this.parentNode.classList.add('flash--fade');

    // Remove node after 0.5s
    setTimeout(() => {
      this.parentNode.parentNode.removeChild(this.parentNode);
    }, 500);
  });
}

// Handle mobile menu toggle
const menuToggle = document.querySelector('.header__menutoggle');
const menu = document.querySelector('.header__nav');
menuToggle.addEventListener('click', function() {
  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
  } else {
    menu.classList.add('active');
  }
});

// Handle user menu
const userMenuToggle = document.querySelector('.header__usertoggle');
const userMenu = document.querySelector('.header__user ul');
userMenuToggle.addEventListener('click', function() {
  if (userMenu.classList.contains('active')) {
    userMenu.classList.remove('active');
  } else {
    userMenu.classList.add('active');
  }
});

// Handle advanced search
const advancedSearchBtn = document.getElementById('advanced-toggle');
const advancedSearch = document.getElementById('advanced-fields');
if (advancedSearchBtn) {
  advancedSearchBtn.addEventListener('click', function(e) {
    e.preventDefault();

    if (advancedSearch.classList.contains('active')) {
      advancedSearch.classList.remove('active');
    } else {
      advancedSearch.classList.add('active');
    }
  });
}