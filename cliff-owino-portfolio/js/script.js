document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-toggle-icon');
  const yearNode = document.getElementById('year');
  const backToTop = document.querySelector('.back-to-top');
  const filterButtons = document.querySelectorAll('.filter-button');
  const projectCards = document.querySelectorAll('.project-card');
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const typingText = document.querySelector('.typing-text');

  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.setAttribute('data-theme', 'light');
    if (themeIcon) {
      themeIcon.textContent = '🌙';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = body.getAttribute('data-theme') === 'light';
      body.setAttribute('data-theme', isLight ? 'dark' : 'light');
      localStorage.setItem('theme', isLight ? 'dark' : 'light');
      if (themeIcon) {
        themeIcon.textContent = isLight ? '☀️' : '🌙';
      }
    });
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  const updateActiveLink = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const id = section.getAttribute('id');
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach((link) => {
          const linkTarget = link.getAttribute('href');
          link.classList.toggle('active', linkTarget === `#${id}`);
        });
      }
    });
  };

  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink);

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  const typingWords = [
    'AI & Technology Enthusiast',
    'Data Annotation Learner',
    'Software Development Explorer'
  ];

  const typeText = (text, callback) => {
    if (!typingText) {
      return;
    }

    let index = 0;
    const write = () => {
      typingText.textContent = text.slice(0, index);
      index += 1;

      if (index <= text.length) {
        setTimeout(write, 110);
      } else {
        setTimeout(() => callback && callback(), 1200);
      }
    };

    write();
  };

  const cycleTyping = () => {
    if (!typingText) {
      return;
    }

    let current = 0;
    const run = () => {
      typeText(typingWords[current], () => {
        setTimeout(() => {
          current = (current + 1) % typingWords.length;
          run();
        }, 800);
      });
    };

    run();
  };

  cycleTyping();

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filterValue = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

      projectCards.forEach((card) => {
        const matches = filterValue === 'all' || card.dataset.category.includes(filterValue);
        card.classList.toggle('hidden', !matches);
      });
    });
  });

  const validateField = (field) => {
    const value = field.value.trim();
    const name = field.name;

    if (!value) {
      return `${field.labels[0].textContent} is required.`;
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address.';
      }
    }

    if (name === 'subject' && value.length < 3) {
      return 'Subject must be at least 3 characters long.';
    }

    if (name === 'message' && value.length < 10) {
      return 'Message must be at least 10 characters long.';
    }

    return '';
  };

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let errorMessage = '';

      ['name', 'email', 'subject', 'message'].forEach((fieldName) => {
        const field = form.elements[fieldName];
        const message = validateField(field);
        if (message) {
          errorMessage = message;
        }
      });

      if (errorMessage) {
        formMessage.textContent = errorMessage;
        formMessage.className = 'form-message error';
        return;
      }

      formMessage.textContent = 'Thank you! Your message has been received.';
      formMessage.className = 'form-message success';
      form.reset();
    });
  }

  const toggleBackToTop = () => {
    if (!backToTop) {
      return;
    }

    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop);

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
