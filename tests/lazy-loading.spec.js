// grounded via context7: Playwright lazy loading and Intersection Observer testing patterns — v1.40
import { test, expect } from '@playwright/test';

test.describe('Image Lazy Loading', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/base.html');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should have loading="lazy" attribute on avatar image', async ({ page }) => {
    // Locate the avatar image
    const avatarImage = page.locator('img[alt="User avatar"]');
    
    // Verify the image exists
    await expect(avatarImage).toBeVisible();
    
    // Verify it has loading="lazy" attribute
    await expect(avatarImage).toHaveAttribute('loading', 'lazy');
  });

  test('should have loading="lazy" on all content images', async ({ page }) => {
    // Get all img elements except logos and icons
    const contentImages = page.locator('img').filter({ 
      hasNot: page.locator('svg img, .rail-logo img, [aria-label*="icon"]') 
    });
    
    const imageCount = await contentImages.count();
    
    // Verify each content image has loading="lazy"
    for (let i = 0; i < imageCount; i++) {
      const image = contentImages.nth(i);
      await expect(image).toHaveAttribute('loading', 'lazy');
    }
  });

  test('should load images that are initially in viewport', async ({ page }) => {
    // Avatar should be in viewport on page load
    const avatarImage = page.locator('img[alt="User avatar"]');
    
    // Wait for the image to be loaded
    await expect(avatarImage).toHaveAttribute('complete', '');
    
    // Verify the image is actually loaded (has naturalWidth > 0)
    const isLoaded = await avatarImage.evaluate(img => img.complete && img.naturalWidth > 0);
    expect(isLoaded).toBe(true);
  });

  test('should show placeholder or blur effect while loading', async ({ page }) => {
    // Intercept image requests to simulate slow loading
    await page.route('**/*.{png,jpg,jpeg,gif,webp}', async route => {
      // Delay the response to simulate slow loading
      await page.waitForTimeout(500);
      await route.continue();
    });

    // Navigate to fresh page
    await page.goto('/base.html');
    
    // Check if avatar has placeholder styling
    const avatarContainer = page.locator('[id="avatarBtn"]');
    
    // Should have some loading state styling (blur, skeleton, etc.)
    const hasLoadingState = await avatarContainer.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.filter === 'blur(4px)' || 
             el.classList.contains('loading') || 
             el.classList.contains('skeleton') ||
             styles.backgroundImage.includes('skeleton') ||
             styles.animation.includes('pulse');
    });
    
    expect(hasLoadingState).toBe(true);
  });

  test('should support native lazy loading in modern browsers', async ({ page }) => {
    // Check if browser supports native lazy loading
    const supportsNativeLazyLoading = await page.evaluate(() => {
      return 'loading' in HTMLImageElement.prototype;
    });

    if (supportsNativeLazyLoading) {
      const avatarImage = page.locator('img[alt="User avatar"]');
      await expect(avatarImage).toHaveAttribute('loading', 'lazy');
      
      // Verify no JavaScript fallback is attached when native loading is supported
      const hasIntersectionObserver = await avatarImage.evaluate(img => {
        return img.hasAttribute('data-intersection-observer') || 
               img.classList.contains('intersection-observed');
      });
      expect(hasIntersectionObserver).toBe(false);
    }
  });

  test('should have Intersection Observer fallback for older browsers', async ({ page }) => {
    // Simulate browser without native lazy loading support
    await page.addInitScript(() => {
      // Remove loading property from HTMLImageElement prototype
      delete HTMLImageElement.prototype.loading;
    });

    await page.goto('/base.html');
    
    // Check for Intersection Observer implementation
    const hasIntersectionObserver = await page.evaluate(() => {
      return typeof IntersectionObserver !== 'undefined';
    });
    expect(hasIntersectionObserver).toBe(true);

    // Check if lazy loading fallback is implemented
    const avatarImage = page.locator('img[alt="User avatar"]');
    const hasFallback = await avatarImage.evaluate(img => {
      return img.hasAttribute('data-src') || 
             img.classList.contains('lazy') ||
             img.hasAttribute('data-lazy-loaded');
    });
    expect(hasFallback).toBe(true);
  });

  test('should load images when scrolled into viewport', async ({ page }) => {
    // Create a test page with images below the fold
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .spacer { height: 200vh; }
            .test-image { width: 200px; height: 200px; }
          </style>
        </head>
        <body>
          <div class="spacer">Scroll down to see images</div>
          <img class="test-image" src="https://picsum.photos/200/300?random=1" alt="Test image 1" loading="lazy" />
          <div class="spacer"></div>
          <img class="test-image" src="https://picsum.photos/200/300?random=2" alt="Test image 2" loading="lazy" />
        </body>
      </html>
    `);

    const testImage1 = page.locator('img[alt="Test image 1"]');
    const testImage2 = page.locator('img[alt="Test image 2"]');

    // Initially, images below fold should not be loaded
    const initiallyLoaded1 = await testImage1.evaluate(img => img.complete && img.naturalWidth > 0);
    const initiallyLoaded2 = await testImage2.evaluate(img => img.complete && img.naturalWidth > 0);
    
    expect(initiallyLoaded1).toBe(false);
    expect(initiallyLoaded2).toBe(false);

    // Scroll to first image
    await testImage1.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100); // Allow intersection observer to trigger
    
    // First image should now be loaded
    const scrollLoaded1 = await testImage1.evaluate(img => img.complete && img.naturalWidth > 0);
    expect(scrollLoaded1).toBe(true);

    // Second image should still not be loaded
    const scrollLoaded2 = await testImage2.evaluate(img => img.complete && img.naturalWidth > 0);
    expect(scrollLoaded2).toBe(false);

    // Scroll to second image
    await testImage2.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    
    // Now second image should be loaded
    const finalLoaded2 = await testImage2.evaluate(img => img.complete && img.naturalWidth > 0);
    expect(finalLoaded2).toBe(true);
  });

  test('should improve performance metrics with lazy loading', async ({ page }) => {
    // Start performance measurement
    await page.goto('/base.html');
    
    // Measure initial page load performance
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByType('paint').find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByType('paint').find(p => p.name === 'first-contentful-paint')?.startTime || 0
      };
    });

    // With lazy loading, initial load should be faster
    // DOM content loaded should be < 1 second for this simple page
    expect(performanceMetrics.domContentLoaded).toBeLessThan(1000);

    // Get network requests during initial load
    const resourceEntries = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .filter(entry => entry.name.match(/\.(png|jpg|jpeg|gif|webp)$/i))
        .map(entry => ({
          name: entry.name,
          size: entry.transferSize,
          duration: entry.duration
        }));
    });

    // Only visible images should be loaded initially
    // Avatar image should be loaded, but any below-fold images should not
    const imageRequests = resourceEntries.length;
    expect(imageRequests).toBeLessThanOrEqual(1); // Only avatar should load initially
  });

  test('should handle image loading errors gracefully', async ({ page }) => {
    // Create test with broken image URL
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body>
          <img src="https://broken-url.example.com/image.jpg" alt="Broken image" loading="lazy" />
        </body>
      </html>
    `);

    const brokenImage = page.locator('img[alt="Broken image"]');
    
    // Wait for image to fail loading
    await page.waitForTimeout(2000);
    
    // Verify image handles error state
    const hasError = await brokenImage.evaluate(img => {
      return img.complete && img.naturalWidth === 0;
    });
    expect(hasError).toBe(true);

    // Check if error handling is implemented (fallback image, error class, etc.)
    const hasErrorHandling = await brokenImage.evaluate(img => {
      return img.classList.contains('error') || 
             img.classList.contains('broken') ||
             img.src !== img.getAttribute('data-src') ||
             img.alt.includes('Failed to load');
    });
    expect(hasErrorHandling).toBe(true);
  });

  test('should preload critical images while lazy loading others', async ({ page }) => {
    await page.goto('/base.html');
    
    // Avatar is critical and should be loaded immediately
    const avatarImage = page.locator('img[alt="User avatar"]');
    
    // Check if avatar is marked as high priority or excluded from lazy loading
    const isCritical = await avatarImage.evaluate(img => {
      return img.loading === 'eager' || 
             img.fetchPriority === 'high' ||
             img.hasAttribute('data-critical');
    });
    
    // If not marked as critical, it should at least load quickly due to being above fold
    if (!isCritical) {
      const isAboveFold = await avatarImage.isInViewport();
      expect(isAboveFold).toBe(true);
    }
  });

  test('should respect user preferences for reduced motion', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    await page.goto('/base.html');
    
    // Check if animations are disabled or reduced for lazy loading
    const hasReducedMotion = await page.evaluate(() => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    expect(hasReducedMotion).toBe(true);

    // Loading animations should be disabled or simplified
    const avatarContainer = page.locator('[id="avatarBtn"]');
    const animationState = await avatarContainer.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        animationDuration: styles.animationDuration,
        transitionDuration: styles.transitionDuration
      };
    });
    
    // Animation duration should be minimal or zero
    const hasMinimalAnimation = 
      animationState.animationDuration === '0s' ||
      animationState.animationDuration === 'none' ||
      animationState.transitionDuration === '0s';
    
    expect(hasMinimalAnimation).toBe(true);
  });

  test.describe('Responsive Image Lazy Loading', () => {
    test('should work on mobile viewports', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone 8 size
      await page.goto('/base.html');
      
      const avatarImage = page.locator('img[alt="User avatar"]');
      await expect(avatarImage).toHaveAttribute('loading', 'lazy');
      
      // Image should still load since it's in viewport
      const isLoaded = await avatarImage.evaluate(img => img.complete && img.naturalWidth > 0);
      expect(isLoaded).toBe(true);
    });

    test('should work on tablet viewports', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 }); // iPad size
      await page.goto('/base.html');
      
      const avatarImage = page.locator('img[alt="User avatar"]');
      await expect(avatarImage).toHaveAttribute('loading', 'lazy');
    });

    test('should work on desktop viewports', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/base.html');
      
      const avatarImage = page.locator('img[alt="User avatar"]');
      await expect(avatarImage).toHaveAttribute('loading', 'lazy');
    });
  });

  test.describe('Accessibility', () => {
    test('should maintain alt text during lazy loading', async ({ page }) => {
      await page.goto('/base.html');
      
      const avatarImage = page.locator('img[alt="User avatar"]');
      
      // Alt text should be present immediately
      await expect(avatarImage).toHaveAttribute('alt', 'User avatar');
      
      // Alt text should remain after image loads
      await page.waitForTimeout(1000);
      await expect(avatarImage).toHaveAttribute('alt', 'User avatar');
    });

    test('should not interfere with screen readers', async ({ page }) => {
      await page.goto('/base.html');
      
      const avatarImage = page.locator('img[alt="User avatar"]');
      
      // Image should be accessible to screen readers
      const isAccessible = await avatarImage.evaluate(img => {
        return !img.hasAttribute('aria-hidden') && 
               !img.style.visibility === 'hidden' &&
               img.alt !== '';
      });
      expect(isAccessible).toBe(true);
    });

    test('should provide loading state announcements', async ({ page }) => {
      await page.goto('/base.html');
      
      // Check for ARIA live regions for loading states
      const hasLiveRegion = await page.locator('[aria-live]').count();
      
      // Or check for loading announcements in alt text or aria-label
      const avatarImage = page.locator('img[alt="User avatar"]');
      const hasLoadingAnnouncement = await avatarImage.evaluate(img => {
        return img.hasAttribute('aria-label') && 
               img.getAttribute('aria-label').includes('loading');
      });
      
      // At least one method should be present for accessibility
      expect(hasLiveRegion > 0 || hasLoadingAnnouncement).toBe(true);
    });
  });
});