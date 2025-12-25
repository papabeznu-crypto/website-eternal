// Custom Cursor Animation
document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update dot position immediately
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth animation for outline
    function animateOutline() {
        // Smooth follow effect
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateOutline);
    }

    animateOutline();

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .feature-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'var(--accent-pink)';
        });

        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--primary-purple)';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = 0;
        cursorOutline.style.opacity = 0;
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = 1;
        cursorOutline.style.opacity = 1;
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Download Functionality
const downloadBtn = document.getElementById('downloadBtn');

downloadBtn.addEventListener('click', () => {
    // Create a sample file for download
    // In production, this would link to the actual host file
    const fileContent = `91.134.85.13 growtopia1.com
91.134.85.13 growtopia2.com
91.134.85.13 www.growtopia1.com
91.134.85.13 www.growtopia2.com
`;

    // Create blob and download
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'EternalPS.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    // Visual feedback
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor"/>
        </svg>
        <span>Downloaded!</span>
    `;

    setTimeout(() => {
        downloadBtn.innerHTML = originalText;
    }, 2000);
});

// Scroll Animation for Header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.padding = '0.75rem 0';
        header.style.boxShadow = '0 4px 20px rgba(138, 43, 226, 0.3)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Particle Effect on Mouse Move (Optional Enhancement)
document.addEventListener('mousemove', (e) => {
    // Random chance to create a particle
    if (Math.random() > 0.95) {
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.borderRadius = '50%';
    particle.style.background = 'var(--gradient-primary)';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.opacity = '1';
    particle.style.transition = 'all 1s ease-out';

    document.body.appendChild(particle);

    // Animate particle
    setTimeout(() => {
        particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${Math.random() * 100 + 50}px)`;
        particle.style.opacity = '0';
    }, 10);

    // Remove particle after animation
    setTimeout(() => {
        document.body.removeChild(particle);
    }, 1000);
}

// Add dynamic gradient background animation
const heroBackground = document.querySelector('.hero-background');
let hue = 270;

function animateBackground() {
    hue = (hue + 0.1) % 360;
    heroBackground.style.background = `
        radial-gradient(circle at 20% 50%, hsla(${hue}, 70%, 40%, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, hsla(${(hue + 50) % 360}, 70%, 40%, 0.3) 0%, transparent 50%)
    `;
    requestAnimationFrame(animateBackground);
}

animateBackground();

// Tab Switching Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab
        btn.classList.add('active');

        // Show corresponding content
        const tabName = btn.getAttribute('data-tab');
        const targetContent = document.getElementById(`${tabName}-content`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Copy Button Functionality
const hostData = {
    windowsHost: `91.134.85.13 growtopia1.com
91.134.85.13 growtopia2.com
91.134.85.13 www.growtopia1.com
91.134.85.13 www.growtopia2.com`,
    androidLink: 'https://dash.gtps.cloud/android/1062',
    iosLink: 'https://dash.gtps.cloud/ios/1062'
};

function copyToClipboard(text, buttonId) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById(buttonId);
        const originalHTML = btn.innerHTML;

        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </svg>
            <span>Copied!</span>
        `;
        btn.style.background = 'var(--gradient-primary)';
        btn.style.color = 'white';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

document.getElementById('copyWindowsHost').addEventListener('click', function () {
    copyToClipboard(hostData.windowsHost, 'copyWindowsHost');
});

document.getElementById('copyAndroidLink').addEventListener('click', function () {
    copyToClipboard(hostData.androidLink, 'copyAndroidLink');
});

document.getElementById('copyIOSLink').addEventListener('click', function () {
    copyToClipboard(hostData.iosLink, 'copyIOSLink');
});

console.log('%c🌱 EternalPS Host Website', 'color: #a855f7; font-size: 20px; font-weight: bold;');
console.log('%cWebsite loaded successfully! Enjoy your visit.', 'color: #e879f9; font-size: 14px;');
