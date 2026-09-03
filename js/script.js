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
        title: 'Modèle Sport Racing',
        price: '85 000 €',
        description: 'Une machine d\'exception alliant puissance brute et précision chirurgicale. Ce modèle sport racing représente l\'excellence de l\'ingénierie automobile moderne, conçu pour les passionnés de sensations fortes.',
        specs: {
            'Marque': 'Sport GT',
            'Année': '2024',
            'Kilométrage': '5 000 km',
            'Motorisation': 'V8 Bi-Turbo',
            'Puissance': '500 ch',
            'Transmission': 'Automatique 8 rapports',
            'Vitesse max': '320 km/h',
            '0 à 100 km/h': '3.2 secondes',
            'Consommation': '11 L/100km',
            'Émissions CO₂': '250 g/km',
            'Couleur': 'Rouge métallisé',
            'Places': '2 places'
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
    voiture2: {
        image: 'images/Voiture-12.jpg',
        badge: 'Berline',
        title: 'Berline Confort Plus',
        price: '55 000 €',
        description: 'L\'élégance au service du confort de conduite. Cette berline allie raffinement et technologie de pointe pour offrir une expérience de conduite exceptionnelle au quotidien.',
        specs: {
            'Marque': 'Elegance',
            'Année': '2024',
            'Kilométrage': '12 000 km',
            'Motorisation': '2.0L Turbo',
            'Puissance': '280 ch',
            'Transmission': 'Automatique 7 rapports',
            'Vitesse max': '250 km/h',
            '0 à 100 km/h': '5.8 secondes',
            'Consommation': '7 L/100km',
            'Émissions CO₂': '160 g/km',
            'Couleur': 'Gris anthracite',
            'Places': '5 places'
        },
        features: [
            'Intérieur cuir Nappa',
            'Climatisation 4 zones',
            'Système multimédia 12"',
            'Sièges chauffants et ventilés',
            'Toit ouvrant',
            'Caméra 360°',
            'Régulateur adaptatif',
            'Aide au stationnement'
        ]
    },
    voiture3: {
        image: 'images/voiture-3.jpg',
        badge: 'SUV',
        title: 'SUV Aventure',
        price: '72 000 €',
        description: 'L\'espace et la puissance pour toutes vos aventures. Ce SUV combine polyvalence, sécurité et confort pour une conduite sereine sur tous les terrains.',
        specs: {
            'Marque': 'Explorer',
            'Année': '2024',
            'Kilométrage': '8 500 km',
            'Motorisation': '3.0L V6 Diesel',
            'Puissance': '350 ch',
            'Transmission': 'Automatique 8 rapports',
            'Vitesse max': '220 km/h',
            '0 à 100 km/h': '6.5 secondes',
            'Consommation': '8.5 L/100km',
            'Émissions CO₂': '195 g/km',
            'Couleur': 'Noir profond',
            'Places': '7 places'
        },
        features: [
            '4x4 intégral',
            'Sièges 3 rangées',
            'Toit panoramique',
            'Système audio Harman Kardon',
            'Aide à la conduite',
            'Attelage remorque',
            'Modes tout-terrain',
            'Coffre modulable'
        ]
    },
    voiture4: {
        image: 'images/voiture-4.jpg',
        badge: 'Électrique',
        title: 'EV Futur',
        price: '78 000 €',
        description: 'L\'avenir de la mobilité, silencieux et performant. Cette électrique offre une autonomie exceptionnelle et une technologie de pointe pour une conduite propre et efficiente.',
        specs: {
            'Marque': 'Volt',
            'Année': '2024',
            'Kilométrage': '3 000 km',
            'Motorisation': 'Électrique double moteur',
            'Puissance': '400 ch',
            'Transmission': 'Automatique',
            'Autonomie': '600 km',
            '0 à 100 km/h': '4.1 secondes',
            'Recharge rapide': '30 min (10-80%)',
            'Émissions CO₂': '0 g/km',
            'Couleur': 'Blanc perle',
            'Places': '5 places'
        },
        features: [
            'Conduite autonome niveau 2',
            'Écran central 15"',
            'Recharge rapide DC',
            'Toit vitré panoramique',
            'Sièges chauffants',
            'Système audio premium',
            'Mise à jour OTA',
            'Application mobile'
        ]
    },
    voiture5: {
        image: 'images/voiture-5.jpg',
        badge: 'Sport',
        title: 'Coupé Édition Limitée',
        price: '125 000 €',
        description: 'Une édition rare pour les passionnés d\'exception. Ce coupé sportif incarne l\'excellence artisanale et la puissance à l\'état pur, dans une production limitée à 500 exemplaires.',
        specs: {
            'Marque': 'Sport GT',
            'Année': '2024',
            'Kilométrage': '1 200 km',
            'Motorisation': 'V12 atmosphérique',
            'Puissance': '620 ch',
            'Transmission': 'Séquentielle 7 rapports',
            'Vitesse max': '340 km/h',
            '0 à 100 km/h': '2.9 secondes',
            'Consommation': '13 L/100km',
            'Émissions CO₂': '280 g/km',
            'Couleur': 'Bleu Sirius',
            'Places': '2 places'
        },
        features: [
            'Édition numérotée (série 500)',
            'Sièges carbone Sparco',
            'Volant Alcantara',
            'Échappement titanium',
            'Freins carbone-céramique',
            'Suspension pilotée',
            'Mode circuit',
            'Certificat d\'authenticité'
        ]
    },
    voiture6: {
        image: 'images/voiture-6.jpg',
        badge: 'Berline',
        title: 'Berline Prestige',
        price: '68 000 €',
        description: 'Le raffinement à l\'état pur pour une expérience unique. Cette berline prestige allie élégance intemporelle, technologie avancée et confort absolu pour redéfinir la mobilité de luxe.',
        specs: {
            'Marque': 'Prestige',
            'Année': '2024',
            'Kilométrage': '10 000 km',
            'Motorisation': '3.0L 6 cylindres',
            'Puissance': '320 ch',
            'Transmission': 'Automatique 9 rapports',
            'Vitesse max': '260 km/h',
            '0 à 100 km/h': '5.2 secondes',
            'Consommation': '7.5 L/100km',
            'Émissions CO₂': '175 g/km',
            'Couleur': 'Noir obsidienne',
            'Places': '5 places'
        },
        features: [
            'Cuir semi-aniline',
            'Bois précieux',
            'Système audio Bang & Olufsen',
            'Massage 8 programmes',
            'Éclairage d\'ambiance',
            'Toit ouvrant électrique',
            'Aide à la conduite premium',
            'Concierge digital 24/7'
        ]
    }
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
