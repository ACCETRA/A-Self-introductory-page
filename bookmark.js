function toggleTheme() {
  document.body.classList.toggle('dark');
}

// Add theme toggle button to the page
document.addEventListener('DOMContentLoaded', function() {
  const themeButton = document.createElement('button');
  themeButton.innerHTML = '🌙';
  themeButton.id = 'theme-toggle';
  themeButton.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #007BFF;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 1000;
    transition: all 0.3s ease;
  `;

  themeButton.addEventListener('click', function() {
    toggleTheme();
    this.innerHTML = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });

  document.body.appendChild(themeButton);
});
