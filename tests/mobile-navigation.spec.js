import { test, expect } from '@playwright/test';

/**
 * Mobile Navigation E2E Tests - RED Phase
 * 
 * These tests define the expected mobile navigation behavior that doesn't exist yet.
 * All tests should FAIL initially because the bottom tab bar and mobile responsiveness
 * features are not implemented in the current codebase.
 * 
 * Requirements being tested:
 * 1. Left rail hidden on mobile (<768px)
 * 2. Bottom tab bar appears on mobile
 * 3. Bottom tab bar contains main navigation items
 * 4. Bottom tab bar is fixed and always visible
 * 5. iOS-style icons on top, labels below
 * 6. Visual active state for current tab
 * 7. Tab navigation functionality
 * 8. Theme toggle accessibility from bottom bar
 */

test.describe('Mobile Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    // Set icons ready manually for testing
    await page.evaluate(() => {
      document.documentElement.dataset.iconsReady = 'true';
    });
  });

  test.describe('Mobile Layout (<768px)', () => {
    test('should hide left rail completely on mobile screens', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
      
      // The left rail should be completely hidden on mobile
      const leftRail = page.locator('aside').first();
      await expect(leftRail).toBeHidden();
      
      // Check that it's using Tailwind's hidden class which sets display: none
      const classList = await leftRail.getAttribute('class');
      expect(classList).toContain('hidden');
    });

    test('should show bottom tab bar on mobile screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Bottom tab bar should exist and be visible
      const bottomTabBar = page.locator('[data-testid="mobile-bottom-tabs"]');
      await expect(bottomTabBar).toBeVisible();
      
      // Should be positioned at bottom of screen
      await expect(bottomTabBar).toHaveCSS('position', 'fixed');
      await expect(bottomTabBar).toHaveCSS('bottom', '0px');
      await expect(bottomTabBar).toHaveCSS('left', '0px');
      await expect(bottomTabBar).toHaveCSS('right', '0px');
    });

    test('should contain all main navigation items in bottom tab bar', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const bottomTabBar = page.locator('[data-testid="mobile-bottom-tabs"]');
      await expect(bottomTabBar).toBeVisible();
      
      // Check for required navigation items
      const requiredTabs = [
        { testId: 'tab-dashboard', label: 'Dashboard', icon: 'dashboard' },
        { testId: 'tab-content-hub', label: 'Content Hub', icon: 'library_books' },
        { testId: 'tab-tasks', label: 'Tasks', icon: 'task_alt' },
        { testId: 'tab-journal', label: 'Journal', icon: 'edit_note' },
        { testId: 'tab-create', label: 'Create', icon: 'add_circle' }
      ];
      
      for (const tab of requiredTabs) {
        const tabElement = bottomTabBar.locator(`[data-testid="${tab.testId}"]`);
        await expect(tabElement).toBeVisible();
        
        // Check for icon
        const icon = tabElement.locator('.material-symbols-rounded');
        await expect(icon).toBeVisible();
        await expect(icon).toHaveText(tab.icon);
        
        // Check for label (skip icon text by using a more specific selector)
        const label = tabElement.locator('span').last();
        await expect(label).toBeVisible();
        await expect(label).toHaveText(tab.label);
      }
    });

    test('should have iOS-style layout with icon on top and label below', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const firstTab = page.locator('[data-testid="tab-dashboard"]');
      await expect(firstTab).toBeVisible();
      
      // Tab should use flexbox column layout
      await expect(firstTab).toHaveCSS('display', 'flex');
      await expect(firstTab).toHaveCSS('flex-direction', 'column');
      await expect(firstTab).toHaveCSS('align-items', 'center');
      
      // Icon should be above label
      const icon = firstTab.locator('.material-symbols-rounded');
      const label = firstTab.locator('span').last();
      
      const iconBox = await icon.boundingBox();
      const labelBox = await label.boundingBox();
      
      expect(iconBox.y).toBeLessThan(labelBox.y);
    });

    test('should show active tab with distinct visual styling', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Dashboard should be active by default
      const dashboardTab = page.locator('[data-testid="tab-dashboard"]');
      await expect(dashboardTab).toHaveClass(/active|is-active/);
      
      // Active tab should have different background color
      const bgColor = await dashboardTab.evaluate((el) => 
        window.getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)'); // Not transparent
      
      // Icon in active tab should be filled
      const activeIcon = dashboardTab.locator('.material-symbols-rounded');
      const fontVariationSettings = await activeIcon.evaluate((el) => 
        window.getComputedStyle(el).fontVariationSettings
      );
      expect(fontVariationSettings).toContain('"FILL" 1'); // Filled icon
    });

    test('should navigate when tapping a tab', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Tap on Tasks tab
      const tasksTab = page.locator('[data-testid="tab-tasks"]');
      await tasksTab.click();
      
      // Should navigate to tasks section (for now, check if tab becomes active)
      await expect(tasksTab).toHaveClass(/active|is-active/);
      
      // Dashboard tab should no longer be active
      const dashboardTab = page.locator('[data-testid="tab-dashboard"]');
      await expect(dashboardTab).not.toHaveClass(/active|is-active/);
    });

    test('should include theme toggle in bottom tab bar', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const bottomTabBar = page.locator('[data-testid="mobile-bottom-tabs"]');
      const themeToggle = bottomTabBar.locator('[data-testid="mobile-theme-toggle"]');
      
      await expect(themeToggle).toBeVisible();
      
      // Should have theme icon
      const themeIcon = themeToggle.locator('.material-symbols-rounded');
      await expect(themeIcon).toBeVisible();
      
      // Icon should be either dark_mode or light_mode
      const iconText = await themeIcon.textContent();
      expect(['dark_mode', 'light_mode']).toContain(iconText);
    });

    test('should toggle theme when theme button is tapped', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Get initial theme state
      const htmlElement = page.locator('html');
      const initialIsDark = await htmlElement.evaluate((el) => el.classList.contains('dark'));
      
      // Click theme toggle in bottom bar
      const themeToggle = page.locator('[data-testid="mobile-theme-toggle"]');
      await themeToggle.click();
      
      // Theme should have changed
      const finalIsDark = await htmlElement.evaluate((el) => el.classList.contains('dark'));
      expect(finalIsDark).toBe(!initialIsDark);
    });

    test('should maintain bottom tab bar visibility when scrolling', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Scroll down the page
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(100); // Wait for scroll to complete
      
      // Bottom tab bar should still be visible and fixed
      const bottomTabBar = page.locator('[data-testid="mobile-bottom-tabs"]');
      await expect(bottomTabBar).toBeVisible();
      await expect(bottomTabBar).toHaveCSS('position', 'fixed');
    });
  });

  test.describe('Desktop Layout (≥768px)', () => {
    test('should show left rail and hide bottom tab bar on desktop', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Left rail should be visible
      const leftRail = page.locator('aside:has(.rail-logo)');
      await expect(leftRail).toBeVisible();
      
      // Bottom tab bar should be hidden
      const bottomTabBar = page.locator('[data-testid="mobile-bottom-tabs"]');
      await expect(bottomTabBar).toBeHidden();
    });
  });

  test.describe('Tablet Layout (768px-1023px)', () => {
    test('should show left rail and hide bottom tab bar on tablet', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Left rail should be visible
      const leftRail = page.locator('aside:has(.rail-logo)');
      await expect(leftRail).toBeVisible();
      
      // Bottom tab bar should be hidden (tablets use desktop navigation)
      const bottomTabBar = page.locator('[data-testid="mobile-bottom-tabs"]');
      await expect(bottomTabBar).toBeHidden();
    });
  });

  test.describe('Responsive Breakpoint Behavior', () => {
    test('should transition from mobile to desktop layout when resizing', async ({ page }) => {
      // Start with mobile
      await page.setViewportSize({ width: 375, height: 667 });
      
      const leftRail = page.locator('aside:has(.rail-logo)');
      const bottomTabBar = page.locator('[data-testid="mobile-bottom-tabs"]');
      
      // Verify mobile state
      await expect(leftRail).toBeHidden();
      await expect(bottomTabBar).toBeVisible();
      
      // Resize to desktop
      await page.setViewportSize({ width: 1024, height: 768 });
      
      // Verify desktop state
      await expect(leftRail).toBeVisible();
      await expect(bottomTabBar).toBeHidden();
    });

    test('should transition from desktop to mobile layout when resizing', async ({ page }) => {
      // Start with desktop
      await page.setViewportSize({ width: 1024, height: 768 });
      
      const leftRail = page.locator('aside:has(.rail-logo)');
      const bottomTabBar = page.locator('[data-testid="mobile-bottom-tabs"]');
      
      // Verify desktop state
      await expect(leftRail).toBeVisible();
      await expect(bottomTabBar).toBeHidden();
      
      // Resize to mobile
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Verify mobile state
      await expect(leftRail).toBeHidden();
      await expect(bottomTabBar).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA labels and roles for mobile tabs', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const bottomTabBar = page.locator('[data-testid="mobile-bottom-tabs"]');
      
      // Tab bar should have proper role
      await expect(bottomTabBar).toHaveAttribute('role', 'tablist');
      
      // Each tab should have proper attributes
      const dashboardTab = page.locator('[data-testid="tab-dashboard"]');
      await expect(dashboardTab).toHaveAttribute('role', 'tab');
      await expect(dashboardTab).toHaveAttribute('aria-label', /dashboard/i);
    });

    test('should support keyboard navigation in mobile tabs', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Focus first tab
      const dashboardTab = page.locator('[data-testid="tab-dashboard"]');
      await dashboardTab.focus();
      
      // Should be focusable
      await expect(dashboardTab).toBeFocused();
      
      // Arrow key should move to next tab
      await page.keyboard.press('ArrowRight');
      const contentHubTab = page.locator('[data-testid="tab-content-hub"]');
      await expect(contentHubTab).toBeFocused();
    });
  });
});
