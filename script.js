// Pixel Medieval Custom Cursor
const initPixelCursor = () => {
  if (window.matchMedia("(hover: hover)").matches) {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let animationId = null;

    // Sword cursor image
    const swordImg = new Image();
    swordImg.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZmZkNzAwIiBkPSJNNDE2LjEgMjYzLjRsLTIyLjYgMjIuNiA5LjEgOS4xYzMuMSAzLjEgMy4xIDguMiAwIDExLjNsLTEzLjkgMTMuOWMtMy4xIDMuMS04LjIgMy4xLTExLjMgMGwtOS4xLTkuMS0yMjYuNSAyMjYuNGMtLTMuMSAzLjEtOC4yIDMuMS0xMS4zIDBsLTMwLjItMzAuMmMtMy4xLTMuMS0zLjEtOC4yIDAtMTEuM2wyMjYuNC0yMjYuNS05LjEtOS4xYy0zLjEtMy4xLTMuMS04LjIgMC0xMS4zbDEzLjktMTMuOWMzLjEtMy4xIDguMi0zLjEgMTEuMyAwbDkuMSA5LjEgMjIuNi0yMi42YzkuOC05LjggMjYuOC0zLjUgMjYuOCAxMC45djQ0LjdjMCA2LjYgNS40IDEyIDEyIDEyaDQ0LjdjMTQuNCAwIDIwLjcgMTcgMTAuOSAyNi44eiIvPjwvc3ZnPg==';

    const updateCursorPos = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Immediate response for main cursor
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      
      // Smooth follower with requestAnimationFrame
      if (!animationId) {
        animationId = requestAnimationFrame(animateCursor);
      }
    };

    const animateCursor = () => {
      // Pixel-snapped movement for chunky feel
      followerX = Math.round(mouseX / 4) * 4;
      followerY = Math.round(mouseY / 4) * 4;
      
      cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      
      // Continue animation until caught up
      if (Math.abs(mouseX - followerX) > 4 || Math.abs(mouseY - followerY) > 4) {
        animationId = requestAnimationFrame(animateCursor);
      } else {
        animationId = null;
      }
    };

    // Initialize cursor elements
    cursor.style.backgroundImage = `url(${swordImg.src})`;
    cursor.style.width = '24px';
    cursor.style.height = '24px';
    cursor.style.position = 'fixed';
    cursor.style.zIndex = '9999';
    cursor.style.pointerEvents = 'none';
    cursor.style.transformOrigin = 'center center';

    cursorFollower.style.width = '40px';
    cursorFollower.style.height = '40px';
    cursorFollower.style.border = '2px dashed var(--accent)';
    cursorFollower.style.borderRadius = '50%';
    cursorFollower.style.position = 'fixed';
    cursorFollower.style.zIndex = '9998';
    cursorFollower.style.pointerEvents = 'none';
    cursorFollower.style.transformOrigin = 'center center';

    document.addEventListener('mousemove', updateCursorPos);

    // Interactive elements effects
    const interactiveElements = document.querySelectorAll(
      'a, button, .pixel-button, .project-card, .sidebar-toggle'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1.8)`;
        cursorFollower.style.border = '2px solid var(--primary)';
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) rotate(45deg)`;
      });
      
      el.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1)`;
        cursorFollower.style.border = '2px dashed var(--accent)';
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) rotate(0deg)`;
      });
    });
  } else {
    // Remove cursor elements on touch devices
    document.querySelectorAll('.cursor, .cursor-follower').forEach(el => el.remove());
  }
};

// Castle Gate Sidebar (Pixel Medieval Style)
const initCastleSidebar = () => {
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const mainContent = document.querySelector('main');
  
  // Medieval creaking sound
  const playCreakSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  const toggleSidebar = () => {
    if (sidebar.classList.contains('open')) {
      // Closing animation
      sidebar.style.transform = 'translateX(-100%)';
      playCreakSound();
      setTimeout(() => {
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
      }, 300);
    } else {
      // Opening animation
      sidebar.classList.add('open');
      document.body.classList.add('sidebar-open');
      setTimeout(() => {
        sidebar.style.transform = 'translateX(0)';
        playCreakSound();
      }, 10);
    }
  };

  // Medieval toggle button
  sidebarToggle.innerHTML = '<span class="pixel-icon">⚔</span>';
  sidebarToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSidebar();
  });

  // Close when clicking on nav links
  document.querySelectorAll('.pixel-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) toggleSidebar();
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) {
      if (sidebar.classList.contains('open')) {
        toggleSidebar();
      }
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      toggleSidebar();
    }
  });
};

// Scroll Quest (Pixel Medieval Scroll Effects)
const initScrollQuest = () => {
  const introOverlay = document.querySelector('.intro-overlay');
  const sections = document.querySelectorAll('section');
  const body = document.body;
  
  // Pixel-style scroll snapping
  let lastScroll = 0;
  let ticking = false;
  
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const direction = scrollY > lastScroll ? 'down' : 'up';
    lastScroll = scrollY;
    
    // Intro overlay fade out
    if (scrollY > 50) {
      introOverlay.style.opacity = '0';
      introOverlay.style.pointerEvents = 'none';
    } else {
      introOverlay.style.opacity = '1';
      introOverlay.style.pointerEvents = 'auto';
    }
    
    // Section animations
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom >= 0;
      
      if (isVisible) {
        section.classList.add('visible');
      }
    });
    
    // Scroll pull effect (castle banners)
    if (scrollY > 100) {
      body.classList.add('scrolled');
      const scrollProgress = Math.min(scrollY / (window.innerHeight * 0.7), 1);
      const splitAmount = 15 + (10 * scrollProgress);
      
      document.querySelector('.panel-1').style.transform = `translateX(-${splitAmount}px)`;
      document.querySelector('.panel-2').style.transform = `translateX(${splitAmount}px)`;
    } else {
      body.classList.remove('scrolled');
      document.querySelector('.panel-1').style.transform = 'translateX(0)';
      document.querySelector('.panel-2').style.transform = 'translateX(0)';
    }
  };
  
  // Optimized scroll handler
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  
  // Initialize visible sections
  handleScroll();
};

// Pixel Form Submission (Medieval Scroll Effect)
const initPixelForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    // Pixel animation
    button.disabled = true;
    button.innerHTML = '<span class="pixel-spinner">⚔⚔⚔</span>';
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success animation
      button.innerHTML = '<span class="pixel-check">✓</span> Message Sent!';
      button.style.backgroundColor = 'var(--accent)';
      button.style.color = 'var(--dark)';
      
      // Reset form
      form.reset();
      
      // Return to normal after delay
      setTimeout(() => {
        button.innerHTML = originalText;
        button.style.backgroundColor = 'var(--primary)';
        button.style.color = 'var(--light)';
        button.disabled = false;
      }, 3000);
    } catch (error) {
      button.textContent = 'Error! Try Again';
      button.style.backgroundColor = 'var(--secondary)';
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = 'var(--primary)';
        button.disabled = false;
      }, 2000);
    }
  });
};

// Floating Pixel Letters (Medieval Banner Effect)
const initFloatingLetters = () => {
  const letters = document.querySelectorAll('.float-letter');
  letters.forEach((letter, index) => {
    // Random medieval-style float pattern
    const delay = index * 0.1;
    const duration = 2 + Math.random() * 1;
    const distance = 5 + Math.random() * 3;
    
    letter.style.animation = 
      `pixel-float ${duration}s ease-in-out ${delay}s infinite alternate`;
    letter.style.transform = `translateY(-${distance}px)`;
  });
};

// Initialize the Medieval Experience
document.addEventListener('DOMContentLoaded', () => {
  // Set pixel-perfect body visibility
  document.body.style.visibility = 'hidden';
  setTimeout(() => {
    document.body.style.visibility = 'visible';
  }, 100);
  
  // Initialize all components
  initPixelCursor();
  initCastleSidebar();
  initScrollQuest();
  initPixelForm();
  initFloatingLetters();
  
  // Pixel view counter (from previous implementation)
  const viewCount = document.getElementById('viewCount');
  if (viewCount) {
    fetch('https://api.countapi.xyz/hit/polyuih-portfolio/views')
      .then(res => res.json())
      .then(data => {
        viewCount.textContent = data.value.toString().padStart(4, '0');
      });
  }
});

// Fallback for older browsers
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (callback) => {
    return setTimeout(callback, 16);
  };
}
