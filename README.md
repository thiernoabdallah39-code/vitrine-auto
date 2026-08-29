# 🚗 AutoVitrine - Site Vitrine Automobile

Site vitrine moderne pour présenter une collection de voitures.
Design minimaliste blanc/bleu, entièrement responsive.

## 📁 Structure du projet

```
vitrine-auto/
├── index.html          # Structure du site (contenu HTML)
├── css/
│   └── style.css       # Styles et design
├── js/
│   └── script.js       # Interactivité
├── images/             # Tes photos de voitures ici
│   ├── voiture-1.jpg
│   ├── voiture-2.jpg
│   └── ...
├── netlify.toml        # Configuration Netlify
└── README.md           # Ce fichier
```

## 🖼️ Comment ajouter tes propres images de voitures

### Étape 1 : Prépare tes images
- Format recommandé : **JPG ou WebP**
- Résolution : **1200 x 750 px** (ratio 16/10)
- Poids : **moins de 300 Ko par image** (utilise [TinyPNG](https://tinypng.com) pour compresser)

### Étape 2 : Ajoute les images dans le dossier `images/`
Nomme-les comme cela :
- `voiture-1.jpg`
- `voiture-2.jpg`
- `voiture-3.jpg`
- etc.

### Étape 3 : Les images s'afficheront automatiquement !
Si une image manque, un placeholder bleu s'affiche à la place.

## ✏️ Comment modifier le contenu

### Modifier une voiture existante
Ouvre `index.html`, cherche la section `<!-- VOITURE 1 -->` et modifie :
- Le titre : `<h3 class="car-card__title">Modèle Sport Racing</h3>`
- La description : `<p class="car-card__desc">...</p>`
- Les caractéristiques : `<span>🏁 320 km/h</span>`
- Le prix : `<span class="car-card__price">85 000 €</span>`
- La catégorie : `data-category="sport"` (options: sport, berline, suv, electrique)

### Ajouter une nouvelle voiture
Copie-colle un bloc `<article class="car-card">` complet dans `<div class="cars-grid">`, puis modifie ses valeurs.

### Modifier les couleurs
Ouvre `css/style.css`, tout en haut tu trouves les variables :
```css
:root {
    --color-primary: #1e3a8a;      /* Change ici le bleu principal */
    --color-primary-dark: #1e40af;
    ...
}
```

### Modifier les textes (accueil, à propos, contact)
Tout est dans `index.html`, cherche les sections :
- `<!-- HERO / ACCUEIL -->` pour la page d'accueil
- `<!-- À PROPOS -->` pour la section à propos
- `<!-- FOOTER -->` pour les infos de contact du bas de page

## 🚀 Déploiement sur Netlify (méthode GitHub)

### 1. Pousse le projet sur GitHub

```bash
git init
git add .
git commit -m "Initial commit - Site vitrine automobile"
git branch -M main
git remote add origin https://github.com/TON-USERNAME/TON-REPO.git
git push -u origin main
```

### 2. Connecte Netlify à ton repo GitHub

1. Va sur [netlify.com](https://www.netlify.com/) et connecte-toi
2. Clique sur **"Add new site"** → **"Import an existing project"**
3. Choisis **GitHub** et sélectionne ton repo
4. Laisse les paramètres par défaut :
   - Build command : *(vide)*
   - Publish directory : `.` (ou laisse vide)
5. Clique sur **"Deploy site"**

### 3. C'est en ligne ! 🎉
Netlify te donne une URL du type `https://ton-site-abc123.netlify.app`

### 4. Chaque modification GitHub = déploiement automatique
À chaque `git push`, ton site se met à jour automatiquement sur Netlify.

## 🔧 Modifier localement

Pour voir tes changements avant de push :
1. Ouvre simplement `index.html` dans ton navigateur (double-clic)
2. Ou utilise l'extension **Live Server** dans VS Code

## 📧 Formulaire de contact fonctionnel

Le formulaire actuel affiche juste une alerte. Pour recevoir vraiment les messages :

### Option 1 : Netlify Forms (gratuit, le plus simple)
Ajoute `netlify` sur le formulaire dans `index.html` :
```html
<form class="contact-form" id="contact-form" netlify>
```

### Option 2 : Formspree (gratuit jusqu'à 50 messages/mois)
1. Crée un compte sur [formspree.io](https://formspree.io)
2. Récupère ton endpoint
3. Modifie le formulaire :
```html
<form action="https://formspree.io/f/TON-ID" method="POST">
```

## 💡 Idées d'améliorations

- Ajouter une page détail par voiture
- Intégrer une galerie photo par voiture
- Ajouter un système de favoris
- Intégrer Google Analytics
- Ajouter des animations plus poussées

## 📝 Licence
Libre d'utilisation. Bon développement !
