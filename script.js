// Initialize Sidebar
const initSidebar = () => {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.sidebar-toggle');
  
  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    document.body.classList.toggle('sidebar-open');
  });
  
  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && e.target !== toggle) {
      sidebar.classList.remove('active');
      document.body.classList.remove('sidebar-open');
    }
  });
};

// Scroll Animations
const initScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.fade-in').forEach(section => {
    observer.observe(section);
  });
};

// Animate Stats
const animateStats = () => {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      stat.textContent = Math.floor(current);
      
      if (current >= target) {
        stat.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  });
};

// Gamification - Track Views
const trackViews = () => {
  const viewCount = document.getElementById('viewCount');
  if (!viewCount) return;
  
  // Use localStorage for client-side tracking
  let views = localStorage.getItem('portfolioViews') || 0;
  views++;
  localStorage.setItem('portfolioViews', views);
  
  // Display with leading zeros
  viewCount.textContent = views.toString().padStart(4, '0');
  
  // Alternatively, use a simple API
  // fetch('https://api.countapi.xyz/hit/polyuih-portfolio/views')
  //   .then(res => res.json())
  //   .then(data => {
  //     viewCount.textContent = data.value.toString().padStart(4, '0');
  //   });
};

// Initialize Portfolio Videos
const initPortfolioVideos = () => {
  const videos = document.querySelectorAll('video');
  
  videos.forEach(video => {
    video.addEventListener('mouseenter', () => video.play());
    video.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
    
    // For mobile
    video.addEventListener('touchstart', () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  });
};

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initScrollAnimations();
  animateStats();
  trackViews();
  initPortfolioVideos();
  
  // Add letter animation delays
  document.querySelectorAll('.letter-animate').forEach((letter, index) => {
    letter.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Quest completion example
  setTimeout(() => {
    document.querySelector('.quest-progress .progress').style.width = '66%';
    document.querySelector('.quest-tracker p').textContent = 'Complete 5 animations';
  }, 3000);
});
