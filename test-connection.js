/**
 * Script para testar conexão Frontend → Backend
 *
 * Uso: node test-connection.js
 */

const BACKEND_URL = process.env.ENEMIA_BACKEND_URL || 'http://127.0.0.1:8000';

console.log('============================================');
console.log('  Testando Conexão Frontend → Backend');
console.log('============================================\n');

async function testConnection() {
  const tests = [
    {
      name: 'Health Check',
      url: `${BACKEND_URL}/health`,
      method: 'GET'
    },
    {
      name: 'Root Endpoint',
      url: `${BACKEND_URL}/`,
      method: 'GET'
    },
    {
      name: 'Docs',
      url: `${BACKEND_URL}/docs`,
      method: 'GET'
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      console.log(`\n[TESTE] ${test.name}`);
      console.log(`URL: ${test.url}`);

      const response = await fetch(test.url, {
        method: test.method,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        console.log(`✅ SUCESSO (${response.status})`);
        console.log(`Resposta:`, JSON.stringify(data, null, 2).substring(0, 200) + '...');
        passed++;
      } else {
        console.log(`❌ FALHOU (${response.status})`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ERRO: ${error.message}`);
      failed++;
    }
  }

  console.log('\n============================================');
  console.log('  Resultado dos Testes');
  console.log('============================================');
  console.log(`✅ Passou: ${passed}`);
  console.log(`❌ Falhou: ${failed}`);
  console.log('============================================\n');

  if (failed > 0) {
    console.log('⚠️  ATENÇÃO: Verifique se o backend está rodando:');
    console.log('   cd D:\\enem-ia\\backend');
    console.log('   start-backend.bat (Windows)');
    console.log('   ou');
    console.log('   bash start-backend.sh (Linux/Mac)');
    console.log('');
    process.exit(1);
  } else {
    console.log('🎉 Todas as conexões funcionando!');
    console.log('');
    process.exit(0);
  }
}

testConnection();
