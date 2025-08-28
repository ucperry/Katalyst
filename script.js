// Katalyst Consulting Website JavaScript

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            
            // Scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(52, 72, 119, 0.98)';
        } else {
            navbar.style.background = 'rgba(52, 72, 119, 0.95)';
        }
    }
}

// Active navigation link highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Parallax effect for hero section
function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
}

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    updateNavbar();
    updateActiveNav();
    updateParallax();
}, 16);

window.addEventListener('scroll', throttledScroll);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// Timeline animation
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.timeline-item').forEach(item => {
        timelineObserver.observe(item);
    });
});

// Team member hover effects
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.team-member').forEach(member => {
        const photo = member.querySelector('.member-photo');
        
        if (photo) {
            member.addEventListener('mouseenter', function() {
                photo.style.transform = 'scale(1.1) rotate(5deg)';
                photo.style.transition = 'transform 0.3s ease';
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            member.addEventListener('mouseleave', function() {
                photo.style.transform = 'scale(1) rotate(0deg)';
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
    });
});

// Enhanced value card interactions
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.value-card').forEach(card => {
        const icon = card.querySelector('.value-icon');
        
        if (icon) {
            card.addEventListener('mouseenter', function() {
                icon.style.transform = 'rotate(360deg) scale(1.2)';
                icon.style.transition = 'transform 0.5s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                icon.style.transform = 'rotate(0deg) scale(1)';
            });
        }
    });
});

// Service category enhanced hover effects
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.service-category').forEach(category => {
        const icon = category.querySelector('.service-icon');
        
        if (icon) {
            category.addEventListener('mouseenter', function() {
                icon.style.transform = 'rotate(10deg) scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            });
            
            category.addEventListener('mouseleave', function() {
                icon.style.transform = 'rotate(0deg) scale(1)';
            });
        }
    });
});

// Statistics counter animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const text = element.textContent;
        if (text.includes('+')) {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        } else if (text.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (text.includes('x')) {
            element.textContent = current.toFixed(1) + 'x';
        } else if (text.includes('/')) {
            element.textContent = current.toFixed(0) + '/7';
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Counter animation on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                let number;
                
                if (text.includes('24/7')) {
                    return; // Skip animation for 24/7
                } else if (text.includes('+')) {
                    number = parseInt(text.replace(/[^\d]/g, ''));
                } else if (text.includes('%')) {
                    number = parseInt(text.replace('%', ''));
                } else if (text.includes('x')) {
                    number = parseFloat(text.replace('x', ''));
                } else {
                    number = parseInt(text.replace(/[^\d]/g, ''));
                }
                
                if (number) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.stats-grid').forEach(stats => {
        statsObserver.observe(stats);
    });
});

// CTA button ripple effect
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            
            // Simple form validation
            if (!name || !name.trim()) {
                alert('Please enter your name.');
                return;
            }
            
            const email = formData.get('email');
            if (!email || !email.trim()) {
                alert('Please enter your email address.');
                return;
            }
            
            const message = formData.get('message');
            if (!message || !message.trim()) {
                alert('Please enter a message.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert(`Thank you, ${name}! Your message has been sent. We'll get back to you within 24 hours.`);
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
});

// Enhanced portfolio item animations
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        portfolioObserver.observe(item);
    });
});

// Awards animation with stagger
const awardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.award-item').forEach(item => {
        awardsObserver.observe(item);
    });
});

// Team member cards animation
const teamObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 120);
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.team-member').forEach(member => {
        teamObserver.observe(member);
    });
});

// Value cards animation
const valuesObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.value-card').forEach(card => {
        valuesObserver.observe(card);
    });
});

// Tool category hover effects
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tool-category').forEach(category => {
        const toolIcon = category.querySelector('.tool-icon');
        
        if (toolIcon) {
            category.addEventListener('mouseenter', function() {
                toolIcon.style.transform = 'rotate(15deg) scale(1.1)';
                toolIcon.style.transition = 'transform 0.3s ease';
            });
            
            category.addEventListener('mouseleave', function() {
                toolIcon.style.transform = 'rotate(0deg) scale(1)';
            });
        }
    });
});

// Process step hover effects
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.process-step').forEach(step => {
        const stepNumber = step.querySelector('.step-number');
        
        if (stepNumber) {
            step.addEventListener('mouseenter', function() {
                stepNumber.style.transform = 'scale(1.1) rotate(10deg)';
                stepNumber.style.transition = 'transform 0.3s ease';
            });
            
            step.addEventListener('mouseleave', function() {
                stepNumber.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial active nav state
    updateActiveNav();
    
    // Add loading animation completion
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize any tool buttons with placeholder functionality
    document.querySelectorAll('.tool-button').forEach(button => {
        if (!button.onclick) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const buttonText = this.textContent;
                alert(`This would link to the ${buttonText.replace('View ', '').replace(' Template', '')}. In a live site, this would open the full document.`);
            });
        }
    });
});

// Console log for debugging
console.log('Katalyst Consulting - Complete Website JavaScript Loaded Successfully!');
console.log('Features: Navigation, Animations, Form Handling, Interactive Effects');

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

function safeQuerySelectorAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Elements not found: ${selector}`);
        return [];
    }
}

// Performance monitoring
let performanceMetrics = {
    scriptLoadTime: Date.now(),
    interactionCount: 0
};

// Track user interactions for analytics (if needed)
document.addEventListener('click', function() {
    performanceMetrics.interactionCount++;
});

// Export functions for potential external use
window.KatalystWebsite = {
    updateNavbar,
    updateActiveNav,
    updateParallax,
    animateCounter,
    isInViewport,
    performanceMetrics
};