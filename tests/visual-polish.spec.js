import { test, expect } from '@playwright/test';

/**
 * Visual Polish and Micro-Interactions E2E Tests - RED Phase
 * 
 * These tests define the expected visual polish and micro-interaction behavior that doesn't exist yet.
 * All tests should FAIL initially because the enhanced UX features are not implemented in the current codebase.
 * 
 * Requirements being tested:
 * 1. Button micro-interactions with scale transform (0.98) on press
 * 2. Backdrop blur effects for drawers and scrim
 * 3. Toast stacking animations and positioning
 * 4. Enhanced hover states for cards and buttons
 * 5. Visible focus states with primary color rings
 * 6. Glass morphism effects for toast notifications
 * 7. Smooth transitions and animations throughout UI
 * 
 * Reference: Modern UI/UX patterns for enhanced user experience
 * These micro-interactions provide tactile feedback and visual polish
 */

test.describe('Visual Polish and Micro-Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Set icons ready for testing
    await page.evaluate(() => {
      document.documentElement.dataset.iconsReady = 'true';
    });
  });

  test.describe('Button Micro-Interactions', () => {
    test('should apply scale transform on button press for all button types', async ({ page }) => {
      // Test primary buttons
      const primaryBtn = page.locator('.btn-primary').first();
      await expect(primaryBtn).toBeVisible();

      // Get initial transform
      const initialTransform = await primaryBtn.evaluate(el => 
        getComputedStyle(el).transform
      );

      // Start pressing the button (mousedown)
      await primaryBtn.hover();
      await page.mouse.down();
      
      // Check for scale transform during press (should be scale(0.98))
      await page.waitForTimeout(50); // Allow time for transition
      const pressedTransform = await primaryBtn.evaluate(el => 
        getComputedStyle(el).transform
      );
      
      // Transform should change to indicate scale effect
      expect(pressedTransform).not.toBe(initialTransform);
      expect(pressedTransform).toContain('matrix'); // CSS transforms show as matrix
      
      // Verify the scale is approximately 0.98 by checking the matrix values
      const scaleValue = await primaryBtn.evaluate(el => {
        const style = getComputedStyle(el);
        const matrix = new DOMMatrix(style.transform);
        return matrix.a; // First value in matrix is scaleX
      });
      
      expect(scaleValue).toBeCloseTo(0.98, 1);

      // Release the button
      await page.mouse.up();
      
      // Check that transform returns to normal
      await page.waitForTimeout(200); // Allow time for transition back
      const releasedTransform = await primaryBtn.evaluate(el => 
        getComputedStyle(el).transform
      );
      
      expect(releasedTransform).toBe('none');
    });

    test('should apply smooth transition for button scale effects', async ({ page }) => {
      const outlineBtn = page.locator('.btn-outline').first();
      await expect(outlineBtn).toBeVisible();

      // Check that button has transition property set
      const transition = await outlineBtn.evaluate(el => 
        getComputedStyle(el).transition
      );
      
      // Should have transform transition defined
      expect(transition).toContain('transform');
      
      // Transition duration should be reasonable (between 100ms and 300ms)
      const transitionMatch = transition.match(/transform[^,]*(\d+(\.\d+)?)s/);
      if (transitionMatch) {
        const duration = parseFloat(transitionMatch[1]) * 1000; // Convert to ms
        expect(duration).toBeGreaterThanOrEqual(100);
        expect(duration).toBeLessThanOrEqual(300);
      }
    });

    test('should apply scale effect to navigation buttons in sidebar', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 }); // Desktop view to see sidebar
      
      const navButton = page.locator('.sidebar-item').first();
      await expect(navButton).toBeVisible();

      await navButton.hover();
      await page.mouse.down();
      await page.waitForTimeout(50);

      const scaleValue = await navButton.evaluate(el => {
        const style = getComputedStyle(el);
        const matrix = new DOMMatrix(style.transform);
        return matrix.a;
      });
      
      expect(scaleValue).toBeCloseTo(0.98, 1);
      
      await page.mouse.up();
    });

    test('should apply scale effect to mobile tab buttons', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // Mobile view
      
      const mobileTab = page.locator('[data-testid="tab-dashboard"]');
      await expect(mobileTab).toBeVisible();

      await mobileTab.hover();
      await page.mouse.down();
      await page.waitForTimeout(50);

      const scaleValue = await mobileTab.evaluate(el => {
        const style = getComputedStyle(el);
        const matrix = new DOMMatrix(style.transform);
        return matrix.a;
      });
      
      expect(scaleValue).toBeCloseTo(0.98, 1);
      
      await page.mouse.up();
    });
  });

  test.describe('Backdrop Blur Effects', () => {
    test('should apply backdrop blur to scrim when drawers are open', async ({ page }) => {
      // Open left drawer
      const openLeftBtn = page.locator('[data-open-left-drawer]').first();
      await openLeftBtn.click();
      await page.waitForTimeout(300);

      const scrim = page.locator('#scrim');
      await expect(scrim).toBeVisible();

      // Check backdrop-filter property
      const backdropFilter = await scrim.evaluate(el => 
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      
      expect(backdropFilter).toContain('blur');
      
      // Verify blur amount (should be reasonable, like 4px-8px)
      const blurMatch = backdropFilter.match(/blur\((\d+(?:\.\d+)?)px\)/);
      if (blurMatch) {
        const blurAmount = parseFloat(blurMatch[1]);
        expect(blurAmount).toBeGreaterThanOrEqual(2);
        expect(blurAmount).toBeLessThanOrEqual(12);
      }
    });

    test('should apply backdrop blur to drawer panels', async ({ page }) => {
      // Open right drawer
      const openRightBtn = page.locator('[data-open-right-drawer]').first();
      await openRightBtn.click();
      await page.waitForTimeout(300);

      const drawerPanel = page.locator('#rightDrawer .drawer-panel');
      await expect(drawerPanel).toBeVisible();

      const backdropFilter = await drawerPanel.evaluate(el => 
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      
      expect(backdropFilter).toContain('blur');
    });

    test('should maintain backdrop blur effects across different browsers', async ({ page, browserName }) => {
      const openLeftBtn = page.locator('[data-open-left-drawer]').first();
      await openLeftBtn.click();
      await page.waitForTimeout(300);

      const scrim = page.locator('#scrim');
      const backdropFilter = await scrim.evaluate(el => {
        const style = getComputedStyle(el);
        return style.backdropFilter || style.webkitBackdropFilter || 'none';
      });
      
      // Should have backdrop blur regardless of browser
      expect(backdropFilter).not.toBe('none');
      expect(backdropFilter).toContain('blur');
    });
  });

  test.describe('Toast Stacking Animation', () => {
    test('should stack multiple toasts with proper spacing', async ({ page }) => {
      // Trigger multiple toasts quickly
      const toastBtn = page.locator('#toastDemoBtn');
      
      // Click multiple times to create multiple toasts
      await toastBtn.click();
      await page.waitForTimeout(100);
      await toastBtn.click();
      await page.waitForTimeout(100);
      await toastBtn.click();
      
      await page.waitForTimeout(300);

      const toasts = page.locator('#toasts li');
      const toastCount = await toasts.count();
      
      expect(toastCount).toBeGreaterThan(1);
      expect(toastCount).toBeLessThanOrEqual(3); // Maximum of 3 toasts

      // Check spacing between toasts
      if (toastCount > 1) {
        for (let i = 0; i < toastCount - 1; i++) {
          const currentToast = toasts.nth(i);
          const nextToast = toasts.nth(i + 1);
          
          const currentBox = await currentToast.boundingBox();
          const nextBox = await nextToast.boundingBox();
          
          // Calculate vertical spacing
          const spacing = nextBox.y - (currentBox.y + currentBox.height);
          
          // Should have consistent spacing between toasts (around 12px as per Tailwind space-y-3)
          expect(spacing).toBeGreaterThanOrEqual(8);
          expect(spacing).toBeLessThanOrEqual(20);
        }
      }
    });

    test('should animate new toasts in from bottom', async ({ page }) => {
      const toastBtn = page.locator('#toastDemoBtn');
      
      // Take screenshot before clicking
      await page.screenshot({ path: 'before-toast.png', fullPage: false });
      
      // Monitor for new toast animation
      const toastsContainer = page.locator('#toasts');
      
      // Click to create toast and immediately check for animation classes
      await toastBtn.click();
      
      // Wait a tiny bit and check initial state (should start translated/opacity 0)
      await page.waitForTimeout(10);
      
      const newToast = toasts.last();
      const initialTransform = await newToast.evaluate(el => 
        getComputedStyle(el).transform
      );
      const initialOpacity = await newToast.evaluate(el => 
        getComputedStyle(el).opacity
      );
      
      // Should start with some transform/low opacity (animation start state)
      expect(parseFloat(initialOpacity)).toBeLessThan(1);
      
      // Wait for animation to complete
      await page.waitForTimeout(400);
      
      const finalTransform = await newToast.evaluate(el => 
        getComputedStyle(el).transform
      );
      const finalOpacity = await newToast.evaluate(el => 
        getComputedStyle(el).opacity
      );
      
      // Should end up fully visible and in final position
      expect(parseFloat(finalOpacity)).toBe(1);
      expect(finalTransform).toBe('none');
    });

    test('should reposition existing toasts when one is dismissed', async ({ page }) => {
      const toastBtn = page.locator('#toastDemoBtn');
      
      // Create multiple toasts
      await toastBtn.click();
      await page.waitForTimeout(200);
      await toastBtn.click();
      await page.waitForTimeout(200);
      await toastBtn.click();
      await page.waitForTimeout(300);

      const toasts = page.locator('#toasts li');
      let toastCount = await toasts.count();
      
      if (toastCount > 1) {
        // Record positions before dismissing
        const initialPositions = [];
        for (let i = 0; i < toastCount; i++) {
          const toast = toasts.nth(i);
          const box = await toast.boundingBox();
          initialPositions.push(box.y);
        }
        
        // Dismiss the first toast
        const firstToastCloseBtn = toasts.first().locator('button');
        await firstToastCloseBtn.click();
        
        // Wait for dismiss animation
        await page.waitForTimeout(400);
        
        // Check that remaining toasts have moved up
        const remainingToasts = page.locator('#toasts li');
        const remainingCount = await remainingToasts.count();
        
        expect(remainingCount).toBe(toastCount - 1);
        
        // Verify repositioning occurred
        if (remainingCount > 0) {
          const newFirstToastBox = await remainingToasts.first().boundingBox();
          expect(newFirstToastBox.y).toBeLessThan(initialPositions[1]); // Should move up
        }
      }
    });

    test('should enforce maximum of 3 visible toasts', async ({ page }) => {
      const toastBtn = page.locator('#toastDemoBtn');
      
      // Try to create 5 toasts rapidly
      for (let i = 0; i < 5; i++) {
        await toastBtn.click();
        await page.waitForTimeout(50);
      }
      
      await page.waitForTimeout(500);

      const toasts = page.locator('#toasts li');
      const toastCount = await toasts.count();
      
      // Should never exceed 3 toasts
      expect(toastCount).toBeLessThanOrEqual(3);
    });
  });

  test.describe('Enhanced Hover States', () => {
    test('should enhance card shadows on hover', async ({ page }) => {
      const card = page.locator('.card').first();
      await expect(card).toBeVisible();

      // Get initial box shadow
      const initialShadow = await card.evaluate(el => 
        getComputedStyle(el).boxShadow
      );

      // Hover over card
      await card.hover();
      await page.waitForTimeout(100); // Allow time for hover transition

      const hoveredShadow = await card.evaluate(el => 
        getComputedStyle(el).boxShadow
      );

      // Shadow should be enhanced (different from initial)
      expect(hoveredShadow).not.toBe(initialShadow);
      
      // Enhanced shadow should be more prominent (contains larger values)
      expect(hoveredShadow).not.toBe('none');
      
      // Check if the shadow values indicate enhancement
      const shadowValues = hoveredShadow.match(/(\d+(?:\.\d+)?)px/g);
      if (shadowValues) {
        const blurRadius = parseFloat(shadowValues[2]); // Third value is usually blur radius
        expect(blurRadius).toBeGreaterThan(4); // Should have noticeable blur
      }
    });

    test('should apply smooth color transitions on button hover', async ({ page }) => {
      const primaryBtn = page.locator('.btn-primary').first();
      await expect(primaryBtn).toBeVisible();

      // Check transition property
      const transition = await primaryBtn.evaluate(el => 
        getComputedStyle(el).transition
      );

      expect(transition).toMatch(/background|color/); // Should have background or color transition

      // Get initial background color
      const initialBgColor = await primaryBtn.evaluate(el => 
        getComputedStyle(el).backgroundColor
      );

      // Hover and check for color change
      await primaryBtn.hover();
      await page.waitForTimeout(100);

      const hoveredBgColor = await primaryBtn.evaluate(el => 
        getComputedStyle(el).backgroundColor
      );

      // Background should change on hover
      expect(hoveredBgColor).not.toBe(initialBgColor);
    });

    test('should provide hover feedback for navigation items', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 }); // Desktop to see sidebar
      
      const navItem = page.locator('.sidebar-item').first();
      await expect(navItem).toBeVisible();

      const initialBgColor = await navItem.evaluate(el => 
        getComputedStyle(el).backgroundColor
      );

      await navItem.hover();
      await page.waitForTimeout(100);

      const hoveredBgColor = await navItem.evaluate(el => 
        getComputedStyle(el).backgroundColor
      );

      expect(hoveredBgColor).not.toBe(initialBgColor);
    });

    test('should apply hover states to table rows', async ({ page }) => {
      const tableRow = page.locator('tbody tr').first();
      await expect(tableRow).toBeVisible();

      const initialBgColor = await tableRow.evaluate(el => 
        getComputedStyle(el).backgroundColor
      );

      await tableRow.hover();
      await page.waitForTimeout(50);

      const hoveredBgColor = await tableRow.evaluate(el => 
        getComputedStyle(el).backgroundColor
      );

      // Background should change subtly on hover
      expect(hoveredBgColor).not.toBe(initialBgColor);
    });
  });

  test.describe('Focus States and Accessibility', () => {
    test('should display visible focus rings on all interactive elements', async ({ page }) => {
      // Test button focus
      const primaryBtn = page.locator('.btn-primary').first();
      await primaryBtn.focus();

      const focusRing = await primaryBtn.evaluate(el => {
        const style = getComputedStyle(el);
        return style.boxShadow || style.outline;
      });

      expect(focusRing).not.toBe('none');
      expect(focusRing).toMatch(/primary|rgb\(245,\s*115,\s*22\)/i); // Should use primary color
    });

    test('should apply focus rings with primary color and opacity', async ({ page }) => {
      const inputField = page.locator('input[type="search"]');
      await inputField.focus();

      const focusRing = await inputField.evaluate(el => {
        const style = getComputedStyle(el);
        return style.boxShadow;
      });

      // Focus ring should be visible and use primary color with opacity
      expect(focusRing).not.toBe('none');
      expect(focusRing).toContain('rgba'); // Should have opacity

      // Extract color values to verify primary color usage
      const colorMatch = focusRing.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (colorMatch) {
        const [, r, g, b] = colorMatch.map(Number);
        // Primary color is orange-ish (245, 115, 22), should be close
        expect(r).toBeGreaterThan(200); // Should be orange-ish
        expect(g).toBeGreaterThan(80);
        expect(g).toBeLessThan(150);
      }
    });

    test('should maintain focus visibility during keyboard navigation', async ({ page }) => {
      // Tab through interactive elements
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      // Get the currently focused element
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();

      const focusStyles = await focusedElement.evaluate(el => {
        const style = getComputedStyle(el);
        return {
          boxShadow: style.boxShadow,
          outline: style.outline,
          outlineOffset: style.outlineOffset
        };
      });

      // Should have visible focus indicator
      const hasVisibleFocus = focusStyles.boxShadow !== 'none' || 
                             focusStyles.outline !== 'none';
      expect(hasVisibleFocus).toBeTruthy();
    });

    test('should apply focus states to drawer close buttons', async ({ page }) => {
      // Open a drawer
      const openDrawerBtn = page.locator('[data-open-right-drawer]').first();
      await openDrawerBtn.click();
      await page.waitForTimeout(300);

      // Focus the close button
      const closeBtn = page.locator('[data-close-right]');
      await closeBtn.focus();

      const focusRing = await closeBtn.evaluate(el => 
        getComputedStyle(el).boxShadow
      );

      expect(focusRing).not.toBe('none');
    });
  });

  test.describe('Glass Morphism Effects', () => {
    test('should apply glass morphism effect to toast notifications', async ({ page }) => {
      const toastBtn = page.locator('#toastDemoBtn');
      await toastBtn.click();
      await page.waitForTimeout(300);

      const toast = page.locator('#toasts li').first();
      await expect(toast).toBeVisible();

      // Check for glass morphism properties
      const glassStyles = await toast.evaluate(el => {
        const style = getComputedStyle(el);
        return {
          backdropFilter: style.backdropFilter || style.webkitBackdropFilter,
          background: style.backgroundColor,
          border: style.border
        };
      });

      // Should have backdrop blur for glass effect
      expect(glassStyles.backdropFilter).toContain('blur');
      
      // Should have semi-transparent background
      expect(glassStyles.background).toContain('rgba') || 
      expect(glassStyles.background).toMatch(/hsla|rgb.*0\.\d/);

      // Should have subtle border/ring
      expect(glassStyles.border).not.toBe('none') || 
      await toast.evaluate(el => getComputedStyle(el).boxShadow !== 'none');
    });

    test('should maintain glass effect across different toast variants', async ({ page }) => {
      // Test different toast types if they exist
      const toastBtn = page.locator('#toastDemoBtn');
      await toastBtn.click();
      await page.waitForTimeout(300);

      const toasts = page.locator('#toasts li');
      const toastCount = await toasts.count();

      for (let i = 0; i < toastCount; i++) {
        const toast = toasts.nth(i);
        const backdropFilter = await toast.evaluate(el => {
          const style = getComputedStyle(el);
          return style.backdropFilter || style.webkitBackdropFilter;
        });

        expect(backdropFilter).toContain('blur');
      }
    });
  });

  test.describe('Smooth Transitions and Animations', () => {
    test('should have smooth drawer open/close animations', async ({ page }) => {
      const openBtn = page.locator('[data-open-left-drawer]').first();
      
      // Check drawer transition properties
      await openBtn.click();
      await page.waitForTimeout(50); // Small delay to catch mid-animation
      
      const drawer = page.locator('#leftDrawer .drawer-panel');
      const transition = await drawer.evaluate(el => 
        getComputedStyle(el).transition
      );

      expect(transition).toContain('transform');
      expect(transition).toContain('opacity');
      
      // Should use ease-out or cubic-bezier for smooth animation
      expect(transition).toMatch(/ease-out|cubic-bezier/);
      
      // Duration should be reasonable (200-400ms)
      const durationMatch = transition.match(/(\d+(?:\.\d+)?)s/);
      if (durationMatch) {
        const duration = parseFloat(durationMatch[1]) * 1000;
        expect(duration).toBeGreaterThanOrEqual(200);
        expect(duration).toBeLessThanOrEqual(400);
      }
    });

    test('should animate theme transitions smoothly', async ({ page }) => {
      const themeToggle = page.locator('#toggleDark');
      
      // Check if root element has transition for theme changes
      const rootTransition = await page.evaluate(() => 
        getComputedStyle(document.documentElement).transition
      );
      
      // Toggle theme and check for smooth transition
      await themeToggle.click();
      await page.waitForTimeout(100);
      
      // Colors should transition smoothly
      const bodyTransition = await page.locator('body').evaluate(el => 
        getComputedStyle(el).transition
      );
      
      expect(bodyTransition).toMatch(/background|color/) || 
      expect(rootTransition).toMatch(/background|color/);
    });

    test('should provide smooth hover transitions for all interactive elements', async ({ page }) => {
      // Test various interactive elements for transition properties
      const interactiveElements = [
        '.btn-primary',
        '.btn-outline', 
        '.card',
        '.sidebar-item'
      ];

      for (const selector of interactiveElements) {
        const elements = page.locator(selector);
        const count = await elements.count();
        
        if (count > 0) {
          const element = elements.first();
          const transition = await element.evaluate(el => 
            getComputedStyle(el).transition
          );
          
          expect(transition).not.toBe('none');
          expect(transition).toMatch(/background|color|transform|shadow/);
        }
      }
    });
  });

  test.describe('Performance and Accessibility', () => {
    test('should not affect screen reader accessibility with visual effects', async ({ page }) => {
      // Ensure ARIA attributes are preserved with visual enhancements
      const toastBtn = page.locator('#toastDemoBtn');
      await toastBtn.click();
      await page.waitForTimeout(300);

      const toast = page.locator('#toasts li').first();
      const ariaRole = await toast.getAttribute('role');
      
      expect(ariaRole).toBeTruthy(); // Should have role attribute
      
      // Toast container should have proper ARIA live region
      const toastRegion = page.locator('#toastRegion');
      const ariaLive = await toastRegion.getAttribute('aria-live');
      const ariaLabel = await toastRegion.getAttribute('aria-label');
      
      expect(ariaLive).toBe('polite');
      expect(ariaLabel).toBeTruthy();
    });

    test('should respect reduced motion preferences', async ({ page }) => {
      // Simulate reduced motion preference
      await page.addInitScript(() => {
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: (query) => {
            if (query === '(prefers-reduced-motion: reduce)') {
              return {
                matches: true,
                addEventListener: () => {},
                removeEventListener: () => {},
              };
            }
            return {
              matches: false,
              addEventListener: () => {},
              removeEventListener: () => {},
            };
          },
        });
      });

      await page.reload();
      await page.waitForLoadState('networkidle');

      // Check that animations are reduced or disabled
      const animatedElements = page.locator('.card, .btn-primary, .toast');
      const element = animatedElements.first();
      
      const transitionDuration = await element.evaluate(el => {
        const style = getComputedStyle(el);
        return style.transitionDuration;
      });

      // Should have very short or no transition duration when reduced motion is preferred
      if (transitionDuration && transitionDuration !== '0s') {
        const duration = parseFloat(transitionDuration) * 1000;
        expect(duration).toBeLessThan(100); // Should be very fast
      }
    });
  });
});