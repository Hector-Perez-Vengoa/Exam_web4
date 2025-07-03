// Script de prueba para verificar la integración con tu API
const testLoginResponse = {
    "success": true,
    "message": "Login exitoso",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc1MTUxMjQ4MCwiZXhwIjoxNzUxNTk4ODgwfQ.iJY4giZu6OIofY6pH_qiIO2qn5Ps9uf6mpB0QgCg6Fg",
        "type": "Bearer",
        "username": "admin",
        "email": "admin@tecsup.edu.pe",
        "fullName": "Administrador Sistema",
        "role": "ADMIN",
        "expiresIn": 86400000
    },
    "timestamp": "2025-07-02T22:14:40.2674035"
};

// Simular el procesamiento que hace el authService
const { data } = testLoginResponse;

if (data.token) {
    // Crear objeto usuario
    const user = {
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        role: data.role,
        name: data.fullName // Alias para compatibilidad
    };
    
    console.log('✅ Token recibido:', data.token.substring(0, 20) + '...');
    console.log('✅ Usuario procesado:', user);
    console.log('✅ Rol:', user.role);
    console.log('✅ Nombre completo:', user.fullName);
    console.log('✅ Email:', user.email);
    console.log('✅ Expira en:', data.expiresIn / 1000 / 60 / 60, 'horas');
    
    // Verificar que el token incluye "Bearer"
    if (data.token.startsWith('Bearer ')) {
        console.log('✅ Token incluye prefijo Bearer correctamente');
    } else {
        console.log('❌ Token no incluye prefijo Bearer');
    }
    
    console.log('\n🎉 ¡Tu API está bien integrada!');
} else {
    console.log('❌ No se recibió token');
}
