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