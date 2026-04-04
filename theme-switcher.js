// Theme Switcher
(function () {
  const THEMES = {
    classic: {
      css: 'themes/classic.css',
      fonts: 'https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@0,400;0,700;1,400&family=Open+Sans+Condensed:wght@300;400;700&display=swap'
    },
    modern: {
      css: 'themes/modern.css',
      fonts: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400&family=Inter:wght@400;700&display=swap'
    },
    minimal: {
      css: 'themes/minimal.css',
      fonts: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@400;700&display=swap'
    }
  };

  function getTheme() {
    const urlParam = new URLSearchParams(window.location.search).get('theme');
    if (urlParam && THEMES[urlParam]) return urlParam;
    return localStorage.getItem('eden-theme') || 'classic';
  }

  function applyTheme(name) {
    const theme = THEMES[name];
    if (!theme) return;

    // Set data-theme on <html> for CSS selectors
    document.documentElement.setAttribute('data-theme', name);

    // Swap theme CSS
    let themeLink = document.getElementById('theme-css');
    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.rel = 'stylesheet';
      themeLink.id = 'theme-css';
      document.head.appendChild(themeLink);
    }
    themeLink.href = theme.css;

    // Swap Google Fonts
    let fontLink = document.getElementById('theme-fonts');
    if (!fontLink) {
      fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.id = 'theme-fonts';
      document.head.appendChild(fontLink);
    }
    fontLink.href = theme.fonts;

    // Update buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === name);
    });

    localStorage.setItem('eden-theme', name);
  }

  // Apply on load
  const current = getTheme();
  applyTheme(current);

  // Wire up buttons after DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.theme-btn').forEach(btn => {
      if (btn.dataset.theme === current) btn.classList.add('active');
      btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
    });
  });
})();
