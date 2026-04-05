// Theme Switcher
(function () {
  const THEMES = {
    classic: {
      css: 'themes/classic.css',
      fonts: 'fonts/fonts.css'
    },
    modern: {
      css: 'themes/modern.css',
      fonts: 'fonts/fonts.css'
    },
    minimal: {
      css: 'themes/minimal.css',
      fonts: 'fonts/fonts.css'
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
