// Script pour automatiquement marquer le bon bouton comme actif selon la page courante
document.addEventListener('DOMContentLoaded', function() {
  // Récupérer le nom du fichier actuel
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Mapping des pages vers les boutons
  const pageToButton = {
    'index.html': null, // Pas de bouton actif pour la page d'accueil
    'facture.html': 'Devis/Facture',
    'registre_achat.html': 'Registre d\'achat',
    'livre_recette.html': 'Livre de recette'
  };
  
  // Trouver le bouton correspondant à la page actuelle
  const activeButtonText = pageToButton[currentPage];
  
  if (activeButtonText) {
    // Retirer la classe active de tous les boutons
    const allButtons = document.querySelectorAll('.header-button');
    allButtons.forEach(button => button.classList.remove('active'));
    
    // Ajouter la classe active au bon bouton
    const activeButton = Array.from(allButtons).find(button => 
      button.textContent.trim() === activeButtonText
    );
    
    if (activeButton) {
      activeButton.classList.add('active');
    }
  }
});

// Fonction utilitaire pour naviguer vers une page
function navigateToPage(page) {
  window.location.href = page;
}

// Fonctions du menu utilisateur
function toggleUserMenu() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

function logout() {
  if (typeof apiService !== 'undefined' && apiService) {
    apiService.logout();
  }
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  showAuthSection();
}

function deleteAccount() {
  if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
    // TODO: Implémenter la suppression de compte
    console.log('Suppression de compte demandée');
  }
}

// Fermeture du menu au clic en dehors
document.addEventListener('click', function(event) {
  const userMenu = document.querySelector('.user-menu');
  const dropdown = document.getElementById('userDropdown');
  
  if (userMenu && dropdown && !userMenu.contains(event.target)) {
    dropdown.classList.remove('show');
  }
});

// Chargement des informations utilisateur pour le menu
async function loadUserInfo() {
  try {
    if (typeof apiService !== 'undefined' && apiService && apiService.isAuthenticated()) {
      const data = await apiService.getProfile();
      updateUserMenu(data.user);
    }
  } catch (error) {
    console.error('Erreur lors du chargement des informations utilisateur:', error);
  }
}

// Mise à jour du menu utilisateur avec le nom
function updateUserMenu(user) {
  const userNameElement = document.querySelector('.user-name');
  if (userNameElement && user) {
    userNameElement.textContent = user.nom || 'Mon Compte';
  }
}

// Chargement automatique des informations utilisateur
document.addEventListener('DOMContentLoaded', function() {
  loadUserInfo();
  checkAuthStatus();
  setupAuthForms();
});

// Fonctions d'authentification
function showLoginModal() {
  document.getElementById('loginModal').style.display = 'block';
  document.getElementById('registerModal').style.display = 'none';
}

function showRegisterModal() {
  document.getElementById('registerModal').style.display = 'block';
  document.getElementById('loginModal').style.display = 'none';
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

function closeRegisterModal() {
  document.getElementById('registerModal').style.display = 'none';
}

// Vérification de l'état d'authentification
function checkAuthStatus() {
  if (typeof apiService !== 'undefined' && apiService && apiService.isAuthenticated()) {
    showUserSection();
    loadUserInfo();
  } else {
    showAuthSection();
  }
}

function showAuthSection() {
  const authSection = document.getElementById('authSection');
  const userSection = document.getElementById('userSection');
  if (authSection) authSection.style.display = 'flex';
  if (userSection) userSection.style.display = 'none';
}

function showUserSection() {
  const authSection = document.getElementById('authSection');
  const userSection = document.getElementById('userSection');
  if (authSection) authSection.style.display = 'none';
  if (userSection) userSection.style.display = 'flex';
}

// Configuration des formulaires d'authentification
function setupAuthForms() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
}

// Gestion de la connexion
async function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  try {
    // Utiliser l'API service au lieu de fetch direct
    if (typeof apiService !== 'undefined' && apiService) {
      const data = await apiService.login({ email, password });
      localStorage.setItem('authToken', data.token);
      
      showUserSection();
      loadUserInfo();
      closeLoginModal();
      showSuccess('Connexion réussie !');
      
      // Recharger la page si nécessaire
      if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
        window.location.href = '../index.html';
      }
    } else {
      throw new Error('Service API non disponible');
    }
  } catch (error) {
    showError('Erreur de connexion : ' + error.message);
  }
}

// Gestion de l'inscription
async function handleRegister(event) {
  event.preventDefault();
  
  const nom = document.getElementById('registerNom').value;
  const entreprise = document.getElementById('registerEntreprise').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  
  if (password !== confirmPassword) {
    showError('Les mots de passe ne correspondent pas');
    return;
  }
  
  try {
    const userData = {
      email,
      password,
      nom,
      entreprise,
      config: {
        statutJuridique: 'micro',
        emetteurNom: entreprise,
        emetteurContact: nom,
        emetteurAdresse: '',
        emetteurCodePostal: '',
        emetteurVille: '',
        emetteurSiret: '',
        emetteurEmail: email,
        emetteurTel: ''
      }
    };
    
    // Utiliser l'API service au lieu de fetch direct
    if (typeof apiService !== 'undefined' && apiService) {
      const data = await apiService.register(userData);
      localStorage.setItem('authToken', data.token);
      
      showUserSection();
      loadUserInfo();
      closeRegisterModal();
      showSuccess('Compte créé avec succès !');
      
      // Recharger la page si nécessaire
      if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
        window.location.href = '../index.html';
      }
    } else {
      throw new Error('Service API non disponible');
    }
  } catch (error) {
    showError('Erreur d\'inscription : ' + error.message);
  }
}

// Affichage des messages
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #f8d7da;
    color: #721c24;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 10000;
    max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  
  document.body.appendChild(errorDiv);
  
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;
  successDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #d4edda;
    color: #155724;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 10000;
    max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.remove();
  }, 3000);
}

// Fermeture des modales au clic en dehors
document.addEventListener('click', function(event) {
  const loginModal = document.getElementById('loginModal');
  const registerModal = document.getElementById('registerModal');
  
  if (event.target === loginModal) {
    closeLoginModal();
  }
  if (event.target === registerModal) {
    closeRegisterModal();
  }
}); 