// script.js
        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                    
                    // Scroll to target
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar background change on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(52, 72, 119, 0.98)';
            } else {
                navbar.style.background = 'rgba(52, 72, 119, 0.95)';
            }
        });

        // Active navigation link highlighting
        window.addEventListener('scroll', () => {
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
        });

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
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
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

        document.querySelectorAll('.stats-grid').forEach(stats => {
            statsObserver.observe(stats);
        });

        // Timeline animation
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.timeline-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            timelineObserver.observe(item);
        });

        // Team member hover effects
        document.querySelectorAll('.team-member').forEach(member => {
            const photo = member.querySelector('.member-photo');
            
            member.addEventListener('mouseenter', function() {
                photo.style.transform = 'scale(1.1) rotate(5deg)';
                photo.style.transition = 'transform 0.3s ease';
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            member.addEventListener('mouseleave', function() {
                photo.style.transform = 'scale(1) rotate(0deg)';
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Awards section animation
        document.querySelectorAll('.award-item').forEach((award, index) => {
            award.style.animationDelay = `${index * 0.1}s`;
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        });

        // Enhanced value card interactions
        document.querySelectorAll('.value-card').forEach(card => {
            const icon = card.querySelector('.value-icon');
            
            card.addEventListener('mouseenter', function() {
                icon.style.transform = 'rotate(360deg) scale(1.2)';
                icon.style.transition = 'transform 0.5s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                icon.style.transform = 'rotate(0deg) scale(1)';
            });
        });

        // Service category enhanced hover effects
        document.querySelectorAll('.service-category').forEach(category => {
            const icon = category.querySelector('.service-icon');
            
            category.addEventListener('mouseenter', function() {
                icon.style.transform = 'rotate(10deg) scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            });
            
            category.addEventListener('mouseleave', function() {
                icon.style.transform = 'rotate(0deg) scale(1)';
            });
        });

        // CTA button ripple effect
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

        // Add ripple animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Performance optimization: Throttle scroll events
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
            // Navbar background
            const navbar = document.querySelector('.navbar');
            if (window.pageYOffset > 50) {
                navbar.style.background = 'rgba(52, 72, 119, 0.98)';
            } else {
                navbar.style.background = 'rgba(52, 72, 119, 0.95)';
            }

            // Active navigation highlighting
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

            // Parallax effect
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        }, 16);

        window.addEventListener('scroll', throttledScroll);

        // Console log for debugging
        console.log('Katalyst Consulting - Complete Website with About Section Loaded Successfully!');
        console.log('Features: Home, Services, About sections with full interactivity');