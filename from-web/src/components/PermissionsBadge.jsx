import { Crown, User, Shield, Eye, Edit, Plus, Trash2, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';

const PermissionsBadge = ({ compact = false }) => {
  const { isAdmin, hasPermission, getRoleDisplayName } = useAuth();
  
  const permissions = [
    {
      key: 'canViewProducts',
      label: 'Ver Productos',
      icon: Eye,
      description: 'Puede ver la lista de productos'
    },
    {
      key: 'canCreateProducts',
      label: 'Crear Productos',
      icon: Plus,
      description: 'Puede agregar nuevos productos'
    },
    {
      key: 'canEditProducts',
      label: 'Editar Productos',
      icon: Edit,
      description: 'Puede modificar productos existentes'
    },
    {
      key: 'canDeleteProducts',
      label: 'Eliminar Productos',
      icon: Trash2,
      description: 'Puede eliminar productos'
    }
  ];

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        {isAdmin() ? (
          <div className="flex items-center space-x-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            <Crown className="w-4 h-4" />
            <span>Admin</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            <User className="w-4 h-4" />
            <span>Usuario</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-3 rounded-xl ${isAdmin() ? 'bg-purple-500' : 'bg-blue-500'}`}>
          {isAdmin() ? (
            <Crown className="w-6 h-6 text-white" />
          ) : (
            <Shield className="w-6 h-6 text-white" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Permisos de {getRoleDisplayName()}
          </h3>
          <p className="text-sm text-gray-600">
            {isAdmin() ? 'Acceso completo al sistema' : 'Acceso limitado de solo lectura'}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {permissions.map((permission) => {
          const allowed = hasPermission(permission.key);
          const Icon = permission.icon;
          
          return (
            <div
              key={permission.key}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                allowed 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                allowed ? 'bg-green-100' : 'bg-gray-200'
              }`}>
                {allowed ? (
                  <Icon className="w-4 h-4 text-green-600" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${
                  allowed ? 'text-green-800' : 'text-gray-500'
                }`}>
                  {permission.label}
                </p>
                <p className={`text-xs ${
                  allowed ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {permission.description}
                </p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                allowed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {allowed ? 'Permitido' : 'Denegado'}
              </div>
            </div>
          );
        })}
      </div>

      {!isAdmin() && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800">
                Modo Solo Vista
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Como usuario estándar, solo puedes ver y buscar productos. 
                Contacta al administrador para realizar cambios.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PermissionsBadge.propTypes = {
  compact: PropTypes.bool
};

export default PermissionsBadge;
