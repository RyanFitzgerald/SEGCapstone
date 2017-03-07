/*
 * Header.js
 * This file contains scripts related to the header functionality
 */

// Hide the dropdown if clicked outside
$(document).click(function() {
    if ($('#user-dropdown').hasClass('active')) {
        $('#user-dropdown').removeClass('active');
    }
});

// Show/hide user dropdown menu
$('#user-select > a').click(function() {
    $('#user-dropdown').toggleClass('active');
    return false; // preventDefault and StopPropagation
});

// Toggle sidebar on mobile
$('#sidebar-toggle').click(function(e) {
    e.preventDefault();
    $('#sidebar, #dashboard, body').toggleClass('active');
});
