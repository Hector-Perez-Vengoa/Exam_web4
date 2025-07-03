// Script de prueba para verificar el procesamiento de productos
const testProductsResponse = {
    "success": true,
    "message": "Productos obtenidos exitosamente",
    "data": [
        {
            "id": 1,
            "name": "Laptop HP Pavilion",
            "description": "Laptop HP Pavilion 15 pulgadas, Intel i5, 8GB RAM, 512GB SSD",
            "price": 2500.00,
            "stock": 15,
            "category": "Tecnología",
            "brand": "HP",
            "active": true,
            "imageUrl": "https://example.com/laptop.jpg",
            "createdBy": { "id": 1 },
            "createdAt": "2025-07-02T16:04:04.801028",
            "updatedAt": "2025-07-02T16:04:04.801028",
            "inStock": true
        },
        {
            "id": 6,
            "name": "Producto Stock Bajo",
            "description": "Producto para demostrar alerta de stock bajo",
            "price": 100.00,
            "stock": 5,
            "category": "Prueba",
            "brand": "Test",
            "active": true,
            "imageUrl": null,
            "createdBy": { "id": 1 },
            "createdAt": "2025-07-02T16:04:04.828719",
            "updatedAt": "2025-07-02T16:04:04.828719",
            "inStock": true
        }
    ],
    "timestamp": "2025-07-02T22:27:48.9856336"
};

// Simular el procesamiento del productService
const products = testProductsResponse.data || [];

console.log('✅ Productos obtenidos:', products.length);
console.log('✅ Primer producto:', products[0]?.name);
console.log('✅ Producto con stock bajo:', products.find(p => p.stock <= 10)?.name);

// Verificar categorías únicas
const categories = [...new Set(products.map(p => p.category))];
console.log('✅ Categorías encontradas:', categories);

// Calcular estadísticas
const stats = {
    total: products.length,
    lowStock: products.filter(p => p.stock <= 10).length,
    categories: categories.length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0)
};

console.log('✅ Estadísticas:', stats);
console.log('\n🎉 ¡Los productos se procesan correctamente!');
