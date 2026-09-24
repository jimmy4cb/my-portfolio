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
  const networkCanvas = document.getElementById('networkCanvas');
  const projectModal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.querySelector('.modal-close');
  let lastFocusedElement;

  if (yearNode) {
    yearNode.textContent = '2026';
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.setAttribute('data-theme', 'light');
    if (themeIcon) {
      themeIcon.textContent = '☾';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = body.getAttribute('data-theme') === 'light';
      body.setAttribute('data-theme', isLight ? 'dark' : 'light');
      localStorage.setItem('theme', isLight ? 'dark' : 'light');
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to light mode' : 'Switch to dark mode');
      if (themeIcon) {
        themeIcon.textContent = isLight ? '☀' : '☾';
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
    'AI & Technology Enthusiast | Data Annotation | Software Development'
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

  const projectDetails = {
    billing: {
      title: 'Agoro Sare School Billing Management System',
      background: 'A web-based concept for making school billing and student payment information easier to organize.',
      problem: 'Schools need a clear way to track billing records and communicate payment information without relying on scattered paperwork.',
      features: ['Student and billing record views', 'Payment information summaries', 'Responsive staff-facing interface'],
      tools: 'HTML, CSS and JavaScript'
    },
    lakeside: {
      title: 'Lakeside Adventure Community Website',
      background: 'A community website concept for connecting people with hiking, cycling, camping, cultural tours and nature experiences.',
      problem: 'Local experiences can be difficult to discover when information is spread across informal channels.',
      features: ['Activity discovery', 'Community-oriented presentation', 'Mobile-friendly experience pages'],
      tools: 'HTML, CSS and JavaScript'
    },
    annotation: {
      title: 'AI Data Annotation Projects',
      background: 'A collection of practical learning work around preparing and annotating image, video and dataset training data.',
      problem: 'AI systems depend on consistent, carefully reviewed training data.',
      features: ['Image and video annotation practice', 'Dataset preparation workflows', 'Quality-focused review and validation'],
      tools: 'CVAT, Label Studio, Labelbox and annotation workflows'
    },
    smartflow: {
      title: 'Kisumu SmartFlow',
      background: 'An AI-assisted traffic monitoring concept for exploring congestion patterns in Kisumu.',
      problem: 'Traffic observations can be difficult to compare and interpret without structured local data.',
      features: ['Traffic observation collection', 'Congestion hotspot exploration', 'Computer vision and data annotation direction'],
      tools: 'Python, AI concepts, computer vision, data annotation and JavaScript'
    }
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocusedElement) lastFocusedElement.focus();
  };

  const openProjectModal = (project) => {
    if (!projectModal || !modalTitle || !modalContent || !project) return;
    lastFocusedElement = document.activeElement;
    modalTitle.textContent = project.title;
    modalContent.innerHTML = `<p>${project.background}</p><h3>Problem statement</h3><p>${project.problem}</p><h3>Key features</h3><ul>${project.features.map((feature) => `<li>${feature}</li>`).join('')}</ul><h3>Tools used</h3><p>${project.tools}</p>`;
    projectModal.hidden = false;
    document.body.classList.add('modal-open');
    modalClose.focus();
  };

  document.querySelectorAll('[data-project]').forEach((button) => {
    button.addEventListener('click', () => openProjectModal(projectDetails[button.dataset.project]));
  });

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (event) => {
      if (event.target === projectModal) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectModal && !projectModal.hidden) closeProjectModal();
    if (event.key === 'Tab' && projectModal && !projectModal.hidden) {
      const focusable = projectModal.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  document.querySelectorAll('.copy-button').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = 'Copied';
      } catch (error) {
        window.prompt('Copy this contact detail:', value);
      }
      setTimeout(() => { button.textContent = 'Copy'; }, 1800);
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
        field.classList.toggle('invalid', Boolean(message));
        field.setAttribute('aria-invalid', String(Boolean(message)));
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

  if (networkCanvas) {
    const context = networkCanvas.getContext('2d');
    const points = Array.from({ length: 22 }, (_, index) => ({
      x: (index * 83) % networkCanvas.width,
      y: (index * 137) % networkCanvas.height,
      dx: index % 2 ? 0.18 : -0.14,
      dy: index % 3 ? 0.12 : -0.16
    }));
    const drawNetwork = () => {
      context.clearRect(0, 0, networkCanvas.width, networkCanvas.height);
      points.forEach((point, index) => {
        point.x = (point.x + point.dx + networkCanvas.width) % networkCanvas.width;
        point.y = (point.y + point.dy + networkCanvas.height) % networkCanvas.height;
        points.slice(index + 1).forEach((other) => {
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance < 145) {
            context.strokeStyle = `rgba(82, 200, 255, ${0.16 * (1 - distance / 145)})`;
            context.beginPath(); context.moveTo(point.x, point.y); context.lineTo(other.x, other.y); context.stroke();
          }
        });
        context.fillStyle = '#52c8ff';
        context.beginPath(); context.arc(point.x, point.y, 2.5, 0, Math.PI * 2); context.fill();
      });
      requestAnimationFrame(drawNetwork);
    };
    drawNetwork();
  }
});
