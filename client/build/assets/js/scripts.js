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