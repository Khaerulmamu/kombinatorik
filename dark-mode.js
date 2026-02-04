/**
 * Dark Mode Toggle System
 * Provides dark mode functionality with localStorage persistence and system preference detection
 */

(function() {
    'use strict';
    
    const STORAGE_KEY = 'kombinatorik-dark-mode';
    const DARK_CLASS = 'dark';
    
    /**
     * Initialize dark mode based on saved preference or system preference
     */
    function initDarkMode() {
        const savedMode = localStorage.getItem(STORAGE_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedMode === 'dark' || (!savedMode && prefersDark)) {
            document.documentElement.classList.add(DARK_CLASS);
            updateToggleIcon(true);
        } else {
            document.documentElement.classList.remove(DARK_CLASS);
            updateToggleIcon(false);
        }
    }
    
    /**
     * Toggle dark mode on/off
     */
    function toggleDarkMode() {
        const html = document.documentElement;
        const isDark = html.classList.toggle(DARK_CLASS);
        
        localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
        updateToggleIcon(isDark);
    }
    
    /**
     * Update toggle button icon
     * @param {boolean} isDark - Whether dark mode is active
     */
    function updateToggleIcon(isDark) {
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = isDark 
                ? '<span class="text-2xl" aria-label="Switch to light mode">☀️</span>'
                : '<span class="text-2xl" aria-label="Switch to dark mode">🌙</span>';
            toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }
    
    /**
     * Listen for system theme changes
     */
    function watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem(STORAGE_KEY)) {
                if (e.matches) {
                    document.documentElement.classList.add(DARK_CLASS);
                    updateToggleIcon(true);
                } else {
                    document.documentElement.classList.remove(DARK_CLASS);
                    updateToggleIcon(false);
                }
            }
        });
    }
    
    // Initialize immediately (before DOM loads) to prevent flash
    initDarkMode();
    
    // Set up toggle button and system theme watcher when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupToggleButton();
            watchSystemTheme();
        });
    } else {
        setupToggleButton();
        watchSystemTheme();
    }
    
    /**
     * Set up the toggle button event listener
     */
    function setupToggleButton() {
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleDarkMode);
            // Ensure icon is correct on load
            updateToggleIcon(document.documentElement.classList.contains(DARK_CLASS));
        }
    }
    
    // Expose toggle function globally for inline onclick handlers (if needed)
    window.toggleDarkMode = toggleDarkMode;
})();
