document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.add('active');
            // Change icon to 'X' (we'd need lucide reference, simpler to just let it be or swap icon name)
            mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
            lucide.createIcons();
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
            document.body.style.overflow = '';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.service-card, .package-card, .review-card, .section-header, .stat-item');
    
    // Add initial reveal class
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Handle Form Submit (prevent default for now)
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Request Sent!';
            btn.style.backgroundColor = '#10b981'; // Green color
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                form.reset();
            }, 3000);
        });
    }

});

// Global functions for the modal
window.openModal = function(modalId = 'menuModal') {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scrolling behind modal
    }
}

window.closeModal = function(modalId = 'menuModal') {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

window.bookMenuViaWhatsApp = function(packageName, price, modalId) {
    const modal = document.getElementById(modalId);
    let itemsList = "";
    
    if (modal) {
        const items = modal.querySelectorAll('.menu-items-list li');
        items.forEach((item, index) => {
            // Remove the icon text if any and get clean item name
            const itemName = item.textContent.trim();
            itemsList += `${index + 1}. ${itemName}%0A`;
        });
    }

    let message = `*SRI SAI CATERS - MENU BOOKING*%0A%0A`;
    message += `I would like to book the following menu plan:%0A`;
    message += `*Package:* ${packageName}%0A`;
    message += `*Price:* ${price}%0A%0A`;
    
    if (itemsList) {
        message += `*Included Items:*%0A${itemsList}%0A`;
    }
    
    message += `Please contact me for further details.`;

    const whatsappUrl = `https://wa.me/919642182223?text=${message}`;
    window.open(whatsappUrl, '_blank');
}


