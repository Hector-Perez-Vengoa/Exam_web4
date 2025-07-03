// Script de prueba para verificar el registro de usuarios
const testRegisterData = {
  username: "testuser",
  email: "test@tecsup.edu.pe",
  password: "testpass123"
};

console.log('📤 Datos que se enviarán al registro:');
console.log(JSON.stringify(testRegisterData, null, 2));

// Verificar que los datos cumplen con los requisitos
const validations = {
  username: testRegisterData.username && testRegisterData.username.length >= 3,
  email: testRegisterData.email && testRegisterData.email.includes('@'),
  password: testRegisterData.password && testRegisterData.password.length >= 6
};

console.log('\n✅ Validaciones:');
console.log('Username válido:', validations.username);
console.log('Email válido:', validations.email);
console.log('Password válido:', validations.password);

if (Object.values(validations).every(Boolean)) {
  console.log('\n🎉 ¡Datos de registro válidos!');
  console.log('POST /api/auth/register');
  console.log('Content-Type: application/json');
  console.log('Body:', JSON.stringify(testRegisterData, null, 2));
} else {
  console.log('\n❌ Algunos datos no son válidos');
}
