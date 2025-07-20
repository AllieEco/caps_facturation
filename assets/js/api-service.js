// Service API pour CAPS FACT avec MongoDB
class ApiService {
  constructor() {
    this.baseUrl = 'http://localhost:3001/api';
    this.token = localStorage.getItem('authToken');
  }

  // Gestion des headers d'authentification
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Gestion des erreurs
  handleError(error) {
    console.error('Erreur API:', error);
    if (error.status === 401) {
      this.logout();
    }
    throw error;
  }

  // Méthode générique pour les appels API
  async apiCall(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: this.getHeaders(),
        ...options
      });

      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}`);
        error.status = response.status;
        error.response = response;
        throw error;
      }

      return await response.json();
    } catch (error) {
      // Mode local si le serveur n'est pas disponible
      console.warn('Serveur MongoDB non disponible, utilisation du mode local');
      return this.handleLocalMode(endpoint, options);
    }
  }

  // Mode local sans MongoDB
  handleLocalMode(endpoint, options) {
    switch (endpoint) {
      case '/auth/login':
        return this.simulateLogin(options.body);
      case '/auth/register':
        return this.simulateRegister(options.body);
      case '/auth/profile':
        return this.simulateGetProfile();
      default:
        throw new Error('Endpoint non supporté en mode local');
    }
  }

  simulateLogin(body) {
    const data = JSON.parse(body);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === data.email && u.password === data.password);
    
    if (user) {
      const token = 'local_token_' + Date.now();
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.token = token;
      return { message: 'Connexion réussie', token, user };
    } else {
      throw new Error('Email ou mot de passe incorrect');
    }
  }

  simulateRegister(body) {
    const data = JSON.parse(body);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === data.email)) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }
    
    const newUser = {
      _id: 'user_' + Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const token = 'local_token_' + Date.now();
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    this.token = token;
    
    return { message: 'Utilisateur créé avec succès', token, user: newUser };
  }

  simulateGetProfile() {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error('Utilisateur non connecté');
    }
    return { user };
  }

  // ===== AUTHENTIFICATION =====
  
  async register(userData) {
    const response = await this.apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('authToken', this.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  async login(credentials) {
    const response = await this.apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('authToken', this.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  async getProfile() {
    return await this.apiCall('/auth/profile');
  }

  async updateProfile(profileData) {
    return await this.apiCall('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  async changePassword(passwordData) {
    return await this.apiCall('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData)
    });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  // ===== FACTURES =====
  
  async getFactures(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.apiCall(`/factures?${queryString}`);
  }

  async getFacture(id) {
    return await this.apiCall(`/factures/${id}`);
  }

  async createFacture(factureData) {
    return await this.apiCall('/factures', {
      method: 'POST',
      body: JSON.stringify(factureData)
    });
  }

  async updateFacture(id, factureData) {
    return await this.apiCall(`/factures/${id}`, {
      method: 'PUT',
      body: JSON.stringify(factureData)
    });
  }

  async deleteFacture(id) {
    return await this.apiCall(`/factures/${id}`, {
      method: 'DELETE'
    });
  }

  async getFacturesStats(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.apiCall(`/factures/stats/summary?${queryString}`);
  }

  // ===== RECETTES =====
  
  async getRecettes(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.apiCall(`/recettes?${queryString}`);
  }

  async getRecette(id) {
    return await this.apiCall(`/recettes/${id}`);
  }

  async createRecette(recetteData) {
    return await this.apiCall('/recettes', {
      method: 'POST',
      body: JSON.stringify(recetteData)
    });
  }

  async updateRecette(id, recetteData) {
    return await this.apiCall(`/recettes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recetteData)
    });
  }

  async deleteRecette(id) {
    return await this.apiCall(`/recettes/${id}`, {
      method: 'DELETE'
    });
  }

  async getRecettesStats(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.apiCall(`/recettes/stats/summary?${queryString}`);
  }

  // ===== ACHATS =====
  
  async getAchats(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.apiCall(`/achats?${queryString}`);
  }

  async getAchat(id) {
    return await this.apiCall(`/achats/${id}`);
  }

  async createAchat(achatData) {
    return await this.apiCall('/achats', {
      method: 'POST',
      body: JSON.stringify(achatData)
    });
  }

  async updateAchat(id, achatData) {
    return await this.apiCall(`/achats/${id}`, {
      method: 'PUT',
      body: JSON.stringify(achatData)
    });
  }

  async deleteAchat(id) {
    return await this.apiCall(`/achats/${id}`, {
      method: 'DELETE'
    });
  }

  async getAchatsStats(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.apiCall(`/achats/stats/summary?${queryString}`);
  }

  // ===== UTILITAIRES =====
  
  isAuthenticated() {
    return !!this.token;
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Migration des données localStorage vers MongoDB
  async migrateFromLocalStorage() {
    try {
      const facturesPdf = JSON.parse(localStorage.getItem('facturesPdf')) || [];
      const recettes = JSON.parse(localStorage.getItem('recettes')) || [];
      const achats = JSON.parse(localStorage.getItem('achats')) || [];

      console.log('Début de la migration des données...');

      // Migration des factures
      for (const facture of facturesPdf) {
        try {
          await this.createFacture(facture);
          console.log(`Facture migrée: ${facture.numero}`);
        } catch (error) {
          console.error(`Erreur migration facture ${facture.numero}:`, error);
        }
      }

      // Migration des recettes
      for (const recette of recettes) {
        try {
          await this.createRecette(recette);
          console.log(`Recette migrée: ${recette.description}`);
        } catch (error) {
          console.error(`Erreur migration recette ${recette.description}:`, error);
        }
      }

      // Migration des achats
      for (const achat of achats) {
        try {
          await this.createAchat(achat);
          console.log(`Achat migré: ${achat.description}`);
        } catch (error) {
          console.error(`Erreur migration achat ${achat.description}:`, error);
        }
      }

      console.log('Migration terminée avec succès');
      
      // Optionnel: supprimer les données du localStorage après migration
      // localStorage.removeItem('facturesPdf');
      // localStorage.removeItem('recettes');
      // localStorage.removeItem('achats');

    } catch (error) {
      console.error('Erreur lors de la migration:', error);
      throw error;
    }
  }
}

// Instance globale du service API
window.apiService = new ApiService(); 