function toggleDarkMode() {
    const body = document.body;
    const toggleButton = document.querySelector('.toggle-button');
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = '🌞 Dark Mode: On';
    } else {
        toggleButton.textContent = '🌙 Dark Mode: Off';
    }
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    window.location.href = 'index.html';
});