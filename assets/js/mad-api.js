// MAD as a Service - Dynamic Hero Message Loader

(function() {
  'use strict';
  
  // Configuration
  // AWS Lambda API Gateway URL - Update after deployment
  const API_BASE_URL = 'https://j6xqi5kcbe.execute-api.us-east-1.amazonaws.com/Prod';  // e.g., https://abc123.execute-api.us-east-1.amazonaws.com/Prod
  
  const API_ENDPOINT = '/method'; // Default endpoint
  const FALLBACK_MESSAGE = 'Welcome to where Method has MADness';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
  
  // Hero title element
  const heroTitle = document.querySelector('.hero h1');
  
  if (!heroTitle) {
    console.warn('MAD API: Hero title element not found');
    return;
  }
  
  /**
   * Fetch MAD message from API with caching
   */
  async function fetchMADMessage() {
    try {
      // Check cache first
      const cached = getCachedMessage();
      if (cached) {
        return cached;
      }
      
      // Build API URL
      const fetchUrl = `${API_BASE_URL}${API_ENDPOINT}`;
      
      // Fetch from API
      const response = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const message = data.mad;
      
      // Cache the message
      cacheMessage(message);
      
      return message;
      
    } catch (error) {
      console.warn('MAD API: Failed to fetch message, using fallback:', error);
      return FALLBACK_MESSAGE;
    }
  }
  
  /**
   * Get cached message from sessionStorage
   */
  function getCachedMessage() {
    try {
      const cached = sessionStorage.getItem('mad_message');
      const cacheTime = sessionStorage.getItem('mad_message_time');
      
      if (!cached || !cacheTime) return null;
      
      const elapsed = Date.now() - parseInt(cacheTime, 10);
      
      // Return cached message if still valid
      if (elapsed < CACHE_DURATION) {
        return cached;
      }
      
      // Cache expired, clear it
      sessionStorage.removeItem('mad_message');
      sessionStorage.removeItem('mad_message_time');
      return null;
      
    } catch (error) {
      console.warn('MAD API: Cache error:', error);
      return null;
    }
  }
  
  /**
   * Cache message in sessionStorage
   */
  function cacheMessage(message) {
    try {
      sessionStorage.setItem('mad_message', message);
      sessionStorage.setItem('mad_message_time', Date.now().toString());
    } catch (error) {
      console.warn('MAD API: Failed to cache message:', error);
    }
  }
  
  /**
   * Update hero title with animation
   */
  function updateHeroTitle(message) {
    // Fade out
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      // Update text directly from API
      heroTitle.textContent = message;
      
      // Fade in
      heroTitle.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 300);
  }
  
  /**
   * Force refresh message (bypasses cache)
   */
  function refreshMessage() {
    sessionStorage.removeItem('mad_message');
    sessionStorage.removeItem('mad_message_time');
    loadMADMessage();
  }
  
  /**
   * Main load function
   */
  async function loadMADMessage() {
    try {
      const message = await fetchMADMessage();
      updateHeroTitle(message);
      
      // Log to console for debugging
      console.log(`%c🤪 MAD Message: ${message}`, 'color: #e94560; font-size: 14px; font-weight: bold;');
      
    } catch (error) {
      console.error('MAD API: Unexpected error:', error);
      updateHeroTitle(FALLBACK_MESSAGE);
    }
  }
  
  /**
   * Initialize on page load
   */
  function init() {
    // Add slight delay for smoother loading
    setTimeout(loadMADMessage, 100);
    
    // Expose refresh function globally for manual refresh
    window.refreshMADMessage = refreshMessage;
    
    // Optional: Add keyboard shortcut (Cmd/Ctrl + Shift + M)
    document.addEventListener('keydown', function(e) {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        console.log('🤪 Refreshing MAD message...');
        refreshMessage();
      }
    });
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Export for potential module use
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      fetchMADMessage,
      refreshMessage,
      updateHeroTitle
    };
  }
  
})();
