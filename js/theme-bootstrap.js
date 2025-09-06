// Early theme bootstrap: set .dark before Tailwind runtime scans the DOM
(function(){
  try {
    var root = document.documentElement;
    var stored = localStorage.getItem('theme');
    var isDark;
    if (stored === 'dark' || stored === 'light') {
      isDark = stored === 'dark';
    } else {
      var mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
      isDark = !!(mq && mq.matches);
    }
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  } catch (e) {}
})();