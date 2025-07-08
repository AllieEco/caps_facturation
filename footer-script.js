// Script pour gérer l'insertion automatique du footer
document.addEventListener('DOMContentLoaded', function() {
  // Vérifier si le footer existe déjà
  const existingFooter = document.querySelector('.footer');
  
  if (!existingFooter) {
    // Insérer le footer avant la fermeture du body
    const footerHTML = `
      <div class="footer">
        Made with ❤️ by <a href="https://github.com/AllieEco" target="_blank">AllieEco</a>
      </div>
    `;
    
    // Insérer avant les scripts
    const scripts = document.querySelectorAll('script');
    if (scripts.length > 0) {
      const lastScript = scripts[scripts.length - 1];
      lastScript.insertAdjacentHTML('beforebegin', footerHTML);
    } else {
      // Si pas de scripts, insérer à la fin du body
      document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
  }
}); 