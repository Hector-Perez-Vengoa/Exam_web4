import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { authService } from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState({
    canCreateProducts: false,
    canEditProducts: false,
    canDeleteProducts: false,
    canViewProducts: true,
    canViewLowStock: false,
    canManageUsers: false
  });

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    updatePermissions();
  }, [user]);

  const initializeAuth = async () => {
    try {
      const storedUser = authService.getCurrentUserFromStorage();
      const token = authService.getToken();
      
      if (storedUser && token) {
        // Validar token con el servidor
        try {
          await authService.validateToken();
          setUser(storedUser);
        } catch (error) {
          console.log('Token inválido, cerrando sesión');
          authService.logout();
        }
      }
    } catch (error) {
      console.error('Error inicializando autenticación:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePermissions = () => {
    if (!user) {
      setPermissions({
        canCreateProducts: false,
        canEditProducts: false,
        canDeleteProducts: false,
        canViewProducts: false,
        canViewLowStock: false,
        canManageUsers: false
      });
      return;
    }

    const isAdmin = user.role === 'ADMIN' || user.roles?.includes('ADMIN');
    const isUser = user.role === 'USER' || user.roles?.includes('USER');

    setPermissions({
      canCreateProducts: isAdmin,
      canEditProducts: isAdmin,
      canDeleteProducts: isAdmin,
      canViewProducts: isAdmin || isUser,
      canViewLowStock: isAdmin,
      canManageUsers: isAdmin
    });
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      
      // La respuesta ya viene procesada del authService
      if (response.success && response.user) {
        setUser(response.user);
        
        // Mostrar mensaje de bienvenida
        const welcomeMessage = response.user.role === 'ADMIN' 
          ? `¡Bienvenido Administrador ${response.user.fullName || response.user.username}!` 
          : `¡Bienvenido ${response.user.fullName || response.user.username}!`;
        
        console.log(welcomeMessage);
        return response;
      } else {
        throw new Error('Respuesta de login inválida');
      }
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setPermissions({
      canCreateProducts: false,
      canEditProducts: false,
      canDeleteProducts: false,
      canViewProducts: false,
      canViewLowStock: false,
      canManageUsers: false
    });
  };

  const isAdmin = () => {
    return user?.role === 'ADMIN' || user?.roles?.includes('ADMIN');
  };

  const isUser = () => {
    return user?.role === 'USER' || user?.roles?.includes('USER');
  };

  const isAuthenticated = () => {
    return !!user && authService.isAuthenticated();
  };

  const hasPermission = (permission) => {
    return permissions[permission] || false;
  };

  const getUserRole = () => {
    if (!user) return null;
    return user.role || (user.roles && user.roles[0]) || 'USER';
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    return user.fullName || user.name || user.username || user.email || 'Usuario';
  };

  const getRoleDisplayName = () => {
    const role = getUserRole();
    switch (role) {
      case 'ADMIN':
        return 'Administrador';
      case 'USER':
        return 'Usuario';
      default:
        return 'Usuario';
    }
  };

  const value = useMemo(() => ({
    user,
    loading,
    permissions,
    login,
    register,
    logout,
    isAdmin,
    isUser,
    isAuthenticated,
    hasPermission,
    getUserRole,
    getUserDisplayName,
    getRoleDisplayName
  }), [user, loading, permissions]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
