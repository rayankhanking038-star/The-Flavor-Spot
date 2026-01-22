/* ============================================
   THE FLAVOR SPOT - MAIN JAVASCRIPT
   Modern Restaurant Website Interactions
   ============================================ */

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

/**
 * Add event listeners for mobile menu
 */
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================

/**
 * Set active nav link based on current page
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Intersection Observer for scroll animations
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.featured-card, .benefit-card, .offer-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// ============================================
// MENU FILTER FUNCTIONALITY
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
const menuCategories = document.querySelectorAll('.menu-category');

/**
 * Filter menu items by category
 */
function filterMenu(category) {
    menuCategories.forEach(categoryEl => {
        if (category === 'all' || categoryEl.getAttribute('data-category') === category) {
            categoryEl.style.display = 'block';
            setTimeout(() => {
                categoryEl.style.opacity = '1';
            }, 10);
        } else {
            categoryEl.style.display = 'none';
        }
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Filter menu
        const category = button.getAttribute('data-filter');
        filterMenu(category);
    });
});

// ============================================
// GALLERY & LIGHTBOX FUNCTIONALITY
// ============================================

const galleryItems = document.querySelectorAll('.gallery-item');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentImageIndex = 0;

// Gallery image data
const galleryImages = [
    { title: 'Delicious Pizza', emoji: '🍕' },
    { title: 'Juicy Burger', emoji: '🍔' },
    { title: 'Noodle Delight', emoji: '🍜' },
    { title: 'Fresh Salad', emoji: '🥗' },
    { title: 'Sushi Platter', emoji: '🍣' },
    { title: 'Sweet Cake', emoji: '🍰' },
    { title: 'Pasta Plate', emoji: '🍝' },
    { title: 'Soup Bowl', emoji: '🍲' },
    { title: 'Special Dish', emoji: '🥘' },
    { title: 'Shrimp Dish', emoji: '🍤' },
    { title: 'Meat Plate', emoji: '🍖' },
    { title: 'Bento Box', emoji: '🍱' }
];

/**
 * Open lightbox with image
 */
function openLightbox(index) {
    currentImageIndex = index;
    lightboxModal.classList.add('active');
    displayImage();
    document.body.style.overflow = 'hidden';
}

/**
 * Close lightbox
 */
function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/**
 * Display current image in lightbox
 */
function displayImage() {
    const image = galleryImages[currentImageIndex];
    lightboxImage.textContent = image.emoji;
    lightboxImage.style.fontSize = '150px';
    lightboxImage.style.textAlign = 'center';
    lightboxImage.style.lineHeight = '1';
}

/**
 * Show next image
 */
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    displayImage();
}

/**
 * Show previous image
 */
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    displayImage();
}

/**
 * Keyboard navigation for lightbox
 */
document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightbox();
});

// Add click listeners to gallery items
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

// Lightbox controls
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (prevBtn) prevBtn.addEventListener('click', prevImage);
if (nextBtn) nextBtn.addEventListener('click', nextImage);

// Close lightbox when clicking outside the image
if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
}

// ============================================
// ADD TO CART FUNCTIONALITY
// ============================================

const addCartButtons = document.querySelectorAll('.add-cart-btn');

/**
 * Handle add to cart button click
 */
function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const button = e.target;
    const originalText = button.textContent;
    
    // Visual feedback
    button.textContent = '✓ Added!';
    button.style.background = 'var(--primary-green)';
    
    // Reset button after 2 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
    
    // Log cart item (for demo purposes)
    const card = button.closest('.menu-card');
    const itemName = card.querySelector('h3').textContent;
    const itemPrice = card.querySelector('.menu-price').textContent;
    console.log(`Added to cart: ${itemName} - ${itemPrice}`);
}

addCartButtons.forEach(button => {
    button.addEventListener('click', handleAddToCart);
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

/**
 * Handle contact form submission
 */
function handleContactForm(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Simulate API call
    setTimeout(() => {
        showFormMessage('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }, 1500);
}

/**
 * Display form message
 */
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
}

// ============================================
// UTILITY: SCROLL TO TOP BUTTON
// ============================================

/**
 * Create and manage scroll-to-top button
 */
function initScrollToTop() {
    // Create button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #E63946, #FFB703);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(scrollBtn);
    
    /**
     * Show/hide scroll button based on scroll position
     */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    /**
     * Scroll to top on button click
     */
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    /**
     * Scroll button hover effect
     */
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
    });
}

// Initialize scroll-to-top button when DOM is ready
document.addEventListener('DOMContentLoaded', initScrollToTop);

// ============================================
// PERFORMANCE: LAZY LOADING IMAGES
// ============================================

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

document.addEventListener('DOMContentLoaded', initLazyLoading);

// ============================================
// CONSOLE INITIALIZATION MESSAGE
// ============================================

console.log(
    '%cThe Flavor Spot',
    'color: #E63946; font-size: 24px; font-weight: bold;'
);
console.log(
    '%cPremium Food Restaurant Website',
    'color: #FFB703; font-size: 14px;'
);
console.log(
    '%c© 2026 The Flavor Spot. All rights reserved.',
    'color: #219653; font-size: 12px;'
);

// ============================================
// CHECKOUT PAGE FUNCTIONALITY
// ============================================

/**
 * Generate a unique order ID
 */
function generateOrderId() {
    return '#' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}

/**
 * Get payment method display name
 */
function getPaymentMethodName(value) {
    const methods = {
        'cod': 'Cash on Delivery',
        'easypaisa': 'Easypaisa',
        'jazzcash': 'JazzCash'
    };
    return methods[value] || 'Cash on Delivery';
}

/**
 * Validate checkout form
 */
function validateCheckoutForm() {
    const fullName = document.getElementById('fullName')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const address = document.getElementById('address')?.value.trim();
    const city = document.getElementById('city')?.value.trim();
    const zipcode = document.getElementById('zipcode')?.value.trim();

    if (!fullName) {
        alert('Please enter your full name');
        return false;
    }

    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return false;
    }

    if (!phone || phone.length < 10) {
        alert('Please enter a valid phone number');
        return false;
    }

    if (!address) {
        alert('Please enter your delivery address');
        return false;
    }

    if (!city) {
        alert('Please enter your city');
        return false;
    }

    if (!zipcode) {
        alert('Please enter your postal code');
        return false;
    }

    return true;
}

/**
 * Show success modal with order details
 */
function showSuccessModal(paymentMethod) {
    const modal = document.getElementById('successModal');
    const orderId = generateOrderId();
    const totalAmount = 'Rs. 2,586';

    // Update modal content
    document.getElementById('orderId').textContent = orderId;
    document.getElementById('totalAmount').textContent = totalAmount;
    document.getElementById('paymentMethod').textContent = getPaymentMethodName(paymentMethod);

    // Show modal
    modal.classList.add('show');
}

/**
 * Close success modal
 */
function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
}

/**
 * Initialize checkout page
 */
function initCheckout() {
    const confirmOrderBtn = document.getElementById('confirmOrderBtn');
    const checkoutForm = document.getElementById('checkoutForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.querySelector('.modal-close');

    // Handle confirm order button
    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Validate form
            if (!validateCheckoutForm()) {
                return;
            }

            // Get selected payment method
            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'cod';

            // Show success modal
            showSuccessModal(paymentMethod);
        });
    }

    // Close modal when X is clicked
    if (modalClose) {
        modalClose.addEventListener('click', closeSuccessModal);
    }

    // Close modal when clicking outside
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                closeSuccessModal();
            }
        });
    }
}

// Initialize checkout on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCheckout);
} else {
    initCheckout();
}

// ============================================
// PAYMENT PAGE FUNCTIONALITY
// ============================================

/**
 * Get payment method display name
 */
function getPaymentMethodDisplayName(value) {
    const methods = {
        'cod': 'Cash on Delivery',
        'easypaisa': 'Easypaisa',
        'jazzcash': 'JazzCash'
    };
    return methods[value] || 'Cash on Delivery';
}

/**
 * Handle payment form submission
 */
function handlePaymentSubmit(e) {
    if (e) {
        e.preventDefault();
    }

    // Get selected payment method
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'cod';
    const paymentMethodName = getPaymentMethodDisplayName(selectedMethod);

    // Update modal with confirmation details
    document.getElementById('confirmPaymentMethod').textContent = paymentMethodName;
    document.getElementById('confirmOrderTotal').textContent = 'Rs. 2,586';

    // Show success modal
    const modal = document.getElementById('paymentSuccessModal');
    if (modal) {
        modal.classList.add('show');
    }
}

/**
 * Close payment success modal
 */
function closePaymentModal() {
    const modal = document.getElementById('paymentSuccessModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

/**
 * Initialize payment page
 */
function initPaymentPage() {
    const paymentForm = document.getElementById('paymentForm');
    const modalClose = document.querySelector('.modal-close');
    const paymentSuccessModal = document.getElementById('paymentSuccessModal');

    // Handle form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmit);
    }

    // Handle modal close button
    if (modalClose) {
        modalClose.addEventListener('click', closePaymentModal);
    }

    // Handle modal background click
    if (paymentSuccessModal) {
        paymentSuccessModal.addEventListener('click', function(e) {
            if (e.target === paymentSuccessModal) {
                closePaymentModal();
            }
        });
    }
}

// Initialize payment page on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPaymentPage);
} else {
    initPaymentPage();
}

// ============================================
// NEWSLETTER FUNCTIONALITY
// ============================================

/**
 * Handle newsletter form submission
 */
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    
    // Simulate subscription
    const button = form.querySelector('button');
    const originalText = button.textContent;
    button.textContent = '✓ Subscribed!';
    button.style.background = 'var(--primary-green)';
    
    // Reset after 3 seconds
    setTimeout(() => {
        form.reset();
        button.textContent = originalText;
        button.style.background = '';
    }, 3000);
    
    console.log('Newsletter subscription:', email);
}

/**
 * Initialize newsletter forms
 */
function initNewsletters() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmit);
    });
}

document.addEventListener('DOMContentLoaded', initNewsletters);

// ============================================
// FAQ ACCORDION FUNCTIONALITY
// ============================================

/**
 * Initialize FAQ accordion
 */
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = this.classList.contains('active');
            
            // Close all other answers
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.querySelector('.faq-question').classList.remove('active');
                    item.querySelector('.faq-answer').classList.remove('active');
                }
            });
            
            // Toggle current answer
            this.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', initFAQAccordion);

// ============================================
// SHOPPING CART FUNCTIONALITY
// ============================================

let cart = JSON.parse(localStorage.getItem('flavorSpotCart')) || [];

/**
 * Update cart display
 */
function updateCartDisplay() {
    const cartEmpty = document.getElementById('cartEmpty');
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartItems) cartItems.innerHTML = '';
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }
    
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';
    
    let cartHTML = '';
    cart.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">Rs. ${item.price}</p>
                </div>
                <div class="quantity-control">
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)">−</button>
                    <input type="number" class="qty-input" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="cart-item-total">Rs. ${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
    
    if (cartItems) cartItems.innerHTML = cartHTML;
    updateCartSummary();
}

/**
 * Update cart summary
 */
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 500 ? 0 : 50;
    const total = subtotal + deliveryFee;
    
    const subtotalEl = document.getElementById('subtotal');
    const deliveryFeeEl = document.getElementById('deliveryFee');
    const totalEl = document.getElementById('totalPrice');
    
    if (subtotalEl) subtotalEl.textContent = `Rs. ${subtotal.toFixed(2)}`;
    if (deliveryFeeEl) deliveryFeeEl.textContent = `Rs. ${deliveryFee.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `Rs. ${total.toFixed(2)}`;
}

/**
 * Add item to cart
 */
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    localStorage.setItem('flavorSpotCart', JSON.stringify(cart));
    updateCartDisplay();
    
    // Show toast notification
    showToast(`${name} added to cart!`);
}

/**
 * Update item quantity
 */
function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
        } else {
            localStorage.setItem('flavorSpotCart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }
}

/**
 * Remove item from cart
 */
function removeFromCart(index) {
    const itemName = cart[index].name;
    cart.splice(index, 1);
    localStorage.setItem('flavorSpotCart', JSON.stringify(cart));
    updateCartDisplay();
    showToast(`${itemName} removed from cart`);
}

/**
 * Clear entire cart
 */
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        localStorage.setItem('flavorSpotCart', JSON.stringify(cart));
        updateCartDisplay();
        showToast('Cart cleared');
    }
}

/**
 * Show toast notification
 */
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-green);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Initialize cart functionality
 */
function initCart() {
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    // Add click handlers to all "Add to Cart" buttons
    const addCartBtns = document.querySelectorAll('.add-cart-btn');
    addCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.menu-card');
            if (card) {
                const name = card.querySelector('h3').textContent;
                const priceText = card.querySelector('.menu-price').textContent;
                const price = parseFloat(priceText.replace('$', '').replace('Rs. ', ''));
                addToCart(name, price);
            }
        });
    });
    
    updateCartDisplay();
}

document.addEventListener('DOMContentLoaded', initCart);

// ============================================
// MENU SEARCH & FILTER FUNCTIONALITY
// ============================================

/**
 * Filter menu items
 */
function filterMenuItems(filterValue) {
    const categories = document.querySelectorAll('.menu-category');
    
    if (filterValue === 'all') {
        categories.forEach(category => {
            category.style.display = 'block';
        });
    } else {
        categories.forEach(category => {
            const categoryName = category.getAttribute('data-category');
            category.style.display = categoryName === filterValue ? 'block' : 'none';
        });
    }
}

/**
 * Search menu items
 */
function searchMenuItems(searchQuery) {
    const cards = document.querySelectorAll('.menu-card');
    const query = searchQuery.toLowerCase();
    
    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.menu-description').textContent.toLowerCase();
        
        if (name.includes(query) || description.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Initialize menu search and filter
 */
function initMenuFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('menuSearch');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterMenuItems(this.getAttribute('data-filter'));
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            searchMenuItems(this.value);
        });
    }
}

document.addEventListener('DOMContentLoaded', initMenuFilters);

// ============================================
// ORDER TRACKING FUNCTIONALITY
// ============================================

/**
 * Track order
 */
function trackOrder(orderId) {
    const trackingCard = document.getElementById('trackingCard');
    const trackingMessage = document.getElementById('trackingMessage');
    const form = document.getElementById('trackingForm');
    
    if (form && form.querySelector('input')) {
        form.querySelector('input').value = orderId;
    }
    
    if (trackingCard) {
        // Simulate different order statuses
        const statuses = ['Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];
        const randomStatus = Math.floor(Math.random() * statuses.length);
        
        // Update display
        document.getElementById('displayOrderId').textContent = orderId;
        document.getElementById('displayOrderTime').textContent = new Date().toLocaleString();
        document.getElementById('displayOrderStatus').textContent = statuses[randomStatus];
        
        // Update timeline based on status
        const steps = document.querySelectorAll('.timeline-step');
        steps.forEach((step, index) => {
            if (index < randomStatus) {
                step.classList.add('completed');
                step.classList.remove('in-progress');
            } else if (index === randomStatus) {
                step.classList.add('in-progress');
                step.classList.remove('completed');
            } else {
                step.classList.remove('completed', 'in-progress');
            }
        });
        
        trackingCard.style.display = 'block';
        if (trackingMessage) trackingMessage.style.display = 'none';
    }
}

/**
 * Initialize order tracking
 */
function initOrderTracking() {
    const trackingForm = document.getElementById('trackingForm');
    
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const orderId = document.getElementById('orderId').value;
            if (orderId) {
                trackOrder(orderId);
            }
        });
    }
    
    // Add event listener to reorder button if it exists
    const reorderBtn = document.getElementById('reorderBtn');
    if (reorderBtn) {
        reorderBtn.addEventListener('click', function() {
            window.location.href = 'menu.html';
        });
    }
    
    // Add event listener to rate button if it exists
    const rateBtn = document.getElementById('rateBtn');
    if (rateBtn) {
        rateBtn.addEventListener('click', function() {
            alert('Thank you for rating! We appreciate your feedback.');
        });
    }
}

document.addEventListener('DOMContentLoaded', initOrderTracking);

// ============================================
// ANIMATIONS
// ============================================

// Add slide-in animation for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// AI CHATBOT FUNCTIONALITY
// ============================================

/**
 * AI Chatbot responses database
 */
const chatbotResponses = {
    greeting: [
        "👋 Hi! How can I assist you today?",
        "Welcome to The Flavor Spot! What can I help with?",
        "Hello! 😊 Feel free to ask me anything about our restaurant.",
        "Hey there! What would you like to know?"
    ],
    menu: [
        "🍕 We offer pizzas, burgers, spicy items, and fast food! All made with premium ingredients. Would you like recommendations?",
        "📋 Our menu includes: Pizzas, Gourmet Burgers, Spicy Delights, and Fast Food options. What interests you?",
        "🎯 Check out our full menu page for details! We have something for everyone.",
        "Our popular items are Margherita Pizza, Pepperoni Delight, and Gourmet Burgers!"
    ],
    delivery: [
        "🚚 We deliver from 11:00 AM to 11:00 PM daily. Standard delivery takes 30-45 minutes within the city.",
        "📦 Free delivery on orders above Rs. 500! For orders below Rs. 500, we charge Rs. 50.",
        "⏱️ Express delivery available in your area? Check at checkout!",
        "🚗 Our delivery partners are trained and verified for your safety."
    ],
    payment: [
        "💳 We accept: Cash on Delivery, Easypaisa, and JazzCash. All methods are secure!",
        "💰 Payment is simple and secure! Choose your preferred method at checkout.",
        "🔒 Your payment information is 100% secure and encrypted.",
        "📱 Easypaisa and JazzCash payments are processed instantly!"
    ],
    order: [
        "📝 To place an order: Browse menu → Add items to cart → Checkout → Select payment → Confirm!",
        "🛒 Visit our Menu page, select items, add to cart, and proceed to checkout!",
        "✅ Your order will be confirmed within 5 minutes via email/SMS.",
        "⏰ You can track your order in real-time using our Order Tracking page!"
    ],
    pricing: [
        "💵 Our prices are very competitive! Pizzas start from Rs. 399, Burgers from Rs. 299.",
        "🎁 Check our Special Offers section for discounts and promotional codes!",
        "💝 We have Family Bundles, Weekend Combos, and Spice Lover offers with great discounts!",
        "🏷️ Use coupon codes like FLAVOR30, FAMILY21, SPICY25 at checkout!"
    ],
    timing: [
        "🕐 We're open from 11:00 AM to 11:00 PM every day!",
        "⏰ Last order accepted at 10:30 PM. After that, we prepare for next day.",
        "📅 Order anytime within our operating hours for delivery or pickup!",
        "🌙 We're closed after 11:00 PM. See you tomorrow!"
    ],
    contact: [
        "📞 Call us: +92 3101 550760",
        "✉️ Email: info@flavorspot.gmail.com",
        "📍 Location: Shamsi Road, Mardan. Near Syed Children Hospital (SCH)",
        "💬 You can also reach us through this chat 24/7!"
    ],
    location: [
        "📍 Our Location: Shamsi Road, Mardan. Near Syed Children Hospital (SCH)",
        "📞 Phone: +92 3101 550760",
        "🗺️ We're located on Shamsi Road, Mardan - Near Syed Children Hospital (SCH) for easy navigation!",
        "📱 Need directions? Call us at +92 3101 550760 | Address: Shamsi Road, Mardan. Near SCH"
    ],
    owner: [
        "👥 The Flavor Spot is proudly owned by 3 talented entrepreneurs:\n1. 🎯 Rayan Khan\n2. 🎯 Sajid\n3. 🎯 Shayan\n\nTogether, they bring passion and excellence to every dish!",
        "👨‍💼 Our Owners:\n• Rayan Khan\n• Sajid\n• Shayan\n\nThey work hard to deliver quality food and great service!",
        "🌟 Meet our owners: Rayan Khan, Sajid, and Shayan - passionate about bringing you the best dining experience!",
        "🤝 The Flavor Spot was founded by three amazing owners: Rayan Khan, Sajid, and Shayan. We're committed to your satisfaction!"
    ],
    vegetarian: [
        "🌿 Yes! We have many vegetarian options marked with a green leaf (🌿) in our menu.",
        "🥗 Popular veg items: Veggie Garden Pizza, Veggie Burger, Spring Rolls!",
        "✅ All vegetarian items are prepared separately to avoid cross-contamination.",
        "🌱 Let us know if you have specific dietary requirements!"
    ],
    loyalty: [
        "⭐ Join our loyalty program! Earn points on every order and redeem for discounts.",
        "🎁 Subscribe to our newsletter for exclusive 15% discount on your next 3 orders!",
        "💎 Loyal customers get additional 20% off on weekdays!",
        "🔄 Refer a friend and both get discounts on your next orders!"
    ],
    feedback: [
        "😊 We'd love to hear your feedback! Rate and review your order after delivery.",
        "⭐ Your reviews help us improve! Share your experience on our website.",
        "💬 Any complaints or suggestions? Contact us directly and we'll resolve it!",
        "🌟 5-star reviews help other customers discover our great food!"
    ],
    allergies: [
        "⚠️ Common allergens: Dairy, Gluten, Nuts, Soy. Check each item description!",
        "🚨 For severe allergies, contact us directly: +92 3101 550760",
        "🔍 Detailed allergen info available on menu item pages.",
        "✅ We take allergies seriously! Always inform us during order."
    ],
    bulk: [
        "🎉 Yes! We handle bulk orders and catering for events, parties, and functions.",
        "👥 For orders above 20 items, contact us for special pricing: +92 3101 550760",
        "🎂 We can prepare customized menus for your special occasion!",
        "📞 Call us to discuss your event requirements!"
    ],
    faq: [
        "❓ Visit our FAQ page for answers to common questions about delivery, payment, menu, and more!",
        "📚 Check out our comprehensive FAQ section - it covers everything!",
        "🔗 Go to faq.html to find detailed answers to your questions.",
        "💡 Most common questions are answered in our FAQ page!"
    ],
    account: [
        "👤 Save your addresses and preferences for faster checkout next time!",
        "🔐 Forgot password? Click 'Forgot Password' on login to reset it.",
        "📧 You can create an account to track your orders and saved preferences.",
        "✔️ Your account keeps all your orders history for easy reordering!"
    ],
    track: [
        "🎯 Go to Order Tracking page and enter your Order ID to track your order!",
        "📍 Track your order status: Confirmed → Preparing → Out for Delivery → Delivered",
        "📧 Your Order ID was sent to your email after confirming the order.",
        "⚡ Real-time tracking shows exactly where your order is!"
    ],
    default: [
        "🤔 I didn't quite understand. Can you rephrase your question?",
        "📞 For specific questions, feel free to call us at +92 3101 550760",
        "💬 You can ask me about menu, delivery, payment, orders, or contact us!",
        "❓ Try asking about: Menu | Delivery | Payment | Pricing | Contact | Orders"
    ]
};

/**
 * Generate AI response based on user query
 */
function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Keywords mapping to response categories
    const keywords = {
        menu: ['menu', 'dishes', 'items', 'pizza', 'burger', 'food', 'what do you serve', 'what foods'],
        delivery: ['delivery', 'shipping', 'how long', 'delivery time', 'deliver', 'fast', 'order delivery'],
        payment: ['payment', 'pay', 'card', 'easypaisa', 'jazzcash', 'cash', 'how to pay', 'accepted'],
        order: ['order', 'place', 'how to order', 'ordering', 'buy', 'purchase'],
        pricing: ['price', 'cost', 'how much', 'expensive', 'offer', 'discount', 'code', 'promo'],
        timing: ['hours', 'time', 'open', 'closed', 'when', 'availability', 'available', 'working'],
        location: ['where', 'location', 'address', 'directions', 'find us', 'visit us'],
        owner: ['owner', 'founder', 'who owns', 'who created', 'team', 'rayan khan', 'sajid', 'shayan'],
        contact: ['contact', 'call', 'phone', 'email', 'reach'],
        vegetarian: ['vegetarian', 'vegan', 'veg', 'no meat', 'vegetable'],
        loyalty: ['loyalty', 'points', 'rewards', 'refer', 'discount', 'newsletter'],
        feedback: ['review', 'feedback', 'rate', 'rating', 'complaint'],
        allergies: ['allergy', 'allergen', 'allergic', 'ingredients', 'contains'],
        bulk: ['bulk', 'catering', 'party', 'event', 'wedding', 'corporate'],
        faq: ['faq', 'question', 'help', 'assist', 'problem'],
        account: ['account', 'login', 'password', 'profile', 'save'],
        track: ['track', 'tracking', 'where is my order', 'order status']
    };
    
    // Find matching category
    let category = 'greeting';
    for (let [key, keywords_array] of Object.entries(keywords)) {
        if (keywords_array.some(keyword => message.includes(keyword))) {
            category = key;
            break;
        }
    }
    
    // Check for greeting/politeness
    if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
        category = 'greeting';
    }
    
    // Get random response from category
    const responses = chatbotResponses[category] || chatbotResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Display chat message
 */
function displayChatMessage(message, isUser = false) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const p = document.createElement('p');
    p.textContent = message;
    messageDiv.appendChild(p);
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Handle sending chat message
 */
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Display user message
    displayChatMessage(message, true);
    input.value = '';
    
    // Simulate AI response delay
    setTimeout(() => {
        const response = generateAIResponse(message);
        displayChatMessage(response, false);
    }, 500);
}

/**
 * Toggle chat widget visibility
 */
function toggleChatWidget() {
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    
    chatWidget.classList.toggle('active');
    
    if (chatWidget.classList.contains('active')) {
        document.getElementById('chatInput').focus();
    }
}

/**
 * Close chat widget
 */
function closeChatWidget() {
    const chatWidget = document.getElementById('chatWidget');
    chatWidget.classList.remove('active');
}

/**
 * Initialize chat functionality
 */
function initChat() {
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    
    // Toggle chat widget
    if (chatToggle) {
        chatToggle.addEventListener('click', toggleChatWidget);
    }
    
    // Close chat
    if (chatClose) {
        chatClose.addEventListener('click', closeChatWidget);
    }
    
    // Send message on button click
    if (chatSend) {
        chatSend.addEventListener('click', sendChatMessage);
    }
    
    // Send message on Enter key
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    // Restore chat history from localStorage
    const savedMessages = JSON.parse(localStorage.getItem('chatHistory')) || [];
    const chatMessages = document.getElementById('chatMessages');
    
    if (savedMessages.length > 0) {
        chatMessages.innerHTML = '';
        savedMessages.forEach(msg => {
            displayChatMessage(msg.text, msg.isUser);
        });
    }
}

/**
 * Save chat message to localStorage
 */
function saveChatMessage(message, isUser) {
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.push({ text: message, isUser });
    
    // Keep only last 20 messages
    if (chatHistory.length > 20) {
        chatHistory = chatHistory.slice(-20);
    }
    
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Override displayChatMessage to also save messages
const originalDisplayMessage = displayChatMessage;
window.displayChatMessage = function(message, isUser = false) {
    originalDisplayMessage.call(this, message, isUser);
    saveChatMessage(message, isUser);
};

document.addEventListener('DOMContentLoaded', initChat);

