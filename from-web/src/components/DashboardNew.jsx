import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/apiService';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  AlertTriangle,
  BarChart3,
  ShoppingCart,
  LogOut,
  Crown,
  User as UserIcon,
  TrendingUp,
  Star
} from 'lucide-react';
import ProductModal from './ProductModal';

const Dashboard = () => {
  const { 
    user, 
    logout, 
    isAdmin, 
    hasPermission, 
    getUserDisplayName, 
    getRoleDisplayName 
  } = useAuth();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [stats, setStats] = useState({
    total: 0,
    lowStock: 0,
    categories: 0,
    totalValue: 0
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      
      // Calcular estadísticas mejoradas
      const categories = [...new Set(data.map(p => p.category))];
      const lowStockCount = data.filter(p => p.stock < 10).length;
      const totalValue = data.reduce((sum, p) => sum + (p.price * p.stock), 0);
      
      setStats({
        total: data.length,
        lowStock: lowStockCount,
        categories: categories.length,
        totalValue: totalValue
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const handleCreateProduct = () => {
    if (!hasPermission('canCreateProducts')) {
      alert('No tienes permisos para crear productos');
      return;
    }
    setSelectedProduct(null);
    setModalMode('create');
    setShowModal(true);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    if (!hasPermission('canEditProducts')) {
      alert('No tienes permisos para editar productos');
      return;
    }
    setSelectedProduct(product);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!hasPermission('canDeleteProducts')) {
      alert('No tienes permisos para eliminar productos');
      return;
    }

    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    try {
      await productService.deleteProduct(productId);
      await fetchProducts();
      alert('Producto eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar el producto');
    }
  };

  const handleProductSaved = () => {
    setShowModal(false);
    fetchProducts();
  };

  const categories = [...new Set(products.map(p => p.category))];

  const getStockBadgeClass = (stock) => {
    if (stock === 0) return 'bg-red-100 text-red-800 border-red-200';
    if (stock < 10) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (stock < 50) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return 'Sin Stock';
    if (stock < 10) return 'Stock Bajo';
    if (stock < 50) return 'Stock Medio';
    return 'Stock Alto';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <Package className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="mt-6 text-gray-600 font-medium">Cargando productos...</p>
          <div className="mt-2 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Sistema de Gestión</h1>
                  <p className="text-sm text-gray-600">Productos & Inventario</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white/60 rounded-full px-4 py-2 border border-white/30">
                <div className="flex items-center space-x-2">
                  {isAdmin() ? (
                    <Crown className="w-5 h-5 text-purple-600" />
                  ) : (
                    <UserIcon className="w-5 h-5 text-blue-600" />
                  )}
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{getUserDisplayName()}</p>
                    <p className="text-xs text-gray-600">{getRoleDisplayName()}</p>
                  </div>
                </div>
                {isAdmin() && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium border border-purple-200">
                    Admin
                  </span>
                )}
              </div>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:block">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Productos</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Inventario total
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Stock Bajo</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">{stats.lowStock}</p>
                <p className="text-xs text-orange-600 mt-1">Requiere atención</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categorías</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">{stats.categories}</p>
                <p className="text-xs text-purple-600 mt-1">Tipos diferentes</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-3xl font-bold text-green-600 mt-1">${stats.totalValue.toFixed(2)}</p>
                <p className="text-xs text-green-600 mt-1">Valor inventario</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                <Star className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl mb-8 border border-white/20">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 w-full sm:w-80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="all">Todas las categorías</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              {hasPermission('canCreateProducts') && (
                <button
                  onClick={handleCreateProduct}
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Nuevo Producto
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20 overflow-hidden group">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">{product.brand}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStockBadgeClass(product.stock)}`}>
                    {getStockStatus(product.stock)}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Stock: {product.stock} unidades</p>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium border border-gray-200">
                    {product.category}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewProduct(product)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 hover:shadow-md"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </button>
                  
                  {hasPermission('canEditProducts') && (
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all duration-200 hover:shadow-md"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </button>
                  )}
                  
                  {hasPermission('canDeleteProducts') && (
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-200 hover:shadow-md"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-12 border border-white/20 max-w-md mx-auto">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'No se encontraron productos' 
                  : 'No hay productos disponibles'
                }
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Intenta ajustar los filtros de búsqueda' 
                  : 'Comienza agregando tu primer producto'
                }
              </p>
              {hasPermission('canCreateProducts') && !searchTerm && selectedCategory === 'all' && (
                <button
                  onClick={handleCreateProduct}
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 mx-auto"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Crear Primer Producto
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <ProductModal
          product={selectedProduct}
          mode={modalMode}
          onClose={() => setShowModal(false)}
          onSave={handleProductSaved}
        />
      )}
    </div>
  );
};

export default Dashboard;
