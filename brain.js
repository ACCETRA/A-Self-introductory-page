let slideIndex = 0;
let slideTimeout;

function showSlides() {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    // Show current slide and activate dot
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add("active");
    }
    
    // Auto advance
    slideTimeout = setTimeout(showSlides, 5000);
}

function plusSlides(n) {
    clearTimeout(slideTimeout);
    slideIndex += n - 1;
    showSpecificSlide(slideIndex + 1);
}

function currentSlide(n) {
    clearTimeout(slideTimeout);
    slideIndex = n - 1;
    showSpecificSlide(n);
}

function showSpecificSlide(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {
        slideIndex = 0;
    }
    if (n < 1) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = n - 1;
    }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Remove active from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    // Show current slide
    if (slides[slideIndex]) {
        slides[slideIndex].style.display = "block";
    }
    if (dots[slideIndex]) {
        dots[slideIndex].classList.add("active");
    }
    
    // Resume auto-advance
    slideTimeout = setTimeout(showSlides, 5000);
}

function initializeSearch() {
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    
    if (!searchBtn || !searchInput) return;
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const petCards = document.querySelectorAll(".pet-card");
        let visibleCount = 0;
        
        petCards.forEach(card => {
            const petName = card.querySelector("h3")?.innerText.toLowerCase() || "";
            const petType = card.querySelector(".pet-name")?.innerText.toLowerCase() || "";
            const description = card.querySelector(".description")?.innerText.toLowerCase() || "";
            
            const matches = petName.includes(searchTerm) || 
                          petType.includes(searchTerm) || 
                          description.includes(searchTerm);
            
            if (searchTerm === "" || matches) {
                card.style.display = "block";
                card.classList.add("smooth-appear");
                visibleCount++;
            } else {
                card.style.display = "none";
                card.classList.remove("smooth-appear");
            }
        });
        
        // Show message if no results
        showSearchResults(visibleCount, searchTerm);
    }
    
    function showSearchResults(count, term) {
        // Remove existing message
        const existingMessage = document.querySelector(".search-results-message");
        if (existingMessage) {
            existingMessage.remove();
        }
        
        if (count === 0 && term !== "") {
            const petsGrid = document.querySelector(".pets-grid");
            const message = document.createElement("div");
            message.className = "search-results-message";
            message.style.cssText = `
                grid-column: 1 / -1;
                text-align: center;
                padding: 3rem;
                font-size: 1.2rem;
                color: #718096;
            `;
            message.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                <p>No pets found matching "${term}"</p>
                <p style="font-size: 1rem; margin-top: 0.5rem;">Try a different search term</p>
            `;
            petsGrid.appendChild(message);
        }
    }
    
    // Search on button click
    searchBtn.addEventListener("click", performSearch);
    
    // Search on Enter key
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            performSearch();
        }
    });
    
    // Real-time search as user types (debounced)
    let searchTimeout;
    searchInput.addEventListener("input", () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });
}

function initializeCategoryFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const petCards = document.querySelectorAll(".pet-card");
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove("active"));
            
            // Add active class to clicked button
            btn.classList.add("active");
            
            const category = btn.getAttribute("data-category");
            
            // Filter pet cards
            petCards.forEach((card, index) => {
                const cardCategory = card.getAttribute("data-category");
                
                if (category === "all" || cardCategory === category) {
                    setTimeout(() => {
                        card.style.display = "block";
                        card.classList.add("smooth-appear");
                    }, index * 50);
                } else {
                    card.style.display = "none";
                    card.classList.remove("smooth-appear");
                }
            });
        });
    });
}
let cart = [];
let cartCount = 0;

function initializeCart() {
    const adoptButtons = document.querySelectorAll(".btn-adopt");
    const cartCountElement = document.querySelector(".cart-count");
    
    if (!cartCountElement) return;
    
    adoptButtons.forEach(button => {
        button.addEventListener("click", function() {
            const card = this.closest(".pet-card");
            const petName = card.querySelector("h3").innerText;
            const petType = card.querySelector(".pet-name").innerText;
            const price = card.querySelector(".price").innerText;
            
            // Add to cart
            cart.push({
                name: petName,
                type: petType,
                price: price
            });
            
            cartCount++;
            cartCountElement.innerText = cartCount;
            
            // Animate cart icon
            const cartIcon = document.querySelector(".cart-icon");
            cartIcon.style.transform = "scale(1.3)";
            setTimeout(() => {
                cartIcon.style.transform = "scale(1)";
            }, 300);
            
            // Change button text temporarily
            const originalText = this.innerText;
            this.innerText = "Added! ✓";
            this.style.background = "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)";
            this.disabled = true;
            
            setTimeout(() => {
                this.innerText = originalText;
                this.style.background = "";
                this.disabled = false;
            }, 2000);
            
            // Show notification
            showNotification(`${petName} added to adoption list!`);
        });
    });
}

function showNotification(message) {
    // Remove existing notifications
    const existingNotif = document.querySelector(".notification");
    if (existingNotif) {
        existingNotif.remove();
    }
    
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.4s ease-out;
        font-weight: 600;
        max-width: 300px;
    `;
    notification.innerText = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = "slideOutRight 0.4s ease-out";
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement("style");
style.innerHTML = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
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

function initializeForms() {
    const adoptionForm = document.querySelector(".adoption-form");
    const contactForm = document.querySelector(".contact-form");
    
    if (adoptionForm) {
        adoptionForm.addEventListener("submit", handleAdoptionSubmit);
    }
    
    if (contactForm) {
        contactForm.addEventListener("submit", handleContactSubmit);
    }
}

function handleAdoptionSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validate required fields
    const petType = document.querySelector('input[name="pet-type"]:checked');
    if (!petType) {
        showNotification("Please select a pet type!");
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Submitting...";
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.innerText = "Submitted! ✓";
        submitBtn.style.background = "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)";
        
        showNotification("Adoption request submitted successfully! We'll contact you soon.");
        
        setTimeout(() => {
            e.target.reset();
            submitBtn.innerText = originalText;
            submitBtn.style.background = "";
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;


    setTimeout(() => {
        submitBtn.innerText = "Sent! ✓";
        submitBtn.style.background = "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)";
        
        showNotification("Message sent successfully! We'll get back to you soon.");
        
        setTimeout(() => {
            e.target.reset();
            submitBtn.innerText = originalText;
            submitBtn.style.background = "";
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("smooth-appear");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll(
        ".feature-card, .pet-card, .service-card, .stat-card"
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

function initializeNavbarScroll() {
    const header = document.querySelector("header");
    let lastScroll = 0;
    
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.06)";
        }
        
        lastScroll = currentScroll;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Start slider
    showSlides();
    
    // Initialize all features
    initializeSearch();
    initializeCategoryFilter();
    initializeCart();
    initializeForms();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeNavbarScroll();
    
    console.log("🐾 Beast Den initialized successfully!");
});

function debounce(func, wait) {
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

window.BeastDen = {
    showNotification,
    cart,
    getCartCount: () => cartCount
};