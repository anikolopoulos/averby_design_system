import { test, expect } from '@playwright/test';

test.describe('Collapsible Rail Feature', () => {
  test.describe('Desktop Rail Toggle', () => {
    test.beforeEach(async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/base.html');
      // Clear localStorage to reset rail state
      await page.evaluate(() => localStorage.removeItem('railCollapsed'));
      await page.reload();
    });

    test('should display toggle button in top navbar on desktop', async ({ page }) => {
      const toggleButton = page.locator('#railToggle');
      
      // Should be visible on desktop
      await expect(toggleButton).toBeVisible();
      
      // Should have correct icon initially (menu_open)
      const icon = toggleButton.locator('.material-symbols-rounded');
      await expect(icon).toHaveText('menu_open');
      
      // Should have correct ARIA attributes
      await expect(toggleButton).toHaveAttribute('aria-label', 'Toggle navigation rail');
      await expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });

    test('should not display toggle button on mobile', async ({ page }) => {
      // Switch to mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      const toggleButton = page.locator('#railToggle');
      await expect(toggleButton).toBeHidden();
    });

    test('should collapse rail when toggle button is clicked', async ({ page }) => {
      const rail = page.locator('#desktopRail');
      const toggleButton = page.locator('#railToggle');
      const toggleIcon = toggleButton.locator('.material-symbols-rounded');
      
      // Rail should be visible initially
      await expect(rail).toBeVisible();
      await expect(rail).toHaveAttribute('data-collapsed', 'false');
      
      // Click toggle button
      await toggleButton.click();
      
      // Rail should be collapsed
      await expect(rail).toHaveAttribute('data-collapsed', 'true');
      
      // Icon should change to menu
      await expect(toggleIcon).toHaveText('menu');
      
      // ARIA attribute should update
      await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      
      // Body should have data attribute
      await expect(page.locator('body')).toHaveAttribute('data-rail-collapsed', 'true');
    });

    test('should expand rail when toggle button is clicked again', async ({ page }) => {
      const rail = page.locator('#desktopRail');
      const toggleButton = page.locator('#railToggle');
      const toggleIcon = toggleButton.locator('.material-symbols-rounded');
      
      // Collapse rail first
      await toggleButton.click();
      await expect(rail).toHaveAttribute('data-collapsed', 'true');
      
      // Click again to expand
      await toggleButton.click();
      
      // Rail should be expanded
      await expect(rail).toHaveAttribute('data-collapsed', 'false');
      
      // Icon should change back to menu_open
      await expect(toggleIcon).toHaveText('menu_open');
      
      // ARIA attribute should update
      await expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      
      // Body data attribute should update
      await expect(page.locator('body')).toHaveAttribute('data-rail-collapsed', 'false');
    });

    test('should persist rail state in localStorage', async ({ page }) => {
      const toggleButton = page.locator('#railToggle');
      
      // Collapse rail
      await toggleButton.click();
      
      // Check localStorage
      const railState = await page.evaluate(() => localStorage.getItem('railCollapsed'));
      expect(railState).toBe('true');
      
      // Reload page
      await page.reload();
      
      // Rail should remain collapsed
      const rail = page.locator('#desktopRail');
      await expect(rail).toHaveAttribute('data-collapsed', 'true');
      
      // Icon should be in collapsed state
      const toggleIcon = toggleButton.locator('.material-symbols-rounded');
      await expect(toggleIcon).toHaveText('menu');
    });

    test('should adjust left drawer position when rail is collapsed', async ({ page }) => {
      const toggleButton = page.locator('#railToggle');
      const leftDrawer = page.locator('#leftDrawer');
      const openDrawerButton = page.locator('[data-open-left-drawer]').first();
      
      // Open drawer with rail expanded
      await openDrawerButton.click();
      
      // Drawer should start at 6rem (rail width)
      await expect(leftDrawer).toBeVisible();
      const expandedStyles = await leftDrawer.evaluate(el => 
        window.getComputedStyle(el).left
      );
      
      // Close drawer
      await page.locator('[data-close-left]').first().click();
      await page.waitForTimeout(500); // Wait for animation
      
      // Collapse rail
      await toggleButton.click();
      
      // Open drawer with rail collapsed
      await openDrawerButton.click();
      
      // Drawer should start at 0
      await expect(leftDrawer).toBeVisible();
      const collapsedStyles = await leftDrawer.evaluate(el => 
        window.getComputedStyle(el).left
      );
      
      // When rail is collapsed, drawer should be at left edge
      expect(collapsedStyles).toBe('0px');
    });

    test('should adjust scrim position when rail is collapsed', async ({ page }) => {
      const toggleButton = page.locator('#railToggle');
      const scrim = page.locator('#scrim');
      const openDrawerButton = page.locator('[data-open-left-drawer]').first();
      
      // Open drawer to show scrim
      await openDrawerButton.click();
      await expect(scrim).toBeVisible();
      
      // Check scrim left position with rail expanded
      const expandedLeft = await scrim.evaluate(el => 
        window.getComputedStyle(el).left
      );
      
      // Close drawer
      await page.locator('[data-close-left]').first().click();
      await page.waitForTimeout(500);
      
      // Collapse rail
      await toggleButton.click();
      
      // Open drawer again
      await openDrawerButton.click();
      await expect(scrim).toBeVisible();
      
      // Check scrim left position with rail collapsed
      const collapsedLeft = await scrim.evaluate(el => 
        window.getComputedStyle(el).left
      );
      
      // Scrim should start at 0 when rail is collapsed
      expect(collapsedLeft).toBe('0px');
    });

    test('should hide rail content when collapsed', async ({ page }) => {
      const toggleButton = page.locator('#railToggle');
      const rail = page.locator('#desktopRail');
      const railLogo = rail.locator('.rail-logo');
      const navLabels = rail.locator('.nav-label');
      
      // Initially visible
      await expect(railLogo).toBeVisible();
      await expect(navLabels.first()).toBeVisible();
      
      // Collapse rail
      await toggleButton.click();
      
      // Wait for animation
      await page.waitForTimeout(350);
      
      // Rail should have width 0
      const railWidth = await rail.evaluate(el => 
        window.getComputedStyle(el).width
      );
      expect(railWidth).toBe('0px');
      
      // Content should be hidden (opacity 0)
      const logoOpacity = await railLogo.evaluate(el => 
        window.getComputedStyle(el).opacity
      );
      expect(logoOpacity).toBe('0');
    });

    test('should maintain smooth transitions', async ({ page }) => {
      const rail = page.locator('#desktopRail');
      const toggleButton = page.locator('#railToggle');
      
      // Check transition styles
      const transitionDuration = await rail.evaluate(el => 
        window.getComputedStyle(el).transitionDuration
      );
      
      // Should have 300ms transition
      expect(transitionDuration).toContain('0.3s');
      
      // Toggle and verify smooth animation
      await toggleButton.click();
      
      // Check if transition is applied
      const transitionProperty = await rail.evaluate(el => 
        window.getComputedStyle(el).transitionProperty
      );
      expect(transitionProperty).toContain('all');
    });
  });
});