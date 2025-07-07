document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');
  const spinner = document.getElementById('spinner-overlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('active');
  }

  hamburger.addEventListener('click', toggleMenu);
  hamburger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleMenu();
    }
  });

  // Close mobile menu on nav link click
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Only close if menu is open (mobile)
      if (mainNav.classList.contains('active')) {
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
      }
    });
  });

  // Back to Top button logic
  window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', function() {
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Hide spinner after page load
  if (spinner) {
    setTimeout(() => spinner.classList.add('hide'), 600);
  }

  // Animate on scroll
  const animatedEls = [
    ...document.querySelectorAll('.about-text, .about-img img, .feature-card, .features h2, .about h2, .features .features-subtitle')
  ];
  animatedEls.forEach(el => {
    el.classList.add('animate-fadeInUp');
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    animatedEls.forEach(el => {
      observer.observe(el);
    });
  } else {
    // Fallback: show all
    animatedEls.forEach(el => {
      el.style.opacity = 1;
    });
  }

  // Subtle parallax effect for hero and about
  function parallax() {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero');
    const about = document.querySelector('.about');
    if (hero) {
      hero.style.backgroundPosition = `center ${scrollY * 0.25}px`;
    }
    if (about) {
      about.style.backgroundPosition = `center ${-100 + scrollY * 0.12}px`;
    }
  }
  window.addEventListener('scroll', parallax);
  parallax();
});
