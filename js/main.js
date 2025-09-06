console.log('*** SCRIPT START: Application initialization ***');

// === APPLICATION CONFIGURATION ===
const AppConfig = {
  NAVIGATION: [
    {
      id: 'dashboard',
      label: 'My Snapshot',
      icon: 'dashboard',
      iconFilled: true,
      active: true,
      action: 'navigate',
      href: '#dashboard'
    },
    {
      id: 'content-hub',
      label: 'Content Hub', 
      icon: 'library_books',
      action: 'drawer',
      drawer: 'right'
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: 'task_alt',
      action: 'demo',
      handler: 'toastDemo'
    },
    {
      id: 'journal',
      label: 'Journal',
      icon: 'edit_note',
      action: 'navigate',
      href: '#journal'
    },
    {
      id: 'learning-paths',
      label: 'Learning Paths',
      icon: 'route',
      action: 'navigate',
      href: '#paths',
      mobileLabel: 'Paths'
    },
    {
      id: 'programs',
      label: 'Programs',
      icon: 'video_library', 
      action: 'drawer',
      drawer: 'left'
    },
    {
      id: 'create',
      label: 'Create',
      icon: 'add_circle',
      action: 'submenu',
      submenu: 'create',
      desktopAction: 'drawer',
      desktopDrawer: 'left'
    }
  ],
  SUBMENU_CONFIG: {
    create: {
      title: 'Create New',
      items: [
        {
          id: 'create-program',
          label: 'Create Program',
          icon: 'add_box',
          primary: true
        },
        {
          id: 'invite-owners',
          label: 'Invite Owners',
          icon: 'person_add'
        },
        {
          id: 'import-csv',
          label: 'Import CSV',
          icon: 'upload_file'
        }
      ]
    }
  },
  THEME_KEY: 'theme',
  RAIL_COLLAPSED_KEY: 'railCollapsed'
};

// === GLOBAL STATE ===
let currentTheme = 'light';

// === UTILITY FUNCTIONS ===
function isMobile() {
  return window.innerWidth < 768;
}

function isDesktop() {
  return window.innerWidth >= 768;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// === THEME MANAGEMENT ===
function initializeTheme() {
  console.log('Initializing theme system...');
  
  function loadSavedTheme() {
    const stored = localStorage.getItem(AppConfig.THEME_KEY);
    if (stored === 'dark' || stored === 'light') {
      applyTheme(stored, false);
      return;
    }
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDark = !!(mq && mq.matches);
    applyTheme(prefersDark ? 'dark' : 'light', false);
  }
  
  function applyTheme(theme, save = true) {
    const root = document.documentElement;
    const isDark = theme === 'dark';
    
    root.classList.toggle('dark', isDark);
    root.style.colorScheme = theme;
    
    currentTheme = theme;
    
    if (save) {
      localStorage.setItem(AppConfig.THEME_KEY, theme);
    }
    
    updateThemeToggleIcons();
    console.log(`Theme applied: ${theme}`);
  }
  
  function updateThemeToggleIcons() {
    const toggles = document.querySelectorAll('[data-testid="theme-toggle"], #toggleDark, [data-testid="mobile-theme-toggle"], #mobileTopBarThemeToggle');
    toggles.forEach(toggle => {
      const icon = toggle.querySelector('.material-symbols-rounded');
      if (icon) {
        icon.textContent = currentTheme === 'dark' ? 'light_mode' : 'dark_mode';
      }
    });
  }
  
  function setupSystemPreferenceListener() {
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (mq && typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', (e) => {
        if (!localStorage.getItem(AppConfig.THEME_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light', false);
        }
      });
    }
  }
  
  // Initialize theme
  loadSavedTheme();
  setupSystemPreferenceListener();
  
  // Expose toggle function globally
  window.toggleTheme = function() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme, true);
  };
  
  console.log('Theme system initialized successfully');
}

// === NAVIGATION RENDERING ===
function renderDesktopNavigation() {
  console.log('Rendering desktop navigation...');
  const railNav = document.querySelector('[data-rail] nav');
  if (!railNav) {
    console.error('Desktop rail navigation container not found');
    return;
  }
  
  railNav.innerHTML = AppConfig.NAVIGATION.map(item => {
    const isActive = item.active ? 'active' : '';
    const iconClass = item.iconFilled ? 'fill-1' : '';
    
    return `
      <button 
        data-nav-item="${item.id}" 
        data-action="${item.action}" 
        ${item.drawer ? `data-drawer="${item.drawer}"` : ''}
        ${item.submenu ? `data-submenu="${item.submenu}"` : ''}
        ${item.href ? `data-href="${item.href}"` : ''}
        ${item.handler ? `data-handler="${item.handler}"` : ''}
        class="nav-item ${isActive} group flex flex-col items-center justify-center gap-1 p-3 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-200 active:scale-[0.96] min-h-[60px] focus:outline-none focus:ring-2 focus:ring-primary-400/60"
        aria-label="${item.label}"
      >
        <span class="material-symbols-rounded text-2xl transition-all duration-200 group-[.active]:text-primary-600 dark:group-[.active]:text-primary-400 group-[.active]:icon-fill-1 group-hover:icon-weight-600 group-hover:icon-size-28 ${iconClass}" translate="no">${item.icon}</span>
        <span class="text-xs font-medium transition-all duration-200 group-[.active]:text-primary-600 dark:group-[.active]:text-primary-400">${item.label}</span>
      </button>
    `;
  }).join('');
  
  console.log('Desktop navigation rendered successfully');
}

function renderMobileNavigation() {
  console.log('Rendering mobile navigation...');
  const mobileNav = document.querySelector('[data-testid="mobile-bottom-tabs"]');
  if (!mobileNav) {
    console.error('Mobile navigation container not found');
    return;
  }
  
  mobileNav.innerHTML = AppConfig.NAVIGATION.map(item => {
    const isActive = item.active ? 'active' : '';
    const iconClass = item.iconFilled ? 'fill-1' : '';
    const label = item.mobileLabel || item.label;
    
    return `
      <button 
        data-nav-item="${item.id}" 
        data-testid="tab-${item.id}"
        data-action="${item.action}" 
        ${item.drawer ? `data-drawer="${item.drawer}"` : ''}
        ${item.submenu ? `data-submenu="${item.submenu}"` : ''}
        ${item.href ? `data-href="${item.href}"` : ''}
        ${item.handler ? `data-handler="${item.handler}"` : ''}
        ${item.submenu ? `data-submenu-trigger="${item.submenu}"` : ''}
        class="nav-item ${isActive} group flex-1 flex flex-col items-center justify-center py-2 px-1 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-200 active:scale-95 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-primary-400/60 rounded-lg"
        role="tab"
        aria-selected="${item.active ? 'true' : 'false'}"
        aria-label="${label}"
      >
        <span class="material-symbols-rounded text-2xl transition-all duration-200 group-[.active]:icon-fill-1 group-hover:icon-weight-600 group-hover:icon-size-28 ${iconClass}" translate="no">${item.icon}</span>
        <span class="text-[10px] font-medium leading-tight transition-all duration-200">${label}</span>
      </button>
    `;
  }).join('');
  
  console.log('Mobile navigation rendered successfully');
}

// === NAVIGATION EVENT HANDLERS ===
function handleNavigation(element) {
  const action = element.dataset.action;
  const navId = element.dataset.navItem;
  
  // Update active state
  setActiveNavItem(navId);
  
  // Execute action based on type and viewport
  switch (action) {
    case 'navigate':
      const href = element.dataset.href;
      if (href) {
        console.log(`Navigate to: ${href}`);
      }
      break;
      
    case 'drawer':
      const drawer = element.dataset.drawer;
      if (drawer === 'left') {
        openLeft();
      } else if (drawer === 'right') {
        openRight();
      }
      break;
      
    case 'submenu':
      const submenu = element.dataset.submenu;
      if (isMobile()) {
        openBottomSubmenu(submenu);
      } else {
        // Desktop should open drawer instead
        openLeft();
      }
      break;
      
    case 'demo':
      const handler = element.dataset.handler;
      if (handler === 'toastDemo') {
        makeToast({
          title: 'Tasks synced',
          message: 'All tasks are up to date.',
          variant: 'success',
          style: 'glass'
        });
      }
      break;
  }
}

function setActiveNavItem(navId) {
  // Update both desktop and mobile nav items
  document.querySelectorAll('[data-nav-item]').forEach(item => {
    const isActive = item.dataset.navItem === navId;
    item.classList.toggle('active', isActive);
  });
}

// === COPY TO CLIPBOARD ===
async function copyToClipboard(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    const icon = button.querySelector('.material-symbols-rounded');
    if (icon) {
      const originalText = icon.textContent;
      icon.textContent = 'check';
      button.classList.add('text-success-600', 'dark:text-success-400');
      setTimeout(() => {
        icon.textContent = originalText;
        button.classList.remove('text-success-600', 'dark:text-success-400');
      }, 2000);
    }
  } catch (err) {
    console.error('Failed to copy:', err);
    const icon = button.querySelector('.material-symbols-rounded');
    if (icon) {
      const originalText = icon.textContent;
      icon.textContent = 'error';
      button.classList.add('text-error-600', 'dark:text-error-400');
      setTimeout(() => {
        icon.textContent = originalText;
        button.classList.remove('text-error-600', 'dark:text-error-400');
      }, 2000);
    }
  }
}

function setupCopyButtons() {
  const codeBlocks = document.querySelectorAll('code.block, code:not(.caption-text)');
  codeBlocks.forEach(codeBlock => {
    if (codeBlock.textContent.trim().length > 10) {
      addCopyButtonToCode(codeBlock);
    }
  });
}

function addCopyButtonToCode(codeBlock) {
  const container = codeBlock.parentElement;
  if (container.style.position !== 'relative') {
    container.style.position = 'relative';
  }
  const button = document.createElement('button');
  button.className = 'absolute top-2 right-2 p-2 rounded-lg bg-white dark:bg-neutral-800 shadow-sm hover:shadow-lg transition-shadow border border-neutral-200 dark:border-neutral-700';
  button.innerHTML = '<span class="material-symbols-rounded text-sm text-neutral-600 dark:text-neutral-400">content_copy</span>';
  button.onclick = (e) => {
    e.preventDefault();
    copyToClipboard(codeBlock.textContent, button);
  };
  container.appendChild(button);
}

// === DROPDOWN FUNCTIONALITY ===
function initializeDropdowns() {
  const dropdowns = document.querySelectorAll('[data-dropdown]');
  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('.dropdown-button');
    const menu = dropdown.querySelector('.dropdown-menu');
    const icon = button.querySelector('.material-symbols-rounded');
    if (!button || !menu) return;

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('hidden');
      closeAllDropdowns();
      if (isOpen) {
        menu.classList.remove('hidden');
        button.setAttribute('aria-expanded', 'true');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-dropdown]')) {
      closeAllDropdowns();
    }
  });
}

function closeDropdown(dropdown) {
  const button = dropdown.querySelector('.dropdown-button');
  const menu = dropdown.querySelector('.dropdown-menu');
  const icon = button.querySelector('.material-symbols-rounded');
  menu.classList.add('hidden');
  button.setAttribute('aria-expanded', 'false');
  if (icon) icon.style.transform = 'rotate(0deg)';
}

function closeAllDropdowns() {
  const dropdowns = document.querySelectorAll('[data-dropdown]');
  dropdowns.forEach(closeDropdown);
}

function initializeComboboxes() {
  // Simplified combobox implementation
  console.log('Combobox functionality available if needed');
}

function closeAllComboboxes() {
  // Placeholder for compatibility
}

// === DRAWER MANAGEMENT ===
const leftDrawer = document.getElementById('leftDrawer');
const rightDrawer = document.getElementById('rightDrawer');
const scrim = document.getElementById('scrim');
const inset = document.getElementById('leftInset');
const avatarBtn = document.getElementById('avatarBtn');
const avatarMenu = document.getElementById('avatarMenu');

function initDrawers() {
  if (leftDrawer) leftDrawer.dataset.open = 'false';
  if (rightDrawer) rightDrawer.dataset.open = 'false';
}

function openScrim() {
  if (scrim) {
    scrim.classList.remove('hidden');
    void scrim.offsetWidth;
    scrim.dataset.open = 'true';
  }
}

function closeScrim() {
  if (scrim) {
    scrim.dataset.open = 'false';
    setTimeout(() => scrim.classList.add('hidden'), 300);
  }
}

function initAvatarMenu() {
  if (avatarBtn) avatarBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!avatarMenu) return;
    const open = avatarMenu.dataset.open === 'true';
    avatarMenu.dataset.open = open ? 'false' : 'true';
    avatarBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
  });

  document.addEventListener('click', (e) => {
    if (!avatarMenu || !avatarBtn) return;
    if (!e.target.closest('#avatarBtn') && !e.target.closest('#avatarMenu')) {
      avatarMenu.dataset.open = 'false';
      avatarBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

function initScrimHandler() {
  if (scrim) scrim.addEventListener('click', () => {
    if (leftDrawer && leftDrawer.dataset.open === 'true') closeLeft();
    if (rightDrawer && rightDrawer.dataset.open === 'true') closeRight();
  });
}

function closeLeft() {
  if (!leftDrawer) return;
  leftDrawer.dataset.open = 'false';
  closeScrim();
}

function closeRight() {
  if (!rightDrawer) return;
  rightDrawer.dataset.open = 'false';
  closeScrim();
}

function openLeft() {
  if (!leftDrawer) return;
  leftDrawer.dataset.open = 'true';
  openScrim();
}

function openRight() {
  if (!rightDrawer) return;
  rightDrawer.dataset.open = 'true';
  openScrim();
}

function openInset() { if (inset) inset.dataset.open = 'true'; }
function closeInset() { if (inset) inset.dataset.open = 'false'; }

// === BOTTOM SUBMENU MANAGEMENT ===
function openBottomSubmenu(submenuId) {
  console.log('Opening bottom submenu:', submenuId);
  const submenu = document.querySelector(`[data-bottom-submenu="${submenuId}"]`);
  if (!submenu) {
    console.log('Submenu not found:', submenuId);
    return;
  }
  
  closeAllBottomSubmenus();
  submenu.dataset.open = 'true';
  
  const submenuPanel = submenu.querySelector('[data-submenu-panel]');
  if (submenuPanel) {
    submenuPanel.dataset.open = 'true';
  }
  
  const backdrop = submenu.querySelector('[data-submenu-backdrop]');
  if (backdrop) backdrop.dataset.open = 'true';
  
  document.body.style.overflow = 'hidden';
}

function closeBottomSubmenu(submenuId) {
  const submenu = document.querySelector(`[data-bottom-submenu="${submenuId}"]`);
  if (!submenu) return;
  
  submenu.dataset.open = 'false';
  const submenuPanel = submenu.querySelector('[data-submenu-panel]');
  if (submenuPanel) {
    submenuPanel.dataset.open = 'false';
  }
  
  const backdrop = submenu.querySelector('[data-submenu-backdrop]');
  if (backdrop) backdrop.dataset.open = 'false';
  
  document.body.style.overflow = '';
}

function closeAllBottomSubmenus() {
  document.querySelectorAll('[data-bottom-submenu]').forEach(submenu => {
    const submenuId = submenu.getAttribute('data-bottom-submenu');
    closeBottomSubmenu(submenuId);
  });
}

function initBottomSubmenus() {
  document.querySelectorAll('[data-submenu-close]').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      closeAllBottomSubmenus();
    });
  });
  
  document.querySelectorAll('[data-submenu-backdrop]').forEach(backdrop => {
    backdrop.addEventListener('click', () => {
      closeAllBottomSubmenus();
    });
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllBottomSubmenus();
    }
  });
}

// === TOAST SYSTEM ===
function makeToast({ title = 'Notification', message = '', variant = 'info', style = 'glass', timeout = 4000 } = {}) {
  const toastList = document.getElementById('toasts');
  if (!toastList) return () => {};

  const existingToasts = toastList.querySelectorAll('li');
  if (existingToasts.length >= 3) {
    // Since we insert new toasts at the beginning, the oldest toast is now at the end
    const oldestToast = existingToasts[existingToasts.length - 1];
    if (oldestToast) {
      oldestToast.dataset.open = 'false';
      oldestToast.addEventListener('transitionend', () => {
        oldestToast.remove();
        // Reposition remaining toasts after removal
        repositionToasts();
      }, { once: true });
    }
  }

  const glassMap = {
    success: 'bg-emerald-500/20 text-neutral-900 dark:bg-emerald-400/10 dark:text-neutral-50 ring-1 ring-emerald-500/30 dark:ring-emerald-400/20 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]',
    error:   'bg-red-500/20 text-neutral-900 dark:bg-red-400/10 dark:text-neutral-50 ring-1 ring-red-500/30 dark:ring-red-400/20 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]',
    warning: 'bg-amber-500/20 text-neutral-900 dark:bg-amber-400/10 dark:text-neutral-50 ring-1 ring-amber-500/30 dark:ring-amber-400/20 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]',
    info:    'bg-sky-500/20 text-neutral-900 dark:bg-sky-400/10 dark:text-neutral-50 ring-1 ring-sky-500/30 dark:ring-sky-400/20 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]',
  };
  const innerClasses = glassMap[variant] || glassMap.info;

  const li = document.createElement('li');
  li.setAttribute('role', variant === 'error' ? 'alert' : 'status');
  li.className = 'pointer-events-auto rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300 ease-out transform translate-y-4 opacity-0 data-[open=true]:translate-y-0 data-[open=true]:opacity-100';

  const inner = document.createElement('div');
  inner.className = `flex items-start gap-3 p-3 rounded-xl ${innerClasses}`;

  const icon = document.createElement('span');
  icon.setAttribute('translate', 'no');
  icon.className = 'material-symbols-rounded shrink-0';
  icon.textContent = variant === 'success' ? 'check_circle' : variant === 'error' ? 'error' : variant === 'warning' ? 'warning' : 'info';

  const content = document.createElement('div');
  content.className = 'min-w-0';
  const h = document.createElement('p');
  h.className = 'font-semibold leading-snug';
  h.textContent = title;
  content.appendChild(h);
  if (message) {
    const p = document.createElement('p');
    p.className = 'text-sm/5 opacity-90';
    p.textContent = message;
    content.appendChild(p);
  }

  const closeBtn = document.createElement('button');
  closeBtn.className = 'ml-auto shrink-0 rounded-md p-1 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white/60';
  const closeIcon = document.createElement('span');
  closeIcon.className = 'material-symbols-rounded';
  closeIcon.textContent = 'close';
  closeBtn.appendChild(closeIcon);

  inner.appendChild(icon);
  inner.appendChild(content);
  inner.appendChild(closeBtn);
  li.appendChild(inner);
  
  // Insert new toasts at the top (beginning) of the list
  // This ensures they appear above existing toasts
  if (toastList.firstChild) {
    toastList.insertBefore(li, toastList.firstChild);
  } else {
    toastList.appendChild(li);
  }

  requestAnimationFrame(() => {
    li.dataset.open = 'true';
  });

  function dismiss() {
    li.dataset.open = 'false';
    li.addEventListener('transitionend', () => {
      li.remove();
      // Reposition remaining toasts after removal
      repositionToasts();
    }, { once: true });
  }

  closeBtn.addEventListener('click', dismiss);
  if (timeout > 0) setTimeout(dismiss, timeout);
  return dismiss;
}

// Reposition toasts to ensure they always appear in correct order
function repositionToasts() {
  const toastList = document.getElementById('toasts');
  if (!toastList) return;
  
  // Get all visible toasts (those that are still in the DOM and not being removed)
  const toasts = Array.from(toastList.querySelectorAll('li[data-open="true"]'));
  
  // Sort toasts by their creation order (newest first)
  // Since we append new toasts, they naturally appear in chronological order
  // We want to maintain this order after removals
  toasts.forEach((toast, index) => {
    // Clear any leftover transforms
    toast.style.transform = '';
    toast.style.opacity = '1';
    
    // Ensure proper stacking order
    toast.style.zIndex = (1000 - index).toString();
  });
  
  // Force a layout recalculation
  toastList.offsetHeight;
}

// === MOBILE NAVIGATION ===
function initializeMobileTabs() {
  console.log('Initializing mobile tabs...');
  
  // Handle navigation clicks
  document.addEventListener('click', (e) => {
    const navItem = e.target.closest('[data-nav-item]');
    if (navItem) {
      e.preventDefault();
      handleNavigation(navItem);
    }
  });
  
  console.log('Mobile tabs initialized');
}

// === RAIL TOGGLE ===
function initializeRailToggle() {
  const rail = document.getElementById('desktopRail');
  const toggleBtn = document.getElementById('railToggle');
  const toggleIcon = toggleBtn ? toggleBtn.querySelector('.material-symbols-rounded') : null;
  const body = document.body;

  console.log('Rail toggle init:', {
    rail: !!rail,
    toggleBtn: !!toggleBtn,
    toggleIcon: !!toggleIcon
  });

  if (!rail || !toggleBtn || !toggleIcon) {
    console.warn('Rail toggle initialization failed - missing elements');
    return;
  }

  const savedState = localStorage.getItem('railCollapsed');
  const shouldBeCollapsed = savedState === 'true';
  
  rail.dataset.collapsed = shouldBeCollapsed.toString();
  body.dataset.railCollapsed = shouldBeCollapsed.toString();
  toggleIcon.textContent = shouldBeCollapsed ? 'menu' : 'menu_open';
  toggleBtn.setAttribute('aria-expanded', (!shouldBeCollapsed).toString());

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isCurrentlyCollapsed = rail.dataset.collapsed === 'true';
    const newCollapsedState = !isCurrentlyCollapsed;
    
    rail.dataset.collapsed = newCollapsedState.toString();
    body.dataset.railCollapsed = newCollapsedState.toString();
    toggleIcon.textContent = newCollapsedState ? 'menu' : 'menu_open';
    toggleBtn.setAttribute('aria-expanded', (!newCollapsedState).toString());
    localStorage.setItem('railCollapsed', newCollapsedState.toString());
  });
  
  console.log('Rail toggle initialized successfully');
}

// === MOBILE SEARCH ===
function initializeMobileSearch() {
  const searchTriggers = document.querySelectorAll('[data-search-trigger]');
  const searchOverlay = document.querySelector('[data-search-overlay]');
  const searchClose = document.querySelector('[data-search-close]');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  const desktopSearchInput = document.getElementById('searchInput');

  if (!searchOverlay || !searchClose) return;

  searchTriggers.forEach(searchTrigger => {
    searchTrigger.addEventListener('click', () => {
      searchOverlay.dataset.open = 'true';
      const searchBar = searchOverlay.querySelector('[data-search-bar]');
      if (searchBar) searchBar.dataset.open = 'true';
      
      if (desktopSearchInput && mobileSearchInput) {
        mobileSearchInput.value = desktopSearchInput.value;
      }
      setTimeout(() => {
        if (mobileSearchInput) mobileSearchInput.focus();
      }, 200);
    });
  });

  searchClose.addEventListener('click', () => {
    const searchBar = searchOverlay.querySelector('[data-search-bar]');
    if (searchBar) searchBar.dataset.open = 'false';
    
    setTimeout(() => {
      searchOverlay.dataset.open = 'false';
    }, 300);
    
    if (desktopSearchInput && mobileSearchInput) {
      desktopSearchInput.value = mobileSearchInput.value;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.dataset.open === 'true') {
      const searchBar = searchOverlay.querySelector('[data-search-bar]');
      if (searchBar) searchBar.dataset.open = 'false';
      
      setTimeout(() => {
        searchOverlay.dataset.open = 'false';
      }, 300);
    }
  });

  if (desktopSearchInput && mobileSearchInput) {
    desktopSearchInput.addEventListener('input', (e) => {
      mobileSearchInput.value = e.target.value;
    });
    
    mobileSearchInput.addEventListener('input', (e) => {
      desktopSearchInput.value = e.target.value;
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && searchOverlay.dataset.open === 'true') {
      searchOverlay.dataset.open = 'false';
    }
  });
}

// === LAZY LOADING ===
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    if (img.dataset.critical !== 'true') {
      img.classList.add('loading');
    }
    
    img.addEventListener('load', () => {
      img.classList.remove('loading');
      img.classList.add('loaded');
    });
    
    img.addEventListener('error', () => {
      img.classList.remove('loading');
      img.classList.add('error');
    });
  });
}

// === STYLE OVERRIDES ===
function applyStyleOverrides() {
  const style = document.createElement('style');
  style.textContent = `
    .btn:active, button:active {
      transform: scale(0.98) !important;
      transition: transform 0.15s ease-out !important;
    }
    .nav-item:active {
      transform: scale(0.96) !important;
      transition: transform 0.15s ease-out !important;
    }
    .drawer-panel {
      transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
    }
  `;
  document.head.appendChild(style);
}

// === FONT LOADING ===
function initializeFontLoading() {
  const rootEl = document.documentElement;
  try {
    if (document.fonts) {
      document.fonts.load('24px "Material Symbols Rounded"').then(() => {
        rootEl.dataset.iconsReady = 'true';
      });
    }
    setTimeout(() => { rootEl.dataset.iconsReady = 'true'; }, 2000);
  } catch {
    rootEl.dataset.iconsReady = 'true';
  }
}

// === EVENT DELEGATION ===
function initEventDelegation() {
  // Centralized click handler using event delegation
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;
    e.preventDefault();
    e.stopPropagation();

    // Handle different actions
    switch (action) {
      case 'toggle-theme':
        if (window.toggleTheme) {
          window.toggleTheme();
        }
        break;
      case 'open-left-drawer':
        if (leftDrawer) {
          leftDrawer.dataset.open = 'true';
          openScrim();
        }
        break;
      case 'open-right-drawer':
        if (rightDrawer) {
          rightDrawer.dataset.open = 'true';
          openScrim();
        }
        break;
      case 'close-left-drawer':
        closeLeft();
        break;
      case 'close-right-drawer':
        closeRight();
        break;
      case 'close-inset-drawer':
        closeInset();
        break;
      case 'open-inset-drawer':
        openInset();
        break;
      case 'demo-toast':
        makeToast({
          title: 'Tasks synced',
          message: 'All tasks are up to date.',
          variant: 'success',
          style: 'glass'
        });
        break;
    }
  });

  // Simplified keyboard handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (avatarMenu && avatarBtn) {
        avatarMenu.dataset.open = 'false';
        avatarBtn.setAttribute('aria-expanded', 'false');
      }
      if (leftDrawer && leftDrawer.dataset.open === 'true') closeLeft();
      if (rightDrawer && rightDrawer.dataset.open === 'true') closeRight();
      closeInset();
      closeAllDropdowns();
      closeAllComboboxes();
    }
  });
}

// === NAVIGATION MANAGER ===
const NavigationManager = {
  init() {
    console.log('NavigationManager: Initializing unified navigation system...');
    this.renderAll();
    console.log('NavigationManager: Initialization complete');
  },
  
  renderAll() {
    this.renderDesktop();
    this.renderMobile();
  },
  
  renderDesktop() {
    renderDesktopNavigation();
  },
  
  renderMobile() {
    renderMobileNavigation();
  }
};

// === APPLICATION INITIALIZATION ===
function initializeApp() {
  console.log('Starting application initialization...');
  
  try {
    // Initialize theme system first
    console.log('Initializing theme...');
    initializeTheme();
    
    // Initialize font loading
    console.log('Initializing font loading...');
    initializeFontLoading();
    
    // Initialize navigation using unified system
    console.log('Rendering navigation...');
    NavigationManager.init();
    
    // Initialize core functionality
    console.log('Initializing drawers...');
    initDrawers();
    
    console.log('Initializing avatar menu...');
    initAvatarMenu();
    
    console.log('Initializing scrim handler...');
    initScrimHandler();
    
    console.log('Initializing event delegation...');
    initEventDelegation();
    
    console.log('Initializing mobile tabs...');
    initializeMobileTabs();
    
    console.log('Initializing rail toggle...');
    if (isDesktop()) {
      initializeRailToggle();
    }
    
    console.log('Initializing mobile search...');
    initializeMobileSearch();
    
    console.log('Initializing bottom submenus...');
    initBottomSubmenus();
    
    console.log('Initializing dropdowns...');
    initializeDropdowns();
    
    console.log('Setting up copy buttons...');
    setupCopyButtons();
    
    console.log('Initializing lazy loading...');
    initLazyLoading();
    
    console.log('Applying style overrides...');
    applyStyleOverrides();
    
    // Add resize handler for responsive behavior
    window.addEventListener('resize', debounce(() => {
      if (isDesktop()) {
        const rail = document.getElementById('desktopRail');
        const toggleBtn = document.getElementById('railToggle');
        if (rail && toggleBtn && !toggleBtn.dataset.initialized) {
          initializeRailToggle();
          toggleBtn.dataset.initialized = 'true';
        }
      }
    }, 250));
    
    console.log('Application initialized successfully!');
    
  } catch (error) {
    console.error('Application initialization failed:', error);
    console.error('Stack trace:', error.stack);
  }
}

// Initialize all critical components properly
function initializeEverything() {
  console.log('*** UNIFIED NAVIGATION SCRIPT: Starting proper initialization ***');
  console.log('Starting unified component initialization...');
  
  try {
    // Navigation - Uses unified AppConfig.NAVIGATION
    NavigationManager.init();
    console.log('Navigation initialized');
    
    // Call other essential functions if they exist
    if (typeof initDrawers === 'function') {
      initDrawers();
      console.log('Drawers initialized');
    }
    
    if (typeof initAvatarMenu === 'function') {
      initAvatarMenu();
      console.log('Avatar menu initialized');
    }
    
    if (typeof initScrimHandler === 'function') {
      initScrimHandler();
      console.log('Scrim handler initialized');
    }
    
    if (typeof initBottomSubmenus === 'function') {
      initBottomSubmenus();
      console.log('Bottom submenus initialized');
    }
    
    console.log('*** ALL COMPONENTS INITIALIZED WITH UNIFIED NAVIGATION ***');
    
  } catch (error) {
    console.error('Initialization failed:', error);
    console.error('Stack trace:', error.stack);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM is already ready, initialize immediately
  setTimeout(initializeApp, 0);
}

// Run initialization immediately and on DOM ready
initializeEverything();
document.addEventListener('DOMContentLoaded', initializeEverything);