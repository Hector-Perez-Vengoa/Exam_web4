import { 
  ShoppingCart, 
  AlertTriangle, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Package,
  DollarSign,
  Users
} from 'lucide-react';
import PropTypes from 'prop-types';

const StatsCard = ({ title, value, subtitle, icon: Icon, color = 'blue', trend, trendValue }) => {
  const colorConfig = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      text: 'text-blue-600',
      bgLight: 'bg-blue-50'
    },
    orange: {
      bg: 'from-orange-500 to-orange-600',
      text: 'text-orange-600',
      bgLight: 'bg-orange-50'
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      text: 'text-purple-600',
      bgLight: 'bg-purple-50'
    },
    green: {
      bg: 'from-green-500 to-green-600',
      text: 'text-green-600',
      bgLight: 'bg-green-50'
    },
    red: {
      bg: 'from-red-500 to-red-600',
      text: 'text-red-600',
      bgLight: 'bg-red-50'
    }
  };

  const config = colorConfig[color] || colorConfig.blue;

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <div className="flex items-center mt-2">
              <p className={`text-xs ${config.text}`}>{subtitle}</p>
              {trend && (
                <div className="ml-2 flex items-center">
                  {trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                  {trendValue && (
                    <span className={`text-xs ml-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {trendValue}%
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={`p-3 bg-gradient-to-r ${config.bg} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
};

const StatsGrid = ({ stats, isAdmin }) => {
  const getFormattedValue = (value) => {
    if (typeof value === 'number' && value > 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value;
  };

  const statsConfig = [
    {
      title: 'Total Productos',
      value: getFormattedValue(stats.total),
      subtitle: 'Inventario completo',
      icon: ShoppingCart,
      color: 'blue',
      trend: stats.total > 0 ? 'up' : null
    },
    {
      title: 'Stock Bajo',
      value: stats.lowStock,
      subtitle: stats.lowStock > 0 ? 'Requiere atención' : 'Todo en orden',
      icon: AlertTriangle,
      color: stats.lowStock > 0 ? 'orange' : 'green',
      trend: stats.lowStock > 5 ? 'up' : 'down'
    },
    {
      title: 'Categorías',
      value: stats.categories,
      subtitle: 'Tipos diferentes',
      icon: BarChart3,
      color: 'purple'
    },
    {
      title: 'Valor Total',
      value: `$${(stats.totalValue || 0).toLocaleString('es-ES', { minimumFractionDigits: 2 })}`,
      subtitle: 'Valor del inventario',
      icon: DollarSign,
      color: 'green',
      trend: stats.totalValue > 0 ? 'up' : null
    }
  ];

  // Agregar estadísticas adicionales para admin
  if (isAdmin) {
    statsConfig.push(
      {
        title: 'Productos Nuevos',
        value: Math.floor(Math.random() * 10), // Simulado
        subtitle: 'Esta semana',
        icon: Package,
        color: 'blue',
        trend: 'up',
        trendValue: 12
      },
      {
        title: 'Usuarios Activos',
        value: Math.floor(Math.random() * 50 + 20), // Simulado
        subtitle: 'Último mes',
        icon: Users,
        color: 'purple',
        trend: 'up',
        trendValue: 8
      }
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${isAdmin ? 'lg:grid-cols-3 xl:grid-cols-6' : 'lg:grid-cols-4'} gap-6 mb-8`}>
      {statsConfig.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.oneOf(['blue', 'orange', 'purple', 'green', 'red']),
  trend: PropTypes.oneOf(['up', 'down']),
  trendValue: PropTypes.number
};

StatsGrid.propTypes = {
  stats: PropTypes.shape({
    total: PropTypes.number,
    lowStock: PropTypes.number,
    categories: PropTypes.number,
    totalValue: PropTypes.number
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired
};

export default StatsGrid;
