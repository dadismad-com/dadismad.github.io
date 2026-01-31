// Enhanced Interactive Animations for DadisMAD Portfolio

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // SMOOTH SCROLL & NAVIGATION
  // ==========================================
  
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
  
  // ==========================================
  // NAVIGATION EFFECTS
  // ==========================================
  
  let lastScrollTop = 0;
  const nav = document.querySelector('.nav-container');
  const scrollThreshold = 100;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for nav background
    if (scrollTop > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Hide/show navigation on scroll
    if (scrollTop > scrollThreshold) {
      if (scrollTop > lastScrollTop) {
        nav.classList.add('nav-hidden');
      } else {
        nav.classList.remove('nav-hidden');
      }
    } else {
      nav.classList.remove('nav-hidden');
    }
    
    lastScrollTop = scrollTop;
  });
  
  // ==========================================
  // ACTIVE SECTION HIGHLIGHTING
  // ==========================================
  
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
        
        navItems.forEach(item => {
          item.classList.remove('active');
        });
        
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
  
  // ==========================================
  // SCROLL-TRIGGERED ANIMATIONS
  // ==========================================
  
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .scale-in');
  
  const revealOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };
  
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, revealOptions);
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
  
  // ==========================================
  // GRID STAGGER ANIMATIONS
  // ==========================================
  
  const grids = document.querySelectorAll('.grid');
  
  const gridObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.2 });
  
  grids.forEach(grid => {
    gridObserver.observe(grid);
  });
  
  // ==========================================
  // DRAGGABLE CARDS
  // ==========================================
  
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    let isDragging = false;
    let startX, startY;
    let translateX = 0, translateY = 0;
    let currentX = 0, currentY = 0;
    
    card.addEventListener('mousedown', function(e) {
      // Don't drag if clicking on a link
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        return;
      }
      
      isDragging = true;
      card.classList.add('dragging');
      
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      
      card.style.transition = 'none';
      card.style.zIndex = '1000';
    });
    
    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      
      e.preventDefault();
      
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      
      card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentX * 0.02}deg)`;
    });
    
    document.addEventListener('mouseup', function() {
      if (!isDragging) return;
      
      isDragging = false;
      card.classList.remove('dragging');
      
      // Snap back with elastic animation
      card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      card.style.transform = '';
      card.style.zIndex = '';
      
      currentX = 0;
      currentY = 0;
    });
    
    // Touch support for mobile
    card.addEventListener('touchstart', function(e) {
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        return;
      }
      
      isDragging = true;
      card.classList.add('dragging');
      
      const touch = e.touches[0];
      startX = touch.clientX - currentX;
      startY = touch.clientY - currentY;
      
      card.style.transition = 'none';
      card.style.zIndex = '1000';
    });
    
    document.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
      
      const touch = e.touches[0];
      currentX = touch.clientX - startX;
      currentY = touch.clientY - startY;
      
      card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentX * 0.02}deg)`;
    });
    
    document.addEventListener('touchend', function() {
      if (!isDragging) return;
      
      isDragging = false;
      card.classList.remove('dragging');
      
      card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      card.style.transform = '';
      card.style.zIndex = '';
      
      currentX = 0;
      currentY = 0;
    });
  });
  
  // ==========================================
  // 3D CARD TILT EFFECT
  // ==========================================
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      if (card.classList.contains('dragging')) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      if (!card.classList.contains('dragging')) {
        card.style.transform = '';
      }
    });
  });
  
  // ==========================================
  // PARALLAX SCROLLING
  // ==========================================
  
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach((el, index) => {
      const speed = el.dataset.speed || 0.5;
      const offset = scrolled * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  });
  
  // ==========================================
  // HERO PARALLAX EFFECT
  // ==========================================
  
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      hero.style.transform = `translateY(${parallax}px)`;
    }, { passive: true });
  }
  
  // ==========================================
  // MOUSE MOVE PARALLAX ON HERO
  // ==========================================
  
  if (hero) {
    hero.addEventListener('mousemove', function(e) {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const moveX = (mouseX - 0.5) * 50;
      const moveY = (mouseY - 0.5) * 50;
      
      const heroContent = hero.querySelector('.section-content');
      if (heroContent) {
        heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });
    
    hero.addEventListener('mouseleave', function() {
      const heroContent = hero.querySelector('.section-content');
      if (heroContent) {
        heroContent.style.transform = '';
      }
    });
  }
  
  // ==========================================
  // SCROLL INDICATOR CLICK
  // ==========================================
  
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const nextSection = document.querySelector('#about');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // ==========================================
  // CURSOR TRAIL EFFECT (Optional)
  // ==========================================
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // ==========================================
  // PERFORMANCE: REQUEST ANIMATION FRAME
  // ==========================================
  
  function animate() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // ==========================================
  // SOCIAL LINKS ANIMATION
  // ==========================================
  
  const socialLinks = document.querySelectorAll('.social-links a');
  
  socialLinks.forEach((link, index) => {
    link.style.animationDelay = `${index * 0.1}s`;
    link.style.animation = 'fadeInUp 0.6s ease forwards';
  });
  
  // ==========================================
  // BUTTON RIPPLE EFFECT
  // ==========================================
  
  const buttons = document.querySelectorAll('.cta-button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;
      
      const ripple = document.createElement('span');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // ==========================================
  // PREVENT CARD DRAG ON LINK CLICK
  // ==========================================
  
  const cardLinks = document.querySelectorAll('.card a');
  
  cardLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
  
  // ==========================================
  // PAGE LOAD ANIMATION
  // ==========================================
  
  window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });
  
  // ==========================================
  // CONSOLE EASTER EGG
  // ==========================================
  
  console.log('%cDadisMAD', 'font-size: 50px; color: #e94560; font-weight: bold;');
  console.log('%cWhere MADness is our Method! 🚀', 'font-size: 16px; color: #eaeaea;');
  console.log('%cBuilt with ❤️ and lots of animations', 'font-size: 12px; color: #0f3460;');
  
});
