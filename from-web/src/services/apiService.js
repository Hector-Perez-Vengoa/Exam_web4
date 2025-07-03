import api from '../config/api';

// Servicio de autenticación
export const authService = {
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    
    // La API devuelve la estructura: { success, message, data: { token, user info }, timestamp }
    const { data } = response.data;
    
    if (data.token) {
      // Almacenar token completo (Bearer + token)
      localStorage.setItem('token', data.token);
      
      // Crear objeto usuario con la información de la respuesta
      const user = {
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        role: data.role,
        name: data.fullName // Alias para compatibilidad
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      
      return {
        success: true,
        user: user,
        token: data.token,
        expiresIn: data.expiresIn
      };
    }
    
    throw new Error('Token no recibido');
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData);
    // Si la respuesta viene con estructura anidada, extraer los datos
    if (response.data.data) {
      return response.data.data;
    }
    return response.data;
  },

  async validateToken() {
    const response = await api.get('/auth/validate');
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    // Si la respuesta viene con estructura anidada, extraer los datos
    if (response.data.data) {
      return response.data.data;
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUserFromStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};

// Servicio de productos
export const productService = {
  async getAllProducts() {
    const response = await api.get('/products');
    // La API devuelve la estructura: { success, message, data: [...], timestamp }
    return response.data.data || [];
  },

  async getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data.data || null;
  },

  async createProduct(product) {
    const response = await api.post('/products', product);
    return response.data.data || response.data;
  },

  async updateProduct(id, product) {
    const response = await api.put(`/products/${id}`, product);
    return response.data.data || response.data;
  },

  async deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  async searchProducts(query) {
    const response = await api.get(`/products/search?query=${query}`);
    return response.data.data || [];
  },

  async getProductsByCategory(category) {
    const response = await api.get(`/products/category/${category}`);
    return response.data.data || [];
  },

  async getLowStockProducts() {
    const response = await api.get('/products/low-stock');
    return response.data.data || [];
  }
};
