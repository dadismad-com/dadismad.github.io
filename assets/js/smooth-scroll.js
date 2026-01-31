// Smooth Scrolling Enhancement for GitHub Pages Jekyll Site

document.addEventListener('DOMContentLoaded', function() {
  
  // Smooth scroll to sections when clicking nav links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Hide/show navigation on scroll
  let lastScrollTop = 0;
  const nav = document.querySelector('.nav-container');
  const scrollThreshold = 100;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > scrollThreshold) {
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        nav.classList.add('nav-hidden');
      } else {
        // Scrolling up
        nav.classList.remove('nav-hidden');
      }
    } else {
      nav.classList.remove('nav-hidden');
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Active section highlighting in navigation
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Remove active class from all nav items
        navItems.forEach(item => {
          item.classList.remove('active');
        });
        
        // Add active class to current nav item
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Mousewheel smooth section snapping (optional enhancement)
  let isScrolling = false;
  let scrollTimeout;
  
  function snapToSection(direction) {
    if (isScrolling) return;
    
    const currentScroll = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const currentSection = Math.round(currentScroll / windowHeight);
    
    let targetSection;
    if (direction === 'down') {
      targetSection = Math.min(currentSection + 1, sections.length - 1);
    } else {
      targetSection = Math.max(currentSection - 1, 0);
    }
    
    if (targetSection !== currentSection) {
      isScrolling = true;
      sections[targetSection].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }
  }
  
  // Optional: Uncomment to enable mousewheel section snapping
  // Note: This may interfere with normal scrolling behavior
  /*
  window.addEventListener('wheel', function(e) {
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
      if (e.deltaY > 0) {
        snapToSection('down');
      } else {
        snapToSection('up');
      }
    }, 150);
  }, { passive: true });
  */
  
  // Add entrance animations when sections come into view
  const animateOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };
  
  const animateObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, animateOptions);
  
  const animatedElements = document.querySelectorAll('.card, .grid > *');
  animatedElements.forEach(el => {
    animateObserver.observe(el);
  });
  
  // Mobile menu toggle (if you add a hamburger menu later)
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinksContainer.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking a link
  if (navLinksContainer) {
    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navLinksContainer.classList.remove('active');
        if (mobileMenuToggle) {
          mobileMenuToggle.classList.remove('active');
        }
      });
    });
  }
  
  // Parallax effect for hero section (optional)
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      hero.style.transform = `translateY(${parallax}px)`;
    }, { passive: true });
  }
  
});
