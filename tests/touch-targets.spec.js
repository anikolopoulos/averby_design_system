import { test, expect } from '@playwright/test';

/**
 * Touch Target Accessibility E2E Tests - RED Phase
 * 
 * These tests define the expected touch target accessibility behavior that doesn't exist yet.
 * All tests should FAIL initially because the touch target sizing requirements 
 * are not implemented in the current codebase.
 * 
 * Requirements being tested:
 * 1. All buttons must be at least 44x44px on mobile devices
 * 2. Close buttons in drawers must meet 44x44px minimum
 * 3. Navigation items must have adequate touch targets
 * 4. Avatar menu button must be properly sized
 * 5. Input fields must have sufficient height for touch
 * 6. Chips and small interactive elements must have adequate padding
 * 7. Theme toggle button must meet size requirements
 * 8. Mobile bottom tab items must have proper touch targets
 * 
 * Reference: WCAG 2.1 AA - Target Size (Minimum) 2.5.5
 * Mobile devices require minimum 44x44px touch targets for accessibility
 */

test.describe('Touch Target Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    // Set icons ready manually for testing
    await page.evaluate(() => {
      document.documentElement.dataset.iconsReady = 'true';
    });
  });

  test.describe('Mobile Touch Targets (<768px)', () => {
    test('should ensure all buttons meet 44x44px minimum on mobile', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
      
      // Get all button elements
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      
      // Track buttons that fail the size requirement
      const failingButtons = [];
      
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        const isVisible = await button.isVisible();
        
        if (isVisible) {
          const boundingBox = await button.boundingBox();
          const buttonText = await button.textContent();
          const testId = await button.getAttribute('data-testid');
          const className = await button.getAttribute('class');
          
          const identifier = testId || buttonText?.trim() || className || `button-${i}`;
          
          if (boundingBox) {
            // Check both width and height meet 44px minimum
            if (boundingBox.width < 44 || boundingBox.height < 44) {
              failingButtons.push({
                identifier,
                width: boundingBox.width,
                height: boundingBox.height,
                index: i
              });
            }
          }
        }
      }
      
      // This test should FAIL because buttons currently don't meet 44x44px requirement
      expect(failingButtons.length).toBe(0, 
        `Found ${failingButtons.length} buttons below 44x44px minimum:\n` +
        failingButtons.map(b => `  - ${b.identifier}: ${b.width}x${b.height}px`).join('\n')
      );
    });

    test('should ensure close buttons in drawers meet 44x44px minimum', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open left drawer to test close button
      const openLeftDrawerBtn = page.locator('[data-open-left-drawer]').first();
      await openLeftDrawerBtn.click();
      
      // Wait for drawer to open
      await page.waitForTimeout(300);
      
      // Check left drawer close button
      const leftCloseBtn = page.locator('[data-close-left]');
      await expect(leftCloseBtn).toBeVisible();
      
      const leftCloseBoundingBox = await leftCloseBtn.boundingBox();
      expect(leftCloseBoundingBox.width).toBeGreaterThanOrEqual(44);
      expect(leftCloseBoundingBox.height).toBeGreaterThanOrEqual(44);
      
      // Close left drawer
      await leftCloseBtn.click();
      await page.waitForTimeout(300);
      
      // Open right drawer to test close button  
      const openRightDrawerBtn = page.locator('[data-open-right-drawer]').first();
      await openRightDrawerBtn.click();
      await page.waitForTimeout(300);
      
      // Check right drawer close button
      const rightCloseBtn = page.locator('[data-close-right]');
      await expect(rightCloseBtn).toBeVisible();
      
      const rightCloseBoundingBox = await rightCloseBtn.boundingBox();
      expect(rightCloseBoundingBox.width).toBeGreaterThanOrEqual(44);
      expect(rightCloseBoundingBox.height).toBeGreaterThanOrEqual(44);
    });

    test('should ensure navigation items have adequate touch targets on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Test bottom tab navigation items
      const bottomTabBar = page.locator('[data-testid="mobile-bottom-tabs"]');
      await expect(bottomTabBar).toBeVisible();
      
      const navigationTabs = [
        'tab-dashboard',
        'tab-content-hub', 
        'tab-tasks',
        'tab-journal',
        'tab-create'
      ];
      
      for (const tabTestId of navigationTabs) {
        const tab = page.locator(`[data-testid="${tabTestId}"]`);
        await expect(tab).toBeVisible();
        
        const boundingBox = await tab.boundingBox();
        expect(boundingBox.width).toBeGreaterThanOrEqual(44, 
          `Navigation tab ${tabTestId} width ${boundingBox.width}px is below 44px minimum`);
        expect(boundingBox.height).toBeGreaterThanOrEqual(44,
          `Navigation tab ${tabTestId} height ${boundingBox.height}px is below 44px minimum`);
      }
    });

    test('should ensure avatar menu button is properly sized on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const avatarBtn = page.locator('#avatarBtn');
      await expect(avatarBtn).toBeVisible();
      
      const boundingBox = await avatarBtn.boundingBox();
      expect(boundingBox.width).toBeGreaterThanOrEqual(44,
        `Avatar button width ${boundingBox.width}px is below 44px minimum`);
      expect(boundingBox.height).toBeGreaterThanOrEqual(44,
        `Avatar button height ${boundingBox.height}px is below 44px minimum`);
    });

    test('should ensure input fields have sufficient height for touch on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Test main search input
      const searchInput = page.locator('input[type="search"]');
      await expect(searchInput).toBeVisible();
      
      const searchBoundingBox = await searchInput.boundingBox();
      expect(searchBoundingBox.height).toBeGreaterThanOrEqual(44,
        `Search input height ${searchBoundingBox.height}px is below 44px minimum`);
      
      // Open right drawer to test filter inputs
      const openRightDrawerBtn = page.locator('[data-open-right-drawer]').first();
      await openRightDrawerBtn.click();
      await page.waitForTimeout(300);
      
      // Test filter inputs in drawer
      const filterInputs = page.locator('#rightDrawer input');
      const inputCount = await filterInputs.count();
      
      for (let i = 0; i < inputCount; i++) {
        const input = filterInputs.nth(i);
        const isVisible = await input.isVisible();
        
        if (isVisible) {
          const boundingBox = await input.boundingBox();
          const placeholder = await input.getAttribute('placeholder');
          const identifier = placeholder || `input-${i}`;
          
          expect(boundingBox.height).toBeGreaterThanOrEqual(44,
            `Input field "${identifier}" height ${boundingBox.height}px is below 44px minimum`);
        }
      }
    });

    test('should ensure chips have adequate touch areas on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Test status chips in main content
      const chips = page.locator('.chip, .chip-primary, .chip-info, .chip-success');
      const chipCount = await chips.count();
      
      for (let i = 0; i < chipCount; i++) {
        const chip = chips.nth(i);
        const isVisible = await chip.isVisible();
        
        if (isVisible) {
          const chipText = await chip.textContent();
          const boundingBox = await chip.boundingBox();
          
          // Chips should either be 44x44px themselves or wrapped in larger touch areas
          // For now, test that they meet minimum requirements if they're interactive
          const isClickable = await chip.evaluate(el => {
            return el.tagName === 'BUTTON' || 
                   el.onclick !== null || 
                   el.getAttribute('role') === 'button' ||
                   el.classList.contains('cursor-pointer');
          });
          
          if (isClickable) {
            expect(boundingBox.width).toBeGreaterThanOrEqual(44,
              `Interactive chip "${chipText?.trim()}" width ${boundingBox.width}px is below 44px minimum`);
            expect(boundingBox.height).toBeGreaterThanOrEqual(44,
              `Interactive chip "${chipText?.trim()}" height ${boundingBox.height}px is below 44px minimum`);
          }
        }
      }
    });

    test('should ensure theme toggle button meets size requirements on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Test mobile theme toggle in bottom tab bar
      const mobileThemeToggle = page.locator('[data-testid="mobile-theme-toggle"]');
      await expect(mobileThemeToggle).toBeVisible();
      
      const boundingBox = await mobileThemeToggle.boundingBox();
      expect(boundingBox.width).toBeGreaterThanOrEqual(44,
        `Mobile theme toggle width ${boundingBox.width}px is below 44px minimum`);
      expect(boundingBox.height).toBeGreaterThanOrEqual(44,
        `Mobile theme toggle height ${boundingBox.height}px is below 44px minimum`);
    });

    test('should ensure mobile bottom tab items have proper touch targets', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const bottomTabBar = page.locator('[data-testid="mobile-bottom-tabs"]');
      await expect(bottomTabBar).toBeVisible();
      
      // Test all mobile tab buttons including theme toggle
      const mobileTabButtons = bottomTabBar.locator('button');
      const buttonCount = await mobileTabButtons.count();
      
      expect(buttonCount).toBeGreaterThan(0);
      
      for (let i = 0; i < buttonCount; i++) {
        const button = mobileTabButtons.nth(i);
        const testId = await button.getAttribute('data-testid');
        const buttonText = await button.textContent();
        const identifier = testId || buttonText?.trim() || `mobile-tab-${i}`;
        
        const boundingBox = await button.boundingBox();
        expect(boundingBox.width).toBeGreaterThanOrEqual(44,
          `Mobile tab "${identifier}" width ${boundingBox.width}px is below 44px minimum`);
        expect(boundingBox.height).toBeGreaterThanOrEqual(44,
          `Mobile tab "${identifier}" height ${boundingBox.height}px is below 44px minimum`);
      }
    });

    test('should ensure small interactive elements in drawers meet touch requirements', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open right drawer to test filter buttons
      const openRightDrawerBtn = page.locator('[data-open-right-drawer]').first();
      await openRightDrawerBtn.click();
      await page.waitForTimeout(300);
      
      // Test filter status buttons in right drawer
      const filterButtons = page.locator('#rightDrawer .px-3');
      const filterButtonCount = await filterButtons.count();
      
      for (let i = 0; i < filterButtonCount; i++) {
        const button = filterButtons.nth(i);
        const isButton = await button.evaluate(el => el.tagName === 'BUTTON');
        
        if (isButton) {
          const buttonText = await button.textContent();
          const boundingBox = await button.boundingBox();
          
          expect(boundingBox.height).toBeGreaterThanOrEqual(44,
            `Filter button "${buttonText?.trim()}" height ${boundingBox.height}px is below 44px minimum`);
        }
      }
      
      // Test action buttons at bottom of drawer
      const actionButtons = page.locator('#rightDrawer button[data-close-right], #rightDrawer .btn');
      const actionButtonCount = await actionButtons.count();
      
      for (let i = 0; i < actionButtonCount; i++) {
        const button = actionButtons.nth(i);
        const isVisible = await button.isVisible();
        
        if (isVisible) {
          const buttonText = await button.textContent();
          const boundingBox = await button.boundingBox();
          
          expect(boundingBox.width).toBeGreaterThanOrEqual(44,
            `Action button "${buttonText?.trim()}" width ${boundingBox.width}px is below 44px minimum`);
          expect(boundingBox.height).toBeGreaterThanOrEqual(44,
            `Action button "${buttonText?.trim()}" height ${boundingBox.height}px is below 44px minimum`);
        }
      }
    });

    test('should ensure inset drawer close button meets touch requirements', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open inset drawer from Create button
      const openInsetBtn = page.locator('#openInsetFromCreate');
      await openInsetBtn.click();
      await page.waitForTimeout(300);
      
      // Test inset drawer close button
      const insetCloseBtn = page.locator('[data-close-inset]');
      await expect(insetCloseBtn).toBeVisible();
      
      const boundingBox = await insetCloseBtn.boundingBox();
      expect(boundingBox.width).toBeGreaterThanOrEqual(44,
        `Inset drawer close button width ${boundingBox.width}px is below 44px minimum`);
      expect(boundingBox.height).toBeGreaterThanOrEqual(44,
        `Inset drawer close button height ${boundingBox.height}px is below 44px minimum`);
    });

    test('should ensure avatar menu items have adequate touch targets when opened', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open avatar menu
      const avatarBtn = page.locator('#avatarBtn');
      await avatarBtn.click();
      await page.waitForTimeout(100);
      
      // Test menu items
      const menuButtons = page.locator('#avatarMenu button');
      const menuButtonCount = await menuButtons.count();
      
      expect(menuButtonCount).toBeGreaterThan(0);
      
      for (let i = 0; i < menuButtonCount; i++) {
        const menuButton = menuButtons.nth(i);
        const buttonText = await menuButton.textContent();
        const boundingBox = await menuButton.boundingBox();
        
        expect(boundingBox.height).toBeGreaterThanOrEqual(44,
          `Avatar menu item "${buttonText?.trim()}" height ${boundingBox.height}px is below 44px minimum`);
      }
    });
  });

  test.describe('Tablet Touch Targets (768px-1023px)', () => {
    test('should maintain adequate touch targets on tablet devices', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 }); // iPad size
      
      // Test that buttons still meet minimum requirements on tablet
      const buttons = page.locator('button:visible');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < Math.min(buttonCount, 10); i++) { // Test first 10 visible buttons
        const button = buttons.nth(i);
        const boundingBox = await button.boundingBox();
        const buttonText = await button.textContent();
        const testId = await button.getAttribute('data-testid');
        const identifier = testId || buttonText?.trim() || `button-${i}`;
        
        if (boundingBox) {
          expect(boundingBox.width).toBeGreaterThanOrEqual(44,
            `Tablet button "${identifier}" width ${boundingBox.width}px is below 44px minimum`);
          expect(boundingBox.height).toBeGreaterThanOrEqual(44,
            `Tablet button "${identifier}" height ${boundingBox.height}px is below 44px minimum`);
        }
      }
    });
  });

  test.describe('Desktop Touch Target Compatibility (≥1024px)', () => {
    test('should maintain touch-friendly sizes on desktop for hybrid devices', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Even on desktop, buttons should remain touch-friendly for hybrid devices
      const primaryButtons = page.locator('.btn-primary, .btn-outline');
      const buttonCount = await primaryButtons.count();
      
      for (let i = 0; i < buttonCount; i++) {
        const button = primaryButtons.nth(i);
        const isVisible = await button.isVisible();
        
        if (isVisible) {
          const boundingBox = await button.boundingBox();
          const buttonText = await button.textContent();
          
          expect(boundingBox.height).toBeGreaterThanOrEqual(40, // Slightly smaller acceptable on desktop
            `Desktop primary button "${buttonText?.trim()}" height ${boundingBox.height}px is below reasonable minimum`);
        }
      }
    });

    test('should ensure desktop drawer close buttons remain touch-friendly', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Test left drawer close button
      const openLeftDrawerBtn = page.locator('[data-open-left-drawer]').first();
      await openLeftDrawerBtn.click();
      await page.waitForTimeout(300);
      
      const leftCloseBtn = page.locator('[data-close-left]');
      const leftBoundingBox = await leftCloseBtn.boundingBox();
      
      // On desktop, close buttons should still be reasonably sized for touch
      expect(leftBoundingBox.width).toBeGreaterThanOrEqual(36);
      expect(leftBoundingBox.height).toBeGreaterThanOrEqual(36);
    });
  });

  test.describe('Touch Target Spacing and Overlap Prevention', () => {
    test('should ensure adequate spacing between touch targets on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Test bottom tab bar spacing
      const bottomTabBar = page.locator('[data-testid="mobile-bottom-tabs"]');
      const tabButtons = bottomTabBar.locator('button');
      const buttonCount = await tabButtons.count();
      
      // Check spacing between adjacent buttons
      for (let i = 0; i < buttonCount - 1; i++) {
        const currentButton = tabButtons.nth(i);
        const nextButton = tabButtons.nth(i + 1);
        
        const currentBox = await currentButton.boundingBox();
        const nextBox = await nextButton.boundingBox();
        
        // Buttons should either not overlap or have adequate spacing
        const horizontalOverlap = Math.max(0, 
          Math.min(currentBox.x + currentBox.width, nextBox.x + nextBox.width) - 
          Math.max(currentBox.x, nextBox.x)
        );
        
        const hasSpacing = nextBox.x >= (currentBox.x + currentBox.width);
        const hasAdequateOverlap = horizontalOverlap === 0 || 
          (currentBox.width >= 44 && nextBox.width >= 44); // Both buttons are adequate size
        
        expect(hasSpacing || hasAdequateOverlap).toBeTruthy(
          `Inadequate spacing between mobile tab buttons ${i} and ${i+1}`
        );
      }
    });
  });
});