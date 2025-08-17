// Custom cursor with performance optimization
const initCustomCursor = () => {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let animate = false;

  const updateCursorPos = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    
    if (!animate) {
      animate = true;
      requestAnimationFrame(animateCursor);
    }
  };

  const animateCursor = () => {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;
    
    followerX += distX / 6;
    followerY += distY / 6;
    
    cursorFollower.style.left = `${followerX}px`;
    cursorFollower.style.top = `${followerY}px`;
    
    if (Math.abs(distX) > 0.1 || Math.abs(distY) > 0.1) {
      requestAnimationFrame(animateCursor);
    } else {
      animate = false;
    }
  };

  document.addEventListener('mousemove', updateCursorPos);

  // Interactive elements effect
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .sidebar-toggle');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.borderColor = 'var(--primary)';
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.borderColor = 'var(--secondary)';
    });
  });
};

// Sidebar functionality
const initSidebar = () => {
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const mainContent = document.querySelector('main');

  const toggleSidebar = () => {
    sidebar.classList.toggle('open');
    document.body.classList.toggle('sidebar-open');
    
    // Close mobile menu if open
    document.querySelector('.nav-links').classList.remove('show');
  };

  sidebarToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSidebar();
  });

  // Close sidebar when clicking on nav links
  document.querySelectorAll('.sidebar .nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      toggleSidebar();
    });
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('open')) {
      toggleSidebar();
    }
  });

  // Close sidebar with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      toggleSidebar();
    }
  });
};

// Smooth scrolling and section animations
const initScrollEffects = () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Section animations
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });
};

// Form submission handler
const initForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = e.target.querySelector('button');
    if (!button) return;
    
    button.disabled = true;
    button.textContent = 'Sending...';
    button.style.backgroundColor = 'var(--secondary)';
    
    // Simulate form submission
    setTimeout(() => {
      button.textContent = 'Message Sent!';
      setTimeout(() => {
        button.textContent = 'Send Message';
        button.style.backgroundColor = 'var(--primary)';
        button.disabled = false;
        form.reset();
      }, 2000);
    }, 1000);
  });
};

// Floating letters animation
const initFloatingLetters = () => {
  const letters = document.querySelectorAll('h1 span');
  letters.forEach((letter, index) => {
    letter.style.animationDelay = `${index * 0.1}s`;
  });
};

// Scroll effects (intro overlay and pull effect)
const initScrollAnimations = () => {
  const introOverlay = document.querySelector('.intro-overlay');
  const body = document.body;
  let introHidden = false;
  let ticking = false;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const heroSection = document.querySelector('#hero');
    const heroOffset = heroSection?.offsetTop || 0;

    // Intro overlay fade out
    if (scrollY > 50 && !introHidden) {
      introOverlay.style.opacity = '0';
      introOverlay.style.transform = 'translateY(-20px)';
      introHidden = true;
    } else if (scrollY <= 50 && introHidden) {
      introOverlay.style.opacity = '1';
      introOverlay.style.transform = 'translateY(0)';
      introHidden = false;
    }

    // Scroll pull effect
    if (scrollY > 100) {
      body.classList.add('scrolled');
      const scrollProgress = Math.min(scrollY / (windowHeight * 0.7), 1);
      const splitAmount = 25 + (15 * scrollProgress);
      const rotation = 3 + (2 * scrollProgress);
      
      document.querySelector('.panel-1').style.transform = `translateX(-${splitAmount}%) rotate(-${rotation}deg)`;
      document.querySelector('.panel-2').style.transform = `translateX(${splitAmount}%) rotate(${rotation}deg)`;
      
      if (scrollY > heroOffset - windowHeight/2) {
        body.classList.add('scrolled-completely');
      } else {
        body.classList.remove('scrolled-completely');
      }
    } else {
      body.classList.remove('scrolled');
      body.classList.remove('scrolled-completely');
    }
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initSidebar();
  initScrollEffects();
  initForm();
  initFloatingLetters();
  initScrollAnimations();
  
  // Make sure content is visible if JS fails
  setTimeout(() => {
    document.body.style.visibility = 'visible';
  }, 500);
});
