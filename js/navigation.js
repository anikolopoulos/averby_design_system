console.log('*** UNIFIED NAVIGATION SCRIPT: Starting proper initialization ***');

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

// Initialize all critical components properly
function initializeEverything() {
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

// Run initialization immediately and on DOM ready
initializeEverything();
document.addEventListener('DOMContentLoaded', initializeEverything);