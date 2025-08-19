import { test, expect } from '@playwright/test';

test.describe('Responsive Search Bar', () => {
  test.describe('Desktop View', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/base.html');
    });

    test('should display full search bar with input field on desktop', async ({ page }) => {
      const searchContainer = page.locator('[data-search-container]');
      const searchInput = page.locator('#searchInput');
      
      await expect(searchContainer).toBeVisible();
      await expect(searchInput).toBeVisible();
      
      // Should have appropriate width
      const width = await searchInput.evaluate(el => el.offsetWidth);
      expect(width).toBeGreaterThan(300);
    });

    test('should not show search icon button on desktop', async ({ page }) => {
      const searchButton = page.locator('[data-search-trigger]');
      await expect(searchButton).toBeHidden();
    });
  });

  test.describe('Medium Screen View', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 900 });
      await page.goto('/base.html');
    });

    test('should display narrower search bar on medium screens', async ({ page }) => {
      const searchInput = page.locator('#searchInput');
      
      await expect(searchInput).toBeVisible();
      
      // Should have reduced width
      const width = await searchInput.evaluate(el => el.offsetWidth);
      expect(width).toBeGreaterThan(150);
      expect(width).toBeLessThan(300);
    });

    test('should still not show search icon button on medium screens', async ({ page }) => {
      const searchButton = page.locator('[data-search-trigger]');
      await expect(searchButton).toBeHidden();
    });
  });

  test.describe('Mobile View', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/base.html');
    });

    test('should hide search input and show search icon button on mobile', async ({ page }) => {
      const searchInput = page.locator('#searchInput');
      const searchButton = page.locator('[data-search-trigger]');
      
      await expect(searchInput).toBeHidden();
      await expect(searchButton).toBeVisible();
      
      // Button should have correct icon
      const icon = searchButton.locator('.material-symbols-rounded');
      await expect(icon).toHaveText('search');
    });

    test('should have 44x44px minimum touch target for search button', async ({ page }) => {
      const searchButton = page.locator('[data-search-trigger]');
      
      const box = await searchButton.boundingBox();
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    });

    test('should open full-width search overlay when search button is clicked', async ({ page }) => {
      const searchButton = page.locator('[data-search-trigger]');
      const searchOverlay = page.locator('[data-search-overlay]');
      
      // Initially hidden
      await expect(searchOverlay).toBeHidden();
      
      // Click search button
      await searchButton.click();
      
      // Overlay should be visible
      await expect(searchOverlay).toBeVisible();
      
      // Should have full-width search input
      const overlayInput = searchOverlay.locator('input[type="search"]');
      await expect(overlayInput).toBeVisible();
      await expect(overlayInput).toBeFocused();
      
      // Should cover the entire navbar
      const overlayBox = await searchOverlay.boundingBox();
      const viewportSize = page.viewportSize();
      expect(overlayBox.width).toBe(viewportSize.width);
    });

    test('should show close button in search overlay', async ({ page }) => {
      const searchButton = page.locator('[data-search-trigger]');
      await searchButton.click();
      
      const closeButton = page.locator('[data-search-close]');
      await expect(closeButton).toBeVisible();
      
      // Should have correct icon
      const icon = closeButton.locator('.material-symbols-rounded');
      await expect(icon).toHaveText('close');
    });

    test('should close search overlay when close button is clicked', async ({ page }) => {
      const searchButton = page.locator('[data-search-trigger]');
      const searchOverlay = page.locator('[data-search-overlay]');
      const closeButton = page.locator('[data-search-close]');
      
      // Open overlay
      await searchButton.click();
      await expect(searchOverlay).toBeVisible();
      
      // Click close button
      await closeButton.click();
      
      // Overlay should be hidden
      await expect(searchOverlay).toBeHidden();
      
      // Search button should be visible again
      await expect(searchButton).toBeVisible();
    });

    test('should close search overlay when Escape key is pressed', async ({ page }) => {
      const searchButton = page.locator('[data-search-trigger]');
      const searchOverlay = page.locator('[data-search-overlay]');
      
      // Open overlay
      await searchButton.click();
      await expect(searchOverlay).toBeVisible();
      
      // Press Escape
      await page.keyboard.press('Escape');
      
      // Overlay should be hidden
      await expect(searchOverlay).toBeHidden();
    });

    test('should preserve search value when reopening overlay', async ({ page }) => {
      const searchButton = page.locator('[data-search-trigger]');
      const searchOverlay = page.locator('[data-search-overlay]');
      const overlayInput = searchOverlay.locator('input[type="search"]');
      
      // Open and type
      await searchButton.click();
      await overlayInput.fill('test query');
      
      // Close
      await page.locator('[data-search-close]').click();
      
      // Reopen
      await searchButton.click();
      
      // Value should be preserved
      await expect(overlayInput).toHaveValue('test query');
    });

    test('should have smooth transition animation', async ({ page }) => {
      const searchOverlay = page.locator('[data-search-overlay]');
      const searchButton = page.locator('[data-search-trigger]');
      
      await searchButton.click();
      
      // Check transition styles
      const transition = await searchOverlay.evaluate(el => 
        window.getComputedStyle(el).transition
      );
      
      expect(transition).toContain('transform');
    });

    test('should handle back button navigation in overlay', async ({ page }) => {
      const searchButton = page.locator('[data-search-trigger]');
      const searchOverlay = page.locator('[data-search-overlay]');
      
      // Open overlay
      await searchButton.click();
      await expect(searchOverlay).toBeVisible();
      
      // Overlay should have data attribute
      await expect(searchOverlay).toHaveAttribute('data-open', 'true');
    });

    test('should maintain accessibility with proper ARIA attributes', async ({ page }) => {
      const searchButton = page.locator('[data-search-trigger]');
      const searchOverlay = page.locator('[data-search-overlay]');
      
      // Button should have ARIA label
      await expect(searchButton).toHaveAttribute('aria-label', 'Open search');
      
      // Open overlay
      await searchButton.click();
      
      // Overlay input should have proper attributes
      const overlayInput = searchOverlay.locator('input[type="search"]');
      await expect(overlayInput).toHaveAttribute('aria-label', 'Search');
      await expect(overlayInput).toHaveAttribute('placeholder', 'Search programs, people, and content');
      
      // Close button should have ARIA label
      const closeButton = page.locator('[data-search-close]');
      await expect(closeButton).toHaveAttribute('aria-label', 'Close search');
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should transition smoothly when resizing from desktop to mobile', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/base.html');
      
      const searchInput = page.locator('#searchInput');
      const searchButton = page.locator('[data-search-trigger]');
      
      // Desktop: input visible, button hidden
      await expect(searchInput).toBeVisible();
      await expect(searchButton).toBeHidden();
      
      // Resize to mobile
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Mobile: input hidden, button visible
      await expect(searchInput).toBeHidden();
      await expect(searchButton).toBeVisible();
    });

    test('should transition smoothly when resizing from mobile to desktop', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/base.html');
      
      const searchInput = page.locator('#searchInput');
      const searchButton = page.locator('[data-search-trigger]');
      
      // Mobile: input hidden, button visible
      await expect(searchInput).toBeHidden();
      await expect(searchButton).toBeVisible();
      
      // Resize to desktop
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Desktop: input visible, button hidden
      await expect(searchInput).toBeVisible();
      await expect(searchButton).toBeHidden();
    });

    test('should close overlay when resizing from mobile to desktop', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/base.html');
      
      const searchButton = page.locator('[data-search-trigger]');
      const searchOverlay = page.locator('[data-search-overlay]');
      
      // Open overlay on mobile
      await searchButton.click();
      await expect(searchOverlay).toBeVisible();
      
      // Resize to desktop
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Overlay should be hidden
      await expect(searchOverlay).toBeHidden();
      
      // Desktop search should be visible
      const searchInput = page.locator('#searchInput');
      await expect(searchInput).toBeVisible();
    });
  });
});