// ============================================
// MENU MOBILE
// ============================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// FILTRES DE VOITURES
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const carCards = document.querySelectorAll('.car-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
        button.classList.add('filter-btn--active');

        const filterValue = button.getAttribute('data-filter');

        carCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ============================================
// FORMULAIRE DE CONTACT (Netlify Forms)
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            alert('✅ Merci pour votre message ! Nous vous répondrons rapidement.');
            contactForm.reset();
        })
        .catch((error) => {
            alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
            console.error(error);
        });
    });
}

// ============================================
// SCROLL - Header
// ============================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
    }
});

// ============================================
// ANIMATION AU SCROLL
// ============================================
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

carCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ============================================
// MODAL DÉTAILS VOITURE
// ============================================

// 🎯 DONNÉES DES VOITURES - Modifie ici pour personnaliser
const carsData = {
    voiture1: {
        images: [
    'images/voiture-1-a.jpg',
    'images/voiture-1-b.jpg',
    'images/voiture-1-c.jpg',
    'images/voiture-1-d.jpg'
],
        badge: 'Sport',
        title: 'Toyota Yaris',
        price: '7 500 €',
        description: 'Une voiture adaptée aux routes guinéenne,
        specs: {
            'Marque': 'Toyota ',
            'Année': '2020',
            'Kilométrage': '5 000 km',
            'Motorisation': 'V8 Bi-Turbo',
            'Puissance': '116ch',
            'Transmission': 'Automatique',
            'Vitesse max': '320 km/h',
            '0 à 100 km/h': '3.2 secondes',
            'Consommation': '7 L/100km',
            'Couleur': 'Grise foncée',
            'Places': '5 places assise'
        },
        features: [
            'Sièges baquets en cuir',
            'Système audio premium',
            'Freinage céramique',
            'Aide au démarrage sport',
            'Toit ouvrant panoramique',
            'GPS intégré',
            'Caméra de recul',
            'Régulateur adaptatif'
        ]
    },
};

// Fonction pour ouvrir la modal
// Variables globales pour le carrousel modal
let currentModalImages = [];
let currentModalImageIndex = 0;

function openCarModal(carId) {
    const car = carsData[carId];
    if (!car) return;
    
    const modal = document.getElementById('carModal');
    
    // Charger les images du carrousel modal
    currentModalImages = car.images || [car.image];
    currentModalImageIndex = 0;
    
    const carouselContainer = document.getElementById('modalCarousel');
    carouselContainer.innerHTML = '';
    
    currentModalImages.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = car.title + ' - Vue ' + (index + 1);
        if (index === 0) img.classList.add('active');
        img.onerror = function() {
            this.src = 'https://placehold.co/900x500/1e3a8a/ffffff?text=' + encodeURIComponent(car.title);
        };
        carouselContainer.appendChild(img);
    });
    
    // Créer les miniatures
    const thumbnailsContainer = document.getElementById('modalThumbnails');
    thumbnailsContainer.innerHTML = '';
    
    if (currentModalImages.length > 1) {
        currentModalImages.forEach((imgSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.classList.add('modal-thumbnail');
            if (index === 0) thumb.classList.add('active');
            thumb.onclick = () => goToModalImage(index);
            thumb.onerror = function() {
                this.src = 'https://placehold.co/60x40/1e3a8a/ffffff?text=' + (index + 1);
            };
            thumbnailsContainer.appendChild(thumb);
        });
    }
    
    // Afficher/masquer les flèches selon le nombre d'images
    const prevBtn = document.querySelector('.modal-arrow--prev');
    const nextBtn = document.querySelector('.modal-arrow--next');
    const counter = document.getElementById('modalCounter');
    
    if (currentModalImages.length > 1) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        counter.style.display = 'block';
        updateModalCounter();
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        counter.style.display = 'none';
    }
    
    // Remplir les infos
    document.getElementById('modalBadge').textContent = car.badge;
    document.getElementById('modalTitle').textContent = car.title;
    document.getElementById('modalPrice').textContent = car.price;
    document.getElementById('modalDesc').textContent = car.description;
    
    // Remplir les specs
    const specsContainer = document.getElementById('modalSpecs');
    specsContainer.innerHTML = '';
    for (const [label, value] of Object.entries(car.specs)) {
        specsContainer.innerHTML += `
            <div class="car-modal__spec">
                <span class="car-modal__spec-label">${label}</span>
                <span class="car-modal__spec-value">${value}</span>
            </div>
        `;
    }
    
    // Remplir les équipements
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = '';
    car.features.forEach(feature => {
        featuresContainer.innerHTML += `<li>${feature}</li>`;
    });
    
    modal.setAttribute('data-car-name', car.title);
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

// Fonction pour aller à une image précise
function goToModalImage(index) {
    const images = document.querySelectorAll('#modalCarousel img');
    const thumbnails = document.querySelectorAll('.modal-thumbnail');
    
    images[currentModalImageIndex].classList.remove('active');
    if (thumbnails[currentModalImageIndex]) {
        thumbnails[currentModalImageIndex].classList.remove('active');
    }
    
    currentModalImageIndex = index;
    
    images[currentModalImageIndex].classList.add('active');
    if (thumbnails[currentModalImageIndex]) {
        thumbnails[currentModalImageIndex].classList.add('active');
    }
    
    updateModalCounter();
}

// Image précédente
function prevModalImage() {
    const newIndex = (currentModalImageIndex - 1 + currentModalImages.length) % currentModalImages.length;
    goToModalImage(newIndex);
}

// Image suivante
function nextModalImage() {
    const newIndex = (currentModalImageIndex + 1) % currentModalImages.length;
    goToModalImage(newIndex);
}

// Mettre à jour le compteur (1/4)
function updateModalCounter() {
    const counter = document.getElementById('modalCounter');
    if (counter) {
        counter.textContent = `${currentModalImageIndex + 1} / ${currentModalImages.length}`;
    }
}

// Navigation clavier dans la modal (flèches gauche/droite)
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('carModal');
    if (modal && modal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') prevModalImage();
        if (e.key === 'ArrowRight') nextModalImage();
    }
});

// Fonction pour fermer la modal
function closeCarModal() {
    const modal = document.getElementById('carModal');
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// Fermer avec la touche Échap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCarModal();
    }
});

// Pré-remplir le formulaire de contact
function prefillContact() {
    const modal = document.getElementById('carModal');
    const carName = modal.getAttribute('data-car-name');
    
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    if (subjectInput && carName) {
        subjectInput.value = `Demande d'information - ${carName}`;
    }
    if (messageInput && carName) {
        messageInput.value = `Bonjour,\n\nJe suis intéressé(e) par le véhicule "${carName}".\nPouvez-vous me donner plus d'informations ?\n\nMerci d'avance.`;
    }
}
// ============================================
// CARROUSEL AUTOMATIQUE (défilement toutes les 3 sec)
// ============================================
document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const images = carousel.querySelectorAll('.carousel-img');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    if (images.length <= 1) return; // Pas de carrousel si 1 seule image
    
    let currentIndex = 0;
    
    // Créer les petits points de navigation
    images.forEach((img, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Image ${index + 1}`);
        
        // Cliquer sur un point → affiche cette image
        dot.addEventListener('click', () => {
            goToImage(index);
            resetInterval();
        });
        
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    
    // Fonction pour aller à une image précise
    function goToImage(index) {
        images[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        currentIndex = index;
        
        images[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    // Fonction pour passer à l'image suivante
    function nextImage() {
        const newIndex = (currentIndex + 1) % images.length;
        goToImage(newIndex);
    }
    
    // Démarrer le défilement automatique
    let intervalId = setInterval(nextImage, 3000);
    
    // Réinitialiser le timer quand on clique sur un point
    function resetInterval() {
        clearInterval(intervalId);
        intervalId = setInterval(nextImage, 3000);
    }
    
    // Pause quand la souris survole (bonus UX)
    carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
    carousel.addEventListener('mouseleave', () => {
        intervalId = setInterval(nextImage, 3000);
    });
});
